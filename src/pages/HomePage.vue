<template>
  <div class="homePage">
    <swiper :list="list" auto style="width:100%; margin:0 auto;" height="2rem" dots-class="custom-bottom" dots-position="center"></swiper>
    <div class="homePageGridBox">
      <grid :show-lr-borders="false">
        <grid-item :label="'国内机票'" :link="'/flightsearch'">
            <img slot="icon" src="~@/assets/images/myOrder/飞机@3x.png">
        </grid-item>
        <grid-item :label="'酒店'" :link="'/hotelsearch'">
          <img slot="icon" src="~@/assets/images/myOrder/酒店@3x.png">
        </grid-item>
        <grid-item :label="'火车票'" :link="'/trainsearch'">
          <img slot="icon" src="~@/assets/images/myOrder/火车@3x.png">
        </grid-item>
      </grid>
      <grid :show-lr-borders="false">
        <grid-item :label="'国际机票'" :link="'/flightsearch'">
          <img slot="icon" src="~@/assets/images/hotel/keyicon4@3x.png">
        </grid-item>
        <grid-item :label="'用车'" :link="'/hotelsearch'">
          <img slot="icon" src="~@/assets/images/hotel/stop@3x.png">
        </grid-item>
        <grid-item :label="'审批'" :link="'/auditlist'">
          <img slot="icon" src="~@/assets/images/mine/approval.png">
        </grid-item>
      </grid>
    </div>

    <div class="ctripBox">
      <p class="ctrip">暂无行程</p>
    </div>
  </div>
</template>

<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import {Swiper} from 'vux'
// import slider from 'vue-concise-slider'// 引入slider组件

export default {
  name: 'homepage',
  data: function() {
    return {
      title1: '详细机型',
      value1: ['iPhone', '华为3'],
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']], 
      gridData: [{ text: '国际机票'}, { text: '酒店' }, { text: '火车票' }],
      pages:[{
        title: '',
        style:{
          background:'url(../assets/images/1x.png)'
        }
      }, {
        title: '',
        style:{
        background:'url(../assets/images/1x.png)'
        }
      }],
      list:[
        {
          url: 'javascript:',
          img: 'http://imgsrc.baidu.com/imgad/pic/item/43a7d933c895d143f3a052f779f082025baf070b.jpg',
          title: '神兽企业版'
        }, {
          url: 'javascript:',
          img: 'http://imgsrc.baidu.com/imgad/pic/item/0df3d7ca7bcb0a4646843bed6163f6246a60af44.jpg',
          title: '神兽企业版'
        }
      ]
    }
  },
  components: {
    Grid,GridItem,Swiper
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .homePage {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #eee;
    .homePageSlider {
      height: 1.2rem;
    }
    .homePageGridBox {
      background: #fff;
      a {
        text-decoration: none;
      }        
    }
  }

  .ctripBox{
    background: #ffffff;
    height: 1.0rem;
    margin-top: 0.05rem;
    .ctrip{
      text-align: center;
      padding-top: .4rem;
      color: #8b8b8b;
    }
  }
</style>
