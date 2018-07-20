<template>
      <div class="Dateselection">
        <div class="trainHeader disFlex">
            <div class="prevDay" @click="prevDay">前一天</div>
            <div class="center" @click="center">
                <div class="traindatepick">
                     <img src="~@/assets/images/icon/datepick@2x.png" alt="" class="icon">
                     <span>{{DepartureDate}}{{getDepartureDateMark}}</span>
                </div>
            </div>
            <div class="nextDay" @click="nextDay">后一天</div>
            <div class="clea"></div>
        </div>
        <date-popup-picker :show="show" :currDate="currDate" :currState="'start'" :endLocal="endLocal" :startLocal="startLocal"
            :isOneWay="true" @close-date-picker='closeDatePicker' @go-back="goBack">
        </date-popup-picker>
      </div>
      
</template>
<script>
import qs from 'qs'
import DatePopupPicker from './datepicker-popup'
import Popup from '../common/popup/index'
import { initDate, getDayCountOfMonth, getMonth, getDay, getYear, getWeekend, formatMonth, formatNum, formatDate, getAfterDate } from 
'../../utils/utils.js';
 export default {
    components: {
        DatePopupPicker,
        Popup,
    },
    data(){
        return{
            isOneWay : true, 
            show: false,
            currDate: [initDate(new Date())],     
            DepartureDate: formatDate(this.originDepartureDate),
            originDate: this.originDepartureDate
        }
    },
    props: {
        //DepartureDate: String,
        startLocal: String,
        endLocal: String,
        originDepartureDate: String
    },
    computed: {
       getDepartureDateMark() {
           console.log(this.originDate, '***************************')
            if(this.DepartureDate == formatDate(new Date())) {
                return '今天'
            } else if(this.originDate == getAfterDate(new Date(), 1)) {
                return '明天'
            } else if(this.originDate == getAfterDate(new Date(), 2)) {
                return '后天'
            } else {
                return '周' + getWeekend(this.originDate)

            }
        }
    },
    methods: {
        goBack() {
            this.show = false;
        },
        center(){
            this.show = true;
        },
        closeDatePicker(item) {
            this.show = false
            this.originDate = item.DepartDate     
            this.DepartureDate = formatDate(item.DepartDate)
            this.currDate[0] = item.DepartDate
            this.$emit('DatePickertypr', item.DepartDate)
        },
        nextDay(){
                let startDate =this.originDate;
                startDate = new Date(startDate);
                startDate = +startDate + 1000*60*60*24*1;
                startDate = new Date(startDate);
                let nextStartDate = initDate(startDate)              
                this.originDate = nextStartDate
                this.DepartureDate =  formatDate(startDate)
                this.$emit('nextDaytypr', this.originDate);
        },
        prevDay(){
            if(this.DepartureDate == formatDate(new Date())){
                return;
            }
            let startDate = this.originDate;
            startDate = new Date(startDate);
            startDate = +startDate - 1000*60*60*24*1;
            startDate = new Date(startDate);
            let nextStartDate = initDate(startDate)              
            this.originDate = nextStartDate
            this.DepartureDate =  formatDate(startDate)
            this.$emit('prevDaytypr',this.originDate)
        }
    }
}
</script>

<style  lang="less">
.trainHeader {
    width: 100%;
    position: fixed;
    top: .5rem;
	font-size: .112rem;
	height: .312rem;
	line-height: .312rem;
	background: #2474DE;
    text-align: center; 
}
.trainHeader div{
    float: left;
}
.trainHeader .prevDay, .trainHeader .nextDay {
	width: 30%;
	text-align: center;
}
.center{
    width: 40%;
}
.prevDay{
   color:#A0A0A0;
}
.nextDay{
  color:#A0A0A0;
}
.clea{
    clear:both 
}
.trainHeader .traindatepick {
	padding-left: 0.08rem;
	background: #ffffff;
	color: #2577e3;
	width: 100%;
	height: .216rem;
	line-height: .2rem;
	margin: 0.048rem auto;
	font-size: 0.096rem;
    border-bottom: .01rem solid #2577e3;
    position: relative;
}

.trainHeader .traindatepick img {
	width: .112rem;
	height: .112rem;
    position: absolute;
    left: 12%;
    top: .05rem;
}

.trainHeader .traindatepick span {
	padding: 0.008rem 0.024rem;
	display: inline-block;
	vertical-align: middle;
	line-height: 1;
    padding-left: .05rem;
	border-left: 1px solid #2577e3;
}

</style>
