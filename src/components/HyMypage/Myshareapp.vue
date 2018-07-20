<template>
      <div class="Myappllet">
            <x-header :showBack="true" :title="'分享APP'" @go-back="goBack"></x-header>
            <div class="appcentbox">
                <!-- <p>面对面扫描下载APP</p>
                <img src="../../assets/images/mine/erwerima.png" alt="">
            -->
            <input type="text" v-model="dada" @input="dad">
            </div>
            <div class="appimglist">
                <img src="../../assets/images/mine/wechat.png" alt="">
                <img src="../../assets/images/mine/qq.png" alt="">
                <img src="../../assets/images/mine/wechat.png" alt="">
                <img src="../../assets/images/mine/qq.png" alt="">
            </div>
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
    name: 'mypage',
    data: function() {
        return {
            dada:"111"
        } 
    },
    components: {
        Tabbar,
        TabbarItem,
        XHeader
    },
    methods: {  
            goBack(){
                this.$router.go(-1);
            },
            dad(e) {
                console.log(e)
                e.target.value = '4444444444444444444444'
                
            }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style> 
        .Myappllet{
            width: 100%;
            height: auto;
            text-align: center;
        } 
        .appdertop{
            width: 100%;
            height: .4rem;
            background-color: blue;
            line-height: .4rem;
            color:#fff;
        }
        .appcentbox{
            margin-top: 1.1rem;
            font-size: .16rem;
        }
        .appcentbox > img{
            padding-top: .1rem;
        }
        .appimglist{
            width: 100%;
            position: absolute;
            bottom: .5rem;
            text-align: left;
        } 
        .appimglist > img {
            width: 15%;
            margin-left:7.5%; 
        }
     
</style>
