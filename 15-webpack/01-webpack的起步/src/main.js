//2.新建入口js文件main.js 导入mathUtil.js文件，并调用
const { add, mul } = require("./mathUtils.js");
/* 
require的使用非常简单，它相当于module.exports的传送门，module.exports后面的内容是什么，require的结果就是什么，
对象、数字、字符串、函数……再把require的结果赋值给某个变量，相当于把require和module.exports进行平行空间的位置重叠
*/

console.log(add(10, 20));
console.log(mul(10, 10));

//使用es6语法导入
import info from "./info.js";

console.log(info.name);
console.log(info.age);
