<!--  -->
<template>
<div>
    <h2>{{message}}</h2>
    <button @click='btnClick'>这是一个按钮</button>
    <h2>{{name}}</h2>
    <!-- 加入引入的组件 -->
    <Cpn/>
  </div>
</template>
    
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Cpn from './Cpn.vue'

export default {
//import引入的组件需要注入到对象中才能使用
name:'App',
data(){
  return {
    message:"hello webpack",
    name:"发子鸡"
  }
},
methods:{
  btnclick(){
    alert("我被点击了");
  }
},
components: {
  // 注册组件
  Cpn
}
}
</script>
<style>
  .title{
    color: green;
  }
</style>