<template>
    <div class="datePicker">
        <div class="dateTop">
            <div class="dateList">
                <div :class="['dateListItem', {'dateActive': isDateActive(val.DepartDate)}]" v-for="(val, index) in dateInfo.originDate" :key="index" @click="chooseDate(val, index)">
                    <div class="weekend">周{{getWeekends(val.DepartDate)}}</div>
                    <div class="day">{{getDay(val.DepartDate)}}</div>
                    <div :class="['price', {'lookPrice': val.TicketPrice == 0}]">{{val.TicketPrice == 0 ? '查看' : '￥' + val.TicketPrice}}</div>
                </div>
                
            </div>        
            <div class="dateBtn" @click="showDatePickerPopup">
                <img class="dateIcon" src="~@/assets/images/icon/datepick@2x.png" />
                <p>日历</p>
            </div>
        </div>
        <date-popup-picker :show="showPopup" :minPrice="minPrice" :isOneWay="isOneWay" :currDate="currDate" 
            :endLocal="endLocal" :startLocal="startLocal" @close-date-picker="closeDatePicker" @go-back="goBack">
        </date-popup-picker>
    </div>
</template>

<script>

import qs from 'qs'
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import DatePopupPicker from './datepicker-popup'
import { mapGetters, mapActions, mapState  } from 'vuex'

import { getDayCountOfMonth, getMonth, getDay, getYear, getWeekend, formatMonth } from '../../utils/utils.js';

export default {
    name: 'date-picker',    
    data: function() {
        return {
            dateListData: [],
            currentIndex: 0,
            showPopup: false,
            currentDate: this.currDate[0]        
        }        
    },
    props: {
        currDate: Array,
        VoyageType: Number,
        isOneWay: [Boolean, String],
        minPrice: Number,
        endLocal: String,
        startLocal: String   
    },
    computed: {
        ...mapState([
            'dateInfo'
        ]) 
    },
    components: {
        Popup,
        XHeader,
        DatePopupPicker
    },
    methods: {
        isDateActive(date) {
            if(this.isOneWay || !this.isOneWay && this.VoyageType == 1) {
                return this.currDate[0] === date
            } else if(!this.isOneWay && this.VoyageType == 2) {
                return this.currDate[1] === date

            }
        },
        formateAllDate(type, date) {            
            let year = getYear(date)
            let month = getMonth(date)            
            let monthNum = getDayCountOfMonth(year, month)    //当前月一共多少天         
            let len = type == 'first' ? getDay(date) : monthNum - getDay(date)          
            return formatMonth(type, len, getDay(date), year, month)
        },
        getWeekends(date) {
            return getWeekend(date)
        },
        getDay(date) {
            return getDay(date)
        },
        chooseDate(val, index) {
            this.currentIndex = index
            this.currentDate = val
            this.$emit('chosed-flight-list', val, index)
        },
        showDatePickerPopup() {
            this.showPopup = true
        },
        goBack() {
            this.showPopup = false
        },
        closeDatePicker(item) {
            this.showPopup = false
            this.$emit('chosed-flight-list', item)
        }
    },
    watch: {
        minPrice(val) {
            if(this.currentDate.TicketPrice === 0) {
                this.dateListData[this.currentIndex].TicketPrice = val
                this.dateListData = [...this.dateListData]
                this.$storage.setSession('topDateInfo', this.dateListData)
            }            
        }
    }
}
</script>
 
<style scoped lang="less">
    .datePicker {
        padding: .04rem 0;
        position: absolute;
        top: .4rem;
        width: 100%;
        background-color: #fff;  
        .dateTop {
            display: flex;
            height: .5rem;
        }             
        .dateList {     
            padding: 0 .36rem 0 .04rem;    
            display: flex;
            width: auto;
            overflow-x: auto;
            overflow-y: hidden;
            .dateListItem {
                text-align: center;
                padding: .02rem .06rem;
                flex: 1;  
                .weekend {
                    color: #BCBCBC;
                } 
                .day {
                    color: #3D3D3D;
                    font-size: .16rem;
                    margin-top: .02rem;
                }
                .price {
                    height: .15rem;
                    color: #343434;
                    width: .3rem;
                } 
                .lookPrice {
                    color: #F55E6A;
                }        
            }
            .dateActive {
                background-color: #2474DE;
                border-radius: .04rem;
                .day, .weekend, .price {
                    color: #fff;
                }
            }
        }
        .dateBtn {
            position: absolute;
            z-index: 55;
            background-color:#fff;
            text-align: center;
            width: .36rem;
            border-left: solid 1px #F4F4F5;
            right: 0;
            height: 100%;
            height: .5rem;          
            .dateIcon {
                width: .15rem;
                margin-top: .1rem;
            }
            p {
                color: #4B88E3;
            }
        }
        .datePopup {
            .vux-popup-dialog {
                background: #fff;
            }
            .allDate {
                margin-top: .56rem;
            }
            .popupDateItem {
                margin-top: .12rem;
                .dateTitle {
                    text-align: center;
                    font-weight: 700;
                    color: #6B6B6B;
                    font-size: .14rem;
                }
                .weekendName {                   
                    text-align: center;
                    font-size: .14rem;
                    margin-top: .12rem;
                    border-bottom: #DEDEDE solid 2px;
                    padding-bottom: .04rem;
                    width: 100%;
                    .weekendItem {
                        display: inline-block;
                        color: #6D6D6D;
                        width: 14.2%;
                    }
                    .restDay {
                        color: #FF0300;
                    }
                }
                .dayList {
                    width: 100%;
                    display: inline-block;
                    .dayItem {
                       float: left;
                        width: 14.2%;
                        text-align: center;
                        padding: .1rem 0; 
                        .price {
                            height: .1rem;
                            line-height: .1rem;
                        }  
                    }
                    .disabled {
                        color: #D0D0D0;
                    }
                }
            }
            
        }
    }
</style>
