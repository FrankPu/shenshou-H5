<template>
<div class="bgGray hotleHome">
    <!-- header和背景图 -->
    <div class="bannerBox">
        <x-header :showBack="true" @go-back="goBack">
            <span slot="title">
                <div class="btnChange disFlex">
                    <p class="flex1"  :class="{active: isBusiness==true}" @click="isBusiness=true">因公</p>
                    <p class="flex1"  :class="{active: isBusiness==false}" @click="isBusiness=false">因私</p>
                </div>
            </span>
        </x-header>
    </div>
    <!-- search -->
    <div class="searchBox">
        <div class="searMain">
            <div class="searchList">
                <!-- 地点 -->
                <div class="searchHtoelAddr disFlex">
                    <div class="flex1 text-center">
                        <p class="fontLight fontSize-4 gotoAdrs" @click="showAddressPopup('start')">目的地</p>
                        <p class="startName">{{startName}}</p>
                    </div>
                    <div class="currentAddress text-center blueStateFont flex1" @click="getLocation()">
                        <img src="~@/assets/images/index/Location-icon@2x.png" class="blueAdree"/>
                        <p class="fontSize-4 gotoAdrs">我的位置</p>
                    </div>
                </div>
                <!-- 日期 -->
                <div class="searchOne disFlex"  id="changeHotelDate">
                    <p class="flex1 fontSize-6">
                        <!-- <span><input type="text" placeholder="01-02" class="dateInput" id="startDate"></span> -->
                        <span class="detaInput" @click="showDatePicker('start')">{{checkInTime}}</span>
                        <span class="fontLight fontSize-1">{{getDepartureDateMark(checkInTime)}}</span>
                        -
                        <!-- <span><input type="text" placeholder="01-03" class="dateInput" id="endDate"></span> -->
                        <span class="detaInput" @click="showDatePicker('return')">{{checkOutTime}}</span>
                        <span class="fontLight fontSize-1">{{getDepartureDateMark(checkOutTime)}}</span>
                        <span class="fontSize-1 fontLight">(共<span id="allDay">{{getDaysNum}}</span>晚)</span>
                    </p>
                </div>
                <!-- 关键字 -->
                <div class="searchOne" @click="showPopup()">
                    <input class="noborderInput" v-model="keyWords.Name" placeholder="关键字/位置/品牌/酒店名" type="text"/>
                </div>
                <!-- 价位 -->
                <div class="searchOne">
                    <input class="noborderInput" placeholder="价格/星级" type="text" @click="hotelFilter()" />
                </div>
            </div>
            <!-- 搜索按钮 -->
            <div class="searchBtn text-center">
                <button class="search blueBtn" @click="searchHotel()">搜索酒店价格</button>
            </div>
        </div>
        <div class="favAndHistory disFlex text-center">
            <p class="flex1 fontSize-6"><img src="~@/assets/images/index/Collection-icon@2x.png" alt="" class="icon">我的收藏</p>
            <p class="flex1 fontSize-6" @click="goOrder()"><img src="~@/assets/images/index/Order-icon@2x.png" alt="" class="icon">我的订单</p>
        </div>
    </div>
    <!-- footer -->
    <div class="footer disFlex">
        <p class="flex1 text-center"><img src="~@/assets/images/index/guarantee@2x.png" /><span>预定保障</span></p>
        <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/lightning@2x.png" /><span>闪电发货</span></p>
        <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/Tothestore@2x.png" /><span>到店有房</span></p>
    </div>
    <div class="calendar"></div>
    <!-- 过滤器弹出层 -->
    <div class="bottom-filter" v-show="isFilter">
        <div class="fade" @click="offFilter()"></div>
        <div class="hotelFilter">
            <div class="filterBtn disFlex">
                <p class="flex1 text-center" style="color: #1a77e1;" @click="cleanChoose()">清空</p>
                <p class="flex1 text-center filterBtnAc" @click="confirmChoose()">确认</p>
            </div>
            <div class="starFilter">
                <p class="starTitle darkGrayFont">星级</p>
                <div class="star1 disFlex" style="flex-wrap: wrap;">
                    <div class="filter" :class="{isfilter:starData.isActive}"   v-for="(starData,index) in star_filter_data" :key="index" @click="selectStar(index)">{{starData.Name}}</div>
                </div>
            </div>
            <div class="priceFilter darkGrayFont">
                <!-- 酒店价格区间滑块 -->
                <div class="range">
                    <p class="priceTitle">价格</p>
                    <p class="showPrice clearfix">
                    <span>￥{{rangePrice[0]}}</span>
                    <span class="rangespan">
                        {{maxPrice===rangePrice[1]?'不限':'￥'+rangePrice[1]}}
                    </span>
                    </p>
                   <Slider :tip-format="format" v-model="rangePrice" range :max="maxPrice"></Slider> 
                </div>
                <div class="priceArea disFlex" style="flex-wrap: wrap; color:#000">
                    <p class="filter" v-for="priceData in price_filter_data" :key="priceData.type" @click="selectPrice(priceData.type,priceData.name)" >{{priceData.name}}</p>
                </div>
            </div>
            
        </div>
    </div>
    <!-- 关键字搜索弹层 -->
    <hotelsearc ref="child" :areaMess="citybox" :searchshow="searchshow" @heateimg="heateimg" @chose-key-word="choseKeyWord"></hotelsearc>
    
    <!-- 城市弹出层 -->
    <city-address :airCityData="CityArrAY" :showAddress="showAddress" @chose-address="chosedCity" @go-back="closeAddressPopup"></city-address>
        
    <!-- 日历插件 -->
    <date-popup-picker :show="show" :currDate="currDate" :currState="currState" :endLocal="endLocal" :startLocal="startLocal"
            :isOneWay="false" @close-date-picker='closeDatePicker' @go-back="goBack">
    </date-popup-picker>                
</div>
</template>

<script>
import qs from 'qs'
import XHeader from '../common/header'
import Hotelsearc from './keyword-search'
import Popup from '../common/popup/index'
import DatePopupPicker from '../common/datepicker-popup'
import CityAddress from '../common/addressPicker/CityAddress'
import CityArrAY from '../../assets/json/hotelcity.json'

import { mapGetters, mapActions, mapState  } from 'vuex'
import { initDate, getWeekend, getAfterDate, getDayNum } from '../../utils/utils.js';

// 价格区间滑块
 import {Slider} from 'iview'
 import 'iview/dist/styles/iview.css'
export default {
    data(){
        return {
            show: false,    //日历插件的显示
            CityArrAY: CityArrAY,
            showAddress: false,     
            searchshow: false,    
            isBusiness: true, //因公/私
            isFilter: false,
            startName: '成都',//城市
            startLocal:"CTU", //城市三字码
            endLocal: "XIY",
            star_filter_data:[],
            price_filter_data:[
                {name:'￥150以下', type:'150less'},
                {name:'￥150-250', type:'250'},
                {name:'￥250-400', type:'400'},
                {name:'￥400-450', type:'450'},
                {name:'￥450-700', type:'700'},
                {name:'￥700以上', type:'700more'}
            ],
            selectedStar:'all',
            selectedPrice:'',
            user:{},
            citybox:{
                AreaId:"",
                cityname:"成都",
                cityid:"2511",
                pinyin:"ChengDu",
                py:"CD",
                szm:"CTU",
            },//城市集合
            startlevel:"",//星级
            startpirev:"",//价格
            keyWords:"",//关键字
            currDate: [initDate(new Date())],//时间
            checkInTime: initDate(new Date()),         //入住时间
            checkOutTime: getAfterDate(new Date(), 1),          //出时间
            // 酒店滑块值范围
            rangePrice: [0, 700],
            maxPrice: 700,
            currState:'start',
            listSearchCriteria:[],
        }
    },
    computed: {
        getDaysNum() {
            let startTime = this.checkInTime
            let endTime = this.checkOutTime
            return getDayNum(startTime, endTime)
        }
    },
    created(){ 
           this.HotelScreen()
    },
    methods:{
          //点击进入列表页面
        getDepartureDateMark(date) {
            if(date == initDate(new Date())) {
                return '今天'
            } else if(date == getAfterDate(new Date(), 1)) {
                return '明天'
            } else if(date == getAfterDate(new Date(), 2)) {
                return '后天'
            } else {
                return '周' + getWeekend(date)
            }
        },
        searchHotel(){
            this.user = this.$storage.getSession('userMess');//用户信息
            let reqParams = {//当前页获取的基本信息
                // Keyword:'',
                ChildFacilityCodeStr:'',
                LatitudeAndlongitudeStr:'',
                SortType:'',
                StarLevelStr:'',       
                HotelBrandIdStr:'',
                OneMoney:this.rangePrice[0],//最低价格
                TwoMoney:this.rangePrice[1],//最高价格
                isBusiness:this.isBusiness,//因公还是因私 
                citybox:this.citybox,//城市集合参数
                CheckInDate: this.checkInTime,     //   入住时间
                CheckOutDate: this.checkOutTime,      //搬出时间
                Keyword:this.keyWords,//搜索关键字
                listSearchCriteria:this.listSearchCriteria,//集合数组              
            }
            
            this.$storage.setSession('hotelSearchData', reqParams);     //存入酒店搜索信息
            this.$router.push({
                path:'/hotellist',
                query: reqParams
            })
         
        },
        HotelScreen(){
            let  HotelScreen2 ={
                UserId:this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                CityName:this.citybox.cityname,
                CityId:this.citybox.cityid,
                AreaId:this.citybox.AreaId,   
            }
            this.$axios.post('/HotelFilter/GetHotleInfoFilterNew', qs.stringify(HotelScreen2)).then((res) => { 
                this.star_filter_data = res.data.Result.listStarSearch
                this.star_filter_data.map(item => {item.isActive = false})  
                this.star_filter_data[0].isActive = true//listStarSearch 星级价格
               
            }) 
        },
        goBack() {
            this.$router.go(-1);
        },
        showPopup() {//打开搜索
            this.searchshow = true
            this.$refs.child.ketpage(this.citybox)
        },
        heateimg(){//关闭搜索
			this.searchshow = false
        },
        showAddressPopup(type){//城市弹窗
            this.showAddress = true
            this.currAddressState = type
        },
        closeAddressPopup() {//关闭尝试弹窗
            this.showAddress = false
        },
        chosedCity(city) {//城市获取的地址和城市三字码   
            this.citybox = city
           
            this.startLocal = city.szm
            this.startName = city.cityname
            this.showAddress = false   
        },
      
        hotelFilter(){//星级价格弹窗
            this.isFilter = true;
        },
        offFilter(){//星级价格弹窗
            this.isFilter = false;
        },
        selectStar(index){//星级
            this.star_filter_data = [...this.star_filter_data]
            let Resetarray = this.star_filter_data
            if(index == 0){        
                Resetarray.map(item => {
                    item.isActive = false
                })  
                Resetarray[index].isActive = true  
            }else{
                Resetarray[0].isActive =false
                Resetarray[index].isActive =! Resetarray[index].isActive  
                let cunt = 0
                Resetarray.map(item => {
                    if(item.isActive) cunt ++
                })
                if(cunt === 0) {
                    Resetarray[0].isActive = true  
                }
            }
        },
        selectPrice(type,name){//价格
            this.startpirev = name
            this.selectedPrice = type;
        },
        cleanChoose(){//清除按钮
            this.selectedStar = 'all';
            this.selectedPrice = '';
            this.star_filter_data.map(item => {item.isActive = false})  
            this.rangePrice=[0, 700]
        },
        confirmChoose(){//点击确定确定按钮
            this.isFilter = false;
            let a = this.star_filter_data.filter(item => {
                return item.isActive == true && item.Name != "不限"
            })
            this.listSearchCriteria = a 
        },
        goOrder(){
            this.$router.push('/myorder');
        },
        closeDatePicker(item) {
            if(this.isOneWay) {
                this.show = false
                this.checkInTime = item.DepartDate
                this.currDate[0] = item.DepartDate
            } else {
                if(this.currState == 'start') {
                    this.checkInTime = item.DepartDate
                    this.currDate[0] = item.DepartDate
                    this.currState = 'end'
                    this.currDate = [...this.currDate]
                } else {
                    if(new Date(this.currDate[0]).getTime() > new Date(item.DepartDate).getTime()) {
                        this.currState = 'start'
                        this.checkInTime = item.DepartDate
                        this.currDate[0] = this.DepartDate
                        this.currDate = [...this.currDate]
                        return
                    } else {
                        this.checkOutTime = item.DepartDate
                        this.currDate[1] = this.checkOutTime
                        this.currDate = [...this.currDate]
                        this.show = false
                    }
                    
                }
            }
        },
        getLocation(){
            let _this = this;
            //获取用户ip
            let ip = '';
            $.ajax({
                url: 'http://freegeoip.net/json/',
                success: function(data){
                    ip = JSON.stringify(data).split(':')[4].split(',')[0]
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
                _this.startName = data.content.address_detail.city.substring(0,2);
                // let lng=data.content.point.x;//经度
                // let lat=data.content.point.y;//纬度
            });
        },
        showDatePicker(type) {
            this.show = true
            this.currState = type
            this.currDate = [this.DepartDate]
        },                
        
        // 酒店价格区间 
        format(val) {
            return "￥" + val;
        },
        choseKeyWord(data) {
          
            this.searchshow = false
            this.keyWords = data
        }
    },

    // 监听酒店价格区间值变化
    // watch: {
    //     rangePrice(newVal, oldVal) {
    //     console.log(`价格范围在${newVal[0]}-${newVal[1]}之间`);
    //     }
    //},
    components:{
        XHeader,
        DatePopupPicker,
        CityAddress,
        Popup,
        Slider,
        Hotelsearc
    }
}
</script>

<style  lang="less">
@import '../../assets/css/test.css';

.search {
    margin: .208rem;
	font-size: .128rem;
	letter-spacing: 0.016rem;
	width: 90%;
	height: .4rem;
    border-radius: 0.04rem;
}
.hotleHome{
    .ivu-slider-button {
                width: 20px;
                height: 20px;
                border: 2px solid #4395FF;
                border-radius: 50%;
                background-color: #fff;
                margin-top: -3px;
    }
    .range{
        width:95%;
        margin-left:2.5%;
       span{
            color:#000000;
       }
        .rangespan{
            float: right;
        }
        .star1{
            width: .29rem;
        }
}
}

.bannerBox {
    margin-top: .4rem;
	background: url("~@/assets/images/index/Hotel-banner@2x.png") no-repeat;
	background-size: 100% 100%;
}

.hotleHome .searchBox {
    top: 1.538rem;
}

.hotleHome .searchBox .noborderInput {
	border: none;
	height: 80%;
	width: 100%;
}

.hotleHome .searchBox .searchHtoelAddr {
	height: .464rem;
	padding: 0.096rem .12rem 0;
	border-bottom: 1px solid #e2e2e2;
}
.startName{
    width: 100%;
    text-overflow:ellipsis; 
    overflow:hidden; 
    white-space: nowrap;
}
.hotleHome .searchBox .searchHtoelAddr .gotoAdrs {
	line-height: .144rem;
}

.hotleHome .searchBox .searchHtoelAddr .currentAddress {
	width: .64rem;
	letter-spacing: 0;
}

.hotleHome .searchBox .searchHtoelAddr .currentAddress .blueAdree {
	width: .128rem;
	height: .128rem;
	margin: 0 auto;
}
.isfilter{
    border: 1px solid #4395FF;
    background-color: #ffffff;
}
.hotleHome .favAndHistory {
	width: 90%;
	margin: 0 auto;
	margin-top: 0.04rem;
	height: .36rem;
	padding: 0.04rem 0;
	background: #ffffff;
	line-height: .28rem;
	letter-spacing: 0;
    border-radius: 0.04rem;
}
.hotleHome .favAndHistory .icon {
	width: .112rem;
	height: .112rem;
	margin-right: 0.04rem;
}
</style>
