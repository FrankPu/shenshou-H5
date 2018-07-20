<template>
      <div class="mysteup">
           <div class="steshow" v-show="alertbox">
                   <div class="setshowbox">
                           <p class="showboxp1">是否需要清除缓存</p>
                           <p class="showboxp2"><span class="shouspan1" @click="Determine">确定</span><span @click="cancel">取消</span></p>
                   </div>
            </div>
            <x-header :showBack="true" :title="'设置'" @go-back="goBack"></x-header>
            <ul class="setcentbox">
                    <li>检查更新 </li>
                    <li @click="Eliminate">清除缓存 <span>3.16M</span></li>  
                    <li>版 本 号 <span>1.3.4</span></li>     
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
    name: 'mysteup',
    data: function() {
        return {
            alertbox:false
        } 
    },
    methods:{
        goBack(){
                this.$router.go(-1);
        },
        Eliminate(){
             this.alertbox= true;
        },
        cancel(){
            this.alertbox= false;
        },
        Determine(){
             alert('ok');
             this.alertbox= false;
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        XHeader
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mysteup{
        width: 100%;
        height: auto;
        font-family: '微软雅黑';
        text-align: center;
      
    } 
    .setdertop{
        width: 100%;
        height: .4rem;
        background-color: blue;
        line-height: .4rem;
        color:#fff;
    }
    .setcentbox{
        text-align: left;
        list-style: none;
        width: 100%;
        overflow: hidden;
        margin-top: .4rem;
    }
    .setcentbox  li{
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        border-top: 0.01rem solid #e4e4e4; 
        background-color: #ffffff;
        padding-left: .15rem;
    }
    .setcentbox > li span{
        float:right;
        padding-right: .3rem;
        color: #A3A3A3;
    }
    .steshow{
        position: absolute; 
        width: 100%;
        height: 100%;
        background-color:rgba(96, 96, 96, 0.3);     
        z-index: 5;
        top: 0；     
    }
    .setshowbox{
        width: 90%;
        height: 1.0rem;
        margin-left: 5%;
        margin-top: 60%;
        background-color:rgb(255, 255, 255);  
        text-align: left;
        border-radius: .1rem; 
    }
    .showboxp1{
        padding-top: .1rem;
        padding-left: .2rem;
        color:#828282; 
        font-size: .16rem;
    }
    .showboxp2{
        padding-top: .4rem;
        padding-left: .2rem;
        color: #A5A5A5;
        font-size: .16rem;
    }
    .showboxp2 > span{
        float:right;
        padding-right: 2rem;
    }
    .showboxp2 > .shouspan1{
        color: #2678E3;
    }
</style>
