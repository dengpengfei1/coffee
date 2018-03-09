<template>
  <div class="cof_home">
    <mt-header class="cof_header">
      <mt-button to="/" slot="left" @click.native="reload">coffee</mt-button>
      <mt-button slot="right" @click.native="login">登录|注册</mt-button>
    </mt-header>
    <!-- 定位城市 -->
    <section class="cof_now_position">
      <div class="cof_now_city clear">
        <span class="left cof_now_city_lt">当前定位城市</span>
        <span class="right cof_now_city_rt">定位不准确时, 请在列表中选择</span>
      </div>
      <div class="cof_city_name clear" @click="jumpToCity(now_city)">
        <span class="left">{{now_city ? now_city : '未定位'}}</span>
      </div>
    </section>
    <!-- 热门城市 -->
    <section class="cof_hot_city">
      <ul class="clear">
        <li class="cof_city_item ellipsis" @click="chooseCity(item.name)" v-for="(item, index) in hot_city" :key="index">{{item.name}}</li>
      </ul>
    </section>
    <!-- 城市列表 -->
    <section class="cof_all_city">
      <ul>
        <li class="cof_city_list" v-for="(value, key) in all_city" :key="key">
          <h4>{{ key }} <span v-if="key === 'A'">(按字母顺序排列)</span></h4>
          <ul class="clear">
            <li class="cof_city_item ellipsis" @click="chooseCity(item.name)" v-for="(item, index) in value" :key="index">{{item.name}}</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>  
</template>

<script>
import { http } from './../../config/http.js'
import { Toast } from 'mint-ui'
export default {
  data: function () {
    return {
      now_city: '',
      hot_city: '',
      all_city: ''
    }
  },
  mounted: function () {
    // 获取定位城市
    http({
      method: 'get',
      url: '/v1/cities',
      params: {
        'type': 'guess'
      }
    }).then(res => {
      res = res.data
      if(res.name === 'ERROR_QUERY_TYPE') {
        Toast({
          message: '网络不佳',
          duration: 2000
        })
        return
      }
      this.now_city = res.name
    })

    // 获取热门城市
    http({
      method: 'get',
      url: '/v1/cities',
      params: {
        'type': 'hot'
      }
    }).then(res => {
      res = res.data
      if(res.name === 'ERROR_QUERY_TYPE') {
        Toast({
          message: '网络不佳',
          duration: 2000
        })
        return
      }
      this.hot_city = res
    })

    // 获取所有城市
    http({
      method: 'get',
      url: '/v1/cities',
      params: {
        'type': 'group'
      }
    }).then(res => {
      res = res.data
      if(res.name === 'ERROR_QUERY_TYPE') {
        Toast({
          message: '网络不佳',
          duration: 2000
        })
        return
      }
      this.all_city = res
      this.all_city = this.sortgroupcity()
    })
  },
  methods: {
    // 刷新页面
    reload () {
      window.location.reload()
    },
    // 跳转到登录注册页面
    login () {
      this.$router.push({
        path: '/login'
      })
    },
    // 跳转到选择区域页面
    jumpToCity (city) {
      if (city) {
        console.log(city )
      }
    },
    // 手动选择城市
    chooseCity (city) {
      this.now_city = city
    },
    //将获取的数据按照A-Z字母开头排序
    sortgroupcity(){
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.all_city[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.all_city[String.fromCharCode(i)];
        }
      }
      return sortobj
    }
  }
}
</script>

<style lang="less" scoped>
.cof_home {
  .cof_header {
    color: #fff;
    font-size: .6rem;
  }

  .cof_now_position {
    margin-top: .5rem;
    line-height: 1.2em;
    background-color: #fff;
    padding-top: .25rem;
    color: #333;
    .cof_now_city {
      padding: 0 .5rem;
      border-bottom: .05rem solid #e4e4e4;
      font-size: .6rem;
      .cof_now_city_lt {
      }
      .cof_now_city_rt {
        color: #666;
      }
    }
    .cof_city_name {
      padding: 0 .5rem;
      font-size: .8rem;
      line-height: 1.6em;
      color: #3190e8;
    }
  }

  .cof_hot_city {
    margin-top: .5rem;
    background-color: #fff;
    border-top: .05rem solid #e4e4e4;
    color: #3190e8;
  }

  .cof_all_city {
    background-color: #fff;
    .cof_city_list {
      margin-top: .5rem;
      border-top: .1rem solid #e4e4e4;
      font-size: .6rem;
      line-height: 2.5;
      h4 {
        padding-left: .25rem;
        font-weight: normal;
        border-bottom: .05rem solid #e4e4e4;
      }
    }
  }

  .cof_city_item {
    float: left;
    width: 25%;
    font-size: .6rem;
    line-height: 2.5;
    border-right: .05rem solid #e4e4e4;
    border-bottom: .05rem solid #e4e4e4;
    text-align: center;
    &:nth-of-type(4n) {
      border-right: none;
    }
  }
}
</style>
