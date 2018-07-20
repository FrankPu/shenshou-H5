<template>
    <div :class="['datePopup', {'oneWayDatePopup': isOneWay}]">        
        <popup v-model="show" width="100%" height="100%" :position="'right'">
            <x-header :showBack="true" :title="getHeaderTitle" @go-back="$emit('go-back')"></x-header>  
            <div class="datePrompt" v-if="!isOneWay">请选择去程日期</div>         
            <div class="allDate">
                <table class="weekendName">
                    <tr>
                        <td class="weekendItem">日</td>
                        <td class="weekendItem">一</td>
                        <td class="weekendItem">二</td>
                        <td class="weekendItem">三</td>
                        <td class="weekendItem">四</td>
                        <td class="weekendItem">五</td>
                        <td class="weekendItem">六</td>
                    </tr>
                </table>
                <div class="popupDateItem" v-for="(item, index) in dateInfo.allDate" :key="index">
                    <p class="dateTitle">{{item.Date}}</p>                    
                    <ul class="dayList">                                               
                        <li :class="['dayItem', {'dateActive': dateActive(val.DepartDate), 'disabled': !val.hasOwnProperty('TicketPrice'), 'range': getDateCompare(val.DepartDate)}]" 
                        v-for="(val, i) in item.listResponsePriceCalendarEntity" :key="i" @click="chosePopupDate(val, index, i)">
                            <div class="day">
                                {{val.DepartDate ? getDay(val.DepartDate) : ''}}
                            </div>
                            <div class="price" >{{getTicketPrice(val)}}</div>
                        </li>                                
                    </ul>
                </div>                   
            </div>
        </popup>
    </div>
</template>

<script>

import qs from 'qs'
import XHeader from '../common/header'
import Popup from '../common/popup/index'

import { mapGetters, mapActions, mapState  } from 'vuex'

import { getDayCountOfMonth, getMonth, getDay, getYear, getWeekend, formatMonth, dateCompare, formatNum, formateAllDate } from '../../utils/utils.js';

export default {
    name: 'date-popup-picker', 
    props: {
        show: Boolean,
        currDate: Array,
        isOneWay: [Boolean, String],
        minPrice: Number,
        endLocal: String,
        startLocal: String 
    },  
    data: function() {
        return {
            parentIndex: '',
            childIndex: '',
            allDate: [],
            currentDate: this.currDate[0]
        }        
    },
    components: {
        Popup,
        XHeader
    },
    computed: {
        getHeaderTitle() {
            let title = this.isOneWay == '1' ? '日历' : '往返日历'
            return title
        },
        ...mapState([
            'dateInfo'
        ]) 
    },
    created() {  
        let dateParams = {
            url: '/PriceCalendarInfoRequest/GetPriceCalendarInfoForAndroid',
            params: {
                DepartCityCode: this.startLocal,
                ArriveCityCode: this.endLocal
            }
        }
        this.$store.dispatch('getDateInfo', dateParams)       
    },
    methods: {
        getDateCompare(rangeDate) {
            return dateCompare(this.currDate[0], rangeDate, this.currDate[1]) && !this.isOneWay
        },
        dateActive(date) {
            if(this.isOneWay) return date == this.currDate[0]
            else return date == this.currDate[0] || date == this.currDate[1]
        },
        getDay(date) {
            return getDay(date)
        },
        chosePopupDate(item, parIndex, chilIndex) {
            this.currentDate = item
            if(item.hasOwnProperty('TicketPrice')) {
                this.parentIndex = parIndex
                this.childIndex = chilIndex
                this.$emit("close-date-picker", item)
            } else {
                return
            }            
        },
        getTicketPrice(val) {
            let price = val.hasOwnProperty('TicketPrice') ? '￥' + val.TicketPrice : ''
            return price = price === '￥0' ? '查看' : price
        }
    },
    watch: {
        minPrice(val) {
            if(this.currentDate.TicketPrice === 0) {
                this.allDate[this.parentIndex].listResponsePriceCalendarEntity[this.childIndex].TicketPrice = val
                this.$storage.setSession('allDateInfo', this.allDate)
            }            
        }
    }
}
</script>
 
<style scoped lang="less">
    .datePopup {
        .vux-popup-dialog {
            background: #fff;
        }
        .datePrompt {
            margin-top: .4rem;
            background-color: #E2F0FE;
            text-align: center;
            padding: .08rem 0;
            color: #2875DC;
            font-size: .14rem;
        }
        .allDate {
            width: 100%;
            overflow-y: auto;
            top: .4rem;
            position: absolute;
            bottom: .4rem;
            .weekendName {                   
                text-align: center;
                border-bottom: #FAFAFA solid 1px;
                padding: 0.08rem 0;
                width: 100%;
                .weekendItem {
                    display: inline-block;
                    color: #2C2C2C;
                    width: 14.2%;
                }
            }
        }
        .popupDateItem {
            margin-top: .12rem;
            border-bottom: #FAFAFA solid 1px;
            .dateTitle {
                text-align: center;
                color: #323232;
                font-size: .14rem;
            }           
            .dayList {
                width: 100%;
                display: inline-block;
                .dayItem {
                    float: left;
                    width: 14.2%;
                    text-align: center;
                    padding: .1rem 0;
                    .day {
                        letter-spacing: 0px;
                    } 
                    .price {
                        height: .1rem;
                        line-height: .1rem;
                        letter-spacing: -1px;
                        margin-left: -2px;
                        color: #FF5555;
                    }  
                }
                .dateActive {
                    color: #fff;
                    border-radius: .02rem;
                    background-color: #2474DE;
                }
                .disabled {
                    color: #E2E2E2;
                }
                .range {
                    background-color: #F0F0F1;
                }
            }
        }        
    }
</style>
