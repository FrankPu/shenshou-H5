<template>
    <div class="HyMypage">
        <div class="Mytop" @click="toMyData()">           
            <p class="Mytopp">{{this.$storage.getSession('userMess').EnterpriseName}}</p>
            <p>{{this.$storage.getSession('userMess').UserName}}</p>
        </div>
        <ul class="Myul1">
                <li class="myli" @click="toOrderDetail('allOrder')"><img src="../assets/images/mine/order.png" alt=""><p>全部订单</p></li>
                <li class="myli" @click="toOrderDetail('pending')"><img src="../assets/images/mine/approval.png" alt=""><p>待审批</p></li>
                <li class="myli" @click="toOrderDetail('paying')"><img src="../assets/images/mine/pay.png" alt=""><p>待支付</p></li>
        </ul>
        <hr class="hr"/>
        <ul class="Myconter" > 
            <router-link to="/mywallet">         
                  <li class="MyConli"> 
                      <img src="../assets/images/mine/icons-1.png" alt="">
                      <span class="Myspan">我的钱包</span>
                 </li>   
            </router-link>   
            <router-link to="/Mypolicy"> 
                  <li class="MyConli"> 
                      <img src="../assets/images/mine/icons-2.png" alt="">
                      <span class="Myspan">差旅政策</span>
                  </li>  
            </router-link>   
            <router-link to="/myinformation"> 
                  <li class="MyConli"> 
                      <img src="../assets/images/mine/icons-3.png" alt="">
                      <span class="Myspan">常用信息</span>
                  </li>    
            </router-link>   
            <router-link to="/MyShareapp">       
                  <li class="MyConli"> 
                      <img src="../assets/images/mine/icons-4.png" alt="">
                      <span class="Myspan">分享APP</span>
                  </li>   
            </router-link>   
            <router-link to="/MySetup">
                  <li class="MyConli"> 
                      <img src="../assets/images/mine/icons-5.png" alt="">
                      <span class="Myspan">设置</span>
                  </li>  
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


export default {
    name: 'mypage',
    data: function() {
        return {

        } 
    },
    created (){
        
    },
    methods: {
            goBack(){
               this.$router.go(-1);
            },
            toOrderDetail(type){
                this.$router.push({
                    name:'myorder',
                    params:{
                        type
                    }
                })
            },
            toMyData(){
                this.$router.push('/mydata')
            }
    },
    components: {
        Tabbar,
        TabbarItem
    }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .HyMypage {
      position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        li{
            list-style: none;
        }
        .Mytop{      
            height: 1.7rem;
            background-color: #f4f4f4;
            background: url(../assets/images/mine/bg1.png) no-repeat;
            background-size: 100%100%; 
            text-align: center;
            line-height: .3rem;
        }
        .Mytopp{
            padding-top: .7rem;
        }
        .Mytop p{
            color:#000000;
            font-size: 16px;
            font-family: '微软雅黑'
        } 
        .Myul1{
            height: .6rem;
            margin: 0;
            padding: 0;
            
        }
        .Myul1  li{
            height: 100%;
            float: left;
            width: 33.3%;
            text-align: center;
            line-height: .18rem;
            font-size: .14rem;
            font-family: '微软雅黑';
            color: #808080;
        }
        .myli > img{
            padding-top: .1rem;
            height: .23rem;
        }
        .hr{
            height: .1rem;
            width: 100%;
            background-color:#F0F0F0;
            border: 0;
        }
      // 路由列表
        .Myconter{
            width: 100%;
            margin:0;
            padding:0;
        }
        .MyConli{
            width: 96%;
            margin-left: 2%;
            height: .5rem;
            text-align: left;
            border-bottom: 0.001rem solid #f1f1f1; 
            position:relative;
            color: #333;
        }
        .MyConli > img{
            height: .18rem;
            margin-top: .15rem;
        }
        .Myspan{
            position:absolute;
            left: .25rem;
            top: .16rem;
            font-size: .14rem;
            font-family: '微软雅黑';
        }
  }
</style>
