---
title: "머신러닝 이론 - 4. Generative Learning Algorithms"
date: "2026-03-04"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "Generative_Learning_Alg"
topics: ["Machine Learning", "Mathematical Foundations", "Probability&Statistics"]
pinned: false
---

Generative Learning Algorithm은 기본적으로 Bayes Rule을 바탕으로 한다. 지금까지 앞서 확률론적으로 머신러닝을 접근하였을 때, $x$를 통하여 $y$를 추론하자는게 기본 원리였다. 그러기 위하여 우리는 학습을 통하여 사전에 제공된 $y$와 $x$의 확률적 분포를 모델링하는 과정을 거쳤었다.

앞서 정리한 Logistic Regression과 같이 $p(y|x;\theta)$를 학습하는 모델의 경우, 말 그대로 주어진 $x$에 대한 $y$의 분포를 $\theta$파라미터를 통하여 학습하는 과정으로 설명이 가능하다. 

Generative Learning Algorithm에서는 $p(y|x;\theta)$를 Gradient Descent나 MLE 방법이 아닌 완전히 확률적인 접근으로 분류 모델을 모델링하는 방법을 소개한다.

Generative Learning Algorithms를 알기 전에 아래 세가지 개념을 숙지하자.

- 우리는 모델을 학습하는 과정을 $p(y|x)$의 분포를 모델링하는 것으로 해석이 가능하고, 이를 완벽하게 모델링 한다면, 실제 데이터의 확률 분포와 학습된 모델의 확률 분포의 오차는 0에 가까울 것이다. 

- 학습 데이터(실제 데이터)는 입력값$x$, 정답값$y$로 이루어져있다.

- Bayes Rule은 다음과 같다. 
$$
p(y|x) = \frac{p(x|y)p(y)}{p(x)}
$$

Bayes Rule을 보는 순간 주어진 데이터로부터 모델 $p(y|x)$를 모델링 하는 방법이 생각이 날 것이다.

$p(x),\ p(y)$(class prior)와 $p(x|y)$를 모델링 할 수만 있다면, 구하고자 하는 $p(y|x)$를 도출할 수 있다. 

이러한 원리를 사용하는 것이 바로 Generative Learning Algorithm이다.

Generative Learning Algorithm과 Generative AI와 햇갈려서는 안된다. 두 개념은 완전히 다른 개념이다. 여기서 서술하는 Generative Learning Algorithm의 어원은 아래와 같다.

> the "generative learning algorithms" is derived from the meaning of building a model of the data distribution for each class.

즉, 각 클래스 별 데이터 분포의 모델을 만드는 것에서 generative learning algorithms이라는 말이 나온 것이다.

generative learning algorithms 중 GDA, Gaussian Discriminant Analysis는 데이터를 가장 자연스러운 분포(가우시안 분포)로 가정한다.

들어가기 앞서, 다변수 정규분포에 대해 알아보자.
### 다변수 정규분포 (가우시안 분포)
일반적으로, 고등과정에서 등장하는 정규분포는 2차원 환경에서의 정규분포만 소개한다.
다변수 정규분포는 $d$-dimensions 환경에서의 정규분포를 의미한다. 다변량 가우시안 분포는 평균벡터 ($\mu \in {\mathbb{R}}^d$), 공분산 행렬 ($\mu \in {\mathbb{R}}^{d \times d}$)로 결정된다. 

그리고 $\mathcal{N}(\mu, \Sigma)$ 로 쓰이며, 확률변수 $x$가 가우시안 분포를 따른다면 $x\sim \mathcal{N}(\mu, \Sigma)$로 쓰이며, 확률밀도함수는 아래와 같다.

$$
p(x; \mu, \Sigma) = \frac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}}\exp(-\frac{1}{2}(x - \mu)^T \Sigma^{-1}(x-\mu)),\ \ |\Sigma|는 \det{(\Sigma)}를 의미한다.
$$

위 확률밀도함수에서 공분산(covariance)는 $Cov(Z) = E[(Z-E[Z])(Z-E[Z])^T]$이고, 
$$
\begin{aligned}
Cov(Z) &= E[(Z-E[Z])(Z-E[Z])^T]\\ 
&= E[ZZ^T] - (E[Z])(E[Z])^T
\end{aligned}
$$

만약, $X\sim\mathcal{N}(\mu, \Sigma)$이면, $Cov(X)=\Sigma$이다.

