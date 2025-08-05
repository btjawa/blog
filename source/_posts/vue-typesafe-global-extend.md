---
title: Vue 3 + Typescript 拓展全局属性
date: 2025-08-06 07:17:23
updated: "2025-08-06"
author: btjawa
tags: [ "Vue","Typescript" ]
---

众所周知，Vue 是一个极其庞大的框架库

以前我们用下面的语句来拓展全局属性

```ts
declare module '@vue/runtime-core' {}
```

但是这样做会搞坏其他属性的类型，你就能看到一大堆 `does not exist` 了

于是，现在 Vue docs 推荐使用

```ts
declare module 'vue' {}
```

但是这样就会发现拓展的属性没有类型提示（变 `any`）了

经过一系列的网上冲浪，终于在 [pinia](https://github.com/vuejs/pinia) 的类型定义里翻到了下面的这种方法

```ts
declare module 'vue' {
    interface GlobalComponents {}
    interface ComponentCustomProperties {
        // properties here
    }
}

// normally this is only needed in .d.ts files
export {}
```

这样就可以让ts编译器屈服于你了