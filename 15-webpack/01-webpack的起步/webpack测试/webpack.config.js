// 1.导入node的path包获取绝对路径，需要npm init
const path = require('path')

module.exports = {
  entry:'./src/main.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  }
}