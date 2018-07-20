<template>
    <div :class="['datePopup', {'twoWayDatePopup': !isOneWay}]">        
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
                            <div :class="['day', {'dayOff': getDaysOff(val.DepartDate)}]">
                                {{val.DepartDate ? getDay(val.DepartDate) : ''}}
                            </div>
                            <div class="price">{{getTicketPrice(val)}}</div>
                        </li>                                
                    </ul>
                </div>                   
            </div>
        </popup>
        <toast v-model="showTosat" type="text" :width="'auto'" :time="800" is-show-mask :position="position">请选择返程日期</toast>
    </div>
</template>

<script>

import qs from 'qs'
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import Toast from 'vux/src/components/toast/index'

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
        startLocal: String,
        currState: String
    },  
    data: function() {
        return {
            parentIndex: '',
            childIndex: '',
            allDate: [],
            currentDate: this.currDate[0],
            showTosat: false,
            position: 'bottom',
            arriveCityCode: this.endLocal,
            departCityCode: this.startLocal
        }        
    },
    components: {
        Popup,
        XHeader,
        Toast
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
                DepartCityCode: this.departCityCode,
                ArriveCityCode: this.arriveCityCode
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
        getDaysOff(date) {
            return new Date(date).getDay() === 6 || new Date(date).getDay() === 0
        },
        chosePopupDate(item, parIndex, chilIndex) {
            this.currentDate = item

            if(!this.isOneWay && this.currState === 'start') {
                this.showPosition('bottom')
            }
            if(item.hasOwnProperty('TicketPrice')) {
                this.parentIndex = parIndex
                this.childIndex = chilIndex
                this.$emit("close-date-picker", item)
            } else {
                return
            }            
        },
        showPosition(position) {
            this.position = position
            this.showTosat = true
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
 
<style lang="less">
    .datePopup {
        .vux-popup-dialog {
            background: #fff;
        }
        .weui-toast__content {
            font-size: .12rem;
        }
        .weui-toast.vux-toast-bottom {
            bottom: .4rem;
        }
        .weui-toast_text .weui-toast__content {
            margin: 0 .1rem;
        }
        .datePrompt {
            margin-top: .54rem;
            background-color: #E2F0FE;
            text-align: center;
            height: .4rem;
            line-height: .4rem;
            color: #2577e3;
            font-size: .16rem;
        }
        .allDate {
            width: 100%;
            overflow-y: auto;
            top: .54rem;
            position: absolute;
            .weekendName {                   
                text-align: center;
                border-bottom: #FAFAFA solid 1px;
                padding: 0.08rem 0;
                width: 100%;
                font-size: .11rem;
                color: #333;
                .weekendItem {
                    display: inline-block;
                    
                    width: 14.2%;
                }
            }
        }
        .popupDateItem {
            //margin-top: .12rem;
            border-bottom: #FAFAFA solid 1px;
            .dateTitle {
                text-align: center;
                color: #333;
                font-size: .15rem;
                padding: .13rem 0;
            }           
            .dayList {
                width: 100%;
                display: inline-block;
                .dayItem {
                    float: left;
                    width: 14.2%;
                    font-size: .15rem;
                    text-align: center;
                    height: .65rem;
                    padding: .135rem 0;
                    .day {
                        letter-spacing: 0px;
                        color: #333;
                    } 
                    .price {
                        height: .1rem;
                        line-height: .1rem;
                        letter-spacing: -1px;
                        margin-left: -2px;
                        color: #FF5555;
                        margin-top: .02rem;
                    } 
                    .dayOff {
                        color: #2577e3;
                    } 
                }
                .dateActive {
                    color: #fff;
                    border-radius: .02rem;
                    background-color: #2474DE;
                    .day {
                        color: #fff;
                    }
                }
                .disabled {
                    color: #ddd;
                }
                .range {
                    background-color: #F0F0F1;
                }
            }
        }        
    }
    .twoWayDatePopup {
        .datePrompt {
            margin-top: .54rem;
            background-color: #E2F0FE;
            text-align: center;
            height: .4rem;
            line-height: .4rem;
            color: #2577e3;
            font-size: .16rem;
        }
        .allDate {
            top: .94rem;
        }
    }
</style>
