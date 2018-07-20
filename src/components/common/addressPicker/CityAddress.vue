<template>
    <div class="CityAddress">
        <popup v-model="showAddress" width="100%" height="100%" :position="'right'">       
            <x-header :title="'选择城市'" @go-back="$emit('go-back')">
                <img class="header-left" slot="left" src="../../../assets/images/fightOrder/Ticketback-3@2x.png" alt="">
            </x-header>
            <div class="headput">
                <div class="putshofs">
                    <img src="../../../assets/images/search@1x.png" alt="">
                    <input type="text" placeholder="城市名或拼音" v-model="valsage" @input="searchCity">
                    <span v-if="!Cikey" class="emptyInput" @click="emptyInput"><span></span></span>
                </div>
            </div>
            <div class="Citybox">
                <div v-if="Cikey">
                    <div class="city">
                        <p><a href="#Dwrm">定位热门</a></p>
                        <p v-for="Cityitem in airCityData.CityArrAY" :key="Cityitem.title">
                            <a :href='"#"+Cityitem.title'>{{Cityitem.title}}</a>
                        </p>  
                    </div>
                 <!-- 内容开始 -->
                    <p class="LocationP">定位城市</p>
                    <!-- <router-link to="/TicketList">     -->
                      <div class="Location" @click="getLocation()">{{CAD}}</div>
                    <!-- </router-link> -->
                    <ul id="Dwrm">
                        <p  class="LocationP">热门城市</p>
                        <li class="Location Locationleft" v-for="Hot in airCityData.HotCityArr" :key="Hot.cityname" @click="chosedCity(Hot)">{{Hot.cityname}}</li>
                        <div class="clearfloat"></div>
                    </ul>  
                    <!-- v-if="Hotlist.Cityname != 0" -->
                    <ul class="cityList" :id='Hotlist.title' v-for="Hotlist in airCityData.CityArrAY" :key="Hotlist.LetterLetter">
                        <p class="LocationP">{{Hotlist.title}}</p>
                        <li v-for="(Hotname,i) in Hotlist.cities" :key='i' @click="chosedCity(Hotname)">{{Hotname.cityname}}</li>  
                    </ul>
                </div>
                <ul class="cityList" v-else> 
                    <li>推荐</li>
                    <li v-for="(Reco, i) in recommendCity" :key="i" @click="chosedCity(Reco)">{{Reco.cityname}}</li> 
                </ul>    
            </div>
        </popup>
    </div>
    
</template>
<script>

import CityArrAY from './aircity.json'


import XHeader from '../header'
import Popup from '../popup/index'

 export default {
    name: 'CityAddress',
    components: {
        XHeader,
        Popup
    },
    props: {
        showAddress: Boolean
    },
    data: function() {
        return {
            Cikey:true,
            Cikey1:false,
            CAD:"点击定位",
            valsage:"",
            //airCityData: CityArrAY,
            recommendCity: this.airCityData.HotCityArr        
        } 
    },
    props: {
        airCityData: Object,
        showAddress: Boolean
    },
    methods: {
        chosedCity(hot) {
            this.$emit('chose-address', hot)
        },
        getLocation(){
            let _this = this;

            //获取用户ip
            let ip = '';
            $.ajax({
                url: 'http://freegeoip.net/json/',
                success: function(data){
                    ip = JSON.stringify(data).split(':')[4].split(',')[0]
                    console.log(ip);
                },
                type: 'GET',
                dataType: 'JSON'
            });
            //根据ip定位           
            $.getJSON("http://api.map.baidu.com/location/ip?callback=?", {
                'ak' : 'x2CC5dtMtwjAAe6epLt2s1Kxs0BmSxPu',
                'coor' : 'bd09ll',
                'ip' : ip
            }, function(data) {
                // console.log(data);
                _this.CAD = data.content.address_detail.city.substring(0,2);
                // let lng=data.content.point.x;//经度
                // let lat=data.content.point.y;//纬度
            });
        },
        searchCity() {
            let Citstring = this.airCityData.CityArrAY
            let matchedCity = []
            if(this.valsage != ""){
                this.Cikey = false
                
                for(let i = 0; i < Citstring.length; i++){
                    for(let j = 0; j < Citstring[i].cities.length; j++) {
                        if(Citstring[i].cities[j].cityname.match(this.valsage)){
                            matchedCity.push(Citstring[i].cities[j])
                            this.recommendCity = matchedCity                        
                        }   
                    }
                                        
                }    
            }else {
                this.Cikey = true
                this.recommendCity = this.airCityData.HotCityArr
            }   
        },
        emptyInput() {
            this.valsage = ''
            this.Cikey = true
            this.recommendCity = this.airCityData.HotCityArr
        }
    }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">  
    .CityAddress{
        .shenshou-header {
            background: #ffffff;
            .header-left {
                margin-left: .08rem;
                vertical-align: middle;
            }
            .shenshou-header-title {
                color: #666;
            }
        }
        .headput{
            width: 100%;
            height: .35rem;
            position: fixed;
            z-index: 4;
            top: .4rem;
            background-color: #F3F3F3;
            .putshofs{
                width: 80%;
                margin-left: 10%;
                height: .25rem;
                margin-top: .05rem;
                background-color: #ffffff;
                border-radius: .06rem; 
                position: relative;
                img{
                    position: relative;
                    top: 0.03rem;
                    left: 0.05rem;
                    width: .15rem;
                }
                input{
                    position: relative;
                    width: 70%;
                    height: 100%;
                    top: 0rem;
                    left: .1rem;
                    border: 0;                
                }
                .emptyInput {
                    background-color: #BEBEBE;
                    text-align: center;
                    width: .15rem;
                    height: .15rem;
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: .08rem;
                    margin: auto;
                    span {
                        display: inline-block; 
                        width: .1rem;
                        height: .01rem; 
                        background: #fff;
                        line-height: 0;
                        font-size: 0;
                        vertical-align: middle;
                        transform: rotate(45deg);
                    } 
                    span:after {
                        content:'';
                        display: block;
                        width: .1rem;
                        height: .01rem; 
                        background: #fff;                    
                        transform: rotate(-90deg);
                    }
                }
                
            }
        }
        .Citybox{
            position: fixed;
            z-index: 4;
            width: 110%;
            top: .75rem;
            bottom:0;
            overflow-y: auto;
            overflow-x: hidden; 
            background-color: #fff; 
            .city{
                position: fixed;
                z-index:5;
                right: 0;
                width: .3rem;
                height: 100%;
                text-align:center;
                a{
                   text-decoration:none ;
                   font-size:.15rem;   
                   color:#919191;
                }
            }   
        }
        .LocationP{
           color:#8C8C8C;
           font-size: .16rem;
           width: 100%;
           margin: .08rem 0 .08rem 3%;
             
        }
        #Dwrm{
            width: 100%;   
        }
        .Location{
            width: 23%;
            height: .3rem;
            background-color: #F3F3F3;
            list-style: none; 
            margin: .05rem 0 0 3%;
            text-align:center;
            line-height: .3rem;
            font-size: .16rem; 
        }
        .Locationleft{
            float: left;
        }
        .clearfloat{
            clear:both ;
        }
        .cityList{
            width: 100%;
            height: auto;
            overflow: hidden;
        }
        .cityList li{
            width: 75%;
            margin-left:3%;
            height: .3rem;
            line-height: .3rem;
            border-bottom: 0.01rem solid #e4e4e4;
            font-size: .16rem; 
        } 
        
       
    }
    
</style>
