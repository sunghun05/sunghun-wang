---
title: "Hailo Neural Processing Unit(NPU)란?"
date: "2026-03-17"
description: ""
slug: "Hailo NPU"
topic: ["NPU", "Hailo NPU", "Edge AI"]
pinned: false
---

Halio는 NPU칩을 개발하는 기업들 중 하나로, 다양한 NPU 모델들을 개발하고, 이들에 관한 SDK를 제공한다.
Hailo NPU는 임베디드 환경에 결합되어, 한정된 자원에서 고성능 연산이 필요한 딥러닝 모델을 빠르고 효율적이게 연산한다.

![](/images/Hailo/Hailo_Intro/Hailo_Software.png)

위 사진은 Hailo NPU의 전반적인 동작 구성을 보여준다.
왼쪽 그림은 Hailo Dataflow Compiler에 관한 구성을 보여준다.

사용자가 딥러닝 모델을 구성하고 학습을 진행하는데, Keras, Tensorflow, Onnx, Pytorch 기반의 모델을 지원한다.
이후, Hailo가 지원하는 모델(resnet, mobilenet, efficient net, yolo, ...) 또는 사용자가 구성한 모델을 Hailo가 실행 가능한 형식으로 변환하는 과정이 필요하다.
Dataflow Compiler는 사용자가 학습한 모델을 Hailo가 실행할 수 있는 포멧(Hailo Executable Format, HEF)으로 변환하는 과정이다.

이렇게 모델 컴파일이 완료되면, 모델명.hef 파일을 얻을 수 있게 되고, Hailo Runtime Environment(Hailort)에서 실행할 수 있게 된다.

링크 https://github.com/hailo-ai에 다양한 라이브러리가 오픈소스로 공개되어 있는데, 자주 쓰이는 라이브러리는 아래와 같다.

# Hailo Model Zoo
앞서 설명한 Hailo가 지원하는 모델(resnet, mobilenet, efficient net, yolo, ...)들의 컴파일 과정에 쓰이는 정보를 담고 있다.
Hailo가 지원하는 모델은 Hailo의 사전 설정에 맞추어 모델 양자화, 컴파일을 진행하는데, 이의 세팅에 관한 내용이 모두 들어 있다.
사용자의 모델은 Hailo의 사전 세팅에 따라 컴파일이 가능하고, 사용자가 자신의 모델에 최적화하여 컴파일할 수도 있다.

# Tappas


# Hailort