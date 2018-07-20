<template>
        <div class="Mypolicy">
            <x-header :showBack="true" :title="'差旅政策'" @go-back="goBack"></x-header>
            <ul class="tabs clearfix">  
                <li v-for="(tab,index) in tabsName" :key="index">   
                    <span class="tab-link" @click="tabsSwitch(tab.type)" :class="{active:tab.type==type}">{{tab.name}}</span>  
                </li>  
            </ul>
            <div v-show="type=='flight'">
                <p class="wap1">{{flightPolicy.Name}}</p>
                <div class="cards" v-for="(item,index) in flightPolicy.travelPolicyDetail" :key="index">  
                        <div class="tab-card">
                        
                        <div class="watabDiv">
                                <p>{{item.Detail}}</p>
                                </div>
                        </div>
                </div> 
            </div>
            <div v-show="type=='hotel'">
                <p class="wap1">{{hotelPolicy.Name}}</p>
                <div class="cards" v-for="(item,index) in hotelPolicy.travelPolicyDetail" :key="index">    
                        <div class="tab-card">
                        
                        <div class="watabDiv">
                                <p>{{item.Detail}}</p>
                                </div>
                        </div>
                </div> 
            </div>
            <div v-show="type=='train'">
                <p class="wap1">{{trainPolicy.Name}}</p>
                <div class="cards" v-for="(item,index) in trainPolicy.travelPolicyDetail" :key="index">  
                        <div class="tab-card">
                        
                        <div class="watabDiv">
                                <p>{{item.Detail}}</p>
                                </div>
                        </div>
                </div> 
            </div>
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
    name: 'Mypolicy',
    data: function() {
        return {
            money:"350.00",
            tabsName: [
                {  
                    name: "机票",  
                    type: 'flight'
                }, 
                {  
                    name: "酒店",  
                    type:'hotel'
                },
                {  
                    name: "火车票",  
                    type: 'train'
                }
            ],  
            active: false,
            flightPolicy:[],
            hotelPolicy:[],
            trainPolicy:[],
            type:'flight'
        } 
    },
   methods: {  
                goBack(){
                    this.$router.go(-1);
                },
                tabsSwitch(type){  
                //     var tabCardCollection = document.querySelectorAll(".tab-card"),  
                //     len = tabCardCollection.length;  
                //     for(var i = 0; i < len; i++) {  
                //             tabCardCollection[i].style.display = "none";  
                //             this.tabsName[i].isActive = false;  
                //     }  
                //     this.tabsName[tabIndex].isActive = true;  
                //     tabCardCollection[tabIndex].style.display = "block";  
                        this.type = type
                }  
        },
        created(){
                //机票政策
                this.$axios.post('/MyTravelPolicy/GetTravelPolicy', qs.stringify({
                        TravelOnBusinessType: 1,
                        Token: this.$storage.getSession('userMess').Token,
                        EmpId: this.$storage.getSession('userMess').EmpId,
                })).then(res=>{
                        this.flightPolicy = res.data.Result.travelPolicy[0]
                });
                //酒店政策
                this.$axios.post('/MyTravelPolicy/GetTravelPolicy', qs.stringify({
                        TravelOnBusinessType: 2,
                        Token: this.$storage.getSession('userMess').Token,
                        EmpId: this.$storage.getSession('userMess').EmpId,
                })).then(res=>{
                        this.hotelPolicy = res.data.Result.travelPolicy[0]
                });
                //火车政策
                this.$axios.post('/MyTravelPolicy/GetTravelPolicy', qs.stringify({
                        TravelOnBusinessType: 3,
                        Token: this.$storage.getSession('userMess').Token,
                        EmpId: this.$storage.getSession('userMess').EmpId,
                })).then(res=>{
                        this.trainPolicy = res.data.Result.travelPolicy[0]
                });
        }
}
</script>
<style scoped>
    .Mypolicy{
            width: 100%;
            height: auto;
            font-family: '微软雅黑'
    } 
    .podertop{
            width: 100%;
            height: .4rem;
            background-color: blue;
            line-height: 4rem;
            color:#fff;
    }
    .tabs{
            width: 100%;
            height: .5rem;
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
            line-height: 49px;  
            background-color: #fff;  
            font-size: .14rem;
            color: #000;  
            text-decoration: none;  
    }      
    .tabs .tab-link.active {  
            height: .4rem;  
            border-bottom: 2px solid #2577E3;  
            color: #4287E6;
    }      
    .cards {  
            float: left;
            width: 100%;  
    }     
    .cards .tab-card {  
            margin-top: 0;
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
    .wap1{
            margin: 0;
            padding-left: .2rem;
            padding-bottom: 0.05rem;
    }
    .watabDiv{
            width: 100%;
            height: auto;
            background-color: #ffffff;
            padding-left: .2rem;
            line-height: .25rem;
            color: #555;
    }
</style>
