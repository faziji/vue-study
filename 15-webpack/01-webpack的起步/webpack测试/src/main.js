// 新建入口js文件main.js 导入mathUtils.js文件
const {add,mul} = require('./mathUtils.js')

console.log(add(10,20));
console.log(mul(10,20));

// 使用es6语法导入
import info from './info.js'

console.log(info.name);
console.log(info.age);