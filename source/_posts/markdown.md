---
title: "Markdown 示例文章"
date: 2024-03-20
author: "btjawa"
plugins:
  - mathjax
category: Markdown
tag: Markdown
---

这是一篇 Markdown 示例文章。其中包含多种 Markdown 元素，例如代码块、引用、列表、表格等常用元素，适合用于 CSS 等渲染测试。

<!-- more -->

# Markdown 示例文章
 
## 排版
 
**粗体** *斜体* 
 
~~这是一段错误的文本。~~
 
引用:
 
> この素晴らしい世界に祝福を！
 
有充列表:
 1. 支持Vim
 2. 支持Emacs
 
无序列表:
 
 - 项目1
 - 项目2
 
 
## 图片与链接
 
图片:
![灵梦](https://upload.thwiki.cc/0/02/%E5%8D%9A%E4%B8%BD%E7%81%B5%E6%A2%A6%EF%BC%88%E5%84%9A%E6%9C%88%E6%8A%84%EF%BC%89.jpg)

链接:
[GitHub](https://github.com)
 
## 标题
 
以下是各级标题, 最多支持5级标题
 
```
# h1
## h2
### h3
#### h4
##### h4
###### h5
```
 
## 代码
 
示例:
 
    function get(key) {
        return m[key];
    }
    
代码高亮示例:
 
``` javascript
/**
* nth element in the fibonacci series.
* @param n >= 0
* @return the nth element, >= 0.
*/
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}
 
document.write(fib(10));
```
 
```python
class Employee:
   empCount = 0
 
   def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1
```
 
## Markdown 扩展
 
Markdown 扩展支持:
 
* 表格
* 定义型列表
* Html 标签
* 脚注
* 目录
* 时序图与流程图
* MathJax 公式
 
## 表格
 
Item     | Value
-------- | ---
Computer | \$1600
Phone    | \$12
Pipe     | \$1
 
可以指定对齐方式, 如Item列左对齐, Value列右对齐, Qty列居中对齐
 
| Item     | Value | Qty   |
| :------- | ----: | :---: |
| Computer | \$1600 |  5    |
| Phone    | \$12   |  12   |
| Pipe     | \$1    |  234  |
 
 
### 定义型列表
 
名词 1
:   定义 1（左侧有一个可见的冒号和四个不可见的空格）
 
代码块 2
:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）
 
        代码块（左侧有八个不可见的空格）
 
### Html 标签
 
支持在 Markdown 语法中嵌套 Html 标签，譬如，你可以用 Html 写一个纵跨两行的表格：
 
    <table>
        <tr>
            <th rowspan="2">值班人员</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
        </tr>
        <tr>
            <td>李强</td>
            <td>张明</td>
            <td>王平</td>
        </tr>
    </table>
 
 
<table>
    <tr>
        <th rowspan="2">值班人员</th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
    </tr>
    <tr>
        <td>李强</td>
        <td>张明</td>
        <td>王平</td>
    </tr>
</table>
 
**提示**, 如果想对图片的宽度和高度进行控制, 你也可以通过img标签, 如:
 
<img src="https://btjawa.top/favicon.ico" width="50px" />
 
## 5.4 MathJax 公式
 
$ 表示行内公式： 
 
质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达。
 
$$ 表示整行公式：
 
$$\sum_{i=1}^n a_i=0$$
 
$$
\mbox{积累因子}=\begin{cases}
1+ni & \mbox{单利}\\\\
(1+i)^n & \mbox{复利}
\end{cases}
$$

$$
\begin{equation}
\sum_{i=0}^n F_i \cdot \phi (H, p_i) - \sum_{i=1}^n a_i \cdot ( \tilde{x_i}, \tilde{y_i}) + b_i \cdot ( \tilde{x_i}^2 , \tilde{y_i}^2 )
\end{equation}
$$
$$
\begin{equation}
\beta^*(D) = \mathop{argmin} \limits_{\beta} \lambda {||\beta||}^2 + \sum_{i=1}^n max(0, 1 - y_i f_{\beta}(x_i))
\end{equation}
$$
 
更复杂的公式:
$$
\begin{eqnarray}
\vec\nabla \times (\vec\nabla f) & = & 0  \cdots\cdots梯度场必是无旋场\\
\vec\nabla \cdot(\vec\nabla \times \vec F) & = & 0\cdots\cdots旋度场必是无散场\\
\vec\nabla \cdot (\vec\nabla f) & = & {\vec\nabla}^2f\\
\vec\nabla \times(\vec\nabla \times \vec F) & = & \vec\nabla(\vec\nabla \cdot \vec F) - {\vec\nabla}^2 \vec F\\
\end{eqnarray}
$$
 
访问 [MathJax](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) 参考更多使用方法。