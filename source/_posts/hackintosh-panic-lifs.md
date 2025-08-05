---
title: 记一次黑苹果崩溃
date: "2024-03-23"
updated: "2025-06-16"
author: btjawa
comments: true
tags: [ "黑苹果" ]
---

记一次黑苹果崩溃 - com.apple.filesystems.lifs

<!-- more -->

## 起因

装好黑苹果突然心血来潮想在上面用水果（因为一帮人吹 macOS 编曲体验很好）

安装激活后挂载 NTFS 盘、搜索路径添加挂载路径

然后点 Find 的时候杯具了，系统卡死，所以只能强制关机再进系统看报错。

（有时也表现为直接黑屏panic，然后自动重启）

## 解决过程

{% image /img/posts/hackintosh-panic-lifs/panic.png::alt=报错信息 %}

从报错来看似乎和 `com.apple.filesystems.lifs(1.0)` 有关

维基此文件系统无果，最后在 苹果开发者论坛 找到了这样一篇帖子：

{% link External drives reported as &quot;lifs&quot;::https://forums.developer.apple.com/forums/thread/712310::https://developer.apple.com/forums/public/assets/favicon.ico %}

问题看起来是外部驱动器的问题

我黑苹果的配置是两块 SSD，第一块装 Windows，然后第二块分一块分区出来装 Hackintosh，所以理所当然为了兼容双系统插件音源什么的都装在 NTFS 下

NTFS 那个分区所在的硬盘尽管是 PCIE 板载，但是因为 macOS 默认只能读而不能写 NTFS 的缘故，估计把它当作外部硬盘了

所以我的切入点就改为了 “让这块 NTFS 可以读写，就不会被认成所谓 lifs 了”

## 解决方案

一开始去必应 NTFS 读写工具，结果一看都是收费的，免费的也不怎么能用的样子

所以只剩两个选择

### 使用市面上已有的一众 NTFS 读写工具

例如：

{% link Paragon NTFS for Mac::https://www.paragon-software.com/home/ntfs-mac::https://www.paragon-software.com/wp-content/themes/paragon_3_test/icons/apple-touch-icon.png %}

{% del 小心不要进到苏州某企业网站 %}

{% link NTFSTool::https://github.com/ntfstool/ntfstool::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}

### 自己写脚本

这里使用 `ntfs-3g`，每次开机运行一下就可以了（脚本调用 sudo，可能会让你输密码）

使用前需要使用 `home-brew` 安装：

```sh
brew tap gromgit/homebrew-fuse
brew install ntfs-3g-mac
```

{% folding open::ntfs.sh %}
``` sh
#!/bin/bash

echo "检测所有NTFS磁盘分区..."

# 查找所有的NTFS磁盘分区
PARTITIONS=$(diskutil list | grep "Microsoft Basic Data" | awk '{print $NF}')

# 第一步：先卸载所有已挂载的NTFS磁盘
for PARTITION in $PARTITIONS; do
    INFO=$(diskutil info $PARTITION)
    DEVICE_NODE=$(echo "$INFO" | grep "Device Node" | awk '{print $NF}')
    if [ ! -z "$(echo "$INFO" | grep "Mount Point")" ]; then
        echo "卸载磁盘: $PARTITION"
        if ! diskutil unmount $DEVICE_NODE; then
            echo "卸载磁盘失败，请检查磁盘是否正在使用或其他问题。"
            exit 1
        fi
    fi
done

# 第二步：再次遍历并挂载每个NTFS磁盘
for PARTITION in $PARTITIONS; do
    INFO=$(diskutil info $PARTITION)
    VOLUME_NAME=$(echo "$INFO" | grep "Volume Name" | awk '{for (i=3; i<=NF; i++) printf $i " "; print ""}')
    VOLUME_NAME="${VOLUME_NAME%"${VOLUME_NAME##*[![:space:]]}"}"  # 去除尾随空格
    DEVICE_NODE=$(echo "$INFO" | grep "Device Node" | awk '{print $NF}')

    # 如果Volume Name为空，使用默认名称
    if [ -z "$VOLUME_NAME" ]; then
        VOLUME_NAME="NTFS Disk"
    fi

    # 生成不重复的挂载点名称
    MOUNT_DIR="/Volumes/$VOLUME_NAME"
    SUFFIX=1
    while [ -e "$MOUNT_DIR" ]; do
        MOUNT_DIR="/Volumes/${VOLUME_NAME} ${SUFFIX}"
        ((SUFFIX++))
    done

    # 使用ntfs-3g挂载磁盘
    echo "使用 ntfs-3g 挂载磁盘: $PARTITION ($DEVICE_NODE) 到 $MOUNT_DIR"
    sudo ntfs-3g $DEVICE_NODE "$MOUNT_DIR"  -o local -o allow_other -o auto_xattr -o auto_cache -o volname="$(basename "$MOUNT_DIR")"
done

echo "所有NTFS磁盘处理完毕。"
```
{% endfolding %}

{% del 感谢 GPT 4.0 支持 %}

## 结语

这个 panic 甚至可以复现：故意在水果里扫没处理过的 NTFS 盘（

我目前在用的 EFI：

{% link btjawa/i513600k-TUF_B660M_WIFI::https://github.com/btjawa/i513600k-TUF_B660M_WIFI::https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/brands/github.svg %}