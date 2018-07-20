<template>
  <div class="flightInfo">
        <div class="flightInfoMain" style="margin-bottom: 0.08rem;">
            <div class="top fontSize-3">
                <span class="disInlneBlk goIcon fillGoTag">去</span>
                <img  src="~@/assets/images/icon/flight1@2x.png" class="icon"/>
                {{flightdata.DepartDate}}
            </div>
            <div class="middle disFlex text-center">
                <div class="flex1">
                    <b class="goTime fontSize-4">{{flight_detail_list[0].goTime}}</b>
                    <p class="fontLight">{{flight_detail_list[0].goAirport}}</p>
                </div>
                <div class="date flex1">
                    <img src="~@/assets/images/icon/flight1@2x.png" class="blockIcon"/>
                    <p class="fontLight">{{flight_detail_list[0].goDate}}</p>
                </div>
                <div class="flex1">
                    <b class="goTime fontSize-4">{{flight_detail_list[0].toTime}}</b>
                    <p class="fontLight">{{flight_detail_list[0].toAirport}}</p>
                </div>
            </div>
            <div class="bottom disFlex text-center">
                <p class="flex1"><img src="~@/assets/images/icon/clock@2x.png" class="icon mr05"/>准点率:{{flight_detail_list[0].punctuality}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/eat@2x.png" class="icon mr05"/>{{flight_detail_list[0].food}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/flight2@2x.png" class="icon mr05"/>{{flight_detail_list[0].flightType}}</p>
            </div>
        </div>
        <!--往返添加-->
        <!-- <div class="flightInfoMain">
            <div class="top fontSize-3">
                <span class="disInlneBlk goIcon fillBackTag">返</span>
                <img src="~@/assets/images/icon/flight1@2x.png" class="icon"/>
                {{flight_detail_list[1].backFlight}}
            </div>
            <div class="middle disFlex text-center">
                <div class="flex1">
                    <b class="goTime fontSize-4">{{flight_detail_list[1].goTime}}</b>
                    <p class="fontLight">{{flight_detail_list[1].goAirport}}</p>
                </div>
                <div class="date flex1">
                    <img src="~@/assets/images/icon/flight1@2x.png" class="blockIcon"/>
                    <p class="fontLight">{{flight_detail_list[1].goDate}}</p>
                </div>
                <div class="flex1">
                    <b class="goTime fontSize-4">{{flight_detail_list[1].toTime}}</b>
                    <p class="fontLight">{{flight_detail_list[1].toAirport}}</p>
                </div>
            </div>
            <div class="bottom disFlex text-center">
                <p class="flex1"><img src="~@/assets/images/icon/clock@2x.png" class="icon mr05"/>准点率:{{flight_detail_list[1].punctuality}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/eat@2x.png" class="icon mr05"/>{{flight_detail_list[1].food}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/flight2@2x.png" class="icon mr05"/>{{flight_detail_list[1].flightType}}</p>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
  data(){
      return {
          flight_detail_list:[
                {goFlight:'中国东方航空MU520', goTime:'07:15', toTime:'10:45', goDate:'11月11日',goAirport:'双流机场T1',toAirport:'首都机场T2', punctuality:'95%', food:'有餐饮', flightType:'大型机'},
                {backFlight:'新希望航空SU710', goTime:'07:15', toTime:'10:45', goDate:'11月11日',goAirport:'首都机场T2',toAirport:'双流机场T1',  punctuality:'95%', food:'有餐饮', flightType:'大型机'}
            ]
      }
  },
  props:['flightdata']
}
</script>
<style scoped>
@import '../../assets/css/test.css';

.flightInfo {
    /* background: #2577e3; */
    background: #ffffff;
    padding: 0.04rem;
    margin-bottom: 0.02rem;
}

.flightInfo .flightInfoMain {
	padding: 0 0.08rem;
	border-radius: 0.04rem;
	background: #ffffff;
	width: 100%;
}

.flightInfo .flightInfoMain .top {
	height: .32rem;
	line-height: .32rem;
}

.flightInfo .flightInfoMain .top .icon {
	width: 0.096rem;
	height: 0.096rem;
	border-radius: 50%;
	margin-right: 0.004rem;
}


.flightInfo .flightInfoMain .middle {
	height: .4rem;
	border-bottom: 1px dashed #e2e2e2;
}

.flightInfo .flightInfoMain .middle p {
	line-height: .176rem;
}

.flightInfo .flightInfoMain .middle .date {
	width: .48rem;
}

.flightInfo .flightInfoMain .middle .date .blockIcon {
	height: .128rem;
	margin: 0.008rem auto;
}

.flightInfo .flightInfoMain .bottom {
	line-height: .32rem;
}

.flightInfo .flightInfoMain .bottom .icon {
	width: .128rem;
	height: .128rem;
}
</style>


