---
title: BiliTools
date: "2024-01-12"
updated: "2025-09-23"
author: btjawa
comments: true
pin: true
tags: [ "Tauri","Rust","工具" ]
---

💡 一个简约、轻量的哔哩哔哩工具箱，基于 [Tauri](https://github.com/tauri-apps/tauri) 构建。

<!-- more -->

{% ghcard btjawa/BiliTools %}

{% note link blue::
本站文档已迁移，请查看 [文档站](https://bilitools.btjawa.top) 或 [GitHub](https://github.com/btjawa/BiliTools/blob/master/docs)<br>
[设置](https://bilitools.btjawa.top/guide/settings.html)<br>
[常见问题](https://bilitools.btjawa.top/help/)<br>
[下载 & 安装](https://bilitools.btjawa.top/guide/install.html)<br>
%} 

{% note quote light::
本项目基于用户账号解析资源，因此你需要订阅大会员、或是购买对应内容后才能解析对应资源<br>
关于声明请参见 [README](https://github.com/btjawa/BiliTools?tab=readme-ov-file#%E5%A3%B0%E6%98%8E)
%}

| 暗色 | 亮色 |
| ---- | ---- |
| ![Dark](https://ghfast.top/https://raw.githubusercontent.com/btjawa/BiliTools/12f9385dcea787a19f78103e77568b522ad34a4c/.github/dark.png) | ![Light](https://ghfast.top/https://raw.githubusercontent.com/btjawa/BiliTools/12f9385dcea787a19f78103e77568b522ad34a4c/.github/light.png) |

## 🧪 支持功能

| 资源     | 状态       | 备注 |
| -------- | ---------- | ---- |
| 视频     | ✅ 已完成 | <ul><li>支持合集 / 分P / 互动、番剧 / 课程 / 电影</li><li>支持 DASH、MP4、FLV</li><li>支持 4K、8K、HDR、杜比视界</li></ul> |
| 音频     | ✅ 已完成 | <ul><li>支持 AVC、HEVC、AV1</li><li>支持 杜比全景声、Hi-Res</li></ul> |
| 实时弹幕 | ✅ 已完成 | <ul><li>ASS / XML 格式</li><li>可解析弹幕池中几乎所有弹幕</li></ul> |
| 历史弹幕 | ✅ 已完成 | ASS / XML 格式 |
| 音乐     | ✅ 已完成 | 支持无损 FLAC、320Kbps 音乐 / 歌单 |
| 封面     | ✅ 已完成 | 支持番剧 / 电影海报 / 合集封面 / 课程预览等等 |
| 字幕     | ✅ 已完成 | SRT 格式 |
| 用户投稿 | ✅ 已完成 | 支持用户投稿视频 / 图文 / 专栏 / 动态 / 音频 |
| 稍后再看 | ✅ 已完成 | 支持列表与单项 |
| 收藏夹   | ✅ 已完成 | 支持任意用户收藏夹 |
| NFO刮削  | ✅ 已完成 | 合集/剧集刮削、单集刮削 |
| 元数据   | ✅ 已完成 | 支持 `ID3v2` / `Vorbis Comments` |
| AI总结   | ✅ 已完成 | Markdown格式，来自哔哩哔哩 `AI 小助手` |

| 账号相关 | 状态       |
| -------- | ---------- |
| 扫码登录 | ✅ 已完成 |
| 密码登录 | ⚠️ 不稳定 |
| 短信登录 | ✅ 已完成 |
| 刷新登录 | ✅ 已完成 |
| 参数签名 | ✅ 已完成 |
| 风控验证 | ✅ 已完成 |
| 指纹验证 | ✅ 已完成 |

| 其他       | 状态       |
| ---------- | ---------- |
| 明暗主题   | ✅ 已完成 |
| 监听剪切板 | ✅ 已完成 |
| HTTP 代理  | ✅ 已完成 |
| 过滤 PCDN  | ✅ 已完成 |
| 音频转 MP3 | ✅ 已完成 |
| 命名格式   | ✅ 已完成 |
| 历史记录   | ✅ 已完成 |

## ✨ 新版本特性

### [1.4.1] - 2025-09-23

### 新增功能

- [`51bb916`](https://github.com/btjawa/BiliTools/commit/51bb916af5262d041e73cfc85beb9d822a5f1729) 支持解析用户投稿视频 ([#175](https://github.com/btjawa/BiliTools/issues/175))
- [`1b5abe8`](https://github.com/btjawa/BiliTools/commit/1b5abe82838d857debba8b73fe7dc4b04ce57a38) 支持解析用户投稿音频 ([#175](https://github.com/btjawa/BiliTools/issues/175))
- [`3816ecf`](https://github.com/btjawa/BiliTools/commit/3816ecf5859e6bc30dab4577185c8eb832a47d62) 支持为音频文件嵌入封面 ([#161](https://github.com/btjawa/BiliTools/issues/161))
- [`84a5209`](https://github.com/btjawa/BiliTools/commit/84a520985464f381c4aa08efb025011e5bc971a0) [`2d2ac88`](https://github.com/btjawa/BiliTools/commit/82d2ac88358fcb092ed4a1457d3765e36ffecbae) 支持重试任务 ([#174](https://github.com/btjawa/BiliTools/issues/174), [#179](https://github.com/btjawa/BiliTools/issues/179))
- [`1f5abc7`](https://github.com/btjawa/BiliTools/commit/1f5abc75c6eeceffad54a237a545f96456a9bfa8) [`6ab9129`](https://github.com/btjawa/BiliTools/commit/6ab91298b5acfbdcabc2dda4f73eb8655711fa46) 支持解析用户投稿图文 & 动态 & 专栏 ([#175](https://github.com/btjawa/BiliTools/issues/175))

### 问题修复

- [`588819b`](https://github.com/btjawa/BiliTools/commit/588819b3b5fa2766f78e49e94eefb57573965c6e) 修复 `dash.audio` 不可遍历的问题 ([#176](https://github.com/btjawa/BiliTools/issues/176))
- [`588819b`](https://github.com/btjawa/BiliTools/commit/588819b3b5fa2766f78e49e94eefb57573965c6e) 修复 Debian 平台依赖过时的问题 ([#177](https://github.com/btjawa/BiliTools/issues/177))
- [`588819b`](https://github.com/btjawa/BiliTools/commit/588819b3b5fa2766f78e49e94eefb57573965c6e) 修复互动视频剧情图分支错误的问题 ([#178](https://github.com/btjawa/BiliTools/issues/178))

## 💫 鸣谢

<a href="https://github.com/btjawa/BiliTools/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=btjawa/BiliTools&max=100" />
</a>

<br>

<a href="https://www.star-history.com/#btjawa/BiliTools&Date" alt="Star History Chart">
<picture>
<source
    media="(prefers-color-scheme: dark)"
    srcset="https://api.star-history.com/svg?repos=btjawa/BiliTools&type=Date&theme=dark"
/>
<source
    media="(prefers-color-scheme: light)"
    srcset="https://api.star-history.com/svg?repos=btjawa/BiliTools&type=Date"
/>
<img
    alt="Star History Chart"
    src="https://api.star-history.com/svg?repos=btjawa/BiliTools&type=Date"
/>
</picture>
</a>