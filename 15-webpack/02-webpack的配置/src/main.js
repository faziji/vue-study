//2.新建入口js文件main.js 导入mathUtil.js文件，并调用
const { add, mul } = require("./js/mathUtils.js");

console.log(add(10, 20));
console.log(mul(10, 10));

//使用es6语法导入
import { name, age, height } from "./js/info.js";

console.log(name);
console.log(age);
console.log(height);
