<template>
      <div class="TicketList">
            <x-header :showBack="true" :title="'改签临时列表'" @go-back="goBack"></x-header>
            <ul id="yl">
               <router-link to="/ApplayChanges"> 
                   <li>申请改签</li>
               </router-link>

               <router-link to="/ApplicationfoRrefund"> 
                   <li>申请退票</li>
               </router-link>

               <router-link to="/TicketChangesDetail"> 
                   <li>改签详情</li>
               </router-link>
               
               <router-link to="/DetailsofCharges"> 
                   <li>费用明细</li>
               </router-link>
               <router-link to="/Resigningpayment"> 
                   <li>改签支付</li>
               </router-link>
               <router-link to="/Changeinformation"> 
                   <li>改签信息确认</li>
               </router-link>
               <router-link to="/Submission"> 
                   <li>提交成功</li>
               </router-link>
               <h1>添加旅客信息</h1>
                <router-link to="/Entstaff"> 
                   <li>添加常旅客因私</li>
               </router-link>
               <router-link to="/additionsEmployee"> 
                   <li>添加常旅客因公选择组件</li>
               </router-link>
               <router-link to="/Searchcomponents"> 
                   <li>模糊搜索</li>
               </router-link>
            </ul>
      </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'

import XHeader from '../common/header'

export default {
      name: 'TicketList',
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
<style>
    body{
          background-color: #F5F5F5;
    }  
  #yl{
      margin-top: 5rem;
  }
</style>
