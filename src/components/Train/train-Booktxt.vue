<template>
      <div class="Booktext">
            <x-header :showBack="true" :title="'预订须知'" @go-back="goBack"></x-header>
            <div class="tamelink">
                  <p class="linktitle">取票说明：</p>
                  <p class="linkcnet">发车前凭借订单登记的证件和电子订单号，可在全国任意火车站或代售点取票</p>
                  <p class="linktitle">退票说明：</p>
                  <p class="linkcent">在线退票时间:07:00-22:55（其他时间须去火车站窗口办理）</p>
                  <p class="linkcent">发车前30分钟，且未取票，可在线申请退票</p>
                  <p class="linktitle">退票手续费：</p>
                  <p class="linkcent">铁路部门按以下规则核收退票费：</p>
                  <p class="linkcent">(1) 票面乘车站开车时间15天(不含)以上，不收取退票费</p>
                  <p class="linkcent">(2) 开车前48小时外，按票价5%收取退票费</p>
                  <p class="linkcent">(3) 开车前24小时至48小时，退票费10%</p>
                  <p class="linkcent">(4) 开车前24内，退票费20%</p>
                  <p class="linkcent">特殊说明</p>
                  <p class="linkcent">(1)在临近退票费变价时间点发生的退票，有因铁路系统延时等原因按下一时段更高退票费收取的风险 (2) 最终退款均以铁路部门实退为准；</p>
                  <p class="linkcent">改签时间：07：00 - 22:55 (其他时间须去火车站窗口办理)</p>
                  <p class="linktitle">改签说明：</p>
                  <p class="linkcent">改签时间：07：00 - 22:55 (其他时间须去火车站窗口办理)</p>
                  <p class="linkcent">发车前30分钟，且未取票，可在线申请退票，每张车票只能改签一次，已经改签的车票不能再次改签，但可在改签后车票载明的列车开车前退票</p>
                  <p class="linkcent"></p>
            </div>
      </div>
</template>
<script>
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'

import XHeader from '../common/header'

export default {
      name: 'Booktext',
      components: {
            Tabbar,
            TabbarItem,
            XHeader
      },
      data: function() {
            return {
              
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            }
     }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
     .tamelink{
           padding: .45rem .13rem .3rem .13rem;
           line-height: .2rem;
           font-size: .11rem;
           color: #666666;
           .linktitle{
                 color: #000000;
                 font-size: .14rem;
                 padding-top: .15rem;
           }
     }
  
</style>
