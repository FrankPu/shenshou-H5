<template>
    <div class="flightSearch">
        <div class="bannerBox">
            <x-header :showBack="true" @go-back="backHome">
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
                <div class="searchTitle disFlex"  data-type="0">
                    <p class="flex1" :class="{active:isOneWay==true}" @click="isOneWay=true">
                        <span :class="{btn_active: isOneWay==true}">单程</span>
                    </p>
                    <p class="flex1" :class="{active:isOneWay==false}" @click="isOneWay=false">
                        <span :class="{btn_active: isOneWay==false}">往返</span>
                    </p>
                </div>
                <div class="searchList">
                    <div class="searchOne disFlex">
                        <p class="flex1" id="departCity" @click="showAddressPopup('start')">{{startName}}</p>
                        <p class="flex1 text-center flyBg">
                            <img src="~@/assets/images/index/fly-icon@2x.png" class="icon transitonTrans" @click="addressChange()" />
                        </p>
                        <p class="flex1 text-right"  id="arriveCity" @click="showAddressPopup('end')">{{endName}}</p>
                    </div>
                    <div class="searchOne disFlex">
                        <p class="flex1" @click="showDatePicker('start')">
                            <span>{{formatDepartDate}}</span>
                            <span class="fontSize-2 fontLight" v-if="!isOneWay">去</span>
                        </p>
                        <p class="flex1 text-right" v-show="!isOneWay" @click="showDatePicker('return')">
                            <span >{{formarArriveDate}}</span>
                            <span class="fontSize-2 fontLight">返</span>
                        </p>
                    </div>
                    <div class="searchOne" @click="openCabinPopup">{{cabin}}</div>
                </div>
                <div class="searchBtn text-center">
                    <button class="blueBtn search"  @click="searchFlight">搜索机票价格</button>
                </div>
            </div>
        </div>
        <div class="footer disFlex">
            <p class="flex1 text-center"><img src="~@/assets/images/index/icon3@2x.png" /><span>航协认证</span></p>
            <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/icon2@2x.png" /><span>支付安全</span></p>
            <p class="flex1 text-center iconvgiLine"><img src="~@/assets/images/index/icon1@2x.png" /><span>出票保障</span></p>
        </div>
        <date-popup-picker :show="show" :currDate="currDate" :currState="currState" :endLocal="endLocal" :startLocal="startLocal"
            :isOneWay="isOneWay" @close-date-picker='closeDatePicker' @go-back="goBack">
        </date-popup-picker>
        <city-address :airCityData="CityArrAY" :showAddress="showAddress" @chose-address="chosedCity" @go-back="closeAddressPopup"></city-address>
        <div class="cabinChosePopup">
            <popup v-model="showCabinPopup" :height="'1.73rem'" :width="'1.9rem'">
                <div class="cabinChoseTitle">舱位选择</div>
                <ul class="cabinList">
                    <li :class="['cabinItem', {'cabinChecked': index === currCabinIndex}]" v-for="(item, index) in cabinData" :key="index" @click="choseCabin(item, index)">{{item.CabinDescribeName}}</li>
                </ul>
            </popup>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import DatePopupPicker from '../common/datepicker-popup'
import CityAddress from '../common/addressPicker/CityAddress'
import Popup from '../common/popup/index'
import XHeader from '../common/header'

import CityArrAY from '../common/addressPicker/aircity.json'

import { mapGetters, mapActions, mapState  } from 'vuex'

import { initDate, getDayCountOfMonth, getMonth, getDay, getYear, getWeekend, formatMonth, formatNum, formatDate, getAfterDate } from '../../utils/utils.js';

export default {
    data () {
        return {
            userData:{},
            isBusiness: 1,
            isOneWay : true,
            startLocal:'CTU',
            startName: '成都',
            endLocal:'SHS',
            endName: '上海',
            show: false,
            dateListData: [],
            allDate: [],
            currState: 'start',
            showAddress: false,
            currAddressState: 'start',
            cabin: '舱位不限',
            showCabinPopup: false,
            cabinData: [{
                CabinDescribeName: '不限',
                CabinLevel: '0'
            }, {
                CabinDescribeName: '经济舱',
                CabinLevel: '1'
            }, {
                CabinDescribeName: '公务舱', 
                CabinLevel: '2'
            }, {
                CabinDescribeName: '头等舱',
                CabinLevel: '3'
            }],
            currCabinIndex: 0,
            //currDate: [initDate(new Date()), getAfterDate(new Date(), 3)],
            currDate: [initDate(new Date())],
            DepartDate: initDate(new Date()),
            ArriveDate: getAfterDate(new Date(), 3),
            CityArrAY: CityArrAY,
            cabinLevel: '不限'
        }
    },
    components: {
        DatePopupPicker,
        CityAddress,
        Popup,
        XHeader
    },
    computed: {
        formatDepartDate() {
            return formatDate(this.DepartDate)
        },
        formarArriveDate() {
            return formatDate(this.ArriveDate)
        }
    },
    methods: {
        backHome(){
            this.$router.push({path: '/homepage'})
        },
        goBack() {
            this.show = false;
        },
        closeAddressPopup() {
            this.showAddress = false
        },
        showAddressPopup(type){
            this.currAddressState = type
            this.showAddress = true
        },
        openCabinPopup() {
            this.showCabinPopup = true
        },
        chosedCity(city) {
            if(this.currAddressState == 'start') {
                this.startLocal = city.szm
                this.startName = city.cityname
            } else {
                this.endLocal = city.szm
                this.endName = city.cityname
            }
            this.showAddress = false
        },
        choseCabin(item, index) {
            this.showCabinPopup = false
            this.currCabinIndex = index
            this.cabinLevel = item.CabinDescribeName
            this.cabin = item.CabinDescribeName == '不限' ? '舱位不限' : item.CabinDescribeName
        },
        formateAllDate(type, date) {            
            let year = getYear(date)
            let month = getMonth(date)            
            let monthNum = getDayCountOfMonth(year, month)    //当前月一共多少天         
            let len = type == 'first' ? getDay(date) : monthNum - getDay(date)          
            return formatMonth(type, len, getDay(date), year, month)
        },
        closeDatePicker(item) {
            if(this.isOneWay) {
                this.show = false
                this.DepartDate = item.DepartDate
                this.currDate[0] = item.DepartDate

            } else {
                if(this.currState == 'start') {
                    this.DepartDate = item.DepartDate
                    this.currDate[0] = item.DepartDate
                    this.currState = 'end'
                    this.currDate = [...this.currDate]
                } else {
                    if(new Date(this.currDate[0]).getTime() > new Date(item.DepartDate).getTime()) {
                        this.currState = 'start'
                        this.DepartDate = item.DepartDate
                        this.currDate[0] = this.DepartDate
                        this.currDate = [...this.currDate]
                        return
                    } else {
                        this.ArriveDate = item.DepartDate
                        this.currDate[1] = this.ArriveDate
                        this.currDate = [...this.currDate]
                        this.show = false
                    }
                    
                }
            }
        },
        showDatePicker(type) {
            this.show = true
            this.currState = type
            this.currDate = [this.DepartDate]
        },
        addressChange() {
            let _start = this.startName;
            let _end = this.endName;

            this.startName = _end;
            this.endName = _start;
        },
        searchFlight(){
            let userData = this.$storage.getSession('userMess');


            this.$storage.setSession('flightSearchData', {
                isBusiness: this.isBusiness,
                isOneWay: this.isOneWay,
                DepartCityCode : this.startLocal,
                ArriveCityCode: this.endLocal,
                DepartDate: this.DepartDate,
                VoyageDate: this.ArriveDate,    //返程时间
                DepartCityName: this.startName,
                ArriveCityName: this.endName,
                VoyageType: 1,          //1去程2返程
                CompanyId: userData.CompanyId,
                AgentId: userData.AgentId,
                UserId: userData.UserId,
                BookPermission: userData.BookPermission,
                EmpId: userData.EmpId
            })


            let query = {
                isBusiness: this.isBusiness,
                isOneWay: this.isOneWay,
                DepartCityCode : this.startLocal,
                ArriveCityCode: this.endLocal,
                DepartDate: this.DepartDate,
                VoyageDate: this.ArriveDate,    //返程时间
                DepartCityName: this.startName,
                ArriveCityName: this.endName,
                CabinLevel: this.cabinLevel
            }
            if(this.isOneWay==0){
                this.$router.push({path: '/flightdoublego', query: query})
            }else{
                this.$router.push({path: 'ticketindex', query: query})
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../../assets/css/test.css'; 

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
	color: #2f2f2f;
	opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
	color: #2f2f2f;
	opacity: 1;
}

input:-ms-input-placeholder {
	color: #2f2f2f;
	opacity: 1;
}

input::-webkit-input-placeholder {
	color: #2f2f2f;
	opacity: 1;
}


.flightSearch {
    .cabinChoseTitle {
        color: #1474E8;
        padding: .1rem .08rem;
        font-size: .14rem;
        border-bottom: solid .02rem #1474E8;
    }
    .cabinList {
        color: #757575;
        font-size: .14rem;
        .cabinItem {
            padding: .08rem;
            border: solid .01rem #F6F6F7;
            position: relative;
        }
        .cabinChecked:after {
                content: '';
                display: inline-block;
                border: .02rem solid #1474E8;
                border-top-width: 0;
                border-right-width: 0; 
                width: .12rem;
                height: .06rem;
                transform: rotate(-50deg);
                position: absolute;
                top: .1rem;
                right: .08rem;
            }
    }
}


.bgGray {
	background: #eeeeee;
	letter-spacing: 0.16rem;
}

.bannerBox {
    margin-top: .4rem;
	padding-top: 0.8rem;
	width: 100%;
	height: 1.6rem;
	background: url("~@/assets/images/index/fly-banner@2x.png") no-repeat;
	background-size: 100% 100%;
}

.searchTitle p {
	width:50%;
	height:100%;
}
</style>
