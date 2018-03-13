<template>
  <mt-header class="cof_header">
    <mt-button to="/" slot="left" @click.native="reload">coffee</mt-button>
    <mt-button slot="right" @click.native="login">登录|注册</mt-button>
  </mt-header>
</template>

<script>
import bus from './../config/Bus.js'
export default {
  // name: 'coffee-header'
  methods: {
    reload () {
      bus.$emit('reload')
    },
    login () {
      // 跳转到登录注册页面
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

