<template>
      <div class="Myinvoice">
            <x-header :showBack="true" :title="'添加发票抬头'" @go-back="goBack"></x-header>
            <div class="voyellow">
                   <p>根据国家税务局规定，自2017年起,开具增值锐普通发票必须有纳税人识别号或同意社会信用代码，否则该发票为不符合规定的发票，不得作为税收凭证</p>
            </div>
            <ul class="tabs clearfix"> 
                <li class="voliban">类型</li> 
                <li v-for="(tab,index) in tabsName" :key="index">   
                    <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>  
                </li>  
            </ul>  
            <div class="cards">  
                <div class="tab-card" style="display: block;">
                        <div class="moformbox mofrotop">
                            <div class="molblet"><p>发票抬头</p></div>
                            <div class="moinput">
                                <input type="text" value="" placeholder="请输入个人姓名">
                            </div>
                        </div>                      
                </div>  
                <div class="tab-card">
                        <div class="moformbox mofrotop">
                                <div class="molblet"><p>发票抬头</p></div>
                                <div class="moinput">
                                    <input type="text" value="" placeholder="请输入企业名称">
                                </div>
                        </div> 
                        <div class="moformbox">
                                <div class="molblet"><p>纳税</p></div>
                                <div class="moinput">
                                    <input type="text" value="" placeholder="请填写纳税人识别号">
                                </div>
                        </div>                   
                </div>       
                <div class="tab-card">
                        <div class="moformbox mofrotop">
                                <div class="molblet"><p>发票抬头</p></div>
                                <div class="moinput">
                                    <input type="text" value="" placeholder="请输入单位名称">
                                </div>
                        </div> 
                        <div class="moformbox">
                                <div class="molblet"><p>纳税</p></div>
                                <div class="moinput">
                                    <input type="text" value="" placeholder="选填，请填写纳税人识别号">
                                </div>
                        </div>
               </div> 
               <div class="moformbox" style="height:auto;text-align: left;" v-show="mofrotop">
                        <p class="invops2">需要增值税专用发票</p>
                        <p class="invops1">请先与企业财务确认需要开具的是专业发票</p>
                        <!-- <x-switch :title="''" id="xswitch" @on-click="onClick"></x-switch> -->
                        <x-switch :title="''" id="xswitch" prevent-default  v-model="value" @on-click="onClick"></x-switch>
                        <div id="disdinvo" v-show="voviboxmane">
                                <div class="moformbox1">
                                    <div class="molblet1"><p>注册地址</p></div>
                                    <div class="moinput">
                                       <input type="text" value="" placeholder="请输入企业注册地址">
                                    </div>
                                </div> 
                                <div class="moformbox1">
                                    <div class="molblet1"><p>企业电话</p></div>
                                    <div class="moinput">
                                       <input type="text" value="" placeholder="请输入区号和电话号码">
                                    </div>
                                </div> 
                                <div class="moformbox1">
                                    <div class="molblet1"><p>开户银行</p></div>
                                    <div class="moinput">
                                       <input type="text" value="" placeholder="请输入企业开户行名称">
                                    </div>
                                </div> 
                                <div class="moformbox1">
                                    <div class="molblet1"><p>发票抬头</p></div>
                                    <div class="moinput">
                                       <input type="text" value="" placeholder="请输入企业银行账户">
                                    </div>
                                </div>
                                <p class="bottBnh">视企业的财务报销要求确认是否需要增值税专用发票，各项信息可以向公司财务索要，目前只有服务行业部分酒店住宿支持开具此类发票 </p> 
                        </div>
                </div>  
            </div>
            <button class="inomodbutt">提交</button>
      </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import XSwitch from 'vux/src/components/x-switch/index'

import XHeader from '../common/header'
export default {
    components: {
        Tabbar,
        XSwitch,
        TabbarItem,
        XHeader
    },
    name: 'Myinvoice',
    data: function() {
        return {
            money:"350.00",
            value: false,
            tabsName: [{  
                        name: "个人",  
                        isActive: true  
                    }, 
                    {  
                        name: "企业",  
                        isActive: false  
                    }, 
                    {  
                        name: "政府机关行政单位",  
                        isActive: false  
                    }],  
            active: false,
            mofrotop: false,
            voviboxmane:false,
        } 
    },
    methods: {  
        goBack(){
            this.$router.go(-1);
        },
        onClick (newVal, oldVal) {     
            this.value = !this.value;
            this.voviboxmane =! this.voviboxmane;
        },
        tabsSwitch: function(tabIndex) {  
            var tabCardCollection = document.querySelectorAll(".tab-card"),  
            len = tabCardCollection.length; 
            if(tabIndex==0){
                 this.mofrotop=false;
                 this.value =false;
                 this.voviboxmane =false;
            }else{
                this.mofrotop=true;
            }
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
    input::-webkit-input-placeholder{ /*WebKit browsers*/
        color:#B2B2B2;
    }
    .Myinvoice{
        width: 100%;
        height: auto;   
        text-align: center;
    } 
    .vodertop{
        width: 100%;
        height: .4rem;
        background-color: blue;
        line-height: .4rem;
        color:#fff;
    }
    .voyellow{ 
        width: 100%;
        height: auto;
        background-color:#FDF9DC;
        margin-top: .4rem;
    }
    .voyellow >P{
        color: #FD5E6A;
        text-align: left;
        font-size: 8px;
        padding: .1rem 0.03rem .1rem 0.03rem;
        line-height: .12rem; 
    }
    .tabs{
        width: 96%;
        margin-left:2%;
        margin-top: 0.05rem;
        height: .35rem;          
        background-color:#F0F0F0; 
    }
    .tabs li {  
        float: left;    
        width: 21%;
        list-style: none;  
    }  
    .tabs  .voliban{
        width:13%;
        line-height: .35rem;
        font-size: 8px;
        color: #666;  
    }
    .tabs .tab-link {  
        display: block;  
        width: 100%;  
        height: .35rem;  
        text-align: center;  
        line-height: .35rem;  
        background-color: #F0F0F0;  
        font-size: .16rem;
        color: #666;  
        text-decoration: none;  
    } 
    li:last-child{
        width: 18%;
        margin-left: 4%;
    }
    li:last-child .tab-link{
        font-size: .14rem;
        line-height: .15rem;  
    }        
    .tabs .tab-link.active {  
        height: .35rem;  
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
        font-size: .14rem;   
    }          
    .clearfix:after {  
        content: "";  
        display: block;  
        height: 0;  
        clear: both;  
    }  
    .clearfix {  
        zoom: 1;  
    }  
    .cards{
        width: 96%;
        height: auto;
        margin-left:2%;
        margin-top: 0.02rem;      
    }
    .moformbox{
        width: 100%;
        height: .3rem;
        font-size: .1rem;
        background-color: #F0F0F0;
        position:relative;
    }
    .molblet{
        width: .7rem;
        height: 100%;
        line-height: .3rem;           
        float: left;
        text-align: left;   
        color: #666;     
    }
    #disdinvo{
        width: 100%;
        height: 1.7rem;
        background-color:#ffffff;
        border: 1px solid #ffffff;
    }
    .moformbox1{
        width: 100%;
        height: .25rem;
        font-size: .1rem;
        background-color: #F0F0F0;
        position:relative;
        margin-top: 0.02rem;
    }
    .molblet1{
        width: .7rem;
        height: 100%;
        line-height: .25rem;           
        float: left;
        text-align: left;   
        color: #666;     
    }
    .moformbox1 > p{
        padding-left: .1rem;
        line-height: .1rem;
        font-size: 0.08rem;
        color: #666;  
    }
    .molblet,.molblet1 p{
        padding-left: .1rem;
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
        background-color: #F0F0F0;
    }
    .bottBnh{
        font-size: 5px;
        color: #777;
        padding: .15rem;
    }
    .moformbox > p{
        padding-left: .1rem;
        line-height: .12rem;
        font-size: 0.08rem;
        color: #666;  
    }       
    .moformbox >   .invops1{
        color:#B2B2B2;
         padding-bottom: 0.07rem;
    }
    .moformbox >   .invops2{
        padding-top: 0.05rem;
    }
    #xswitch{
        position:absolute;
        top: 0.03rem;
        right: .1rem;
    }
    #xswitch  .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
        border-color:#2577E3;
        background-color: #2577E3;
    }
    #xswitch  .weui-switch, .weui-switch-cp__box {
        position: relative;
        height: .2rem;         
        border-radius: .13rem;         
    }      
    #xswitch .weui-switch:before, .weui-switch-cp__box:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        height: .2rem;         
        border-radius: .13rem;
    }
    #xswitch  .weui-switch:after, .weui-switch-cp__box:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: .2rem;
        height: .2rem;
        border-radius: 15px;
    }
    .inomodbutt{
        width: 96%;
        height: .4rem;
        margin-left: 2%;
        border-radius: 0.05rem;  
        color:#fff;
        background-color: #2577E3;
        margin-top: .25rem;
    }
</style>
