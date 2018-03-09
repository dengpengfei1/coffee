<template>
  <div class="cof_home">
    <mt-header class="cof_header">
      <mt-button to="/" slot="left" @click.native="reload">coffee</mt-button>
      <mt-button slot="right" @click.native="login">登录|注册</mt-button>
    </mt-header>
    <section class="cof_hot_city">
      <ul>
        <li></li>
      </ul>
    </section>
  </div>  
</template>

<script>
import {http} from './../../config/http.js'
export default {
  data: function () {
    return {
      
    }
  },
  mounted: function () {
    http({
      method: 'get',
      url: '/v1/cities',
      params: {
        'type': 'group'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    reload () {
      window.location.reload()
    },
    login () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cof_home {
  .ele_header {
    color: #fff;
  }
  .cof_hot_city {
    margin-top: .5rem /* 10/20 */;
  }
}
</style>
