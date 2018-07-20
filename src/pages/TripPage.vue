<template>
  <div class="tripPage">
    <div class="left">
      <img src="../assets/images/1x.png">
      <span class="history">历史</span>
    </div>
    <div class="tripPageBox">
      <div class="remarks">当前暂无行程<br>前往创建</div>
      <div class="tripPageGridBox">
        <grid :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item :label="'机票'" :link="'/flightsearch'">
            <img slot="icon" src="~@/assets/images/myOrder/飞机@3x.png">
          </grid-item>
          <grid-item :label="'酒店'" :link="'/hotelsearch'">
            <img slot="icon" src="~@/assets/images/myOrder/酒店@3x.png">
          </grid-item>
          <grid-item :label="'火车票'" :link="'/trainsearch'">
            <img slot="icon" src="~@/assets/images/myOrder/火车@3x.png">
          </grid-item>
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'

export default {
  name: 'trippage',
  components: {
    Grid,
    GridItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .tripPage {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background: #8078f6;
    .left {
      display: table;
      margin-top: .08rem;
      margin-left: 0.8rem;
      .history {
        display: table-cell;
        vertical-align: middle;
        padding-left: .08rem;
        color: #fff;
      }
    }
    .tripPageBox {
      margin-top: 50%;
      .remarks {
        text-align: center;
        color: #fff;
      }
      .tripPageGridBox {
        margin: .08rem .08rem 0 .08rem;
        background: #fff;
        border-radius: 5px;
        a {
          text-decoration:none
        }
      }
    }   
    .weui-grids:before {
      color: #fff;
      border-top: 1px solid #fff;
    }
    .weui-grid:after {
      color: #fff;
      border-bottom: 1px solid #fff;
    }
  }
</style>
