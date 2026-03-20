---
title: "딥러닝 모델 HEF로 컴파일하기"
date: "2026-03-19"
description: ""
slug: "Hailo NPU"
topics: ["Hailo NPU", "Edge AI"]
pinned: false
---

Hailo에서 실행 가능한 포맷(Hailo Executable Format, HEF)파일을 갖기 위해서는 Hailo Dataflow Compiler가 필요하다.
컴파일은 기본적으로 Python 라이브러리로 진행할 수 있는데, 이를 쉽게 진행하기 위해 Docker환경을 지원한다.

https://hailo.ai/developer-zone/software-downloads/

위 링크에서 Hailo AI Software Suite를 다운받은 후, 압축을 해제하면 나오는 shell script를 실행하면 docker 환경으로 진입할 수 있다.

성공적으로 진입했다면 다음과 같은 화면이 뜰 것이다.
![](/images/Hailo/Docker_Compiler/Docker_first_screen.png)

```bash
cd /local/shared_with_docker/
```
위 명령어를 터미널에 입력하면 shared_with_docker 디렉토리로 이동하는데, 해당 디렉토리가 도커를 실행한 로컬 컴퓨터와 마운트되는 경로이며, 해당 디렉토리에 있는 파일을 공유할 수 있다.

![](/images/Hailo/Docker_Compiler/compile_process.png)
위 사진이 HEF컴파일을 위한 프로세스를 보여준다.

간단하게 표현하면, Parsing -> Optimizing -> Compiling 순서이다.
hailo-8 구동 mobilenet 모델을 예를 들어 설명하겠다.

### Parsing

```bash
hailomz parse --ckpt <onnx 경로> --hw-arch hailo8 mobilenet_v3
```
hailo model zoo에서 지원하는 모델이 아닌 경우 커스텀 컴파일 포스팅을 참고하자.
지원하는 모델은 글 하단에서 참고

```bash
(hailo_virtualenv) hailo@workstation:/local/shared_with_docker$ ls | grep mobilenet_v3.onnx
mobilenet_v3.onnx
(hailo_virtualenv) hailo@workstation:/local/shared_with_docker$ hailomz parse --ckpt ./mobilenet_v3.onnx --hw-arch hailo8 mobilenet_v3
[info] No GPU chosen and no suitable GPU found, falling back to CPU.
WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
E0000 00:00:1773888485.503255   46822 cuda_dnn.cc:8310] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
E0000 00:00:1773888485.506727   46822 cuda_blas.cc:1418] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered
<Hailo Model Zoo INFO> Start run for network mobilenet_v3 ...
<Hailo Model Zoo INFO> Initializing the runner...
[info] Translation started on ONNX model mobilenet_v3
[info] Restored ONNX model mobilenet_v3 (completion time: 00:00:00.26)
[info] Extracted ONNXRuntime meta-data for Hailo model (completion time: 00:00:00.41)
[info] Start nodes mapped from original model: 'input': 'mobilenet_v3/input_layer1'.
[info] End nodes mapped from original model: '/classifier/classifier.3/Gemm'.
[info] Translation completed on ONNX model mobilenet_v3 (completion time: 00:00:00.70)
[info] Saved HAR to: /local/shared_with_docker/mobilenet_v3.har
```

```bash
(hailo_virtualenv) hailo@workstation:/local/shared_with_docker$ ls | grep mobilenet_v3.har
mobilenet_v3.har
```

## Optimizing

#### 랜덤 Calibration Set 사용
```bash
hailo optimize --hw-arch hailo8 --use-random-calib-set ./mobilenet_v3.har 
```

#### Calibration Set 경로 지정
```bash
hailo optimize --hw-arch hailo8 --calib-set-path <calib set dir> ./mobilenet_v3.har 
```
끝나면 현재 디렉토리에 [모델명]_optimized.har로 저장됨.

hef 컴파일 후 calib set의 유/무가 성능에 유의미한 결과를 미치기 떄문에, 사용자 모델 학습에 사용한 데이터에 맞는 이미지를 사용하여 calibration set을 만들고 진행하는 것이 모델 성능에 좋다.
--use-random-calib-set을 사용하면, hailo가 제공하는 임의의 calibration 데이터를 사용한다.
calib set은 .npy 파일이나 이미지가 들어있는 폴더로 만들면 된다.

*주의*: npy 파일로 calib set을 구성할 때, NHWC포멧으로 구성할 것. (Number of Batch, Height, Width, Channel 순서)

### 양자화 결과 분석 (Optional)
```bash
(hailo_virtualenv) hailo@workstation:/local/shared_with_docker$ hailo profiler ./mobilenet_v3_optimized.har --no-browser
```
mobilenet_v3_quantized_model.html을 로컬 컴퓨터로 다운로드 후, 브라우저로 열기

![](/images/Hailo_Compile/hailoProfiler.png)
모델 정보와 아키텍쳐를 볼 수 있다.

![](/images/Hailo_Compile/optimizationDetails.png)
상단의 Optimization Details를 클릭하면, 양자화와 각 레이어의 정보가 뜬다.
사진과 같이 conv1레이어를 누르면, conv1레이어의 파라미터 분포, 양자화 전/후 파라미터 분포 등을 알 수 있다.
각 레이어는 모두 INT8 (8bit)양자화된 것을 알 수 있다. (float32->INT8)

## Compiling
```bash
(hailo_virtualenv) hailo@workstation:/local/shared_with_docker$ hailomz compile mobilenet_v3 --hw-arch hailo8 --har ./mobilenet_v3_optimized.har
```
끝나면 현재 디렉토리에 [모델명].hef로 저장됨.


## Hailo Model Zoo 지원 모델
- arcface_mobilefacenet
- arcface_mobilefacenet_nv12
- arcface_mobilefacenet_rgbx
- arcface_r50
- cas_vit_m
- cas_vit_s
- cas_vit_t
- centernet_resnet_v1_18_postprocess
- centernet_resnet_v1_50_postprocess
- centerpose_regnetx_800mf
- clip_resnet_50
- clip_resnet_50x4
- clip_text_encoder_resnet50x4
- clip_text_encoder_vitb_16
- clip_text_encoder_vitb_32
- clip_vit_b_16
- clip_vit_b_32
- damoyolo_tinynasL20_T
- damoyolo_tinynasL25_S
- damoyolo_tinynasL35_M
- davit_tiny
- deeplab_v3_mobilenet_v2
- deeplab_v3_mobilenet_v2_wo_dilation
- deit_base
- deit_small
- deit_tiny
- detr_resnet_v1_18_bn
- detr_resnet_v1_50
- dncnn3
- dncnn_color_blind
- efficientdet_lite0
- efficientdet_lite1
- efficientdet_lite2
- efficientformer_l1
- efficientnet_l
- efficientnet_lite0
- efficientnet_lite1
- efficientnet_lite2
- efficientnet_lite3
- efficientnet_lite4
- efficientnet_m
- efficientnet_s
- espcn_x2
- espcn_x3
- espcn_x4
- face_attr_resnet_v1_18
- face_attr_resnet_v1_18_nv12
- face_attr_resnet_v1_18_rgbx
- fast_depth
- fast_sam_s
- fastvit_sa12
- fcn8_resnet_v1_18
- hand_landmark_lite
- hardnet39ds
- hardnet68
- inception_v1
- levit128
- levit192
- levit256
- levit384
- lightface_slim
- lprnet
- lprnet_yuy2
- mobilenet_v1
- mobilenet_v2_1.0
- mobilenet_v2_1.4
- mobilenet_v3
- mspn_regnetx_800mf
- nanodet_repvgg
- nanodet_repvgg_a12
- nanodet_repvgg_a1_640
- osnet_x1_0
- person_attr_resnet_v1_18
- person_attr_resnet_v1_18_nv12
- person_attr_resnet_v1_18_rgbx
- r3d_18
- real_esrgan_x2
- regnetx_1.6gf
- regnetx_800mf
- repghost_1_0x
- repghost_2_0x
- repvgg_a0_person_reid_512
- repvgg_a1
- repvgg_a2
- resmlp12_relu
- resnet_v1_18
- resnet_v1_34
- resnet_v1_50
- resnext26_32x4d
- resnext50_32x4d
- retinaface_mobilenet_v1
- retinaface_mobilenet_v1_rgbx
- scdepthv3
- scrfd_10g
- scrfd_2.5g
- scrfd_500m
- segformer_b0_bn
- squeezenet_v1.1
- ssd_mobilenet_v1
- ssd_mobilenet_v2
- stdc1
- swin_small
- swin_tiny
- tddfa_mobilenet_v1
- tiny_yolov3
- tiny_yolov4
- tiny_yolov4_license_plates
- tiny_yolov4_license_plates_yuy2
- unet_mobilenet_v2
- vit_base
- vit_base_bn
- vit_pose_small
- vit_pose_small_bn
- vit_small
- vit_small_bn
- vit_tiny
- vit_tiny_bn
- yolact_regnetx_1.6gf
- yolact_regnetx_800mf
- yolov10b
- yolov10n
- yolov10s
- yolov10x
- yolov11l
- yolov11m
- yolov11n
- yolov11s
- yolov11x
- yolov3
- yolov3_416
- yolov3_gluon
- yolov3_gluon_416
- yolov4_leaky
- yolov5l_seg
- yolov5m
- yolov5m6_6.1
- yolov5m_6.1
- yolov5m_seg
- yolov5m_vehicles
- yolov5m_vehicles_nv12
- yolov5m_vehicles_yuy2
- yolov5m_wo_spp
- yolov5m_wo_spp_yuy2
- yolov5n_seg
- yolov5s
- yolov5s_bbox_decoding_only
- yolov5s_c3tr
- yolov5s_personface
- yolov5s_personface_nv12
- yolov5s_personface_rgbx
- yolov5s_seg
- yolov5s_wo_spp
- yolov5xs_wo_spp
- yolov5xs_wo_spp_nms_core
- yolov6n
- yolov6n_0.2.1
- yolov6n_0.2.1_nms_core
- yolov7
- yolov7_tiny
- yolov7e6
- yolov8l
- yolov8m
- yolov8m_pose
- yolov8m_seg
- yolov8n
- yolov8n_seg
- yolov8s
- yolov8s_bbox_decoding_only
- yolov8s_pose
- yolov8s_seg
- yolov8x
- yolov9c
- yolox_l_leaky
- yolox_s_leaky
- yolox_s_wide_leaky
- yolox_tiny
- zero_dce
- zero_dce_pp