---
title: BiliTools
date: "2024-01-12"
author: btjawa
comments: true
pin: true
categories: [ "Tauri", "Rust" ]
tags: [ "Tauri","Rust","工具" ]
---

基于 [Tauri v2](https://github.com/tauri-apps/tauri) 构建，支持下载解析哔哩哔哩各类资源，未来还会陆续支持更多功能

<!-- more -->

项目地址：[GitHub](https://github.com/btjawa/BiliTools)

国内用户最新版本的加速下载链接：
 - [MacOS](https://ghproxy.net/https://github.com/btjawa/BiliTools/releases/download/v1.3.7/BiliTools_1.3.7_universal.dmg)
 - [Windows NSIS](https://ghproxy.net/https://github.com/btjawa/BiliTools/releases/download/v1.3.7/BiliTools_1.3.7_x64-setup.exe)
 - [Windows MSI](https://ghproxy.net/https://github.com/btjawa/BiliTools/releases/download/v1.3.7/BiliTools_1.3.7_x64_zh-CN.msi)

以下内容基于 [BiliTools v1.3.7](https://github.com/btjawa/BiliTools/releases/v1.3.7) 撰写

**格式为 `a.b.c-d` （相比正式版本多了 `d` 这个数字）的版本为预发布版本，较不稳定，供尝鲜使用**

**由于每个人网络环境不同，检查更新可能报错或超时，因此请检查 [GitHub Release](https://github.com/btjawa/BiliTools/releases) 来确保获得最新更新**

**大会员下载仅限本身开通了大会员服务的账号，普通账号无法解析付费、大会员内容**

## 设置

在左侧侧栏中，点击最下方的齿轮图标即可进入设置页面

{% tabs settings %}

<!-- tab 存储 -->

{% folding open blue::保存路径 %}

点击左侧的按钮可以更改路径，点击右侧的按钮可以使用资源管理器（下为访达）打开配置的路径

下载文件的逻辑为：

{% timeline %}

{% timenode 第 1/3 步 %}

使用 `aria2c` 从哔哩哔哩服务器开始接收数据，存储至 `临时文件` 目录


{% endtimenode %}

{% timenode 第 2/3 步 %}

如果选择下载 `音视频`，则会继续下载音频或视频，否则等待下一步

{% endtimenode %}

{% timenode 第 3/3 步 %}

将 `临时文件夹` 中处理完成的文件转移至 `下载文件` 目录，并按 `设置 -> 高级 -> 命名格式` 配置的格式更名

{% endtimenode %}

{% endtimeline %}

在下载清晰度、音质等等质量较好的视频时，`临时文件` 目录可能会占用较多空间，可以考虑更改至其他磁盘（卷）

{% endfolding %}

{% folding open blue::缓存 %}

点击左侧的按钮可以使用资源管理器（访达）打开配置的路径，点击右侧按钮可以清除该缓存

 - 日志

应用运行时所记录的日志，若遇到报错，可以在提交 Issue 时将该目录下的 `BiliTools.log` 作为附件上传

 - 临时文件

即上文所提到的 `临时文件` 目录下的 `com.btjawa.bilitools` 目录 中的内容

下载完成后会自动清理临时文件，保留手动清理的选项是为了防止有漏网之鱼

{% u 请确保在所有文件下载完毕后再进行清理！ %}

- WebView

应用前端运行时产生的缓存，可能较大，可以不定期清理

 - 应用数据库

即应用的数据库，包含登录信息、设置内容等等

{% note radiation yellow::**删除应用数据库等同于重置应用，丢失一切设置及下载记录**%}

{% endfolding %}

<!-- endtab -->

<!-- tab 下载 -->

{% folding open blue::默认参数 %}

点击 `常规下载` 弹出的窗口中会使用此处的参数帮你提前选好所需的参数

点击 `打包下载` 后，由于布局问题不便再提供参数选择区域，因此若选择了音频、视频、音视频，则会直接使用此处的参数下载

若某资源没有此处配置的参数选项时，将会使用此资源最高可用的参数选项

例：若此处配置了 `1080P 高清`，而资源最高只有 `720P 高清`，则会使用 `720P 高清` 下载

{% note info blue::关于 `流媒体格式`，此处不提供设置，请查看 [#关于 DASH / FLV / MP4](#关于-DASH-FLV-MP4)%}

- 同时下载数
  - `aria2c` 下载资源时同时下载文件的数量
  - 同时也决定多选下载节流机制 **每一轮** 添加多少任务

{% endfolding %}

{% folding open blue::网络代理 %}

{% u 暂仅支持 `HTTP(S)` 协议 %}， 未来会尝试支持 `SOCKS` 协议

代理地址的合法格式为 `http(s)://server:port`，可在 `地址` 输入框的下面两个输入框中配置用户名与密码

更改完毕后，部分模块会立即生效，但还是建议重启应用以全局生效

{% endfolding %}

<!-- endtab -->

<!-- tab 高级 -->

{% folding open blue::优先使用 ProtoBuf 方式下载弹幕 %}

哔哩哔哩目前提供两种接口来获取弹幕，一种为 `ProtoBuf` 协议格式，一种为 `XML` 格式

只有 `实时弹幕` 依然可以使用 `XML` 格式，其他弹幕只可以通过 `ProtoBuf` 获得数据

这两种格式的区别是
- `XML` 在哔哩哔哩服务端就已经做好了相应的筛选，比较贴近实际观看时的弹幕数量
- `ProtoBuf` 可以获得弹幕池中几乎所有弹幕，可以体验番剧弹幕密集到几乎看不见画面的效果

个人建议只是下载弹幕搭配例如 `PotPlayer` 的播放器离线观看时，可以使用 `XML`（即将该配置选项关闭启用）

若是备份弹幕、拍摄快照等等的话，可以使用 `Protobuf`（即将该配置选项打开启用）

*在未来的某一天也许实时弹幕的XML也会被下架*

{% endfolding %}

{% folding open blue::添加媒体元数据 %}

在下载完成后，使用 `ffmpeg` 为媒体资源添加元数据

目前支持 封面、标题、简介、UP主、上传时间、TAGS

~*若需更加详细的元数据，请使用 `NFO`（在 `打包下载` 中，选中 `NFO`）*~

*NFO 刮削数据当前版本 (v1.3.7) 尚未实现*

{% endfolding %}

{% folding open blue::命名格式 %}

`文件名格式` 对应下载的文件如何命名，`文件夹名格式` 对应下载自动创建的文件夹如何命名

点击对应变量的按钮即可向输入框中添加对应变量，若手动输入，请注意变量格式为 `{变量}`（两边大括号需闭合）否则变量不会生效

建议在多个变量间添加分割符，例：`{index}_{title}_av{aid}_{bvid}_{ts_sec}`

若某资源没有对应的变量（例如常规视频没有 `EP号` `SS号`），则会使用 `-1` 代替

{% endfolding %}

<!-- endtab -->

<!-- tab 关于 -->

{% folding open blue::更新 %}

在此处可以配置更新行为，`自动检查` 开关可以配置每次启动应用时是否自动检测更新

{% note info blue::不建议关闭，也许会错过某些重大BUG以及安全更新 %}

`检查更新` 按钮可以立即检查更新

{% endfolding %}

<!-- endtab -->

{% endtabs %}

## 下载相关

### 关于 DASH / FLV / MP4

*部分内容摘自 [哔哩哔哩-API收集整理](https://socialsisteryi.github.io/bilibili-API-collect/)*

{% tabs dash-flv-mp4 %}

<!-- tab DASH 格式 -->

{% note info blue::
若无特殊情况，请使用此格式<br>
**不必担心格式问题**
%}

目前哔哩哔哩官方客户端中使用的串流方案，可以获得视频/音频源的最高质量版本

由于此方案中视频、音频是**分开下发**的 ——

- 下载时若选择 `下载音视频`，在最后阶段需要调用 ffmpeg 将音频与视频合并为一个完整的音视频
- 下载时若选择 `下载视频` 或 `下载音频`，则会直接使用 ffmpeg 处理为标准音频或视频格式

{% link 关于引入DASH技术，提升用户播放体验的说明::https://www.bilibili.com/read/cv949156/::https://www.bilibili.com/favicon.ico %}

<!-- endtab -->

<!-- tab MP4 格式 -->

{% note warning yellow::
此处介绍的是 **已不被官方支持** 的格式<br>
保留该选项仅用于存档，部分资源可能仍可下载
%}

可以直接获得同时有音频流与视频流的 MP4 格式视频

但哔哩哔哩在2018年后开始逐步迁移至 DASH 方案，因此现在该方案获得的视频分辨率较低

且部分视频很可能已经无法实际下载（即使应用内选择页面依然有对应选项）

<!-- endtab -->

<!-- tab FLV 格式 -->

{% note warning yellow::
此处介绍的是 **已不被官方支持** 的格式<br>
保留该选项仅用于存档，部分资源可能仍可下载
%}

采用 FLV 分段格式，早年使用的格式

<!-- endtab -->

{% endtabs %}

### 关于漫画

[#1168](https://github.com/SocialSisterYi/bilibili-API-collect/issues/1168)

## 登录相关

当前的登录成功率为 扫码登录 > 短信登录 > 密码登录

已知 `+1` 手机号无法登录 *（哔哩哔哩官网也无法用  `+1` 手机号登录）*

应用所有请求都基于哔哩哔哩的 Web API，也就是模拟 Chrome 浏览器来请求哔哩哔哩

登录过程也是如此，哔哩哔哩会分析请求的指纹来判断登录设备

但毕竟是**模拟**浏览器，登录操作通知中出现 `未知设备` 也在所难免

## 风控相关

{% note::
大部分被风控的情况一般都是请求过快、频繁切换IP或是IP质量不高导致的，一般用户其实很难遇到账号被风控的情况<br>
我测试时遇到的风控情况一般都是请求太快了，以及开发过程中测试参数有错误导致的
%}

由于相关请求的方式都是手动抓包获得、社区讨论出来的，所以有些请求也许鉴权参数不够，导致哔哩哔哩认为账号有风险

这些问题无法彻底解决，尽量会在未来的更新中优化

遇到这种情况请写 `Issue` 告诉我，尽量说明做了什么操作疑似触发的风控

解决方案有下面几种

 - 在应用内退出登录，在浏览器（或哔哩哔哩客户端）中退出登录，并清除相关 Cookie 与缓存，稍等几分钟后重新登录
 - 若是无法使用大会员，请查看哔哩哔哩客户端大会员页面，如果提示大会员权益已被限制可按照提示解除风控
 - 尽量不要过快的做一些操作
 - 等待 5~15 分钟

## Linux 支持

其实这个项目是有对 Linux 的各常见发行版的支持的（`src-tauri/tauri.linux.conf.json`）

但是 AppImage 的打包配置比较麻烦，所以我就没有在 Release 里加 Linux 相关的包或者镜像

可以自行克隆项目，参考 [#开发 / 构建](https://github.com/btjawa/BiliTools?tab=readme-ov-file#%E5%BC%80%E5%8F%91--%E6%9E%84%E5%BB%BA) 使用

## 声明

[参见 README](https://github.com/btjawa/BiliTools?tab=readme-ov-file#%E5%A3%B0%E6%98%8E)