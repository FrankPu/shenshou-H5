<template>
    <div class="oneWayFlightView">
        <x-header :showBack="true" @go-back="goBack">
            <span slot="title">
                {{query.departCityName}}
                <img src="../../assets/images/icon/flight@1x.png" class="titleIcon" />
                {{query.arriveCityName}}
            </span>
        </x-header>
        <!-- 顶部日历 -->
        <date-picker @chosed-flight-list="chosedFlightList" :minPrice="minPrice" :endLocal="query.arriveCityCode"
                     :startLocal="query.departCityCode" :currDate="currDate" :isOneWay="query.isOneWay" :VoyageType="1"></date-picker>
        <!-- 机票列表 -->
        <loading v-if="oneWayflightListInfo.fetching"></loading>
        <ticket-list v-else :ticketData="oneWayflightListInfo.flightResponse" 
            :minPrice="minPrice" :isBusiness="isBusiness" @to-flight-detail="toFlightDetail"></ticket-list>
        <!-- 底部筛选 -->

        <search-popup :searchData="oneWayflightListInfo.searchDetial" @filter-flight-list="filterFlightList" 
            :fetching="oneWayflightListInfo.fetching" @sort-flight-list="sortFlightList">
        </search-popup>
        <div class="irregularPopup" v-if="isBusiness && isIllegalMess">
            <popup v-model="isShowIrregularPopup">
                <p class="title">前60分钟内最低价航班</p>
                <div v-html="isIllegalMess.replace(/\@/g, '<br/>')" class="isIllegalMess"></div>
                <ul class="minPriceFlightList">
                    <li class="minPriceFlightItem" v-for="(item, index) in getMinPriceFlightDate" :key="index">
                        <span class="time">{{item.DepartTime}}-{{item.ArriveTime}}</span>
                        <span class="airlineName">{{item.AirlineName}}</span>
                        <span class="flightNo">{{item.FlightNo}}</span>
                        <span class="price">￥{{item.TicketPrice}}</span>
                    </li>
                </ul>
                <div class="btn" @click="ignoreClick">忽略</div>
            </popup>
        </div>
    </div>
</template>

<script>
import TicketList from '../commonBusComponents/ticketList/ticket-list'
import SearchPopup from './search-popup'
import XHeader from '../common/header'
import DatePicker from '../common/datepicker'
import Popup from '../common/popup/index'
import Loading from '../common/loading'

import { mapGetters, mapActions, mapState  } from 'vuex'

import qs from 'qs'

export default {
    name: "ticketIndex",
    data() {
        return {
            ticketData: [],
            saveTicketData: [],
            isShowIrregularPopup: false,
            minPriceFlightData: [],
            isIllegalMess: '',
            isBusiness: parseInt(this.$route.query.isBusiness, 10),
            currDate: [this.$route.query.DepartDate,this.$route.query.ArriveDate],
            userMess: this.$storage.getSession('userMess'),
            query: {
                departCityCode : this.$route.query.DepartCityCode,
                arriveCityCode: this.$route.query.ArriveCityCode,
                isOneWay: this.$route.query.isOneWay,
                departDate: this.$route.query.DepartDate,
                voyageDate: this.$route.query.VoyageDate,    //返程时间
                departCityName: this.$route.query.DepartCityName,
                arriveCityName: this.$route.query.ArriveCityName,
            }
            
        }
    },
    computed: {
        ...mapState([
            'oneWayflightListInfo'
        ]),
        ...mapGetters([
            'minPrice'
        ]),
        getMinPriceFlightDate() {
            let minPriceFlightData =[]
            if(!this.oneWayflightListInfo.fetching) {
                minPriceFlightData = this.oneWayflightListInfo.originFlightList.filter((item, index) => {
                    return item.TicketPrice == this.minPrice
                })
            }           
            return minPriceFlightData
        }
    },
    created() {
        let params = {
            isBusiness: this.isBusiness,
            isOneWay: this.query.isOneWay,
            DepartCityCode : this.query.departCityCode,
            ArriveCityCode: this.query.arriveCityCode,
            DepartDate: this.query.departDate,
            VoyageDate: this.voyageDate,    //返程时间
            DepartCityName: this.departCityName,
            ArriveCityName: this.arriveCityName,
            VoyageType: 1,          //1去程2返程
            CompanyId: this.userMess.CompanyId,
            AgentId: this.userMess.AgentId,
            UserId: this.userMess.UserId,
            BookPermission: this.userMess.BookPermission,
            EmpId: this.userMess.EmpId
        }
        this.getFlightListDate(params, true)
    },
   
    components: {
        TicketList,
        SearchPopup,
        XHeader,
        DatePicker,
        Popup,
        Loading
    },
    methods: {
        getFlightListDate(flightSearchData, isInit) {
            // 单程-因公
            let url = flightSearchData.isBusiness ? '/FlightInfo/PublicFlightInfoSearch' : '/FlightInfo/FlightInfoSearch'
            let flightListParams = {
                url: url,
                params: flightSearchData
            }
            this.$store.dispatch('getOneWayFlightList', flightListParams)
        },
        toFlightDetail(item, index) {
            this.$storage.setSession('ticketData', item);
            this.isIllegalMess = item.Message
            if(this.isBusiness) {
                if(item.TicketPrice > this.minPrice) {
                    this.isShowIrregularPopup = true
                } else {
                    this.$router.push('/flightdetail');
                }
            } else {
                this.$router.push('/flightdetail');
            }            
        },
        ignoreClick() {
            this.$router.push('/flightdetail');
        },
        goBack() {
            this.$router.push('/flightsearch');
        },
        chosedFlightList(val, index) {
            let flightSearchData = this.$storage.getSession('flightSearchData')
            flightSearchData.DepartDate = val.DepartDate

            this.$storage.setSession('flightSearchData', flightSearchData)

            this.currDate[0] = val.DepartDate
            this.currDate = [...this.currDate]            
            this.getFlightListDate(flightSearchData, false)           
        },
        getMinPrice() {          
            let min = this.oneWayflightListInfo.originFlightList[0].TicketPrice            
            for(let i = 0; i < this.oneWayflightListInfo.originFlightList.length; i++) {
                let item = this.oneWayflightListInfo.originFlightList[i]
                if(item.TicketPrice < min) {
                    min = item.TicketPrice
                }
            }       
            return min
        },
        sortFlightList(type, mode) {           
            let data = {
                type: type,
                mode: mode
            }
            this.$store.commit('SORT_FLIGHT_LIST_SUCCESS', data)
        },
        filterFlightList(search) {
            this.$store.commit('FILTER_FLIGHT_LIST_SUCCESS', search)
        },
        closeSearchPopup() {
            this.show = false
        }
    }
}
</script>

<style scoped lang="less">
    .oneWayFlightView {
        padding-bottom: .45rem;
        .ticketList {
            top: 1.3rem;
        }
        .irregularPopup {
            border: solid 1px red;
            .title {
                background-color: #F2F1F6;
                padding: .08rem;
                text-align: center;
                font-size: .14rem;
                color: #2B77D0;
                border-bottom: solid .025rem #2B77D0;
            }
            .isIllegalMess {
                color: #383838;
                padding: .06rem .12rem;
                border-bottom: solid 1px #F5F5F6;
            }
            .minPriceFlightList {
                .minPriceFlightItem {
                    padding: .12rem;
                    border-bottom: solid 1px #F4F4F5;
                    .time {
                        color: #353535;
                    }
                    .airlineName {
                        color: #747474;
                        margin-left: .08rem;
                    }
                    .flightNo {
                        color: #6D6D6D;
                        margin-left: .04rem;
                    }
                    .price {
                        color: #F95860;
                        margin-left: .04rem;
                    }
                }
            }
            
            .btn {
                background-color: #2275DE;
                color: #fff;
                //position: absolute;
                margin-top: .04rem;
                margin-left: 75%;
                text-align: center;
                width: .5rem;
                height: .2rem;
                line-height: .2rem;
                border-radius: 4px;  
                margin-bottom: .1rem;             
            }
        }
    }
</style>
