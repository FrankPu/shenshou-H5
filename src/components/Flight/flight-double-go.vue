<template>
    <div class="flightGoView">
        <x-header :showBack="true" :showRight="true" @go-back="goBack">
            <span slot="title">
                选去程:{{flightSearchData.DepartCityName}}
                <img src="~@/assets/images/icon/flight@1x.png" class="titleIcon" />
                {{flightSearchData.ArriveCityName}}
            </span>
        </x-header>
        <date-picker @chosed-flight-list="chosedFlightList" :minPrice="minPrice" :currDate="currDate" :isOneWay="false" :VoyageType="1"></date-picker>
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
import { getAfterDate } from '../../utils/utils.js';

export default {
    data() {
        return {
            minPrice: 0,
            isReturn: true,
            show: false,
            ticketData: [],
            searchData: [],
            saveTicketData: [],
            flightSearchData:{},
            showDatePicker: false,
            minPriceFlightData: [],
            currDate: [this.$storage.getSession('flightSearchData').DepartDate,this.$storage.getSession('flightSearchData').ArriveDate],
            params: {}
        }
    },
    created() {
        this.params = {
            AgentId: this.$route.query.AgentId,
            DepartDate: this.$route.query.DepartDate,
            VoyageDate: this.$route.query.VoyageDate,
            DepartCityCode: this.$route.query.DepartCityCode,
            ArriveCityCode: this.$route.query.ArriveCityCode,
            UserId: this.$storage.getSession('userMess').UserId,
            EmpId: this.$storage.getSession('userMess').EmpId,
            BookPermission: this.$storage.getSession('userMess').BookPermission,
            VoyageType: 1
        }
        this.flightSearchData = this.$storage.getSession('flightSearchData');
        this.getFlightListDate(this.flightSearchData, true);
    },
    methods: {
        toDoubleBack(item, index){
            this.$storage.setSession('ticketData', item);

            this.$router.push({
                path:'/flightdoubleback',
                query: {
                    FlightNo: item.FlightNo,
                    DepartDate: item.DepartDate,
                    DepartTime: item.DepartTime,
                    ArriveTime: item.ArriveTime,
                    AirlineName: item.AirlineName
                }
            })
        },
        goBack() {
            this.$router.push('/flightsearch');
        },
        chosedFlightList(val, index) {
            let flightSearchData = this.$storage.getSession('flightSearchData')
            flightSearchData.DepartDate = val.DepartDate
            flightSearchData.VoyageDate = getAfterDate(new Date(val.DepartDate), 3)

            this.$storage.setSession('flightSearchData', flightSearchData)

            this.currDate[0] = val.DepartDate
            this.currDate[1] = getAfterDate(new Date(val.DepartDate), 3)
            this.currDate = [...this.currDate]

            this.getFlightListDate(flightSearchData, false)
        },
        getFlightListDate(flightSearchData, isInit) {
            let voyageParams = {
                AgentId: flightSearchData.AgentId,
                DepartDate: flightSearchData.DepartDate,
                VoyageDate: flightSearchData.VoyageDate,
                DepartCityCode: flightSearchData.DepartCityCode,
                ArriveCityCode: flightSearchData.ArriveCityCode,
                UserId: flightSearchData.UserId,
                EmpId: flightSearchData.EmpId,
                BookPermission: flightSearchData.BookPermission,
                VoyageType: 1
            }

            // 去程-因公
            if(this.$route.query.isBusiness == 1){
                this.$axios.post('/FlightInfo/PublicFlightInfoSearchVoyage', qs.stringify(voyageParams)).then(res => {
                    this.ticketData = res.data.Result.flightResponse
                    this.searchData = res.data.Result.searchDetial
                    this.saveTicketData = res.data.Result.flightResponse
                    this.sortFlightList('sortTime', 'desc')
                    this.getMinPriceFlightDate()
                    if(!isInit) {
                        this.minPrice = this.getMinPrice()
                    }
                }).catch(error => {
                    console.log(error);
                });
            }else{
                // 去程-因私
                this.$axios.post('/FlightInfo/FlightInfoSearchVoyage', qs.stringify(voyageParams)).then(res => {
                    this.ticketData = res.data.Result.flightResponse
                    this.searchData = res.data.Result.searchDetial
                    this.saveTicketData = res.data.Result.flightResponse
                    this.sortFlightList('sortTime', 'desc')
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
                    tmpFlight = tmpFlight.concat(this.saveTicketData.filter((item, index) => {
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
    .flightGoView {
        .datePopup .allDate {
            margin-top: .3rem;
        }
        .centerContent {
            margin-top: 1.02rem;
        }
    }

</style>
