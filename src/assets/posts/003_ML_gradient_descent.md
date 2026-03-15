---
title: "머신러닝 이론 - 2.1 경사 하강법 (Gradient Descent)"
date: "2026-01-25"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "gradient_descent"
topics: ["Machine Learning", "Mathematical Foundations"]
---

머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.

앞서 정리한 머신러닝 이론 - 2 선형회귀에서 이어집니다.

가설함수의 예측값을 실제 값에 수렴시키기 위하여 파라미터를 조정하는 학습 과정은 Gradient Descent와 이루어진다.  
지난 포스팅에서 정리했듯이, 오차 함수를 최소화 하기 위해 파라미터를 조금씩 변화하면서 예측값을 실제 값에 수렴시킨다.  
$$\min_{\theta} J(\theta)$$

경사 하강법은 미분 가능한 어떤 함수의 최솟값을 찾기 위한 알고리즘으로, 머신러닝과 딥러닝에서까지 학습 과정에 사용되는 매우 중요한 알고리즘이다.

경사 하강법에 대한 다른 자료들을 살펴보면, 아래와 같은 사진들을 찾을 수 있다.

![](/images/ML/2_1_gradient_descent/gd_2d.jpeg)

해당 사진은 초기 $\theta$에서의 오차에서부터 경사 하강법을 적용하여 오차의 최솟값을 찾는 과정을 의미한다.

그럼 그냥 미분해서 0값이 되는 $\theta$를 찾으면 되는거 아니야?

라고 할 수 있지만 이는 현실적으로 불가능에 가깝다. 간단한 모델에서는 이와 같이 오차함수의 미분값이 0이되는 $\theta$값을 찾을 수 있고, 이 과정이 훨씬 빠르다. 하지만, 실제 사용되는 머신러닝 모델은 너무 복잡해서 오차함수의 미분값이 0이되는 지점을 구하는 방정식의 해를 구할 수 없는 상태가 된다. 간단한 머신러닝 모델에서는 적용이 가능하다. 이를 Normal Equation이라 하는데, 이에 대해서는 후술하겠다.

먼저, Gradient가 무엇인지 알아보자. Gradient의 정의는 f(x,y,x)의 기울기를 구한 벡터로, 가장 가파른(위쪽) 방향을 나타내는 벡터장으로 표현되며 $\nabla$로 표기한다. 아래 사진은 $f(x,y,z)=-\left(cos^2x+cos^2y \right)$의 gradient를 시각화한 그림이다.

![](/images/ML/2_1_gradient_descent/gradient_field.png)

스칼라 함수의 gradient는 다음과 같이 각각의 편미분 값을 열 벡터로 갖는다.  
$$  
\nabla f = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right)
$$

이 개념을 비용함수에 적용하면 다음과 같이 표현된다.  
$$  
\nabla J = \left( \frac{\partial J}{\partial x_0}, \frac{\partial J}{\partial x_1}, \frac{\partial J}{\partial x_2}, \dots, \frac{\partial J}{\partial x_k} \right)
$$

그리고, 모든 파라미터를 gradient 반대 방향으로 조금씩 변화시킨다. gradient의 방향은 위쪽이므로 아래 식처럼 빼줘야 한다.  
$\alpha$는 학습률(learning rate)라고 하며, 얼마나 변화시킬지를 정한다. 학습률은 하이퍼파라미터(hyperparameter)로, 학습 과정에서 사용자가 직접 조절하며 학습률이 너무 높으면 최솟값에 수렴하지 않고 발산할 수 있다. 에타($\eta$)로도 표현한다.  
모든 파라미터에 대해 수행하고, 비용함수를 다음과 같이 정의하면  
$$  
J(\theta) = \frac{1}{2} \sum_{i=1}^{m} (h_{\theta}(x^{(i)}) - y^{(i)})^2 \quad \text{(ordinary least squares)}
$$  
j번째 파라미터에 대한 경사하강법 수행 과정은 다음과 같다.  
$$  
\begin{aligned}
\theta_{j} &:= \theta_{j}-\alpha \frac{\partial}{\partial \theta_j} J(\theta) \\
\frac{\partial}{\partial \theta_j} J(\theta) &= \frac{\partial}{\partial \theta_j} \frac{1}{2} \left(\theta^T x - y \right)^2 \\
&= (\theta^T x - y)\frac{\partial}{\partial \theta_{j}}(\theta^T x - y ) \\
&= (\theta^T x - y) x_j \\
&= (h_\theta(x)-y)x_j \\
\therefore \theta_j &:= \theta_j - \alpha \left(h_\theta(x^{(i)}) - y^{(i)}\right)x_j^{(i)}
\end{aligned}
$$  
위의 정리된 수식을 Least Mean Squares (LMS update)라고 한다.

앞서 사용한 함수의 그래프를 이용해 시각화하면, 경사하강법을 한번 수행한 그림은 아래와 같다. 실제 머신러닝의 파라미터는 차원이 훨씬 크기 때문에 시각화는 불가능하다.

![](/images/ML/2_1_gradient_descent/gradient_descent_1step.png)

머신러닝의 학습 과정에서 경사하강법은 다양한 방식으로 사용되는데, 대표적으로 Batch GD(Gradient Descent), SGD(Stochastic Gradient Descent), Batch SGD 등이 있다.

![Batch GD의 알고리즘](/images/ML/2_1_gradient_descent/batch_gd.png)

![SGD의 알고리즘](/images/ML/2_1_gradient_descent/SGD.png)

위 두 알고리즘은 조금의 차이가 있다. 기본적으로 LMS 알고리즘이지만 데이터셋에 접근하는 방식이 다르다.  
Batch GD는 모든 데이터에 대해 추론한 결과와 실제값의 오차를 누적해서 파라미터를 갱신한다.  
이에 반해, SGD는 이름에서 알 수 있듯이 랜덤적으로 데이터를 추출하여 하나의 데이터에 대해 오차를 구한 뒤, 파라미터를 갱신하는 과정을 반복한다.  
이외에도 Mini Batch는 전체 데이터셋을 배치로 나눈 뒤 각 배치에서 Batch GD를 수행한다.

아래 사진은 Batch GD, SGD, Mini Batch의 수렴 과정을 등고선으로 보여준다.

![](/images/ML/2_1_gradient_descent/gd_compare.png)

## Normal Equation

Gradient Descent를 사용한 학습 알고리즘은 효율적이지만, 학습 시간이 오래걸린다는 단점이 존재한다.  
오차 함수의 미분값이 0이 되는 지점을 방정식으로 정리한다면, 학습 시간을 매우 줄일 수 있다.

각 학습 데이터를 다음과 같이 행벡터로 표현한다.  
$$  
X = \begin{bmatrix}
- & (x^{(1)})^T & - \\
- & (x^{(2)})^T & - \\
& \vdots & \\
- & (x^{(n)})^T & -
\end{bmatrix}
$$

$$  
\vec{y} = \begin{bmatrix}
y^{(1)} \\
y^{(2)} \\
\vdots \\
y^{(n)}
\end{bmatrix}
$$

$h_{\theta}(x^{(i)})=(x^{(i)})^T\theta$는 다음과 같이 하나의 벡터로 표현이 가능하다.  
$$  
\begin{aligned}
X\theta - \vec{y} &= \begin{bmatrix}
(x^{(1)})^T \theta \\
\vdots \\
(x^{(n)})^T \theta
\end{bmatrix} - \begin{bmatrix}
y^{(1)} \\
\vdots \\
y^{(n)}
\end{bmatrix} \\
&= \begin{bmatrix}
h_\theta(x^{(1)}) - y^{(1)} \\
\vdots \\
h_\theta(x^{(n)}) - y^{(n)}
\end{bmatrix}
\end{aligned}
$$  
위 식을 이용해 비용함수를 벡터의 내적으로 표현하면 아래와 같다.  
$$  
\begin{aligned}
\frac{1}{2} (X\theta - \vec{y})^T (X\theta - \vec{y}) &= \frac{1}{2} \sum_{i=1}^{n} (h_\theta(x^{(i)}) - y^{(i)})^2 \\
&= J(\theta)
\end{aligned}
$$

$J(\theta)$의 미분값(Gradient)가 0이 되는 지점을 찾기 위해 J의 Gradient를 구한다.  
$$  
\begin{aligned}
\nabla_{\theta} J(\theta) &= \nabla_{\theta} \frac{1}{2}(X \theta-\vec{y})^{T}(X \theta-\vec{y}) \\
&=\frac{1}{2} \nabla_{\theta}\left((X \theta)^{T} X \theta-(X \theta)^{T} \vec{y}-\vec{y}^{T}(X \theta)+\vec{y}^{T} \vec{y}\right) \\
&=\frac{1}{2} \nabla_{\theta}\left(\theta^{T}\left(X^{T} X\right) \theta-\vec{y}^{T}(X \theta)-\vec{y}^{T}(X \theta)\right) \\
&=\frac{1}{2} \nabla_{\theta}\left(\theta^{T}\left(X^{T} X\right) \theta-2\left(X^{T} \vec{y}\right)^{T} \theta\right) \\
&=\frac{1}{2}\left(2 X^{T} X \theta-2 X^{T} \vec{y}\right) \\
&=X^{T} X \theta-X^{T} \vec{y}
\end{aligned}
$$

위 식이 0이 되는 $\theta$값을 찾는 방정식이 된다.  
$$  
X^T X \theta = X^T \vec{y} \\
\theta = (X^T X)^{-1} X^T \vec{y}
$$  
해당 방정식을 Normal Equations(정규 방정식)라고 한다.  
정규 방정식은 선형회귀 모델에서만 활용이 가능하고, 컴퓨팅 리소스의 제한으로 너무 많은 속성을 갖는 데이터에는 부적합하다.