# front

## 记录下平时看到的好文章和遇到的问题

### IntersectionObserver

主要用于控制浏览器上的 DOM，监听浏览器某个区域，DOM 进入或者离开会触发相应的回调

> 浏览器实验中的 API，目前除了 IE，其余浏览器均能实现  
> [链接](https://juejin.im/post/5d11ced1f265da1b7004b6f7)

---

### package.json 中 browser，module，main 字段优先级

- 如果 npm 包导出的是 ESM 规范的包，使用 module
- 如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser。
- 如果 npm 包只在 server 端使用，使用 main
- 如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main
- 其他更加复杂的情况，如npm 包需要提供 commonJS 与 ESM 等多个规范的代码文件，请参考上述使用场景或流程图

[链接](https://github.com/SunshowerC/blog/issues/8)
