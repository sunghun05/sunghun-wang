---
title: "머신러닝 이론 - 3. Classification & Logistic Regression"
date: "2026-02-15"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "classification_logistic_regression"
topics: ["Machine Learning", "Probability&Statistics"]
pinned: true
---

머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.  

Logistic Regression은 classification 알고리즘 중에 하나이다.
classification(분류)문제는 regression(회귀)와 달리 입력값이 0 또는 1인지를 '분류'한다. 이번 포스팅에서는 클래스(class)가 0과 1 만 존재하는 '이진 분류 (Binary Classification)'만 다룬다.

이진 분류에서 라벨 y는 0, 1의 값을 갖는다. $y\in \{0, 1\}$  
그리고, 클래스 0은 negative class, 1은 positive class로 칭하기도 한다.

$$
h_\theta(x) \in \{0, 1\}, h_\theta(x) = g(\theta^Tx) = \frac{1}{1+e^{-\theta^Tx}} \Rightarrow g(z)=\frac{1}{1+e^{-z}}
$$

Logistic Regression은 기존의 $h_\theta$를 함수 $g$, "sigmod"함수에 적용시킨 형태가 된다.

![](/images/ML/006_logistic_regression/sigmoid.png)
위 함수는 sigmoid함수를 그래프로 나타낸 것이다.
성질은 아래와 같다.
$$
g(z)=\frac{1}{1+e^{-z}}\\  
\lim_{z \to \infty} g(z) = 1\\ 
\lim_{z \to - \infty} g(z) = 0\\ 
g(0)=0.5
$$

sigmoid 함수는 위와 같이 부드럽게 증가하며, 모든 x값이 0과 1 사이의 범위에 대응된다.
그럼 왜 하필 이 함수일까?

sigmoid함수는 다음과 같은 매우 유용한 성질을 갖는다.
$$
\begin{aligned}
g'(z)&=\frac{d}{dz}\frac{1}{1+e^{-z}}\\ 
&= \frac{1}{(1+e^{-z})^2}(e^{-z})\\ 
&= \frac{1}{(1+e^{-z})} \cdot \left(1 - \frac{1}{(1+e^{-z})} \right)\\ 
&= g(z)(1-g(z)).
\end{aligned}
$$
sigmoid함수는 미분하였을 때, 자기 자신의 곱으로 표현되며, 확률적인 성질을 주입하여 해석이 가능하기 때문에(Bayssian Distribution), 그 성질이 중요하다.

regression은 추론값, 라벨과의 차이를 줄이는 것이 중요하지만, classifiaction은 해당 데이터가 어떤 그룹에 속하는지 가 중요하기 때문에, 앞서 정리한 Maximum Likelihood Estimation(MLE)로 해당 이진 분류 문제를 해결할 수 있다.

다음과 같이 가정하자.
$$
\begin{aligned}
P(y=1|x;\theta)\ &=\ h_\theta(x)\\ 
P(y=0|x;\theta)\ &=\ 1-h_\theta(x)
\end{aligned}
$$

그러면 아래와 같이 표현이 가능하며, 베르누이 분포로 표현된다.
$$
p(y|x;\theta) = (h_\theta(x))^y (1 = h_\theta(x))^{1-y}
$$

n 개의 학습 샘플들이 독립적으로 생성되었다고 가정하면, 아래와 같이 우도 함수(likelihood function)로 표현이 가능하다.
$$
\begin{aligned}
L(\theta) &= p(\vec{y}| X; \theta)\\ 
&= \prod^n_{i=1}p(y^{(i)}|x^{(i)}; \theta)\\ 
&= \prod^n_{i=1} \left( h_\theta (x^{(i)}) \right)^{y^{(i)}} \left(1 - h_\theta (x^{(i)}) \right)^{1 - y^{(i)}}
\end{aligned}
$$

Log likelihood로 표현하면,

$$
\ell(\theta) = \ln L(\theta) = \sum^n_{i=1} \{ y^i \ln h_\theta(x^i) + (1-y^i) \ln (1-h_\theta(x^i)) \}\\ 
$$
위 식을 사용하여 $max_\theta \ell(\theta)$를 구한다면, 분류 모델에 맞는 파라미터를 구할 수 있다.
정보이론을 공부했다면, 위 식이 정보이론과 관련이 있는 것을 눈치챘을 것이다.
$max_\theta \ell(\theta)$이므로 음수를 붙여 비용함수를 도출할 수 있다.

$$
Binary\ Cross\ Entropy\\ 
-\frac{1}{m}\sum^m_{i=1} [y^i \ln h_\theta(x^i) + (1-y^i) \ln (1-h_\theta(x^i))]
$$

한 가지 주의할 점은, 회귀 문제와 다르게 $\hat y$는 중요하지 않다는 것이다. 입력 x가 어느 클래스에 속하는지가 중요하다.
![](/images/ML/006_logistic_regression/classification_hyp_func.png)

다시 본론으로 돌아와서, Log Likelihood를 최대화 하는 방법에 대해 알아보자.  

방법은 여러가지가 있는데 그 중에 gradient ascent를 소개한다.  
Gradient Descent와 반대로, 파라미터를 업데이트 하는 방향만 다르다.

$$
Gradient\ Descent:\ \theta:=\theta - \alpha \nabla_\theta \ell(\theta)\\ 
Gradient\ Ascent:\ \theta:=\theta + \alpha \nabla_\theta \ell(\theta)
$$  

### 유도1
$$
\begin{aligned}
\frac{\partial}{\partial\theta_j} \ell(\theta) &= \left ( y\frac{1}{g(\theta^Tx)} - (1-y)\frac{1}{1-g(\theta^Tx)}\right)\frac{\partial}{\partial\theta_j}g(\theta^Tx)\\ 
&= \left ( y\frac{1}{g(\theta^Tx)} - (1-y)\frac{1}{1-g(\theta^Tx)}\right)g(\theta^Tx) (1 - g(\theta^Tx))\frac{\partial}{\partial\theta_j}\theta^Tx\\ 
&= (y(1-g(\theta^Tx)) - (1-y)g(\theta^Tx))x_j\\ 
&= (y - g(\theta^Tx))x_j\\ 
&\iff \theta_j := \theta_j + \alpha \sum^m_{i=1} (y^i - h_\theta(x^i))x^i_j
\end{aligned}
$$

겉보기에는, LMS와 동일한 Update Rule을 가진 것 처럼 보인다. 하지만, $h_\theta$가 여기선 비선형함수이기 때문에, 다른 알고리즘임을 알아야 한다는 점을 참고하자.

