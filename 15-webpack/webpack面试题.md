# webpack面试题总结


> 1.webpack与grunt、gulp的不同？区别？

三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。强调的是自动化流程，模块化不是核心。

webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。webpack加强模块化开发管理，而文件压缩/合并/预处理等功能，是附带功能。

> 2.与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？

webpack rollup parcel

从应用场景上来看：
webpack适用于大型复杂的前端站点构建
rollup适用于基础库的打包，如vue、react
parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果
由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel


> 3.webpack的核心概念

Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。

Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

Loader：模块转换器，用于把模块原内容按照需求转换成新内容。

Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。


> 4.有哪些常见的Loader？他们是解决什么问题的？

file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去

source-map-loader：加载额外的 Source Map 文件，以方便断点调试

image-loader：加载并且压缩图片文件

babel-loader：把 ES6 转换成 ES5

css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

eslint-loader：通过 ESLint 检查 JavaScript 代码

> 5.有哪些常见的Plugin？他们是解决什么问题的？

define-plugin：定义环境变量

commons-chunk-plugin：提取公共代码

uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码

html-webpack-plugin：打包html文件

html-webpack-plugin：添加版权声明