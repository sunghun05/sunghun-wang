---
title: "Hailo Neural Processing Unit(NPU)란?"
date: "2026-03-17"
description: ""
slug: "Hailo NPU"
topics: ["NPU", "Hailo NPU", "Edge AI"]
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
Dataflow Compiler 사용법은 다른 블로그에서 포스팅한다.

이렇게 모델 컴파일이 완료되면, 모델명.hef 파일을 얻을 수 있게 되고, Hailo Runtime Environment(Hailort)에서 실행할 수 있게 된다.

링크 https://github.com/hailo-ai 에 다양한 라이브러리가 오픈소스로 공개되어 있는데, 자주 쓰이는 라이브러리는 아래와 같다.

# Hailo Model Zoo
앞서 설명한 Hailo가 지원하는 모델(resnet, mobilenet, efficient net, yolo, ...)들의 컴파일 과정에 쓰이는 정보, 실제 모델을 담고 있다.
Hailo가 지원하는 모델은 Hailo의 사전 설정에 맞추어 모델 양자화, 컴파일을 진행하는데, 이의 세팅에 관한 내용이 모두 들어 있다.
사용자의 모델은 Hailo의 사전 세팅에 따라 컴파일이 가능하고, 사용자가 자신의 모델에 최적화하여 컴파일할 수도 있다.

# Tappas
Tappas는 Hailo의 Gstreamer Plugin이고, 이를 활용하여 다양한 서비스 제작, 로직을 제작할 수 있다.
Gstreamer는 간단히 설명하면, 영상 처리 파이프라인을 구성할 수 있도록 도와주는 라이브러리인데, 여기에 Hailo Plugin을 적용시키면, Hailo의 모델 추론 결과를 Gstreamer에서 받아 시각화할 수 있다.
Gstreamer에서 Hailo관련 대표 플러그인은 다음과 같다.

- Hailonet: HEF 모델 추론
- Hailofilter: 추론 결과 후처리
- Hailooverlay: 추론 결과 시각화

이외에도 많은 플러그인을 제공하며, Hailo Developer Zone의 Hailo Tappas 공식 문서에서 확인할 수 있다.

# Hailort
Hailort는 Hailo Runtime Environment로, raspberry pi같은 임베디드 환경에 설치되어 실제 구동과 관련된 라이브러리이다.
Tappas와 같이 Gstreamer가 아닌, 더 Low Level에서의 NPU 컨트롤에 관한 API를 제공하고, Gstreamer에서 Hailo를 구동하더라도 Hailort는 무조건 설치되어야 한다.
Hailo Developer Zone, Hailort Documentation에서 상세 내용과 C/C++, Python API 설명을 제공한다.

