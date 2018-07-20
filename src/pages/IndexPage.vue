<template>
  <div class="indexPage">
    <router-view></router-view>
    <tabbar>
      <tabbar-item v-model="selected" link="homepage">
        <img slot="icon" src="../assets/images/1x.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="trippage">
        <img slot="icon" src="../assets/images/mine/journey.png">
        <span slot="label">行程</span>
      </tabbar-item>
      <tabbar-item link="mypage">
        <img slot="icon" src="../assets/images/mine/mine.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'


export default {
  name: 'indexpage',
  data: function() {
    return {
      selected: '1'
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style scoped lang="less">
.indexPage {
  a {
    text-decoration: none;
  }
}
</style>
