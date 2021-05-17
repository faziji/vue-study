<template>
<div id="app">
  <router-link to="/home">首页</router-link> |
  <router-link to="/about">关于</router-link>
  <router-view/>
  <!-- <router-view/>作为占位使用 -->
</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>

</style>
