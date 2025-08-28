---
title: BiliTools
date: "2024-01-12"
updated: "2025-08-26"
author: btjawa
comments: true
pin: true
tags: [ "Tauri","Rust","工具" ]
---

基于 [Tauri v2](https://github.com/tauri-apps/tauri) 构建，支持下载解析哔哩哔哩各类资源，未来还会陆续支持更多功能

<!-- more -->

{% ghcard btjawa/BiliTools %}

{% note link red::
**本文章内容正逐步迁移至 [文档站](https://bilitools.btjawa.top)<br>
[设置](https://bilitools.btjawa.top/help/windows.html)<br>
[常见问题](https://bilitools.btjawa.top/guide/settings.html)<br>
[时间格式](https://bilitools.btjawa.top/guide/settings.html#时间格式)<br>
[关于 DASH / MP4 / FLV](https://bilitools.btjawa.top/guide/stream.html)<br>
<br>
以下内容仅作存档**
%}

**本项目将只在 [Github Releases](https://github.com/btjawa/BiliTools/releases) 以及本文章处提供官方下载链接，不建议使用任何第三方平台提供的版本**

**格式为 `a.b.c-d` （相比正式版本多了 `d` 这个数字）的版本为预发布版本，较不稳定，供尝鲜使用**

**大会员下载仅限本身开通了大会员服务的账号，普通账号无法解析付费、大会员内容**

**[关于声明请参见 README](https://github.com/btjawa/BiliTools?tab=readme-ov-file#%E5%A3%B0%E6%98%8E)**

> 以下内容基于 [BiliTools **`v1.4.0-5`**](https://github.com/btjawa/BiliTools/releases/v1.4.0-5) 撰写

## 安装注意事项

对于 `Windows`，任选 `msi` 或 `exe` 都可以，更推荐后者（`NSIS`）

对于 `macOS`，自 `1.4.0-2` 版本开始不再提供 universal 版本，因此：

- Intel 芯片 请选择带有 `x64` 的 `dmg` 文件
- M 系列芯片 / Apple Sillicon 请选择带有 `aarch64` 的 `dmg` 文件

你可能需要将该软件列入白名单，具体流程参见：[打开来自未知开发者的 Mac App](https://support.apple.com/zh-cn/guide/mac-help/mh40616/mac)

如果无法在应用内添加任务，请尝试在终端使用该命令移除隔离：

```zsh
xattr -dr com.apple.quarantine /Applications/BiliTools.app
```
{% note info blue::
目前已知在部分 `arm64` 平台的 macOS 上，有可能出现 `aria2c` 无权限或 JsonRPC 超时的问题<br>
由于我们无法稳定复现这些问题，因此只能自行尝试关闭防火墙、移除隔离或是手动自签 `BiliTools.app`
%}


## 设置

在左侧侧栏中，点击最下方的齿轮图标即可进入设置页面

{% tabs settings %}

<!-- tab 通用 -->

{% folding open blue::监听剪贴板 %}

*实验性功能*

参见 [#70](https://github.com/btjawa/BiliTools/issues/70)

{% endfolding %}

{% folding open blue::通知系统 %}

若启用，则会在下载完成时发送一条系统通知

{% endfolding %}

{% folding open blue::自动开始下载 %}

若启用，则会在添加任务后自动开始下载

**若禁用，请点击下载页面右侧的按钮开始下载**

{% endfolding %}

{% folding open blue::自动检查更新 %}

除非你想固定该版本，否则请启用以确保可以获得最新的错误、安全性修复

{% endfolding %}

<!-- endtab -->

<!-- tab 存储 -->

{% folding open blue::保存路径 %}

点击显示路径的图标可以更改路径，点击蓝色的文件夹图标可以使用 资源管理器/访达 打开配置的路径

`临时文件` 目录会存储正在处理的文件，待处理完成后被转移到 `输出文件`

在下载清晰度、音质等等质量较好的视频时，`临时文件` 目录可能会占用较多空间，可以考虑更改路径

{% endfolding %}

{% folding open blue::缓存 %}

点击显示该缓存大小 (MB) 的图标可以使用 资源管理器/访达 打开该缓存的目录，点击蓝色扫帚按钮可以清除该缓存

 - 日志

应用运行时所记录的日志，若遇到报错，请在提交 Issue 时将该目录下的 `BiliTools.log` 作为附件上传

 - 临时文件

即上文所提到的 `临时文件` 目录下的 `com.btjawa.bilitools` 目录中的内容

下载完成后会自动清理临时文件，保留手动清理的选项是为了防止有漏网之鱼

{% note radiation yellow::请确保在所有下载任务处理完毕后再进行清理！%}

 - WebView 缓存

`Webview 运行时` 产生的缓存，可以定期清理

 - 数据库

即应用的数据库，包含登录信息、设置内容等等

{% note radiation yellow::删除数据库等同于重置应用，丢失一切设置及下载记录%}

{% endfolding %}

<!-- endtab -->

<!-- tab 下载 -->

{% folding open blue::默认参数 %}

点击 `常规下载` 弹出的窗口中会使用此处的参数帮你提前选好所需的参数

若某资源没有此处配置的参数选项时，将会使用此资源最高可用的参数选项

例：若此处配置了 `1080P 高清`，而资源最高只有 `720P 高清`，则会使用 `720P 高清` 下载

{% note info blue::关于 `流媒体格式`，此处不提供设置，请查看 [#关于 DASH / FLV / MP4](#关于-DASH-FLV-MP4)%}

{% endfolding %}

{% folding open blue::创建 “子文件夹” %}

若启用，则会在下载时为每个任务单独创建子文件夹存放文件，遵循 “子文件夹” 命名格式

若禁用，则不再创建子文件夹，文件将平铺存储于 “顶层文件夹” 内

{% endfolding %}

{% folding open blue::最大并发下载数 %}

控制最大并发处理任务的数量。若该值较高，可能导致风控概率上升

{% endfolding %}

{% folding open blue::网络代理 %}

{% u 暂仅支持 `HTTP(S)` 协议 %}， 未来会尝试支持 `SOCKS` 协议

代理地址的合法格式为 `http(s)://server:port`，可在 `地址` 输入框的下面两个输入框中配置用户名与密码

更改完毕后，部分模块会立即生效，但还是建议重启应用以全局生效

{% endfolding %}

<!-- endtab -->

<!-- tab 高级 -->

{% folding open blue::自动为音频文件嵌入元数据 %}

在下载完成后，使用 `ffmpeg` 为 **音频** 添加 **基本** 元数据

若需更加详细的元数据，请在下载时选中 `NFO 元数据` 中的对应刮削

{% endfolding %}

{% folding open blue::尝试屏蔽 PCDN %}

参见 [#77](https://github.com/btjawa/BiliTools/issues/77)

若启用后下载缓慢甚至无法下载，请禁用该选项后重试

{% endfolding %}

{% folding open blue::转换策略 %}

- 将 XML 弹幕转换为 ASS 字幕
  - 若启用，会使用 [DanmakuFactory](https://github.com/hihkm/DanmakuFactory) 将 XML 弹幕转换为可供播放器使用的 ASS 字幕格式
  - 如果需要下载 XML，请禁用该选项

- 将音频转换为 MP3 格式
  - 若启用，会在下载音频（音视频不受影响）时将文件强制转换为 MP3格式
  - 对于高音质文件，有损失部分音质的可能，因此在不需要 MP3 的情况下，请禁用此选项

{% endfolding %}

<!-- endtab -->

<!-- tab 命名格式 -->

时间格式参见 [时间格式](#时间格式)

默认的文件夹结构为：

```text
输出目录
└── 顶层文件夹
    ├── poster.jpg
    ├── tvshow.nfo
    └── 子文件夹
        ├── 刮削.nfo
        ├── 弹幕.ass
        ├── 弹幕.xml
        ├── 视频.mp4
        └── 文件名
```

此设置可自定义上述结构中对应节点的命名格式

若在 `设置 -> 下载` 中禁用了 `创建 "子文件夹"`，则会将子文件中的内容平铺存放，不再创建子文件夹，效果如下：

```text
输出目录
└── 顶层文件夹
    ├── poster.jpg
    ├── tvshow.nfo
    ├── 刮削.nfo
    ├── 弹幕.ass
    ├── 弹幕.xml
    ├── 视频.mp4
    └── 文件名
```

若设置如下命名格式：

- 顶层文件夹
  - `{container} - {showtitle} ({downtime:YYYY-MM-DD_HH-mm-ss})`
- 子文件夹
  - `({index}) {mediaType} - {title}`
- 文件名
  - `{taskType} - {title}`

效果如下：

```text
输出目录
└── 收藏夹 - 标题 (2020-01-01_00-00-00)
    ├── (1) 视频 - 标题
    │   ├── 单集刮削 - 标题.nfo
    │   ├── 实时弹幕 - 标题.ass
    │   ├── 音视频 - 标题.mp4
    │   └── 字幕 - 标题.zh-CN.xml
    ├── (2) 番剧 - 标题
    ...
```

点击对应变量的按钮即可向输入框中添加对应变量，若手动输入，请注意变量格式为 `{变量}`（两边大括号需闭合）否则变量不会生效

若某资源没有对应的变量（例如视频没有 `EP号` `SS号`），该变量则会留空

对于 `/` `\` `:` `*` `?` `"` `<` `>` `|` 非法字符，会被一律替换为下划线（`_`）

<!-- endtab -->

{% endtabs %}

## 关于 DASH / FLV / MP4

*部分内容摘自 [哔哩哔哩-API收集整理](https://socialsisteryi.github.io/bilibili-API-collect/)*

{% tabs dash-flv-mp4 %}

<!-- tab DASH 格式 -->

{% note info blue::
若无特殊情况，请使用此格式<br>
**不必担心格式问题**
%}

目前哔哩哔哩官方客户端中使用的串流方案，可以获得视频/音频源的最高质量版本

由于此方案中视频、音频是**分开下发**的：

- 下载时若选择 `音视频`，在最后阶段需要调用 ffmpeg 将音频与视频合并为一个完整的音视频
- 下载时若选择 `视频` 或 `音频`，则会直接使用 ffmpeg 处理为标准音频或视频格式

{% link 关于引入DASH技术，提升用户播放体验的说明::https://www.bilibili.com/read/cv949156/::https://www.bilibili.com/favicon.ico %}

<!-- endtab -->

<!-- tab MP4 格式 -->

{% note info blue::
对于 **试看** 番剧、课程、视频等默认只有该格式可以下载<br>
自 **v1.4.0-3** 版本开始，应用会自动尝试选择 `DASH` 或 `MP4`
%}

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

## 关于漫画

[#1168](https://github.com/SocialSisterYi/bilibili-API-collect/issues/1168)

由于様々大家都知道的问题，不再考虑支持漫画下载

## 时间格式

`设置 -> 命名格式` 中的 `{pubtime}` `{downtime}` 变量支持自定义时间格式

目前提供两种格式化方式：

- `{var:<ISO8601>}`
  - 格式需遵循 [ISO8601](https://www.wikiwand.com/en/articles/ISO_8601) 标准

- `{var:ts}`
  - 返回秒级 UNIX 时间戳

| 常见格式 | 预览 |
|---------|------|
| `{downtime:YYYY-MM-DD_HH-mm-ss}` | 2020-01-01_00-00-00 |
| `{downtime:YYYY年MM月DD日}` | 2020年01月01日 |
| `{downtime:YYYY-MM-DD}` | 2020-01-01 |
| `{downtime:HH:mm:ss}` | 00:00:00 |
| `{downtime:ts}` | 1577836800 |


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