    有时候需要判断某个css属性是否存在生效

> 可以在需要生效的 css 样式前使用 modernizr 加上一个特定浏览器才生效的辅助类

```
.textshadow p {
    ...
}
```

> 使用 supports 实现浏览器版本回退

```
//只有在text-shadow生效的情况下，h1内部的属性才会生效
@supports (text-shadow(0 0 .3em gay)) {
    h1 {

    }
}
```

---

    modernizr实现

```

```

---

    浏览器可以解析某个css属性，并不代表它已经实现或者正确实现这个属性

---

    当某些值相互依赖的时候，需要用把相互关系关系表现出来，这样需要改动代码的时候，不用改变多处

```
height: 20px;
line-height: 30px;
```

=>

```
height: 20px;
line-height: 1.5;
```

> 使用`em`，继承父级字体大小，或者使用`rem`，继承 html 字体大小

> 能用一个变量表示，尽量使用一个变量表示，需要改动的话，只需要改动一处

```
border-width: 10px 10px 10px 0;
```

```
border-width: 10px;
border-left-width: 0;
```

---

    currentColor

> css 中第一个真正意义上的变量，继承文本的字体颜色

---

    inherit

> 伪元素会继承生成伪元素的宿主元素

> 想要字体大小都一致，可以这样写

```
input, select, button {
    font: inherit;
}
```

---

    相信眼睛，因为有些时候会产生视觉偏差，我们要的是视觉效果，而不是绝对精准

---

    尽量使用简写，因为你需要把默认属性给覆盖（后续工作人员也可能会增加一些功能）

> 中间 /，为了防止歧义

```
background: url(png) no-repeat top right / 2em 2em;
```

---  
    css-- 列表扩散  如果只为某个属性提供一个值，那它会扩散并应用到列表中的每一项  
> 简化了代码，方便之后改动
```
background: url(tr.png) top right,url(tr.png) top right,url(tr.png) top right;
background-repeat: no-repeat;
```

---

    var 可以使用定义css中定义的变量

> var(--a, --b, --c); a 失效后会向后延伸

---

    column-width 文字列宽，会自动计算高度

---

    background-clip 背景色的延伸范围

---

    box-shadow,多重边框

> 可以使用 box-shadow 来绘制外边框，它支持通过`,`来建立多个阴影，但阴影不会响应鼠标事件，可以使用 insert 来让阴影显现在内部，此时需要设置足够宽度

> 投影并不会影响布局，不受box-sizing控制，可以通过margin和padding来控制

`box-shadow: 0 0 0 10px #655 inset, 0 0 0 15px deeppink inset;`

> 双重边框可以使用 outline 和 border

> outline 也不会触发 dom 事件，可以设置成虚线，可以通过 outline-offset 控制描边距元素的距离

```
border: 10px solid #655;
outline: 5px solid deeppink;
```

---

    背景色会延伸到border上，可以通过background-clip: padding-box来设置

---

    background-position来控制背景图片的距离，不兼容的浏览器可以使用简写覆盖

```
background: url() no-repeat bottom right #58a;
backgeound-position: right 20px bottom 10px;
```

> 可以通过 background-origin 直接让背景图片的距离是 padding 的距离  
> `background-origin: content-box;`

> 但如果你还想要再偏移一点距离，只能使用第一种方法

> calc()方法

---

    外部直角，内部圆角的方案

```
.wrapper {
    background: #655;
    padding: .8em;
}
    .wrapper > div {
    background: tan;
    border-radius: .8em;
    padding: 1em;
}
```

> 一个元素

```
div {
    background: tan;
    border-radius: .8em;
    padding: 1em;
    box-shadow: 0 0 0 .6em #655; //填满圆角空隙
    outline: .6em solid #655;
}
```

---

    border-radius 可以设置四边的值，也可以设置成百分比

---

    当你想变形一个元素，但不改变元素内的内容，可以使用伪元素，伪元素z-index设为-1

> 包裹两层，分别采用相反的样式变换

---

    将图片做成菱形

> width 是相对于左上角进行定位的，如果只使用 max-width，需要通过 padding 来定位，可以直接使用 scale，因为它默认是从中心点进行缩放

```
div {
    width: 500px;
    height: 500px;
    transform: rotate(45deg);
    margin: 300px auto;
    overflow: hidden;
}
    img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
    background-size: cover;
}
<div>
    <img src="../../Pictures/p1.jpg" />
</div>
```

> 采用 clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%) 还可以做出动画效果

---

    回退机制很重要

---

    裁剪一角

```
div {
    width: 500px;
    padding: 30px;
    background: #58a;
    background: linear-gradient(-45deg, transparent 15px, #58a 0);
}
```

> 裁剪两角
> `background: linear-gradient(-45deg, transparent 15px, #58a) right,linear-gradient(45deg, transparent 15px, #58a 0) left;` 会相互覆盖

```
div {
    width: 500px;
    padding: 30px;
    background: #58a;
    background: linear-gradient(-45deg, transparent 15px, #58a 0) right,
        linear-gradient(45deg, transparent 15px, #655 0) left;
    background-size: 50% 100%;
    background-repeat: no-repeat;
}
```

> 如果想要圆角，将 linear-gradient 改成 radial-gradient

---
    适应颜色变化的渐变色   
> 把半透明的白色或者黑色，叠加在主色调上
`background: #58a linear-gradient(hsla(0,0%,100%,.2), transparent);`  

---

    媒体查询需要你的css原本就是弹性可伸缩的，这样你只需要添加很少一部分媒体查询，否则大量的媒体查询会给你后期的维护造成很大困扰  
--- 

    css自带的特性比预处理器提供的强大许多，因为css拿到某个值，不必等到页面渲染后，就比如百分比值，预处理器在渲染前是不知道它具体的数值的
```
ul {
    --accent-color: purple;
}
li {
    --accent-color: rebeccapurple;
}
li {
    color: var(--accent-color);
}
```

---  

    背景色会扩散到整个容器，使用background-clip来控制背景色位置  

---  

