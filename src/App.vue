<template>
  <div id="app">
    <transition name="route-animate" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="route-animate" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './style/common.less';
.route-animate-enter-active, 
.route-animate-leave-active {
  opacity: 1;
  transition: opacity .2s ease-in;
}
.route-animate-enter,
.route-animate-leave-to {
  opacity: 0;
}

</style>
