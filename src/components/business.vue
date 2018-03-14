<template>
  <router-link class="cof_business_link" :to="{name: 'shop'}">
    <section class="cof_business_wraper clear">
      <div class="cof_business_img left">
        <img :src="business_imgpath">
      </div>
      <div class="cof_business_info">
        <h4>
          <span class="cof_business_logo">品牌</span>
          <span class="cof_business_name">{{data.name}}</span>
          <span class="cof_business_icon right">
            <span v-for="(item, index) in data.supports" :key="index">{{item.icon_name}}</span>
          </span>
        </h4>
        <star class="cof_business_star" :orderLeadTime="data.order_lead_time" :distance="data.distance" :rating="data.rating" :id="data.id" :num="data.recent_order_num" :sendCost="data.piecewise_agent_fee.tips"></star>
      </div>
    </section>
  </router-link>
</template>

<script>
import star from './star.vue'
export default {
  data () {
    return {
      business_imgpath: ''
    }
  },
  components: {star},
  props: ['data'],
  created: function () {
    console.log(this.data)
    this.business_imgpath = 'http://cangdu.org:8001/img/' + this.data.image_path
  }
}
</script>

<style lang="less" scoped>
.cof_business_link {
  color: #333;
  height: 3.4rem;
  display: block;
  border-bottom: .05rem solid #ccc;
  padding: .25rem 0;
  &:last-child {
    border-bottom: none;
  }
  .cof_business_wraper {
    height: 3.15rem;
    padding: .25rem .5rem;
    .cof_business_img {
      height: 100%;
      img {
        height: 100%;
        width: 3.15rem;
        vertical-align: middle;
      }
    }
    .cof_business_info {
      height: 100%;
      font-size: .6rem;
      padding-left: 3.4rem;
      .cof_business_logo {
        padding: 0 .1rem;
        border-radius: .1rem;
        background-color: #ffd930;
      }
      .cof_business_name {
        font-weight: bold;
      }
      .cof_business_icon {
        color: #666;
      }
      .cof_business_star {
        margin-top: .25rem;
      }
    }
  }
}
</style>
