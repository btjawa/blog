---
title: BiliTools
date: "2024-01-12"
author: btjawa
comments: true
pin: true
categories: [ "Tauri", "Rust" ]
tags: [ "Tauri","Rust","工具" ]
---

bilibili工具箱，视频/番剧+伴音/音乐下载，三种登录方式，仅用作学习用途。

<!-- more -->

![bilitools.png](https://cdn.jsdelivr.net/gh/btjawa/btjawa/assets/bilitools.png)

{% link Github Repo::https://github.com/btjawa/bilitools::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

## 介绍

基于 [Tauri](https://github.com/tauri-apps/tauri) & [Rust](https://github.com/rust-lang/rust) 实现的 bilibili 第三方轻量工具箱；项目仅作学习用途。

## 功能

- 获取大会员/付费资源
- 风控验证 - `WBI / _uuid / buvid3/4 / bili_ticket / 极验行为验证`
- 多线程下载 / 断点续传 - `aria2`
- 音视频下载 - `视频 / 合集 / 互动视频 / 课程 / 番剧 (AV + BV + SS + EP)`
    - 画质最高支持：`8K + HDR + 杜比视界`
    - 伴音音质最高支持：`192K + HiRes无损(48kHz) + 杜比全景声(384K)`
    - 帧率最高支持：`120FPS`
    - 编码支持：`AVC (H.264) + HEVC (H.265) + AV1`
    - 互动视频支持：`回溯 / 控制剧情图 + 下载剧情分P`
    - 支持 FLV 下载
- 音乐下载 - `AU`
    - 音质最高支持：`320K + 无损SQ FLAC`
- 弹幕获取 - `XML+ASS: 实时弹幕 / 历史弹幕`
- 视频AI总结
- 三种登录方式 + 自动刷新登录状态
    - 扫码登录
    - 密码登录
    - 短信登录: 多国家区号支持

## 更新

应用将在每次启动时自动检查并更新

手动更新可移步 [Releases](https://github.com/btjawa/BiliTools/releases/latest)

## 感谢

{% link 哔哩哔哩-API收集整理::https://github.com/SocialSisterYi/bilibili-API-collect::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

{% link FFmpeg::https://github.com/FFmpeg/FFmpeg::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

{% link aria2::https://github.com/aria2/aria2::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

{% link DanmakuFactory::https://github.com/hihkm/DanmakuFactory::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

## 文档

以下内容基于 <a href="https://github.com/btjawa/BiliTools/releases/tag/v1.1.2" target="_blank"><i class="fa-brands fa-github"></i>&nbsp;BiliTools v1.1.2</a> 撰写。

### 设置项

`存储目录` - 下载完成的资源将会存放至存储目录。

`临时文件目录` - 下载中、未下载完成的资源将会存放至临时文件目录。一般情况下**不建议**修改。

`最大并发下载数` - 最大并发下载数决定可以同时下载多少资源。更改将在重启应用或重启aria2c后生效。

{% note warning radiation ::

以下操作均会使 **下载中、未下载完成的资源进度丢失，需要重新下载。**
<br>
已下载完成的资源不受影响。仅建议在 **所有资源下载完成时** 操作。

 %}

`临时文件` - 清理临时文件不会影响**正常使用**。

`aria2c相关` - 重启aria2c会使 **当前所有下载任务中断，且不可恢复。**
仅建议在 **aria2c卡死、欲使最大并发下载数生效时** 重启。

可以将重启前后 `aria2c` 的 `PID` 进行对比以确认是否重启成功。

## Q&A

### 为什么应用内登录后，B站后台显示 `设备/平台` 为 `Chrome浏览器` ?

应用会使用User-Agents `Chrome/120.0.0.0 ...` ，即模拟Chrome浏览器进行请求，风控率更低。

### 为什么下载资源的文件名会有一堆 `_` 而不是原视频名？

应用会将所有对于 `Windows 文件系统` 非法的字符替换为 `_` 下划线字符。

### 我需要通过代理服务器获取资源，如何配置？

目前应用核心(Tauri Core)并未提供相关网络接口，但在每次 `应用启动` 时，应用默认会尝试使用 `系统代理` 。
    若发现未生效的话，可尝试使用代理软件的 `TUN 模式` 。
  
## 目前已知BUG

1. 在批量下载时长较长的视频时（例如番剧），有一定概率出现 `aria2c RPC` 接口未响应的情况；
目前尚未排查出出现原因，可临时通过小批量添加长视频下载任务来解决；
在 `%TEMP%` 缓存尚未被清除的情况下，重启应用仍可保留尚未下载完成视频的进度。

2. 在更新队列时，有一定概率出现部分视频下载/合并进度无法更新的情况，表现为进度栏提示 `等待同步`；
计划在未来重写进度以及队列更新的逻辑。