<template>
  <div>
    <section>
      <div class="cof_star_wrapper">
        <div :class="'cof_star_gray' + id">
          <span v-for="i in 5" :key="i">★</span>
        </div>
        <div :class="'cof_star_gold' + id">
          <div>
            <span v-for="i in 5" :key="i">★</span>
          </div>
        </div>
      </div>
      <span class="cof_star_rating">{{rating}}</span>
      <span class="cof_star_sells">月售{{num}}</span>
    </section>
    <section class="cof_star_footer">
      <span>{{sendCost}}</span>
      <span class="cof_star_time right">{{orderLeadTime}}</span>
      <span class="right">{{distance}}/</span>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number
    },
    id: [Number],
    num: [Number],
    sendCost: [String],
    distance: [String],
    orderLeadTime: [String]
  },
  mounted: function () {
    let gray = document.querySelector('.cof_star_gray' + this.id)
    let gold = document.querySelector('.cof_star_gold' + this.id)
    let width = gray.getBoundingClientRect().width
    gold.style.width = this.rating / 5 * width + 'px'
  }
}
</script>

<style lang="less" scoped>
.cof_star_wrapper {
  position: relative;
  height: .8rem;
  width: 3rem;
  display: inline-block;
  [class ^= 'cof_star_gray'] {
    color: #ccc;
    position: absolute;
  }
  [class ^= 'cof_star_gold'] {
    color: #ff9a0d;
    position: absolute;
    overflow: hidden;
  }
}
.cof_star_rating {
  vertical-align: .15rem;
  color: #ff9a0d;
}
.cof_star_sells {
  vertical-align: .15rem;
}
.cof_star_footer {
  color: #666;
  .cof_star_time {
    color: #3190e8;
  }
}
</style>
