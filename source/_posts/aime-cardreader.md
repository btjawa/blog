---
title: 自制 Aime 读卡器
date: "2025-06-02"
updated: "2025-06-16"
author: btjawa
comments: true
tags: [ "中二节奏", "ESP32", "工具" ]
---

*这应该不算教程，只是分享一些思路*

## 前言

之前用 ESP32-S3-DEVKIT 做过中二的 Aime 读卡器，固件是用下面这个项目改的

{% link Sucareto/Arduino-Aime-Reader::https://github.com/Sucareto/Arduino-Aime-Reader::https://github.com/fluidicon.png %}

端午闲来无事，觉得之前做的读卡器体积太大了，决定重新做一版，顺便试试固件自己写

固件已开源

{% link btjawa/ESP32-CardReader::https://github.com/btjawa/ESP32-CardReader::https://github.com/fluidicon.png %}

## 硬件

- Elechouse PN532

NFC 收发模块，用来和卡片交互

- ESP32

主控，这次选择了 [ESP32C3 Supermini](https://www.nologo.tech/product/esp32/esp32c3/esp32c3supermini/esp32C3SuperMini.html)
体积足够小，半孔工艺可以当贴片处理，以及GPIO刚刚好可以用完

- SSD1306

OLED 显示屏，用来显示读卡器模式以及读卡状态

- 若干 WS2812B + 若干开关

开关用来切换模式，WS2812B 装饰

- 接线
{% note warning::`0`, `8`, `20`, `21` 这四个引脚不要接 %}

每个模块按他们的协议接线，PN532 用SPI，SSD1306 用I²C
WS2812B 由于用了级联，所以只需要接第一个LED的DIN
开关接那些下拉不会导致主控出问题的引脚 (例如 `1`, `2`)

- 原理图
{% image /img/posts/aime-cardreader/schematic.png::alt=原理图 %}

PCB 新版全部用了贴片，之前做的的全是插件，PCB 背面不太美观还割手

## 软件

**具体实现可以查看 [src/sega.cpp](https://github.com/btjawa/ESP32-CardReader/blob/main/src/sega.cpp)，这里只大致讲讲处理的逻辑**

用 `PlatformIO` + `arduino` framework
由于 ESP32C3 Supermini 没有串口转USB以及自动下载电路
所以需要手动进入下载模式，用USB CDC上传固件 (实测只有第一次上传需要手动进入下载模式，之后就不用了)

串口交互逻辑来自 [segatools](https://github.com/djhackersdev/segatools) 模拟层
串口波特率需要根据 `segatools.ini -> keychip -> dipsw3` 动态设置
如果是 CVT -> `38400`，否则 `115200`

### 请求帧

游戏默认通过 COM4 与读卡器通信，每次需要让读卡器做些什么时就会发送一个请求帧 (req_frame)
样本：`E0 05 00 02 30 00 37`
- `0xE0` -> 同步字节
- `0x05` -> 帧长度 (包含自身)
- `0x00` -> 地址
- `0x02` -> 序号，代表第 n+1 个请求帧
- `0x30` -> CMD
- `0x00` -> Payload 长度 (不包含自身)
- `....` -> 如果 Payload 长度大于零，这里就会出现与 `Payload 长度` 相同数量的字节 (Payload Body)
- `0x37` -> 校验值，除其自身与同步字节外其他字节的和 (`0x05` + `0x02` + `0x30` = `0x37`)

{% note info blue::
`0xD0` 为转义字节，需要转义，流程为：忽略 `0xD0`，读取下一个字节并 +1<br>
例：`D0 DF`，转义后的字节为：`0xDF` + 1 = 0xE0<br>
如果转义后的字节为 `0xE0`，那么它不应再被视为同步字节
%}

如果直接用 `Windows API` 的话，我们可以读到一个完整的帧 (`IRQ_MJ_WRITE`)
但是 Arduino 不行，所以我们只能按照上述含义用 `Serial.read()` 一个个读

### 处理 CMD

CMD 字节就是这个指令的类型，映射表可以查看 [src/sega.h](https://github.com/btjawa/ESP32-CardReader/blob/main/src/sega.h)

`...?` 即代表不确定

- `0x30` -> 返回固件版本
- `0x32` -> 返回硬件版本
- `0x40` -> 开启射频天线...?
- `0x41` -> 关闭射频天线...?
- `0x42` -> 开始轮询卡片，Mifare 返回 UID 长度与 UID，Felica 返回 IDm, PMm 与各自的长度
{% note warning::
此处注意，因为主线程是**同步**的，所以单次轮询读取的超时时间应该控制在 500ms 以内以防阻塞
%}
- `0x43` -> 根据接收帧的 Payload 选择对应 UID 的 Mifare 卡片
- `0x44` -> 未知
- `0x50` -> Payload 为与 Aime 卡交互所需的 Key，储存
- `0x51` -> 用上述 Aime Key 认证
- `0x52` -> 读取 Mifare Block (一定发生在 Key 验证后)
- `0x54` -> Payload 为与 Bana 卡交互所需的 Key，储存
- `0x55` -> 用上述 Bana Key 认证
- `0x60` -> 进入升级模式...?
- `0x61` -> 发送数据...?
- `0x62` -> 重置设备...?
- `0x71` -> 用 Payload 中提供的命令请求 Felica 卡片，并返回卡片处理的结果
- `0x81` -> 用 Payload 提供的颜色 (三个字节，对应 RGB) 设置 LED 灯
- `0xF5` -> 重置 LED 灯
- `0xF0` -> 返回 LED 灯版本

### 回复帧

处理完请求帧后，我们自然也需要构建回复帧 (res_frame)
这里的样本也对应上述请求帧的样本
样本：`E0 07 00 02 30 00 01 94 ce`
结构基本与请求帧保持一致，只是：
- `CMD` 后新增一个字节，对应响应状态：
{% note info blue::
`0x00` -> 成功<br>
`0x01` -> 失败 (游戏默认会重试，可以善用这个机制)<br>
其他字节意义不明
%}
- 请求帧中的 `Payload 长度`, `Payload Body` 在此处变为返回的 Payload：
上文中提到的 “返回xxx” 就是指填充此处数据，在样本中对应 `0x01`, `0x94`

然后将构建好的回复依次写回串口

## 后记

WS2812B 在级联灯比较少的情况下用 `3.3v` 供电也能跑起来，还挺稳定的，就是不知道寿命了

看着一条条请求帧被正确回复真是有很大的成就感