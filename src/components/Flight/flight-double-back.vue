<template>
    <div class="flightBackView">
        <x-header :showBack="true" :showRight="true" @go-back="goBack">
            <span slot="title">
                选返程:{{flightSearchData.ArriveCityName}}
                <img src="~@/assets/images/icon/flight@1x.png" class="titleIcon" />
                {{flightSearchData.DepartCityName}}
            </span>
        </x-header>
        <div class="voyagePtompt">
            <span class="go">去</span>
            <span class="goDate">{{getFormatDate(goFlightMess.DepartDate)}}</span>
            <span class="goTime">{{goFlightMess.DepartTime}}-{{goFlightMess.ArriveTime}}</span>
            <span class="flightNo">{{goFlightMess.AirlineName}}{{goFlightMess.FlightNo}}</span>
            <img class="gotoIcon" src="../../assets/images/fightOrder/Ticketfilling-1@1x.png" @click="goBack">
        </div>
        <date-picker @chosed-flight-list="chosedFlightList" :currDate="currDate" :isOneWay="false" :VoyageType="2"></date-picker>
        <!-- <loading v-if="ticketData.length > 0"></loading> -->
        <!-- 机票列表 -->
        <ticket-list :ticketData="ticketData" @to-flight-detail="toDoubleBack"></ticket-list>
        <search-popup :show="show" :searchData="searchData" @filter-flight-list="filterFlightList" @sort-flight-list="sortFlightList"></search-popup>
        
    </div>
</template>

<script>
import qs from 'qs'
import DatePicker from '../common/datepicker'
import TicketList from '../commonBusComponents/ticketList/ticket-list'
import SearchPopup from '@/components/planeTicketList/search-popup'
import XHeader from '../common/header'

import Loading from '../common/loading'

import { getAfterDate, formatDate } from '../../utils/utils.js';

export default {
    data() {
        return {
            show: false,
            ticketData: [],
            searchData: [],
            flightSearchData:{},
            showDatePicker: false,
            saveTicketData: [],
            goFlightMess: this.$route.query,    //去程的航班信息路由传参
            currDate: [this.$storage.getSession('flightSearchData').DepartDate,this.$storage.getSession('flightSearchData').VoyageDate]
        }
    },
    created() {
        this.flightSearchData = this.$storage.getSession('flightSearchData');
        this.getFlightListDate(this.flightSearchData);
    },
    methods: {
        toDoubleBack(item, index){
            this.$storage.setSession('backFlightMess', item);   //待删,现在只有order-card里面还在用

            this.$router.push({
                path:'/flightdetail',
                query: {
                    FlightNo: item.FlightNo
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        chosedFlightList(val, index) {
            let flightSearchData = this.$storage.getSession('flightSearchData')
            flightSearchData.VoyageDate = val.DepartDate

            this.$storage.setSession('flightSearchData', flightSearchData)

            this.currDate[1] = val.DepartDate
            this.currDate = [...this.currDate]

            this.getFlightListDate(this.$storage.getSession('flightSearchData'))
        },
        getFormatDate(date) {
            return formatDate(date)
        },
        getFlightListDate(flightSearchData, isInit) {
            let voyageParams = {
                UserId: flightSearchData.UserId,
                EmpId: flightSearchData.EmpId,
                BookPermission: flightSearchData.BookPermission,
                AgentId: flightSearchData.AgentId,                
                ArriveCityCode: flightSearchData.ArriveCityCode,                
                DepartCityCode: flightSearchData.DepartCityCode,
                DepartDate: flightSearchData.DepartDate,
                VoyageDate: flightSearchData.VoyageDate,
                VoyageType: 2,

                FlightNo: this.goFlightMess.FlightNo
            }

            // 返程-因公
            if(flightSearchData.isBusiness==1){
                this.$axios.post('/FlightInfo/PublicFlightInfoSearchVoyage', qs.stringify(voyageParams)).then(res => {
                    this.ticketData = res.data.Result.flightResponse
                    this.searchData = res.data.Result.searchDetial
                    this.saveTicketData = res.data.Result.flightResponse  
                    this.getMinPriceFlightDate()
                    if(!isInit) {
                        this.minPrice = this.getMinPrice()
                    }
                }).catch(error => {
                    console.log(error);
                });
            }else{
                // 返程-因私
                this.$axios.post('/FlightInfo/FlightInfoSearchVoyage', qs.stringify(voyageParams)).then(res => {
                    this.ticketData = res.data.Result.flightResponse;
                    this.searchData = res.data.Result.searchDetial;
                    this.saveTicketData = res.data.Result.flightResponse;
                    this.getMinPriceFlightDate()
                    if(!isInit) {
                        this.minPrice = this.getMinPrice()
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
            for(let key in this.searchData) {                        
                this.searchData[key].map((item ,index) => {
                    item.isChecked = false
                })
            }
            this.searchData = {...this.searchData}   
        },
        getMinPriceFlightDate() {
            this.minPriceFlightData = this.ticketData.filter((item, index) => {
                return item.TicketPrice == this.getMinPrice()
            })
        },
        getMinPrice() {          
            let min = this.ticketData[0].TicketPrice            
            for(let i = 0; i < this.ticketData.length; i++) {
                let item = this.ticketData[i]
                if(item.TicketPrice < min) {
                    min = item.TicketPrice
                }
            }            
            return min
        },
        sortFlightList(type, mode) {
            //type:按时间、按价格
            //mode：升序还是降序
            if(type == 'sortTime') {
                if(mode == 'asc') {
                    this.ticketData.sort(function(a,b){
                        return Date.parse(a.DepartDate + ' ' + a.DepartTime) - Date.parse(b.DepartDate + ' ' + b.DepartTime);//时间正序
                    })
                } else {
                    this.ticketData.sort(function(a,b){
                        return Date.parse(b.DepartDate + ' ' + b.DepartTime) - Date.parse(a.DepartDate + ' ' + a.DepartTime);//时间倒叙
                    })
                }
            } else if(type == 'sortPrice') {
                if(mode == 'asc') {
                    this.ticketData.sort(function(a,b){
                        return a.TicketPrice - b.TicketPrice       //价格正序
                    })
                } else {
                    this.ticketData.sort(function(a,b){
                        return b.TicketPrice - a.TicketPrice       //价格倒叙
                    })
                }
            }            
        },
        filterFlightList(search) {
            if(Object.keys(search).length == 0) {
                this.ticketData = this.saveTicketData
                return
            }

            let tmpFlight = []
            for(let key in search) {
                for(let i = 0;i < search[key].length; i++) {                   
                    tmpFlight = tmpFlight.concat(this.ticketData.filter((item, index) => {
                        if(key === 'searchAirline') {
                            return item.AirlineName == search[key][i].AirlineName
                        } else if(key === 'searchCabinDescribe') {
                            return item.CabinDescribe == search[key][i].CabinDescribeName
                        } else if(key === 'searchDepartAirport') {
                            return item.DepartAirport == search[key][i].DepartAirportName
                        } else if(key === 'searchArriveAirport') {
                            return item.ArriveAirport == search[key][i].ArriveAirportName
                        } else if(key === 'searchTime') {
                            let startTime = this.$storage.getSession('flightSearchData').DepartDate + ' ' + search[key][0].DepartTime.split('-')[0]
                            let endTime = this.$storage.getSession('flightSearchData').DepartDate + ' ' + search[key][search[key].length - 1].DepartTime.split('-')[1]                      
                            return Date.parse(item.DepartDate + ' ' + item.DepartTime) >= Date.parse(startTime) && Date.parse(item.DepartDate + ' ' + item.DepartTime) <= Date.parse(endTime)                   
                        }
                    }))

                    this.ticketData = tmpFlight
                }                
            }
        }
    },
    components: {
        TicketList,
        DatePicker,
        SearchPopup,
        XHeader,
        Loading
    }
}
</script>

<style lang="less">
    .flightBackView {
        .datePopup .allDate {
            margin-top: .3rem;
        }
        .centerContent {
            margin-top: 1.02rem;
        }
        .voyagePtompt {
            padding: .12rem 0 .12rem .08rem;
            margin-top: 10rem;
            position: relative;
            .go {
                border: solid 1px #2474DD;
                padding: 0 .02rem;
                border-radius: .02rem;
                color: #2474DD;
            }
            .goDate, .goTime, .flightNo {
                color: #464646;
                margin-left: .04rem;
            }  
            .gotoIcon {
                position: absolute;
                right: .12rem;
                top: 0;
                bottom: 0;
                margin: auto;
            }        
        }
    }
</style>
