<template>
<div class="bgGray" style="margin-top: .4rem; overflow:hidden; width:100%; height: 100%;">
    <!-- header -->
    <x-header :showBack="true" @go-back="goBack">
        <span slot="title">
            <div class="topInfo disFlex" v-if="flightSearchData.isOneWay==1">
                <p class="goAddress ">{{flightSearchData.DepartCityName}} </p>
                <img src="~@/assets/images/icon/flight@1x.png" class="titleIcon"/>
                <p class="toAddress "> {{flightSearchData.ArriveCityName}}</p>
            </div>
            <div class="topInfo" v-if="flightSearchData.isOneWay==0">
                <span class="goAddress">往返详情</span>
            </div>
        </span>
    </x-header>
    <!-- 已选航班信息 -->
    <!-- <FlightInfo :flightdata="data"></FlightInfo> -->
      <div class="flightInfo" style="background: #2577e3;">
        <div class="flightInfoMain" style="margin-bottom: 0.08rem;">
            <div class="top fontSize-3">
                <span class="disInlneBlk goIcon fillGoTag" v-if="flightSearchData.isOneWay == false">去</span>
                <img :src="ticketData.AirlineImg" class="icon"/>
                {{ticketData.AirlineName}}{{ticketData.FlightNo}}
            </div>
            <div class="middle disFlex text-center">
                <div class="flex1">
                    <b class="goTime fontSize-4">{{ticketData.DepartTime}}</b>
                    <p class="fontLight">{{ticketData.DepartAirport}}{{ticketData.DepartTerminal}}</p>
                </div>
                <div class="date flex1">
                    <img src="~@/assets/images/icon/flight1@2x.png" class="blockIcon"/>
                    <p class="fontLight">{{ArriveDate}}</p>
                </div>
                <div class="flex1">
                    <b class="goTime fontSize-4">{{ticketData.ArriveTime}}</b>
                    <p class="fontLight">{{ticketData.ArriveAirport}}{{ticketData.ArriveTerminal}}</p>
                </div>
            </div>
            <div class="bottom disFlex text-center">
                <p class="flex1"><img src="~@/assets/images/icon/clock@2x.png" class="icon mr05"/>准点:{{ticketData.PunctualityRate}}%</p>
                <p class="flex1"><img src="~@/assets/images/icon/eat@2x.png" class="icon mr05"/>{{ticketData.Meals}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/flight2@2x.png" class="icon mr05"/>机型{{ticketData.Aircraft}}</p>
            </div>
        </div>
        <!--往返添加-->
        <div class="flightInfoMain" v-if="VoyageType==2">
            <div class="top fontSize-3">
                <span class="disInlneBlk goIcon fillBackTag">返</span>
                <img :src="VoyageFlight.AirlineImg" class="icon"/>
                {{VoyageFlight.AirlineName}}{{VoyageFlight.FlightNo}}
            </div>
            <div class="middle disFlex text-center">
                <div class="flex1">
                    <b class="goTime fontSize-4">{{VoyageFlight.DepartTime}}</b>
                    <p class="fontLight">{{VoyageFlight.DepartAirport}}{{VoyageFlight.DepartTerminal}}</p>
                </div>
                <div class="date flex1">
                    <img src="~@/assets/images/icon/flight1@2x.png" class="blockIcon"/>
                    <p class="fontLight">{{VoyageArriveDate}}</p>
                </div>
                <div class="flex1">
                    <b class="goTime fontSize-4">{{VoyageFlight.ArriveTime}}</b>
                    <p class="fontLight">{{VoyageFlight.ArriveAirport}}{{VoyageFlight.ArriveTerminal}}</p>
                </div>
            </div>
            <div class="bottom disFlex text-center">
                <p class="flex1"><img src="~@/assets/images/icon/clock@2x.png" class="icon mr05"/>{{VoyageFlight.FlightTime}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/eat@2x.png" class="icon mr05"/>{{VoyageFlight.Meals}}</p>
                <p class="flex1"><img src="~@/assets/images/icon/flight2@2x.png" class="icon mr05"/>机型{{VoyageFlight.Aircraft}}</p>
            </div>
        </div>
    </div>

    <div class="seatInfo">
        <!-- all/头等舱切换 -->
        <div class="title disFlex text-center">
            <div @click="cabinChange(flightType.type)" v-for="(flightType,index) in flight_nav_title" :key="index" :class="type==flightType.type?'flex1 tag active':'flex1 tag'">
                <span class="disInlneBlk">{{flightType.title}}</span>
            </div>
        </div>
        <!--单程-->
        <div class="oneSeatInfo disFlex economySeat" v-for="(flight,index) in dataCabin" :key="index" v-if="VoyageType!==2">
            <div class="left flex5">
                <div class="TopDiv disFlex">
                    <div class="topLeft flex1 fontSize-7 orgStateFont flex1">
                        <b><span class="fontSize-1 ">￥</span>{{flight.TicketPrice}}</b>
                    </div>
                    <div class=" flex1 topRight" v-if="flight.FirstTag==2"><p class="selfSell">官网直销</p></div>
                </div>
                <div class="fontLight con">
                    <span>{{flight.CabinDescribe}}{{flight.Discount}}折 </span> | <span class="changeLineBtn" @click="showChangeInfo()"> 退改签 ></span>
                </div>
            </div>

            <div class="center text-center singleLineLess flex2">
                <span class="outBtn outBtnWei" v-if="flight.IsIllegal" @click="showWeiInfo()">违</span>
            </div>

            <div class="subBtnBox text-center singleLineLess flex2">
                <button class="blueBtn lessBtn" @click="toFlightOrder(flight,index)">
                    <p>预订</p>
                    <p class="lessSeat" v-if="flight.CabinAmount<9">剩{{flight.CabinAmount}}张</p>
                </button>
            </div>
        </div>
        <!--往返-->
        <div class="oneSeatInfo disFlex economySeat" v-for="(flight,index) in dataCabin" :key="index" v-if="VoyageType==2">

            <div class="left flex5">
                <div class="TopDiv disFlex">
                    <div class="topLeft flex1 fontSize-1 fontLight">
                        <span class="blueBor blueStateFont tagBo">去</span>
                        {{flight.CabinDescribe}}{{flight.Discount}}折
                        <span class="selfSell" v-if="flight.FirstTag==2">官网直销</span>
                    </div>
                    <!-- <p class="  topRight"><span class="selfSell" v-if="flight.FirstTag==2">官网直销</span></p> -->
                </div>
                <div class="TopDiv disFlex">
                    <div class="topLeft flex1 fontSize-1 fontLight">
                        <span class="greenBor greenStateFont tagBo">返</span>
                        {{flight.VoyageCabinDescribe}}{{flight.VoyageDiscount}}折
                        <span class="selfSell" v-if="flight.VoyageFirstTag==2">官网直销</span>
                    </div>
                    <!-- <p class="  topRight"><span class="selfSell" v-if="flight.VoyageFirstTag==2">官网直销</span></p> -->
                </div>
                <div class="fontLight con">
                    <span class="changeLineBtn" @click="showChangeInfo()">退改签/限购说明 ></span>
                </div>
            </div>

            <div class="center text-right gotoLine disFlex flex2">
                <p class="outBox"><span class="outBtn outBtnWei">违</span></p>                
                <b class="fontSize-7 orgStateFont flex1"><span class="fontSize-1">￥</span>{{flight.ALLTicketPrice}}</b>
            </div>

            <div class="subBtnBox text-center gotoLine flex2">
                <button class="blueBtn lessBtn" @click="toFlightOrder(flight,index)">
                    <p class="lessS">预订</p>                    
                    <!-- <p class="lessSeat" v-if="flight.VoyageCabinAmount<9">剩余{{flight.VoyageCabinAmount}}张</p> -->
                </button>
            </div>
        </div>
    </div>
    <!-- 退改签弹窗 -->
    <div  v-show="showLayer">
        <div :class="{fade: 'showLayer=true'}" @click="offChange"></div>
        <div class="layer layerChangeLine">
            <div class="layerTop layerBg layerBgTop" style="height: 10.8rem">
                <div class="btnChange disFlex">
                    <p class="oneWay flex1 text-right fontSize-6 active">单程</p>
                    <p class="backWay flex1 text-left fontSize-6">返程</p>
                </div>
                <div class="cancel"><img src="~@/assets/images/layer/error@2x.png" alt="" class="icon" @click="offChange"></div>
                <div class="list">
                    <p><img src="~@/assets/images/layer/img-1@2x.png" alt="" class="icon">提供行程单</p>
                    <p><img src="~@/assets/images/layer/img-2@2x.png" alt="" class="icon">预计在扣款成功后60分钟内出票</p>
                    <p><img src="~@/assets/images/layer/img-3@2x.png" alt="" class="icon">免费托运行李额20KG</p>
                </div>
            </div>
            <div class="layerBody">
                <p class="fontSize-7">退改签说明</p>
                <div class="infoTable">
                    <div class="oneTr disFlex">
                        <div class="trTitle">退票费</div>
                        <div class="trBody">
                            <p>按照航司规定执行</p>
                        </div>
                    </div>
                    <div class="oneTr disFlex">
                        <div class="trTitle">更改费</div>
                        <div class="trBody">
                            <p>按照航司规定执行</p>
                        </div>
                    </div>
                    <div class="oneTr  disFlex">
                        <div class="trTitle">签转条件</div>
                        <div class="trBody">
                            <p>按照航司规定执行</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 违字弹唱 -->
    <div v-show="showWei">
        <div :class="{fade: 'showWei=true'}" @click="offWei"></div>
        <div class="layer layerChangeLine">
            <div class="layerTop layerBg layerBgTop" style="height: .3rem;">
                <div class="cancel"><img src="~@/assets/images/layer/error@2x.png" alt="" class="icon" @click="offWei()"></div>
            </div>
            <div class="test layerBody disFlex">
                <div class="goPolicy flex1">
                    <p><span class="fillGoTag">去</span>返程政策</p>
                    <p>违反前后60分钟最低价</p>
                    <p>违反需要提前3天预订</p>
                    <p>违反预订8折以下机票</p>
                </div>
                <div class="backPolicy flex1">
                    <p><span class="fillBackTag">返</span>返程政策</p>
                    <p>违反前后60分钟最低价</p>
                    <p>违反需要提前3天预订</p>
                    <p>违反预订8折以下机票</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import XHeader from '@/components/common/header'
import FlightInfo from '@/components/Flight/flight-info'
import qs from 'qs'
import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
import { error } from 'util';

export default {
    data(){
        return{
            data: [],
            dataCabin:[],
            type: 'all',
            flightSearchData: this.$storage.getSession('flightSearchData'),
            ticketData: this.$storage.getSession('ticketData'),
            VoyageFlight: {},   //返程信息
            tPrice:null,
            showLayer: false,
            showWei: false,
            isType: false,
            VoyageType: 1,
            flight_nav_title: [
                {title: '全部', type: 'all'},
                {title: "头等舱/商务舱", type: 'vip'}
            ],
            ArriveDate: '',             //抵达时间，
            VoyageArriveDate: ''        //返程抵达时间
        }
    },
    created() {
        // 往返
        if(this.flightSearchData.isOneWay == false){

            this.VoyageType = 2;
            // 舱位查询参数
            let cabinParams = {
                DepartDate: this.flightSearchData.DepartDate,
                DepartCityCode: this.flightSearchData.DepartCityCode,
                ArriveCityCode: this.flightSearchData.ArriveCityCode,
                UserId: this.flightSearchData.UserId,
                BookPermission: this.flightSearchData.BookPermission,
                EmpId: this.flightSearchData.EmpId,            
                AgentId: this.flightSearchData.AgentId,
                
                FlightNo: this.ticketData.FlightNo,                         
                AirlineName: this.ticketData.AirlineName,

                VoyageDate: this.flightSearchData.VoyageDate,

                VoyageFlightNo: this.$route.query.FlightNo,     //返程航班号路由传参

                CompanyId:'',
            }
            //因公
            if(this.flightSearchData.isBusiness == 1){
                this.$axios.post('/FlightInfo/PublicFlightVoyageSegment', qs.stringify(cabinParams)).then(res=>{
                    console.log(res)
                    // 往返-因公-舱位
                    this.data = res.data.Result.SegmentList;
                    this.dataCabin = res.data.Result.SegmentList;
                    // 往返-因公-舱位-去程航班信息
                    this.ticketData = res.data.Result.TravelFlight;
                    // 往返-因公-舱位-返程航班信息
                    this.VoyageFlight = res.data.Result.VoyageFlight;
                    //顶部机票信息--时间
                    this.ArriveDate = this.ticketData.DepartDate.substring(5,7)+'月'+this.ticketData.DepartDate.substring(8,10)+'日';
                    //顶部机票信息--时间
                    this.VoyageArriveDate = this.VoyageFlight.DepartDate.substring(5,7)+'月'+this.VoyageFlight.DepartDate.substring(8,10)+'日';
                })
            }else{
                //因私
                this.$axios.post('/FlightInfo/FlightVoyageSegment', qs.stringify(cabinParams)).then(res=>{
                    // 往返-因私-舱位
                    this.data = res.data.Result.SegmentList;
                    this.dataCabin = res.data.Result.SegmentList;
                    // 往返-因私-舱位-去程航班信息
                    this.ticketData = res.data.Result.TravelFlight;
                    // 往返-因私-舱位-返程航班信息
                    this.VoyageFlight = res.data.Result.VoyageFlight;
                    //顶部机票信息--时间
                    this.ArriveDate = this.ticketData.DepartDate.substring(5,7)+'月'+this.ticketData.DepartDate.substring(8,10)+'日';
                    //顶部机票信息--时间
                    this.VoyageArriveDate = this.VoyageFlight.DepartDate.substring(5,7)+'月'+this.VoyageFlight.DepartDate.substring(8,10)+'日';
                })
            }
        }else if(this.flightSearchData.isOneWay == true){
            // 单程
            //顶部机票信息--时间
            this.ArriveDate = this.ticketData.DepartDate.substring(5,7)+'月'+this.ticketData.DepartDate.substring(8,10)+'日';
            // 舱位查询参数
            let cabinParams = {
                DepartDate: this.flightSearchData.DepartDate,
                DepartCityCode: this.flightSearchData.DepartCityCode,
                ArriveCityCode: this.flightSearchData.ArriveCityCode,
                UserId: this.flightSearchData.UserId,
                BookPermission: this.flightSearchData.BookPermission,
                EmpId: this.flightSearchData.EmpId,            
                AgentId: this.flightSearchData.AgentId,
                CompanyId: this.flightSearchData.CompanyId,
                FlightNo: this.ticketData.FlightNo,                         
                AirlineName: this.ticketData.AirlineName,
            }
            // 因公
            if(this.flightSearchData.isBusiness == 1){
                this.$axios.post('/FlightInfoSegment/PublicSearchFlightInfoSegment', qs.stringify(cabinParams)).then(res=>{
                    console.log(res, '我是单程-因公');
                    this.dataCabin = res.data.Result;
                    this.data = res.data.Result;
                }).catch(error=>console.log(error))
            }else{
                // 因私
                this.$axios.post('/FlightInfoSegment/SearchFlightInfoSegment', qs.stringify(cabinParams)).then(res=>{
                    console.log(res, '我是单程-因私');                    
                    this.dataCabin = res.data.Result;
                    this.data = res.data.Result;
                }).catch(error=>console.log(error))
            }
        }
    },
    methods: {
        cabinChange(type){
            this.type = type;
            if(this.type=='all'){
                this.dataCabin = this.data;
            }else{
                this.dataCabin = this.data.filter(item=>item.CabinLevel<3);
            }
        },
        goBack(){
            this.$router.go(-1)
        },
        toFlightOrder(flight,index) {
            this.$storage.setSession('cabinData', flight);
            if(this.flightSearchData.isBusiness == 1){
                // 因公订单
                this.$router.push({path: '/publicorder', query: {
                    isOneWay: this.flightSearchData.isOneWay
                }})
            }else{
                // 因私订单
                this.$router.push({path: '/privateorder', query: {
                    isOneWay: this.flightSearchData.isOneWay
                }})                
            }
        },
        showChangeInfo(){
            this.showLayer = true;
        },
        offChange(){
            this.showLayer = false;
        },
        showWeiInfo(){
            this.showWei = true;
        },
        offWei(){
            this.showWei = false;
        }
    },
    components: {
        XHeader,FlightInfo
    }
}
</script>
<style scoped>
@import '../../assets/css/test.css';
/* 头部header*/

.topHeader {
	height: .4rem;
	line-height: .4rem;
	width: 100%;
	background: #2577e3;
	position: fixed;
	left: 0;
    top: 0;
}

.topInfo {
	color: #ffffff;
    position: absolute;
    top: 0;
	right: 50%;
    transform: translateX(50%);
    font-size: .16rem;
    align-items:center;
}

.goBack {
    margin-top: .13rem;
	margin-left: .1rem;
	height: .14rem;
	width: .14rem;
}

.btnChange {
	height: .32rem;
	line-height: .32rem;
	padding: 0 .8rem;
}

.btnChange p{
	margin: 0 .1rem;
}

.btnChange .active{
	border-bottom: 2px solid #2577e3;
	color: #2577e3;
}

.seatInfo {
	padding: 0 0.05rem;
}

.seatInfo .title {
	height: 0.5rem;
	border-radius: 0.05rem 0.05rem 0 0;
	background: #ffffff;
	border-bottom: 1px solid #e2e2e2;
	box-sizing: content-box;
}

.seatInfo .title .tag {
	font-size: 0.14rem;
	line-height: 0.5rem;
}

.seatInfo .title .active {
	color: #2577e3;
}

.seatInfo .title .active span {
	padding: 0 0.2rem;
	border-bottom: 2px solid #2577e3;
}

.seatInfo .oneSeatInfo {
	margin-bottom: 0.05rem;
	background: #ffffff;
}

.seatInfo .oneSeatInfo .left {
	padding-left: 0.15rem;
}

.seatInfo .oneSeatInfo .left .TopDiv {
	line-height: 0.36rem;
	height: 0.25rem;
}
.seatInfo .oneSeatInfo .left .TopDiv .topRight {
    width: .5rem;
    margin-left: -0.7rem;
    margin-top: .03rem;
}

.seatInfo .oneSeatInfo .left .con {
	height: 0.3rem;
	line-height: 0.3rem;
}

.seatInfo .oneSeatInfo .center {
	width: 1rem;
}

.seatInfo .oneSeatInfo .center .outBox {
	width: 0.24rem;
}

.seatInfo .oneSeatInfo .subBtnBox {
    width: 0.73rem;
}

.seatInfo .singleLine {
	line-height: 0.55rem;
}

.seatInfo .singleLineLess {
	line-height: 0.42rem;
}

.seatInfo .gotoLine {
	line-height: 0.8rem;
}

.seatInfo .gotoLineLess {
	line-height: 0.65rem;
}

.seatInfo .tagBo {
	line-height: 1;
	font-size: 0.08rem;
	margin-right: 0.05rem;
	border-radius: 50%;
	padding: 0.01rem 0.03rem;
}

.seatInfo .moreBtn {
	font-size: 0.14rem;
	border-radius: 0.02rem;
	padding: 0.06rem 0.12rem;
}

.seatInfo .lessBtn {
	padding: 0;
	font-size: .0112rem;
    border-radius: 0.016rem;
    width: .53rem;
    height: .3rem;
    line-height: 0.15rem;
}

.seatInfo .lessBtn p {
	padding: 0 0.03rem;
}

.seatInfo .lessBtn .lessSeat {
	width: 100%;
	border: 1px solid #2577e3;
	background: #ffffff;
	font-size: 0.08rem;
	color: #2577e3;
}
</style>
