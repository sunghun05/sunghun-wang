---
title: "머신러닝 이론 강의 정리 - Intro"
date: "2025-10-30"
description: "머신러닝 이론 강의를 정리한 내용입니다."
slug: "ml-theory-intro"
topic: "Machine Learning"
pinned: false
---

머신러닝 이론 포스팅은 Stanford CS229 (Andrew Ng)과 대학교 강의를 기반으로 정리합니다.

## 머신러닝 이란?

머신 러닝은 "Field of study that gives computers the ability to learn without explicity programmed." (Arthur Samuel 1959) 으로 정의가 된다. 쉽게 말하자면, 컴퓨터가 특정 Task를 해결하는 방법을 코딩으로 알려주는 것이 아니라, 어떠한 Task를 해결하는 방식을 컴퓨터가 학습하도록 유도하는 것이 머신러닝 분야 라고 할 수 있다. 머신러닝은 인공지능의 하나의 방법이고, 머신러닝 안에서 또 딥러닝이라는 개념이 존재한다.  
또한, 머신 러닝은 컴퓨터에게 어떠한 데이터를 주면, 컴퓨터가 배운 것이 맞는지를 확인하고 오차를 줄여나가는 방식을 사용한다. 예를 들어서, 컴퓨터에게 어떠한 값을 예측하라고 한다면, 이전에 있던 자료들을 통하여 새로운 데이터를 가지고 예측할 수 있다.

## 머신러닝의 종류

머신러닝을 수행하기 위해선, 컴퓨터가 어떤 방법으로 학습할 것인지, 방법을 선택하는 것도 개발자의 중요한 임무라고 할 수 있다.  
머신러닝의 종류는 크게 다음과 같이 나뉜다.

-   지도학습 (Supervised Learning)
-   비지도학습 (Unsupervised Leaning)
-   준지도학습 (Semi-supervised Learning)
-   강화학습 (Reinforcement Learning)

## 지도학습 (Supervised Learning)

지도학습은 말 그대로, 학습 과정에서 컴퓨터에게 데이터에 레이블(Label)을 포함하는 방식이다. 레이블이란, 예를 들어, 어떠한 예측 프로그램을 만든다고 하면, 주어진 어떤 데이터를 통하여 예측값을 추론한다. 이때, 정답 예측값이 레이블이다.

![지도학습 과정에서 컴퓨터에게 주는 데이터(평 수에 따른 집 가격)를 시각화한 모습(Regression, 회귀)](/images/ML/1_Intro/linear_regression_dataset.png)
위 사진은 지도학습 과정에서 컴퓨터에게 주는 데이터(평 수에 따른 집 가격)를 시각화한 모습이다. (Regression, 회귀)

![지도학습 과정에서 이진 분류를 위한 데이터를 시각화한 모습(classification, 분류)](/images/ML/1_Intro/classification.png)
위 사진은 지도학습 과정에서 이진 분류를 위한 데이터를 시각화한 모습이다. (classification, 분류)


### 표기

![](/images/ML/1_Intro/hypothesis_func.png)

  
지도학습에서의 Learning은 학습 데이터(data set) (x,y)에 대하여, x->y, x를 통하여 y를 예측하는 방식으로 진행이 된다. 조금 더 구체적으로 말하자면, 학습 데이터(training set)을 학습 알고리즘에 투입하여 가설 함수(hypothesis function, h)를 결정하여 새로운 데이터 x에 대하여 레이블을 예측하는 방식이다. (아래 그림 참조)  
데이터셋의 표기방법은 다음과 같다.

$$  
Training\ example: (x^{(i)}, y^{(i)})\\  
Training\ data\ set:\ {(x^{(i)}, y^{(i)}); i=1,...,m}  
$$

이때, y는 입력 x에 대한 정답(label)을 의미하고, $\hat{y}$은 x를 통하여 예측한 y를 의미한다.


