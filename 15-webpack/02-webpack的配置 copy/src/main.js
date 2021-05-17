//1.使用commonjs的模块化规范
const { add, mul } = require("./js/mathUtils.js");

console.log(add(10, 20));
console.log(mul(10, 10));

//2.使用es6语法导入
import { name, age, height } from "./js/info.js";

console.log(name);
console.log(age);
console.log(height);

// 3.依赖css文件：不需要写变量（因为后面不需要使用）
require("./css/normal.css");

// 4.依赖less文件，不需要写变量
require("./css/special.less");

// 5.向页面写入一些内容
document.writeln("hello,zzzz!");
document.writeln("fafafafa");


//6.使用vue开发
import Vue from 'vue'

import App from './vue/App.vue'
new Vue({
  el: "#app",
  template:'<App/>',
  components:{
    App
  }
})


