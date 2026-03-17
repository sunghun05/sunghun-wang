---
title: "머신러닝 이론 - 2.2 Maximum Likelihood Estimation (MLE)"
date: "2026-02-02"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "maximum_likelihood_estimation"
topics: ["Machine Learning", "Mathematical Foundations"]
pinned: false
---


머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.  
앞서 정리한 머신러닝 이론 - 2 Linear regression 에서 이어집니다.

이번 시간에서는 앞서 정리한 Linear Regression의 Training Cycle에 대한 Object Function의 확률론적인 증명을 진행하고자 합니다. 머신러닝은 통계 분야에 더 가깝기 때문에 확률, 통계적으로 이해하는 것도 중요하다고 생각합니다.

선형회귀에 적용될 데이터의 분포는 다음과 같이 나타낼 수 있다.

![](/images/ML/004_MLE/1.png)

  
$$  
y^{(i)} = \theta^T x^{(i)} + \epsilon^{(i)} \quad \cdots (a)
$$

![](/images/ML/004_MLE/2.png)

  
이때, 각 $\epsilon$은 error 또는 noise이고, IID(independently and identicaly distributed)상태를 가정하며, 표준정규분포를 따른다고 가정한다.  
$$  
\epsilon^{(i)} \sim \mathcal{N}(0, \sigma^2)
$$  
표준 정규분포 식에 의하여 다음과 같은 식이 도출된다.  
$$  
p(\epsilon^{(i)}) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(\epsilon^{(i)})^2}{2\sigma^2}\right)
$$  
이때, (a)식에 의하여  
$$  
p(y^{(i)}|x^{(i)};\theta) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y^{(i)}-\theta^T x^{(i)})^2}{2\sigma^2}\right)
$$  
위 식에서 표현한 $p(y^{(i)}|x^{(i)};\theta)$는 x가 주어졌을 때 $\theta$로 파라미터화된 y의 확률을 의미한다. $p(y^{(i)}|x^{(i)},\theta)$로 표현할 수 없는 이유는 $\theta$는 랜덤변수가 아닌 고정된 파라미터기 때문이다.  
즉, 지금까지의 식은 $\theta$가 고정된 상태에서 x가 주어졌을 때, y가 어떻게 도출될지에 관한 함수이다.

파라미터에 대한 식으로 나타낸다면 파라미터가 변화할 때 y의 변화를 관찰할 수 있을 것이다.  
이러한 접근에서 사용하는 개념이 바로 Likelihood function(우도 함수)이다.

Likelihood function로 설명하는 학습 알고리즘은 간단히 말해, "어떤 확률분포가 데이터를 가장 잘 설명하는가" 라는 것이다. 위 식을 Likelihood function으로 나타내면  
$$L(\theta) = L(\theta; X, \vec{y}) = p(\vec{y}|X; \theta)$$  
모든 데이터셋에 대한 분포를 표현하면 ($\epsilon$은 독립변수로 가정했기 때문에, y|x도 그러하다. 따라서 단순한 곱으로 확류분포를 정의할 수 있다.)  
$$  
L(\theta) = \prod_{i=1}^{n} p(y^{(i)}|x^{(i)}; \theta) \\
= \prod_{i=1}^{n} \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}\right)
$$  
위와 같이 나타낼 수 있다.  
우항이 곱으로 표현되기 때문에, 양변에 log를 취하면

$$  
\ell(\theta) = \log L(\theta) \\
= \log \prod_{i=1}^{n} \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}\right) \\
= \sum_{i=1}^{n} \log \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y^{(i)}-\theta^Tx^{(i)})^2}{2\sigma^2}\right) \\
= n \log \frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{\sigma^2} \cdot \frac{1}{2} \sum_{i=1}^{n} (y^{(i)}-\theta^Tx^{(i)})^2
$$

우도함수의 성질로 인하여, likelihood함수를 최대로 만드는 파라미터$\theta$를 찾으면, 실제 데이터의 분포와 근접한 확률 분포를 모델링 할 수 있다.  
$$  
n \log \frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{\sigma^2} \cdot \frac{1}{2} \sum_{i=1}^{n} (y^{(i)}-\theta^Tx^{(i)})^2 \\
= n \log \frac{1}{\sqrt{2\pi}\sigma} - \frac{1}{\sigma^2} \cdot J(\theta) \\
\max_{\theta} \ell(\theta) \Leftrightarrow \min_{\theta} J(\theta)
$$

지금까지 정리한 방법을 최대우도법(Maximum Likelihood Estimation, MLE)라고 한다.  
우도함수의 최댓값을 찾는 것으로 학습 알고리즘을 구성할 수도 있다.
우도함수의 최댓값을 찾는 문제는 다음에 설명한다. (Logistic Regression 에서)

## 우도함수 Likelihood Function (참고)

-   Probability는 주어진 확률분포가 고정인 상태에서 관측되는 사건이 바뀔 때.
-   Likelihood는 관측된 사건이 고정된 상태에서, 확률분포가 변화할 때. (=확률분포를 모를 때, 가정할 때)

ex) 1, 2, 3, 4, 5의 정수 중에서 특정 값이 관측되는 문제 (이산확률)

1.  정수의 범위가 1\~5이므로 확률분포는 고정, 목표값이 1\~5중에 하나라면 확률은 0.2이다. -> $P(x|\theta)$
2.  확률 분포(정수의 범위)가 변화 (1\~5가 아닌 1\~40, 10\~50 등)이때, 2가 관측될 확률이 likelihood -> $L(\theta|x)$

ex) 동전 던지기 (이산확률)  
동전을 던지는 상황을 가정해보자.  
H는 앞면(head), T는 뒷면(tail)이라고 하고, $P_H$는 앞면이 나올 확률, $P_T$는 뒷면이 나올 확률이라고 하자.

1.  $P_{H}=0.5$, $P_T=0.5$로 균등한 분포일 때를 가정하면, HH일 확률은 $P(HH|P_H=0.5)=0.5^2=0.25$이다.  
    그리고, 이때의 Likelihood는 $L(\theta|x)={P_H}^2=0.25$로 동일하다.
2.  $P_{H}=0.3$, $P_T=0.7$로 균등하지 않을 때를 가정하면, HH일 확률은 $P(HH|P_H=0.3)=0.3^2=0.09$이다.  
    그리고, 이때의 Likelihood는 $L(\theta|x)={P_H}^2=0.09$로 동일하다.
3.  HHT인 경우에는 $P(HHT|P_H=0.3)=0.063,\ L(P_H=0.3|HHT)={P_H}^2(1-P_H)=0.063$으로 동일하다.

이산확률의 경우 확률값과 우도함수의 값이 동일하다.
하지만 연속확률일 경우 확률값과 우도함수의 값이 동일하지 않다.

확률분포에 따른 Likelihood를 그래프로 관찰해보자. (HH 위, HHT 아래)

![](/images/ML/004_MLE/3.png)
![](/images/ML/004_MLE/4.png)

우도함수는 간단히 "지금 얻은 데이터가 이 확률분포로 나왔을 가능성"을 이야기 하기 때문에, 위쪽 그래프를 보면, HH일때 $P_H=1$일때의 가능도가 가장 높은 형태 = 1 로 표현된다. 따라서 앞서 정리한 알고리즘도 최대우도법(MLE)를 적용하는 이유는 X, Y 데이터셋이 어떤 파라미터 조합으로 나왔을지를 관찰하는 것이고, 어떤 파라미터 $\theta$가 있을 때 해당 $\theta$를 우도함수를 최대화 시키는 (데이터셋의 확률분포를 가장 잘 표현하는)방향으로 업데이트해 나가면 된다.

### 정보이론적 해석

위에서 반복적으로 언급한 우도함수의 최대화는 정보이론적인 관점에서도 해석이 가능하다.  
우도함수를 최대화 하는 것은 결국 실제 데이터의 확률분포와 모델링된 확률분포의 차이를 최소화하는 것과 동치이다.

다음과 같이 표현하자.

-   실제 데이터의 분포: $P_{data}(x)$
-   모델링된 데이터 분포: $P_{model}(x)$

두 확률 분포의 차이는 쿨백-라이블러 발산(Kullback-Leibler Divergence, KL Divergence)로 측정할 수 있다.

$$  
\begin{aligned}
D_{KL}(P_{data} \parallel P_{model}) &= \sum P_{data}(x) \log \frac{P_{data}(x)}{P_{model}(x;\theta)} \\
&= \sum P_{data}(x) \log P_{data}(x) - \sum P_{data}(x) \log P_{model} (x;\theta) \\
&= -H(P_{data}) - \mathbb{E}_{x\sim P_{data}} [\log P_{model}(x;\theta)]
\end{aligned}
$$

-   $H(P_{data})$는 $P_{data}$의 정보량
-   $\log P_{model}$은 로그 우도의 기댓값

목표는 두 확률분포의 차이인 KL Divergence를 최소화하는 $\theta$를 찾는 것이므로, 로그 우도의 기댓값을 최대화 하는 과정으로 정리된다.