<template>
  <div>
    <mt-header :title="msite_address" class="cof-header">
      <router-link :to="{name: 'searchGeohash'}" slot="left">
        <mt-button icon="search">&nbsp;</mt-button>
      </router-link>
      <mt-button slot="right">登录|注册</mt-button>
    </mt-header>
    <!-- 视频分类列表 -->
    <nav class="cof_category_list">
      <div v-if="msite_category.length">
        <swiper :options="swiperOption">
          <swiper-slide>
            <router-link v-if="index < 8" v-for="(item, index) in msite_category" :key="index" class="cof_category_item" :to="{name: 'food'}">
              <figure>
                <img :src="imgBaseUrl + item.image_url" alt="item.description">
                <figcaption>{{item.title}}</figcaption>
              </figure>
            </router-link>
          </swiper-slide>
          <swiper-slide>
            <router-link v-if="index >= 8" v-for="(item, index) in msite_category" :key="index" class="cof_category_item" :to="{name: 'food'}">
              <figure>
                <img :src="imgBaseUrl + item.image_url" alt="item.description">
                <figcaption>{{item.title}}</figcaption>
              </figure>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </nav>
    <!-- 附近店家 -->
    <section class="cof_near_food" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :infinite-scroll-immediate-check="true"
      infinite-scroll-distance="0">
      <div class="cof_near_food_title">附近店家</div>
      <business v-for="(item, index) in msite_near_food" :key="index" :data="item"></business>
    </section>
    <!-- tabbar -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import { http } from './../../config/http.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import business from './../../components/business.vue'
import tabbar from './../../components/tabbar.vue'
 
export default {
  components: {
    swiper,
    swiperSlide,
    business,
    tabbar
  },
  data () {
    return {
      msite_address: '',
      msite_geohash: '',
      msite_category: [],
      msite_latitude: '',
      msite_longitude: '',
      msite_near_food: [],
      offset: 0,
      flag: true, // 无线滚动阀值
      imgBaseUrl: 'https://fuss10.elemecdn.com',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  created: function () {
    // 获取地址信息
    this.msite_geohash = this.$route.query.geohash
    http({
      method: 'get',
      url: `/v2/pois/${this.msite_geohash}`
    }).then(res => {
      res = res.data
      this.msite_address = res.name
      console.log(res)
      this.msite_latitude = res.latitude
      this.msite_longitude = res.longitude
      // 获取附近店铺
      http({
        url: `/shopping/restaurants?latitude=${this.msite_latitude}&longitude=${this.msite_longitude}&offset=${this.offset}`,
        method: 'get'
      }).then(data => {
        data = data.data
        console.log(data);
        this.msite_near_food = data
      })
    })
    // 获取分类列表
    http({
      url: '/v2/index_entry',
      method: 'get'
    }).then(res => {
      console.log(res)
      this.msite_category = res.data
    })
  },
  methods: {
    loadMore () {
      if (!this.flag) return
      this.flag = false
      this.offset +=20
      http({
        url: `/shopping/restaurants?latitude=${this.msite_latitude}&longitude=${this.msite_longitude}&offset=${this.offset}`,
        method: 'get'
      }).then(data => {
        data = data.data
        this.msite_near_food = this.msite_near_food.concat(data)
        this.flag = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cof_category_list {
  padding-bottom: .5rem;
  border-bottom: .05rem solid #ccc;
  background-color: #fff;
  .cof_category_item {
    color: #333;
    width: 25%;
    float: left;
    padding: .25rem;
    text-align: center;
    img {
      width: 70%;
    }
    figcaption {
      font-size: .6rem;
    }
  }
  .swiper-container {
    // overflow: visible !important;
    padding-bottom: .15rem;
    .swiper-pagination {
      bottom: -.25rem !important;
    }
  }
}

.cof_near_food {
  margin-top: .5rem;
  background-color: #fff;
  border-top: .05rem solid #ccc;
  margin-bottom: 2rem;
  .cof_near_food_title {
    font-size: .6rem;
    padding: .25rem;
    color: #ccc;
  }
}
</style>
