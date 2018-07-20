<template>
      <div class="Mypolicy">
            <x-header :showBack="true" :title="'常用信息'" @go-back="goBack"></x-header>
            <ul class="tabs clearfix">  
                <li v-for="(tab,index1) in tabsName" :key="index1">   
                    <a href="#" class="tab-link" @click="tabsSwitch(index1)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>  
                </li>  
            </ul>  
            <div class="cards list">  
                <div class="tab-card" style="display: block;">
                        <router-link to="/MyInmod"><div class="IntopsDiv"><p>+添加常旅客</p></div></router-link>  
                        <ul class="InlistDiv">      
                                <li class="listdiv" v-for="(item,index) in list" :key="index">
                                    <router-link to="/MyInmod"> 
                                        <p class="listdivP1">{{item.name}}</p>
                                        <p class="listdivP">{{item.identity}}</p>
                                        <a href="#">
                                            <i @click="del(item.content,index)">删除</i>
                                        </a>
                                        <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">
                                    </router-link>  
                                </li>
                        </ul>
                </div>  
                <div class="tab-card">
                        <router-link to="/Myaddress"><div class="IntopsDiv"><p>+添加地址</p></div></router-link> 
                        <ul class="InlistDiv">
                            <router-link to="/Myaddress">
                                <li class="listdiv" v-for="(item,index) in list" :key="index">
                                    <p class="listdivP1">{{item.name}}</p>
                                    <p class="listdivP">{{item.identity}}</p>
                                    <a href="#">
                                        <i @click="del(item.content,index)">删除</i>
                                    </a>
                                    <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">
                                </li>
                            </router-link> 
                        </ul>
                </div>  
                <div class="tab-card">
                        <router-link to="/Myinvoice"><div class="IntopsDiv"><p>+添加报销凭证</p></div></router-link>     
                        <ul class="InlistDiv">
                            <router-link to="/Myinvoice"> 
                                <li class="listdiv" v-for="(item,index) in list" :key="index">
                                    <p class="listdivP1">{{item.name}}</p>
                                    <p class="listdivP">{{item.identity}}</p>
                                    <a href="#">
                                        <i @click="del(item.content,index)">删除</i>
                                    </a>
                                    <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">
                                </li>
                            </router-link>
                        </ul>
                </div>  
                <p class="Incardp">向左滑动删除单条信息</p>
            </div> 
    </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题import PopupPicker from 'vux/src/components/popup-picker/index'
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
   name: 'Myinform',
   data: function() {
        return {
            money:"350.00",
            tabsName: [
                    {  
                        name: "常旅客",  
                        isActive: true  
                    }, 
                    {  
                        name: "地址",  
                        isActive: false  
                    }, 
                    {  
                        name: "报销凭证",  
                        isActive: false  
                    }
                ],  
        active: false,      
           list:[
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
                    {name:'黄钦月',identity:"身份证：51340119887205910"},
            ],
        expansion : null,  
        } 
    },
    mounted:function(){
        var $this=this;														//将$this保存 区分以下触发事件的this
        var container = document.querySelectorAll('.list li a');
        for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
                var x,  X;
                container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
                     x = event.changedTouches[0].pageX;
               });
                container[i].addEventListener('touchmove', function(event){
                    X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
                    if($this.expansion){                                       //判断是否展开，如果展开则收起
                        $this.expansion.className = "";
                    }     
                    if(X - x > 10){                                             //右滑
                        this.className = "";                                    //右滑收起
                    }
                    if(x - X > 10){                                             //左滑
                        this.className = "swipeleft";                           //左滑展开
                        $this.expansion = this;
                    }
                });
            }
    },
    methods: {        
            goBack(){
                    this.$router.go(-1);
            },
            del:function(name,idx){
                alert("确认删除"+name);
                this.list.splice(idx,1);                                        //删除List这条数据 DOM随之更新渲染
                var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
                container.className="";
                this.expansion=null;
            },
            tabsSwitch: function(tabIndex) {  
                var tabCardCollection = document.querySelectorAll(".tab-card"),  
                len = tabCardCollection.length;  
                console.log(len,'11111111111111111111111')
                for(var i = 0; i < len; i++) {  
                        tabCardCollection[i].style.display = "none";  
                        this.tabsName[i].isActive = false;  
                }  
                this.tabsName[tabIndex].isActive = true;  
                tabCardCollection[tabIndex].style.display = "block";  
            }  
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .Mypolicy{
        width: 100%;
        height: auto;
        font-family: '微软雅黑'
    } 
    .podertop{
        width: 100%;
        height: .4rem;
        background-color: blue;
        line-height: .4rem;
        color:#fff;
        text-align: center;
    }
    .tabs{
        width: 100%;
        height: .45rem;
        margin-top: .4rem;
    }
    .tabs li {  
        float: left;    
        width: 33.3%;
        list-style: none;  
    }  
    .tabs .tab-link {     
        display: block;  
        width: 100%;  
        height: .4rem;  
        text-align: center;  
        line-height: .4rem;  
        background-color: #fff;  
        font-size: .14rem;
        color: #000;  
        text-decoration: none;  
    }      
    .tabs .tab-link.active {  
        height: .4rem;  
        border-bottom: 2px solid #2577E3;  
        color: #4287E6;
        transition: .3s;  
    }          
    .cards {  
        float: left;
        width: 100%;  
    }      
    .cards .tab-card {  
        margin-top: 0;
        display: none; 
        text-align: left;
        width: 100%;
        overflow:hidden; 
    }  
    .clearfix:after {  
        content: "";  
        display: block;  
        height: 0;  
        clear: both;  
    }     
    .clearfix {  
        zoom:1;  
    }  
    .IntopsDiv{
        width: 100%;
        height: .3rem;
        line-height: .3rem;           
        background-color: #ffffff;
        color: #2577E3;
    }
    .IntopsDiv > p{
        padding-left: .2rem;
    }
    .InlistDiv{
        width: 100%;
        height: auto;
        margin-top: 0.05rem;
    }
    .listdiv{
        width: 120%;
        height: .4rem;
        background-color:#fff;
        border-bottom: 0.01rem solid #e4e4e4;
        position:relative;
        overflow:hidden;
    }
    li{list-style:none;}
    i{font-style:normal;}
    a{color:#393939;text-decoration:none}
    .listdiv a{
            display:block;
            height: .3rem;
            line-height: .3rem;
            -webkit-transition:all 0.3s;
            transition:all 0.3s;
             margin-top: -.3rem;
    }
    .listdiv i{float:right;width:15%;text-align:center;background:#E2421B;color:#fff;}
    .swipeleft{transform:translateX(-15%);-webkit-transform:translateX(-15%);}
    .Inimgse{
        position:absolute;
        top: .16rem;
        right: .8rem;
    }
    .listdivP1{
        padding-top: .07rem;
        padding-left: .2rem;
    }
    .listdivP{
        color: #999;
        padding-left: .2rem;
    }
    .Incardp{
        color: #999;
        padding-top: .1rem;
        text-align: center;
    }
</style>
