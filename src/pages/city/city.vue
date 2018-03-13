<template>
  <div>
    <mt-header :title="city_name" class="cof-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">&nbsp;</mt-button>
      </router-link>
      <mt-button class="cof_changeCity" slot="right" @click="changeCity">切换城市</mt-button>
    </mt-header>
    <section class="cof_body">
      <mt-field label="用户名" placeholder="输入地址" v-model="city_address"></mt-field>
      <mt-button class="cof_submit" type="primary" size="large" @click="searchAddr">提交</mt-button>
    </section>
    <footer class="cof_search_result">
      <ul>
        <router-link class="cof_search_result_item" tag="li" @click.native="addHistory(item)" :to="{name: 'msite', query: {geohash: item.geohash}}" v-for="(item, index) in city_search_result" :key="index">
          <h4 class="cof_search_result_name">{{item.name}}</h4>
          <p class="cof_search_result_address">{{item.address}}</p>
        </router-link>
      </ul>
    </footer>
    <div class="cof_search_history cof_search_result" v-if="city_history.length">
      <p>搜索历史</p>
      <ul>
        <router-link class="cof_search_result_item" tag="li" :to="{name: 'msite', query: {geohash: item.geohash}}" v-for="(item, index) in city_history" :key="index">
          <h4 class="cof_search_result_name">{{item.name}}</h4>
          <p class="cof_search_result_address">{{item.address}}</p>
        </router-link>
      </ul>
      <mt-button class="cof_submit" type="primary" size="large" @click="clear_history">清除历史纪录</mt-button>
    </div>
  </div>
</template>

<script>
import { http } from './../../config/http.js'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      city_name: '',
      city_address: '',
      city_id: '',
      city_search_result: [],
      city_history: []
    }
  },
  computed: {
    ...mapState('city', ['citySearchResult', 'cityName', 'cityHistory'])
  },
  created: function () {
    // 获取搜索历史记录
    this.getSearchHistory()
    http({
      method: 'get',
      url: `/v1/cities/${this.$route.params.id}`
    }).then(res => {
      res = res.data
      this.city_name = res.name
      this.city_id = res.id
    })

    // 如果已经搜索过, 去其他页面了, 返回 city 页面, 从 vuex 中读取数据, 渲染出上次搜索的结果
    this.city_address = this.cityName
    this.city_search_result = this.citySearchResult
    this.city_history = this.cityHistory
  },
  methods: {
    ...mapActions('city', {
      saveSearchResult: 'saveSearchResult',
      saveSearchHistory: 'saveSearchHistory',
      getSearchHistory: 'getSearchHistory',
      clearHistory: 'clearHistory'
    }),
    changeCity () {
      this.$router.push({
        name: 'home'
      })
    },
    searchAddr () {
      if(!this.city_address) return
      http({
        method: 'get',
        url: '/v1/pois',
        params: {
          city_id: this.city_id,
          type: 'search',
          keyword: this.city_address
        }
      }).then(res => {
        res = res.data
        this.city_search_result = res
        this.saveSearchResult({
          res: res,
          address: this.city_address
        })
      })
    },
    addHistory (item) {
      this.saveSearchHistory(item)
    },
    // 清除历史纪录
    clear_history () {
      window.localStorage.removeItem('citySearchHistory')
      this.city_history = []
      this.clearHistory()
    }
  }
}
</script>

<style lang="less" scoped>
// mint-ui 样式重置
.cof-header {
  font-size: .8rem;
  .cof_changeCity {
    font-size: .6rem;
  }
}

.cof_body {
  padding: .5rem .75rem;
  margin-top: .25rem;
  background-color: #fff;
  .cof_submit {
    margin-top: .25rem;
  }
}

.cof_search_result {
  margin-top: .25rem;
  background-color: #fff;
  .cof_search_result_item {
    padding: .25rem .75rem;
    border-bottom: .05rem solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    .cof_search_result_name {
      font-size: .7rem;
    }
    .cof_search_result_address {
      color: #666;
      font-size: .6rem;
    }
  }
}

.cof_search_history {
  > p {
    font-size: .6rem;
    text-align: center;
    padding: .25rem .75rem;
    border-bottom: 1px solid #ccc;
  }
}
</style>
