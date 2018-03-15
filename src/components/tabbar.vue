<template>
    <mt-tabbar v-model="selected" :fixed="true" class="cof_tabbar">
      <mt-tab-item id="外卖">
        <p><i class="fa fa-bitcoin"></i></p>
        外卖
      </mt-tab-item>
      <mt-tab-item id="搜索">
        <p><i class="fa fa-search"></i></p>
        搜索
      </mt-tab-item>
      <mt-tab-item id="订单">
        <p><i class="fa fa-file-text-o"></i></p>
        订单
      </mt-tab-item>
      <mt-tab-item id="我的">
        <p><i class="fa fa-user-o"></i></p>
        我的
      </mt-tab-item>
    </mt-tabbar>
</template>

<script>
export default {
  data () {
    return {
      selected: '外卖'
    }
  }
}
</script>

<style lang="less" scoped>
.cof_tabbar {
  height: 2rem;
}
.mint-tabbar>.mint-tab-item.is-selected {
  background-color: #fff !important;
}
.fa {
  font-size: .8rem; 
}
</style>
