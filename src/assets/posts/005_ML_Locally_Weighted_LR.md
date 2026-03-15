---
title: "머신러닝 이론 - 2.3 Locally weighted linear regression (LWR)"
date: "2026-02-15"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "Locally weighted linear regression"
topics: ["Machine Learning"]
pinned: false
---

머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.  
앞서 정리한 머신러닝 이론 - 2 Linear regression 에서 이어집니다.

인공지능을 공부해본 사람이라면, overfitting, underfitting의 개념을 이해하고 있을 것이다.  
선형 회귀에서 attribute가 1개일 때를 가정하여 가설 함수를 구성하면, 아래 이미지에서 왼쪽 그래프와 같은 형태로 표현이 된다.


![](/images/ML/005_LMR/polynomial_Reg.png)

파라미터가 1개일 때에는 전체 가설 함수가 전체 데이터셋을 표현하지 못하기 때문에, Underfitted Hypothesis Function이 된다.  
속성이 1개이기 때문에, 다항 함수(polynomial function)을 가설함수로, 즉 다항회귀 방법을 사용하자 ($x\in\mathbb{R}$).  
가설 함수의 차수(degree)를 2차로 구성하면, 중간 그래프 형태를 띄고, 아래와 같은 식으로 구성된다.  
$$
h_{\theta}(x) = \theta_0 + \theta_1 x + \theta_2 x^2
$$
위 이미지를 보면 가설함수가 적당히 데이터를 표현하는 것을 확인할 수 있다.  

반면, 오른쪽 그래프와 같이 3차의 함수를 가설함수로 사용하면, 전체 데이터를 과하게 fit하여 표현하므로, 새로운 데이터가 입력되었을 때, 전혀 다른 결과를 낼 수 있다. 이와 같은 현상을 Overfitting이라고 한다.  

모델의 파라미터가 많아질수록 Overfitting될 확률이 높아지고, 파라미터가 적어질수록 Underfitting의 위험이 높아진다.  
따라서, 데이터의 특징을 잘 파악하여 모델의 파라미터 개수를 적절히 구성해야 한다. 하지만, 모델의 속성(attributes)가 많아질 수록, 
파라미터 개수의 조율은 매우 까다롭기 때문에, Locally weighted Regression(LWR)이 등장한다.

Locally Weighted Regression은 각 지역 내에서 데이터를 정확하게 예측할 수 있다는 장점이 있다.
원래의 선형 회귀의 가설함수는 아래의 비용함수로 구성한다.
$$
\sum_i(y^{(i)}-\theta^Tx^{(i)})^2
$$

반면, LMR에서는 조금 다른 비용함수를 사용한다.
$$
\sum_iw^{(i)}(y^{(i)}-\theta^Tx^{(i)})^2 \\ 
where\ w^{(i)}=\exp(- \frac{(x^{(i)}-x)^2}{2\tau^2})
$$
여기서 $x^{(i)}$는 i번째 데이터, $x$는 입력을 의미한다. $\tau$는 bandwidth를 의미하며, 아래 사진에서 확인할 수 있다.

w에 관한 식을 자세히 보면 다음과 같은 관계가 성립함을 알 수 있다.
$$
1. |x^{(i)}-x|\ is\ bigger,\ w^{(i)}\approx 0 \\ 
2. |x^{(i)}-x|\ is\ smaller,\ w^{(i)}\approx 1\\ 
$$

![](/images/ML/005_LMR/w_graph.png)
같은 x축에 w그래프와 데이터셋을 나타낸 이미지이다. 점선의 범위 안의 입력이 들어오면, 해당 범위 안에서 선형회귀가 진행됨을 알 수 있다.
W의 모양이 가우시안 그래프의 형태와 유사하지만, 가우시안 분포와는 다른 함수라는 것을 알아두자.

$\tau$(bandwidth)의 경우 다음과 같은 성질이 있다.
- $\tau$  클수록 -> oversmoothing
- $\tau$  작을수록 -> 결과가 들쭉날쭉해짐

LMR 알고리즘은 Non-Parametic 알고리즘이다.

## Parametic, None-Parametic Algorithm

Parametic 알고리즘은 일반 선형회귀와 같이, 파라미터를 조율하는 학습 과정이 끝나면, 파라미터만 보관하면 된다. 
반면, None-parametic 알고리즘은 학습이 끝난 후에 데이터를 유지해야 한다.