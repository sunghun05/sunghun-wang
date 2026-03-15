---
title: "머신러닝 이론 - 2.Linear Regression"
date: "2026-01-24"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "linear_regression"
topics: ["Machine Learning"]
---

머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.

지도학습의 가장 기본적인 알고리즘 중 하나인 선형회귀(linear regression)은 간단한 선형 함수로 구성된다.  
평 수, 침실의 개수로 집값을 예측하는 간단한 추론 알고리즘을 구성해보자.

![](/images/ML/2_Linear_Regression/linear_regression_data_att.png)

그러면 하나의 집에 대한 속성값이 2개 주어지고, 그에 대한 추론값(레이블)이 주어지게 된다. 이를 수식으로 표현하면  
$$  
X \in \mathbb{R}^2, \quad x_1 = \text{living area}, \quad x_2 = \text{bedrooms} \\
h_{\theta}(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2
$$

이고, 이는 아래와 같이 표현이 가능하다.  
$$  
h(x) = \sum_{i=0}^k \theta_i x_i = \theta^T x, \quad \text{where } x_0 = 1
$$  
이때의 h(x)는 가설함수(hypothesis function)라고 하고, $\theta$를 파라미터(parameter) 또는 가중치(weights)라고 표현한다. 0번째 파라미터는 편향(bias)라고 한다. 이에 대해서는 나중에 설명한다.

![](/images/ML/1_Intro/hypothesis_func.png)

데이터셋(data set)은 학습 데이터 x와 레이블 y로 이루어지며, 아래와 같이 표현된다.  
$$  
\text{Training example: } (x^{(i)}, y^{(i)}) \\
\text{Training data set: } \{(x^{(i)}, y^{(i)}); i=1, \dots, m\}
$$

그러면 지도학습에서 학습은 어떻게 이루어질까?  
기본적으로 추론값과 실제값(레이블)과의 오차를 줄이는 방법으로 학습이 진행된다.  
우리의 목적은 h(x)의 결과값이 y값에 수렴하도록 $\theta$를 조정하는 것이다.  
$$  
h_{\theta}(x) = h(x) \approx y
$$  
이를 달성하기 위하여 오차함수를 사용한다. 추론값과 실제값의 오차를 최소화하는 파라미터를 찾는다면(학습), 결국 추론값이 y에 수렴 할 것이다.  
실제 머신러닝 학습에는 다양한 오차함수가 사용되는데, 가장 기본적인 오차함수(=비용함수, cost function)은 다음과 같다.  
$$  
J(\theta) = \frac{1}{2} \sum_{i=1}^{m} (h_{\theta}(x^{(i)}) - y^{(i)})^2 \quad \text{(ordinary least squares)}
$$  
해당 오차함수는 모든 데이터셋에 대해 가설함수의 예측과 레이블과의 차를 제곱하여 더한다. 여기서 상수 1/2는 미분이 용이하도록 설계된 것이다.

따라서, 결국 우리의 궁극적인 목표는 $\min_{\theta} \ J(\theta)$로 귀결된다.

초기 $\theta$에서 시작하여 오차를 줄여나가는 Gradient Descent 알고리즘은 다음 포스팅에서 이어서 정리합니다.