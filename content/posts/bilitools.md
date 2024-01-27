---
title: BiliTools
url: /posts/bilitools/
date: "2024-01-12 22:55:00+08:00"
author: btjawa
description: bilibili工具箱，视频/番剧+伴音/音乐下载，三种登录方式，仅用作学习用途。
comments: true
categories: [ "Tauri", "Rust", "BiliTools" ]
tags: [ "bilitools","tauri","rust","工具","tool","bilibili" ]
---

![bilitools.png](https://cdn.jsdelivr.net/gh/btjawa/btjawa/assets/bilitools.png)

<a href="https://github.com/btjawa/bilitools" target="_blank"><i class="fa-brands fa-github"></i>&nbsp;Github Repo</a>

# 介绍

基于 [Tauri](https://github.com/tauri-apps/tauri) & [Rust](https://github.com/rust-lang/rust) 实现的 bilibili 第三方轻量工具箱；项目仅作学习用途。

# 功能

## 目前已实现

- 获取大会员/付费资源
- 风控验证 - `WBI / _uuid / buvid3/4 / bili_ticket / 极验行为验证`
- 音视频下载 - `视频 / 合集 / 互动视频 / 课程 / 番剧 (AV + BV + SS + EP)`
    - 画质最高支持：`8K + HDR + 杜比视界`
    - 伴音音质最高支持：`192K + HiRes无损(48kHz) + 杜比全景声(384K)`
    - 帧率最高支持：`120FPS`
    - 编码支持：`AVC (H.264) + HEVC (H.265) + AV1`
    - 互动视频支持：`回溯 / 控制剧情走向 + 下载每一个剧情对应的资源`
- 音乐下载 - `AU`
    - 音质最高支持：`320K + 无损SQ FLAC`
- 弹幕获取 - `实时弹幕 / 历史弹幕(Json)`
- 视频AI总结
- 三种登录方式 + 自动刷新登录状态
    - 扫码登录
    - 密码登录
    - 短信登录: 多国家区号支持

# 更新

应用将在每次启动时自动检查并更新

手动更新可移步 [Releases](https://github.com/btjawa/BiliTools/releases/latest)

# 数据结构

<p>
<a href="https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/grpc_api/bilibili/community/service/dm/v1/dm.proto" target="_blank">
<i class="fa-brands fa-github"></i>&nbsp;来源 - dm.proto</a>
</p>

## DanmakuElem

| 字段名     | 类型           | 描述 |
|------------|----------------|------|
| `id`       | `int64`        | 弹幕dmid |
| `progress` | `int32`        | 弹幕出现位置（单位ms） |
| `mode`     | `int32`        | 弹幕类型（1, 2, 3：普通弹幕；4：底部弹幕；5：顶部弹幕；6：逆向弹幕；7：高级弹幕；8：代码弹幕；9：BAS弹幕（pool必须为2）） |
| `fontsize` | `int32`        | 弹幕字号 |
| `color`    | `uint32`       | 弹幕颜色 |
| `midHash`  | `string`       | 发送者mid hash |
| `content`  | `string`       | 弹幕正文 |
| `ctime`    | `int64`        | 发送时间 |
| `weight`   | `int32`        | 权重，用于屏蔽等级（区间：[1,10]） |
| `action`   | `string`       | 动作 |
| `pool`     | `int32`        | 弹幕池（0：普通池；1：字幕池；2：特殊池（代码/BAS弹幕）） |
| `idStr`    | `string`       | 弹幕dmid str |
| `attr`     | `int32`        | 弹幕属性位（bin求AND）（bit0：保护；bit1：直播；bit2：高赞） |
| `animation`| `string`       | 动画 |
| `colorful` | `DmColorfulType` | 大会员专属颜色 |

# Q&A

1. 为什么应用内登录后，B站后台显示 `设备/平台` 为 `Chrome浏览器` ?
     - 应用会使用User-Agents `Chrome/120.0.0.0 ...` ，即模拟Chrome浏览器进行请求，风控率更低。

2. 为什么下载资源的文件名会有一堆 `_` 而不是原视频名？
     - 应用会将所有对于 `Windows 文件系统` 非法的字符替换为 `_` 下划线字符。
  
# 目前已知BUG

1. 在批量下载时长较长的视频时（例如番剧），有一定概率出现 `aria2c RPC` 接口未响应的情况；
目前尚未排查出出现原因，可临时通过小批量添加长视频下载任务来解决；
在 `%TEMP%` 缓存尚未被清除的情况下，重启应用仍可保留尚未下载完成视频的进度。

2. 在更新队列时，有一定概率出现部分视频下载/合并进度无法更新的情况，表现为进度栏提示 `等待同步`；
计划在未来重写进度以及队列更新的逻辑。