<template>
  <div>
    <mt-header :title="msite_address" class="cof-header">
      <router-link to="/" slot="left">
        <mt-button icon="search">&nbsp;</mt-button>
      </router-link>
      <mt-button class="cof_changeCity" slot="right">登录|注册</mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msite_address: ''
    }
  },
  created: function () {
    console.log(this.$route);
  }
}
</script>

