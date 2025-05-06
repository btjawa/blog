---
title: Rust 下实现自动清理子进程
date: 2024-03-27 02:15:16
author: btjawa
categories: [ "Tauri", "Rust" ]
tags: [ "Tauri","Rust" ]
---

Rust 下通过配置 Job Object 实现在主进程退出时自动清理创建的子进程

<!-- more -->

之前写 Tauri 应用（没错就是[BiliTools](https://github.com/btjawa/bilitools)）时，需要在后台挂个 aria2c 实现多线程下载

然后发现很尴尬这玩意不会跟着应用退出而退出（理所当然）

本来想的是写一个结构体，存 Child，然后监听窗口关闭事件 `tauri::WindowEvent::Destroyed`，调用函数把进程杀了

这种方法能用是能用吧，但是如果 Panic，非正常关闭，应用更新什么的就会比较麻烦

不如找个一劳永逸的方法，就不用到处设 hook 监听退出了

## 方案一

这种方法 macOS / 其他Linux发行版 / Windows 都适用

就是运行一个监控脚本，传递主进程 PID 和子进程 PID

脚本定期检查主进程是否退出，一旦退出就杀掉指定子进程

这种方法的坏处就是需要在每个运行子进程的地方都设置一个监控

### Windows

```powershell
param($a,$b)

while ((Get-Process -Id $a -ErrorAction SilentlyContinue) -ne $null) \
{{ Start-Sleep -Milliseconds 500 }}; Stop-Process -Id $b -Force
```

实践：

```rust main.rs
use std::process::{Command, self};

fn main() -> Result<(), Box<dyn std::error::Error>>  {
    let child = Command::new("aria2c").spawn()?;
    let child_id = child.id();
    let main_id = process::id();

    Command::new("powershell.exe")
        .arg("-Command")
        .arg(format!(
            "while ((Get-Process -Id {} -ErrorAction SilentlyContinue) -ne $null) \
            {{ Start-Sleep -Milliseconds 500 }}; Stop-Process -Id {} -Force", 
            main_id, child_id))
        .spawn()?;

    Ok(())
}
```

### macOS / 其他Linux发行版

```sh
while kill -0 $1 2>/dev/null; do sleep 0.5; done; kill $2
```

实践：

```rust main.rs
use std::process::{Command, self};

fn main() -> Result<(), Box<dyn std::error::Error>>  {
    let child = Command::new("aria2c").spawn()?;
    let child_id = child.id();
    let main_id = process::id();

    Command::new("/bin/bash")
        .arg("-c")
        .arg(format!(
            "while kill -0 {} 2>/dev/null; do sleep 0.5; done; kill {}", // do sleep 后跟着的就是定期检查的间隔时间
            main_id, child_id))
        .spawn()?;

    Ok(())
}
```

## 方案二（仅适用 Windows）

WinAPI 下有个叫 `Job Object / 作业对象` 的东西，可以关联进程，从而实现退出时终止与作业关联的所有进程

{% link Job Objects - Win32 apps | Microsoft Learn::https://learn.microsoft.com/en-us/windows/win32/procthread/job-objects::https://learn.microsoft.com/favicon.ico %}

Rust 中有两种方式实现它：
 - [Crate winapi](https://crates.io/crates/winapi) 自己用 winapi 写，工程量比较大
 - [Crate win32job](https://github.com/ohadravid/win32job-rs) GitHub 上有人封装了作业对象的 api，可以直接用

下面是 `win32job` 的示例

```rust main.rs
use win32job::Job;
use std::process::Command;

fn main() -> Result<(), Box<dyn std::error::Error>>  {
    let job = Job::create()?;
    let mut info = job.query_extended_limit_info()?;
    info.limit_kill_on_job_close(); // 确保当 Job Object 的句柄被关闭时，所有关联的进程都会被终止
    job.set_extended_limit_info(&mut info)?;
    job.assign_current_process()?; // 让 Job Object 关联进程

    Command::new("aria2c.exe").spawn()?;

    // job 被 drop 或者主进程退出时，aria2c 就会被杀死
    
    Ok(())
}
```