<template>
    <div class="ticketCard">
        <div v-if="isOneWay">
            <div class="ticketCardMess">
                <span class="ticketType">单程</span>
                <span class="time">{{getDay + ' ' + getWeekDay + ' ' + getPlace + ' ' + getCabinData.CabinDescribe}}</span>
            </div>
            <div class="ticketCardPlace">
                <div class="startTimeAndPlace">
                    <div class="startTime">{{getTicketCardData.DepartTime}}</div>
                    <div class="startPlace">{{getTicketCardData.DepartAirport + ' ' + getTicketCardData.DepartTerminal}}</div>
                </div>
                <span class="flightIcon"><img class="icon" src="../../assets/images/order_flight.png"></span>
                <div class="endTimeAndPlace">
                    <div class="endTime">{{getTicketCardData.ArriveTime}}</div>
                    <div class="endPlace">{{getTicketCardData.ArriveAirport + ' ' + getTicketCardData.ArriveTerminal}}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="outward">
                <span class="outText">去</span>
                <span class="time">{{getGoFlightMess.DepartDate}} 周一 {{getGoFlightMess.DepartTime + ' ' + getCabinData.CabinDescribe}}</span>
                <div class="airName">
                    {{getGoFlightMess.DepartCityName + '(' + getGoFlightMess.DepartAirport + ') - ' + getGoFlightMess.ArriveCityName + '(' + getGoFlightMess.ArriveAirport + ')'}}
                </div>                
            </div>
            <div class="return">
                <span class="returnText">返</span>
                <span class="time">{{getBackFlightMess.DepartDate}} 周一 {{getBackFlightMess.DepartTime + ' ' + getCabinData.CabinDescribe}}</span>
                <div class="airName">
                    {{getBackFlightMess.DepartCityName + '(' + getBackFlightMess.DepartAirport + ') - ' + getBackFlightMess.ArriveCityName + '(' + getBackFlightMess.ArriveAirport + ')'}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'order-card',
    props: {
        isOneWay: [String, Boolean]
    },
    computed: {
        getTicketCardData() {
            let ticketCardData = this.$storage.getSession('ticketData')
            return ticketCardData
        },
        getCabinData() {
            return this.$storage.getSession('cabinData')
        },
        getWeekDay() {
            let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]  
            let dateStr = this.$storage.getSession('ticketData').DepartDate
            let myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));  
            return  weekDay[myDate.getDay()]
        },
        getDay() {
            let dateStr = this.$storage.getSession('ticketData').DepartDate
            let month = new Date(dateStr).getMonth() + 1
            let day = new Date(dateStr).getDate()
            return month + '月' + day + '日'
        },
        getPlace() {
            return this.$storage.getSession('ticketData').DepartCityName + '-' + this.$storage.getSession('ticketData').ArriveCityName
        },
        getGoFlightMess() {
            return this.$storage.getSession('ticketData')
        },
        getBackFlightMess() {
            return this.$storage.getSession('backFlightMess')
        }
    }
}
</script>

<style scoped lang="less">  
    .ticketCard {
        color: #fff;
        background: url('../../assets/images/img1@2x.png');
        padding: .24rem .12rem;
        margin-top: .4rem;
        .ticketType, .outText, .returnText {               
            background: #40C2F1;
            padding: .02rem .04rem;
            border-radius: .02rem;
        }
        .returnText {               
            background: #FF9911;
        }
        .time {
            font-size: .16rem;
        }
        .airName {
            margin-top: .04rem;
            padding-left: .2rem;
        }
        .return {
            margin-top: .3rem;
        }
        .ticketCardPlace {
            display: flex;
            margin-top: .16rem;
            text-align: center;
            .flightIcon {
                flex: 4;
                padding-top: .04rem;
                img {
                    display: inline-block;
                    height: .2rem;
                    width: .2rem;
                }
            }
            .startTimeAndPlace, .endTimeAndPlace {
                text-align: center;
            }
            .startPlace, .endPlace {
                margin-top: .02rem;
            }
            .startTime, .endTime {
            font-size: .16rem;
                font-weight: 500;
            }
        }
    }
</style>
