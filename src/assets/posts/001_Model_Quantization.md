---
title: "Post-Training Quantization"
date: "2026-03-22"
description: ""
slug: ""
topics: ["Quantization", "Edge AI", "Deep Learning", "Mathematical Foundations"]
pinned: false
---

Quantization은 "양자화"라는 뜻으로, 위키피디아는 양자화를 다음과 같이 설명한다.
"Quantization is the process of constraining an input from a continuous or otherwise large set of values (such as the real numbers) to a discrete set (such as the integers)."

번역하자면, 양자화는 연속적이거나 실수와 같은 거대한 변수들의 집합을 이산 집합으로 한정하는 것을 일컫는다고 한다.

컴퓨터의 입장에서는 딥러닝 모델이 가지고있는 실수(floating point)로 이루어진 막대한 가중치들을 연산하려면, 상당한 computing resources가 소모됨을 예상할 수 있다.
computing resource 가 제한된 edge environment에서는 부담이 될 수 밖에 없다.

따라서, 모델 양자화는 모델의 파라미터들을 더욱 간단한 형태로 경량화 하는 과정을 의미한다.
float32 (32bit)의 연산보다, float16 (16bit), INT8 (8bit)로 갈수록, 컴퓨터의 연산 복잡도가 감소하기 때문에, 컴퓨터의 입장에서는 작은 사이즈의 숫자일수록 더욱 빠른 연산이 가능하다.
하지만, bit수가 낮아질 수록, 연산 속도는 빨라지지만, 정확도의 감소가 발생하기 때문에, 딥러닝 모델 양자화에서는, 이러한 문제를 해결하고, 적절한 tradeoff를 이루는 것이 최종 목적이라고 할 수 있다.

INT8 최적화 방법은 여러 가지가 있는데, 그 중 대표적인 두 분류로는 아래와 같다.
- Symmetric Quantization
- Asymmetric Quantization

![](/images/Quantization/1/a_symmetric.png)

위 그림에서 $[\alpha, \beta]$를 Clipping range라고 한다.
clipping range를 구하는 것이 양자화 전 선행되어야 하는 과정이고, 이 과정을 Calibration이라고 한다.

양자화는 다음과 같은 수식으로 이루어진다.
$$
S,\ r \in \mathbb{R},\ Z \in \mathbb{Z}\\
Q(r) = Int(r/S) - Z
$$

양자화 전 value를 $r$, S는 Scaling factor, Z는 zero point이다. 

위 식은 실수 분포를 8bit 정수 분포[-128, 127]로 매핑이 가능하다.

또한, Dequantize방법도 있다. 양자화된 $Q(r)$을 $r$로 복구하는 방법이다.

$$
\tilde{r} = S(Q(r) + Z)
$$

위 양자화 식에서 round operation을 수행하기 때문에, $r, \tilde{r}$은 완전히 일치하지 않는다.

앞서 정리한 Scaling factor인 S는 아래와 같이 구해질 수 있다.
$$
S = \frac{\beta - \alpha}{2^b - 1}
$$
여기서 b는 양자화 비트수를 말한다. INT8양자화이면 $b=8$이 된다.

다음으로, clipping range를 설정해야 한다.
Symmetric Quantization(대칭 양자화)는 clipping range가 대칭적인 것으로, $\alpha = -\beta$이다. 
Asymmetric Quantization(비대칭 양자화)는 clipping range가 비대칭적인 것으로, $\alpha \ne -\beta$이다.

clipping range를 설정하는 방법 중 하나는 min/max 방법을 사용하는 것이다. 
비대칭 양자화에서의 min/max 방법은 양자화 전 실수 분포에서의 최솟값, 최댓값을 각각 $\alpha, \beta$에 사용하는 것이다.
$$
\alpha = r_{min}\\
\beta = r_{max}
$$

대칭 양자화에서는 실수 최댓값, 최솟값의 각각의 절댓값의 최댓값을 clipping range로 정한다.
$$
-\alpha = \beta = max(|r_{min}|,|r_{max}|)
$$

이러한 특성 때문에, 비대칭 양자화는 대칭 양자화에 비해 타이트한 범위를 갖는다.

또한, 대칭 양자화에서, zero point를 0으로 설정하면 아래와 같은 단순한 수식으로 정리된다.
$$
Q(r) = Int(\frac{r}{S})
$$

weight clipping range를 정할 때에는, truncation을 통하여 범위를 좁히기도 하는데, 특정 threshold를 설정하여 threshold를 넘는 값은 모두 최대/최솟값으로 대체하는 방식이다. 
이러한 방식은 KL Divergence를 통하여 정보량의 손실을 최소화하는 쪽으로 threshold를 설정하게 된다.

![](/images/Quantization/1/truncation.png)

