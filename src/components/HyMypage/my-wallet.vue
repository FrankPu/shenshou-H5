<template>
      <div class="Mywallet">
            <x-header :showBack="true" :title="'我的钱包'" @go-back="goBack"></x-header>
            <div class="wacent">
                  <p class="wap1">可用余额（元）</p>
                  <p class="wap2">{{money}}</p>
            </div>
            <p class="wap3">更多功能敬请期待...</p>
            <div class="wafixed"></div>
      </div>
</template>
<script>
import qs from 'qs'
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'

import XHeader from '../common/header'

 export default {
      components: {
            Tabbar,
            TabbarItem,
            XHeader
      },
      data: function() {
            return {
                 money:""
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            }
     },
     created(){
           this.$axios.post('/QueryWallet/QueryWalletBalanceApp', qs.stringify({
                 UserId : this.$storage.getSession('userMess').UserId
           })).then(res=>{
                 this.money = res.data.Result.UseMoney
           })
     }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .Mywallet{
          width: 100%;
          height: auto;
          font-family: '微软雅黑';
          text-align: center;
    } 
    .wadertop{
          width: 100%;
          height: .4rem;
          background-color: blue;
          line-height: .4rem;
          color:#fff;
    }
    .wacent{
          width: 100%;
          height: 1.5rem;
          background-color: #fff;            
    }
    .wap1{
          padding-top: .5rem; 
          font-size: .16rem;
          color:#000;
    }
    .wap2{
          font-size: .4rem;
          color:#2376E8;
          font-weight: bold;
    }
    .wap3{
          padding-top: .1rem; 
          font-size: .16rem;
          color:#A5A5A5;
    }
    .wafixed{
          position:absolute;
          bottom: 0;
          width: 100%;
          height: .4rem;
          background: url(../../assets/images/mine/myadad.png) no-repeat center;
    }
</style>
