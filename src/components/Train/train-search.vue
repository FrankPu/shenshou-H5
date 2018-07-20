<template>
<div class="bgGray trainHome">
    <div class="bannerBox">
        <x-header :showBack="true" @go-back="goHome">
            <span slot="title">
                <div class="btnChange disFlex">
                    <p class="flex1"  :class="{active: isBusiness==1}" @click="isBusiness=1">因公</p>
                    <p class="flex1"  :class="{active: isBusiness==0}" @click="isBusiness=0">因私</p>
                </div>
            </span>
        </x-header>
    </div>
    <div class="searchBox">
        <div class="searMain">
            <div class="searchTitle disFlex" data-type="1">
                <p class="flex1 active"><span>火车票</span></p>
                <p class="flex1"><span>飞机票</span></p>
            </div>
            <div class="searchList trainPage">
                <div class="searchOne disFlex">
                    <p class="flex1" @click="showAddressPopup('start')">{{FromStation}}</p>
                    <p class="flex1 text-center" @click="addressChange()"><img src="~@/assets/images/index/homeTrain@2x.png" class="icon"/></p>
                    <p class="flex1 text-right" @click="showAddressPopup('end')">{{ArriveStation}}</p>
                </div>
                <div class="searchOne disFlex">
                    <p class="flex1" @click="showDatePicker">
                        <span>{{DepartureDate}}</span>
                        <span class="fontSize-2 fontLight ">{{getDepartureDateMark}}</span>
                    </p>
                </div>
                <group class="searchOne">
                    <x-switch title="只看高铁/动车" v-model="isHightSpeed"></x-switch>
                </group>
            </div>
            <div class="searchList flightPage">
                <div class="searchOne disFlex">
                    <p class="flex1">成都</p>
                    <p class="flex1 text-center"><img src="~@/assets/images/index/fly-icon@2x.png" class="icon"/></p>
                    <p class="flex1 text-right">上海</p>
                </div>
                <div class="searchOne disFlex">
                    <p class="flex1"><span>3月5日</span></p>
                </div>
                <div class="searchOne">
                    舱位不限
                </div>
            </div>
            <div class="searchBtn text-center trainPage">
                <button class="blueBtn search" @click="searchTrain">查询</button>
                <div class="fontLight trainHistory text-left" v-show="history.length>1"><span class="disFlex">{{history}}</span>  <span @click="cleanHistory()">清除全部</span></div>
            </div>

            <div class="searchBtn text-center flightPage">
                <button class="blueBtn search">搜索机票价格</button>
            </div>
        </div>
    </div>
    <div class="footer disFlex">
        <p class="flex1 text-center"><img src="~@/assets/images/index/icon111@2x.png" /><span>出行保障</span></p>
        <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/icon333@2x.png" /><span>标准退改</span></p>
        <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/icon222@2x.png" /><span>服务多样</span></p>
    </div>
    <city-address :airCityData="CityArrAY" :showAddress="showAddress" @chose-address="chosedCity" @go-back="closeAddressPopup"></city-address>
    <!-- 日历插件 -->
    <date-popup-picker :show="showDate" :currDate="currDate" :endLocal="endLocal" :startLocal="startLocal"
            :isOneWay="true" @close-date-picker='closeDatePicker' @go-back="goBack"></date-popup-picker>
</div>
</template>

<script>
import qs from 'qs'
import XHeader from '../common/header'
import CityArrAY from '../common/addressPicker/traincity.json'
import CityAddress from '../common/addressPicker/CityAddress'
import DatePopupPicker from '../common/datepicker-popup'
import { XSwitch, Group } from 'vux'

import { initDate, getDayCountOfMonth, getMonth, getDay, getYear, getWeekend, formatMonth, formatNum, formatDate, getAfterDate } from '../../utils/utils.js';

export default {
    data(){
        return {
            user: {},
            isBusiness: 1,
            FromStation: '成都',
            startLocal: 'CTU',
            ArriveStation: '西安',
            endLocal: 'XIY',
            DepartureDate: formatDate(new Date()),
            originDepartureDate: initDate(new Date()),
            isHightSpeed: false,
            history: '',
            showAddress: false,
            currAddressState: 'start',
            CityArrAY: CityArrAY,
            showDate: false,
            DepartureDateMark: '',
            currDate: [getAfterDate(new Date())],
            value: false
        }
    },
    computed: {
        getDepartureDateMark() {
            if(this.DepartureDate == formatDate(new Date())) {
                return '今天'
            } else if(this.originDepartureDate == getAfterDate(new Date(), 1)) {
                return '明天'
            } else if(this.originDepartureDate == getAfterDate(new Date(), 2)) {
                return '后天'
            } else {
                return '周' + getWeekend(this.originDepartureDate)
            }
        }
    },
    methods:{
        goHome(){
            this.$router.push('/homepage');
        },
        addressChange(){
            let _start = this.FromStation;
            let _end = this.ArriveStation;
            this.FromStation = _end;
            this.ArriveStation = _start;
        },
        cleanHistory(){
            this.history = ''
        },
        searchTrain(){
            // 增加历史记录
            this.history+=` ${this.FromStation}-${this.ArriveStation} `
            // 搜索信息存入session
           this.$storage.setSession('trainSearchData', {
                FromStation: this.FromStation,
                ArriveStation: this.ArriveStation,
                DepartureDate: this.DepartureDate,
                Token:this.$storage.getSession('userMess').Token,
                originDepartureDate: this.originDepartureDate,
                isHightSpeed: this.isHightSpeed,
                isBusiness: this.isBusiness
            })
            this.$router.push({path: '/trainlist', query: {
                FromStation: this.FromStation,
                startLocal: this.startLocal,
                ArriveStation: this.ArriveStation,
                endLocal: this.endLocal,
                originDepartureDate: this.originDepartureDate,
                isBusiness: this.isBusiness,
                isHightSpeed: this.isHightSpeed
            }})
        },
        chosedCity(city) {
            if(this.currAddressState == 'start') {
                this.startLocal = city.szm
                this.FromStation = city.cityname
            } else {
                this.endLocal = city.szm
                this.ArriveStation = city.cityname
            }
            this.showAddress = false
        },
        closeAddressPopup() {
            this.showAddress = false
        },
        showAddressPopup(type){
            this.currAddressState = type
            this.showAddress = true
        },
        showDatePicker() {
            this.showDate = true
        },
        closeDatePicker(item) {
            this.showDate = false
            this.originDepartureDate = item.DepartDate
            this.DepartureDate = formatDate(item.DepartDate)
            this.currDate[0] = item.DepartDat
        },
        goBack() {
            this.showDate = false;
        },
    },
    created(){
        this.user = this.$storage.getSession('userMess')
    },
    components:{
        XHeader,
        CityAddress,
        DatePopupPicker,
        XSwitch,
        Group
    }
}
</script>

<style scoped>
@import '../../assets/css/test.css';

.trainHome .bannerBox {
    margin-top: .4rem;
	background: url("~@/assets/images/index/banner@2x.png") no-repeat;
	background-size: 100% 100%;
}

.trainHome .searchBox {
	top: 1.625rem;
}

.trainHome .searchBox .trainHistory {
	padding-left: 0.08rem;
	line-height: .32rem;
	letter-spacing: 0;
	margin-top: -.208rem;
}

.trainHome .searchBox .twoCheckOne {
	width: .64rem;
	text-align: center;
}

.trainHome .flightPage {
	display: none;
}

</style>
