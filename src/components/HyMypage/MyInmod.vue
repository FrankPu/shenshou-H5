<template>
      <div class="MyInmod">
            <x-header :showBack="true" :title="'修改旅客信息'" @go-back="goBack"></x-header>
            <form id="MyInmodform">               
                    <div  class="modivname">
                        <div class="moformbox mofrotop">
                                <div class="molblet"> <p>姓     名</p> </div>
                                <div class="moinput">
                                    <input type="text" value="" :placeholder="name1">
                                </div>
                        </div>
                        <div class="moformbox mofrotop">
                                <div class="molblet"><p>手机号码</p></div>
                                <div class="moinput">
                                    <input type="text" value="" :placeholder="phone">
                                </div>
                        </div>
                        <div class="moformbox mofrotop"> 
                            <div class="molblet"><p>证件类型</p></div>
                            <popup-picker value-text-align="'left'" :data="list1" v-model="value1" class="popicker">
                                <div class="moinput"> </div>
                            </popup-picker>
                            <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">     
                        </div>
                        <div class="moformbox ">
                            <div class="molblet"><p>证 件 号</p></div>
                            <div class="moinput">
                                <input type="text" value="" :placeholder="Certifi">
                            </div>
                         </div> 
                         <div class="moformbox mofrotop">
                            <div class="molblet"><p>性 别</p></div>
                            <popup-picker value-text-align="'left'" :data="list2" v-model="value2" class="popicker">
                                <div class="moinput"> </div>
                            </popup-picker>
                            <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">
                        </div>     
                    </div>
                  
                   <button class="inomodbutt">提交</button>
            </form>   
         </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import PopupPicker from 'vux/src/components/popup-picker/index'

import XHeader from '../common/header'
export default {
    components: {
        Tabbar,
        TabbarItem,
        PopupPicker,
        XHeader
    },
    data: function() {
        return {
                name1:"zhang",//姓名
                phone:"11645123416569+56256",//手机号码        
                Certifi:"511114454578983985529",//证件号
                //Gender:"男",//性别
                value1: ['身份证'],
                value2: ['男'],
                list1: [['身份证', '签证', '士兵证', '军官证', '没有证', '其他', '不告诉你']],
                list2: [['男', '女',  '不告诉你']]
        } 
    },
    methods: {        
        goBack(){
                this.$router.go(-1);
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .vux-cell-box:not(:first-child):before {
         border-top:0;  
    }
    .MyInmod{
        width: 100%;
        height: auto;
        font-family: '微软雅黑';
        overflow: hidden;
       .modertop{
            width: 100%;
            height: .4rem;
            background-color: blue;
            line-height: .4rem;
            color:#fff;
            text-align: center;
        }
        #MyInmodform{
            margin-top: .43rem;
        }
        .modivname{
            width: 96%;
            margin-left:2%;
            margin-top: .1rem;
            height: 2.53rem;    


        }
        .moformbox{
            width: 100%;
            height: .35rem;
            background-color: #ffffff;
            position: relative;
        }
        .Inimgse{
            position:absolute;
            top: .14rem;
            right: .2rem;
        }
        .mofrotop{
           border-bottom: .02rem solid #F5F5F5; 
        }
        .molblet{
            width: .7rem;
            height: 100%;
            line-height: .35rem;           
            float: left;
            text-align: left;        
        }
        .moppirev{
            position: relative;
            z-index: 9999;
            border: 1px solid;
        }
        .molblet p{
            padding-left: .13rem;
        }
        .moinput{
            width: 60%;
            height: 100%;
            float: left;
        }
        .moinput > input{
            border: 0;
            outline:medium;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
        }
        .mofrotop >  .popicker{               
            line-height: .35rem;
            color: #757575;
        }
        .inomodbutt{
            width: 96%;
            height: .4rem;
            margin-left: 2%;
            border-radius: 0.05rem;  
            color:#fff;
            background-color: #2577E3;
        }
    }   
</style>
