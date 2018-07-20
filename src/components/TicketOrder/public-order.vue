<template>
  <div class="order ticketOrder ticketPublicOrder">
    <x-header :showBack="true" :title="'机票订单填写'" @go-back="goBack"></x-header>

    <div class="centerContent">
        <order-card :isOneWay="this.isOneWay"></order-card>
        <div class="ticketPrice">
            <span class="personType">成人票价<span class="personPrice">￥{{getPersonPrice}}</span></span>
            <span class="otherType">机建燃油<span class="otherPrice">￥{{fuelOilPrice}}</span></span>
            <span class="endorse" @click="openEndorse">退改签规则</span>
            <img class="back" src="../../assets/images/rightRow@2x.png" />
        </div>
        <div class="passenger">
            <div class="passengerTitle">
                <span class="addPassenger">添加乘机人</span>
                <span class="goToAdd" @click="goToAddPassenger" v-if="bookPermission">添加<img class="back" src="../../assets/images/Ticketfilling-2@1x.png" /></span>
            </div>
            <ul class="passengerList">
                <li class="passengerItem" v-for="(item, index) in displayPassengerData" :key="index">
                    <img class="deleteIcon" v-if="bookPermission" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(index)" />
                    <div class="passengerMess">
                        <div class="passengerName">{{item.PsgerName}}</div>
                        <div class="passengerID">身份证：{{item.CardID}}</div>
                    </div>
                    <div class="costAttr">费用归属<span class="departmentName">{{item.DepartmentName}}</span></div>
                </li>
            </ul>
        </div>
            <Policy :illegalPerson="illegalPerson" :illegalConent="illegalConent"></Policy>
        <div class="travelPurpose"><input type="text" v-model="travelPurpose" placeholder="请输入出行目的" /></div>
        <div class="approvalMess">
            <ul class="approvalList">
                <li class="approvalItem" v-if="JSON.stringify(approvalData) !== '{}'">
                    <span class="approvalTitle">审批部门</span>
                    <span class="approvalName">{{approvalData.Name}}</span>
                </li>
                <li class="approvalItem" v-if="JSON.stringify(approvalData) !== '{}'">
                    <span class="approvalTitle">审批人</span>
                    <span class="approvalName">{{approvalData.ExaminatinName}}</span>
                </li>
                <li class="approvalItem">
                    <span class="approvalTitle">联系人</span>
                    <span class="approvalName">{{this.$storage.getSession('userMess').UserName}}</span>
                </li>
                <li class="approvalItem">
                    <span class="approvalTitle">手机号码</span>
                    <span class="approvalName">{{this.$storage.getSession('userMess').TelPhone}}</span>
                </li>
            </ul>
        </div>
        <ticket-insurance :passengerNum="displayPassengerData.length"></ticket-insurance>
        <delay-desc></delay-desc>
    </div>
    <expense-detail :isOneWay="flightSearchData.isOneWay" @go-to-penment="goToPayment" :personNum="displayPassengerData.length" :expenseDetailData="getExpenseDetailData"></expense-detail>
    <!-- 付款方式 -->
    <endorse :isOneWay="flightSearchData.isOneWay" :showEndorse="showEndorse" @close-endorse="closeEndorse"></endorse>
    <!-- 下单成功跳支付 -->
    <flight-pay @show-pay="showFlightOrderPay" :FlightOrderPay="FlightOrderPay" :orderNumber="orderNumber"></flight-pay>
    <!-- 出行目的toast -->
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toast" position="middle"></toast>
    <!-- 支付按钮弹窗 -->
    <order-popup @to-audit="toAudit" @to-pay="toPay" @off-shade="offShade" :confirm="confirm" :btnLeft="btnLeft" :btnRight="btnRight" :illegalReason="illegalReason" :noPay="noPay" :noAudit="noAudit"></order-popup>
  </div>
</template>

<script>
import OrderCard from './order-card'
import Policy from '../commonBusComponents/policy'
import TicketInsurance from './ticket-insurance'
import DelayDesc from '../commonBusComponents/delay-desc'
import ExpenseDetail from './expense-detail'
import FlightPay from '../Flight/flight-pay'
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import Endorse from './endorse'
import qs from 'qs'
import { mapGetters, mapActions, mapState  } from 'vuex'
import { Toast } from 'vux'
import OrderPopup from '../common/Payment/order-popup'
import { resolve } from 'url'

export default {
    components: {
        OrderCard,
        TicketInsurance,
        DelayDesc,
        XHeader,
        ExpenseDetail,
        Popup,
        Policy,
        FlightPay,
        Endorse,
        Toast,
        OrderPopup
    },
    data() {
        return {
            showPositionValue: false,   //出行目的弹窗
            toast: '',                  //出行目的弹窗文字
            insuranceData: [],
            show: false,
            displayPassengerData: [],
            fuelOilPrice: this.$storage.getSession('ticketData').MachineBuildExpenses + this.$storage.getSession('ticketData').FuelExpenses,
            totalPrice: 0,
            approvalData: {},
            userMess:{},
            flightSearchData:{},
            ticketData:{},
            cabinData:{},
            FlightOrderPay: false,
            minPriceData:'',                     //获取到的机票最低价
            illegalData:'',                      //违规信息和补差
            showEndorse: false,
            policyData: [],
            isOneWay: false,
            travelPurpose: 'test',                              //出行目的
            confirm: false,                                 //支付弹窗显示
            noPay: false,                                   //是否补差，不补差时只显示一个审核按钮
            noAudit: false,                                 //是否需要审核，在不要审核时不显示
            btnLeft: '',                                    //付款审核弹窗左
            btnRight: '',                                   //付款审核弹窗右
            illegalReason: '',                              //违规原因
            illeglPsger: [],
            illegalPerson: [],
            illegalConent: [],                              //违规原因（具体）
            bookPermission: false,
            policyParams: {},
            expenseDetail: [],
            calcPrice: 0,                                   //补差金额
            orderNumber: 0,                                 //生成的订单号
            orderInfo: {},                                  //justOrder生成订单号的返回数据
        }
    },
    created() {
        this.userMess = this.$storage.getSession('userMess')
        this.flightSearchData = this.$storage.getSession('flightSearchData')
        this.ticketData = this.$storage.getSession('ticketData')
        this.cabinData = this.$storage.getSession('cabinData')
        this.insuranceData = this.$storage.getSession('insurance')
        this.isOneWay = this.$route.query.isOneWay

        this.policyParams = {
            EnterpriseUserId: this.userMess.EnterpriseUserId,
            DepartDate: this.cabinData.DepartDate,
            DepartCityId: this.ticketData.DepartCityId,
            DepartCityCode: this.cabinData.DepartCityCode,
            ArriveCityId: this.ticketData.ArriveCityId,
            ArriveCityCode: this.cabinData.ArriveCityCode,
            Channel: 3,
            FlightNo: this.cabinData.FlightNo,
            CabinCode: this.cabinData.CabinCode,
            CabinPrice: this.cabinData.CabinPrice,
            FlightProductId: this.cabinData.FlightProductId,
            AirLineProductId: this.cabinData.AirLineProductId,
            PolicyId: this.cabinData.PolicyId
        }
        //是否可为他人预订
        this.$axios.post('Verification/CheckBookPermission', qs.stringify({
                UserId: this.userMess.UserId,
                EmpId: this.userMess.EmpId,
                EnterpriseUserId: this.userMess.EnterpriseUserId
            }))
            .then(res => {
                this.bookPermission = res.data.Result.BookPermission
                if(!this.bookPermission) {          //不可为他人预订
                    this.getDepartmentOneEmp('MyFrequentPassenger/GetDepartmentOneEmp', {
                        //获取默认旅客的信息
                        EnterpriseUserId: this.userMess.EnterpriseUserId,
                        UserId: this.userMess.UserId,
                        Token: this.userMess.Token,
                        EmpId: this.userMess.EmpId,
                        DepartmentId: this.userMess.DepartmentId,
                        KeyValue: ''
                    }).then(result => {
                        //接着获取乘客及归属部门，判定是否违规
                        this.displayPassengerData.push(result.data.Result)
                        this.policyParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                        this.afterCheckBookPermission()
                    })
                } else {        //可以为他人预订
                    this.displayPassengerData = this.$storage.getSession('psgerAndDepart') ? this.$storage.getSession('psgerAndDepart') : []
                    if(this.displayPassengerData.length !== 0) {
                        this.policyParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                        this.afterCheckBookPermission()
                    }
                }
            })
            .catch(err => {

            });
    },
    computed: {
        getPersonPrice() {
            return this.flightSearchData.isOneWay ? this.cabinData.TicketPrice : this.cabinData.ALLTicketPrice
        },
        ...mapState([
            'insuranceInfo'
        ]),
        getExpenseDetailData() {
            let ticketPrice = {
                type: "flight",
                text: "机票 经济舱",
                details: [{
                    name: '成人票',
                    price: this.flightSearchData.isOneWay ? this.cabinData.TicketPrice : this.cabinData.ALLTicketPrice
                }, {
                    name: '机建燃油',
                    price: this.ticketData.MachineBuildExpenses + this.ticketData.FuelExpenses
                }]
            }

            let insuranceData = this.filterInsuranceData()
            let expenseDetail = [ticketPrice]
            if(insuranceData.length !== 0) {
                insuranceData = this.formatInsuranceData(insuranceData)
                expenseDetail.push({
                    text: '保险',
                    type: 'insurance',
                    details: insuranceData
                })
            }
            expenseDetail.push(this.formatReductionPrice())
            this.expenseDetail = expenseDetail
            return expenseDetail
        },

    },
    methods: {
        offShade(){
            this.confirm = false;
        },
        //支付弹窗左键审核
        toAudit(){
            this.justOrder(1,3,0);
            //直接跳支付
            this.$router.push('/myorder')
            this.confirm = false;
            // if(this.orderInfo.ResponseStatus.Ack == 1 && this.orderInfo.Result.OrderNumber != 0){

            // }else if(this.orderInfo.ResponseStatus.Ack == 2 && this.orderInfo.Result.OrderNumber == 1){

            // }
        },
        //支付弹窗右键补差
        toPay(){
            this.justOrder(1,2,0);
            this.confirm = false;
        },
        showFlightOrderPay(){   //关闭订单支付弹出层
            this.FlightOrderPay = false
        },
        formatReductionPrice() {
            let reductionPrice = {
                type: "reduction",
                text: "优惠",
                details: [{
                    name: '已减金额',
                    price: this.flightSearchData.isOneWay ? this.cabinData.ReductionPrice : this.cabinData.ALLReductionPrice
                }]}
            return reductionPrice
        },
        formatInsuranceData(data) {
            let insData = []
            data.map((item, index) => {
                insData.push({
                    name: item.InsuranceName,
                    price: item.Price
                })
            })
            return insData
        },
        spliceTypeString(data) {
            let typeString = ''
            data.map(item => {
                typeString += item.TypeString
            })
            return typeString
        },
        getIllegalPerson() {
            this.illegalPerson = this.illeglPsger.filter(item => {
                return item.IsIllegal
            })
            return this.illegalPerson.length > 0
        },
        filterOrderCostCenter(orderCostCenter) {
            let costCenter = []
            this.displayPassengerData.map(item => {
                costCenter = orderCostCenter.filter(val => {
                    return val.Name === item.DepartmentName
                })
            })
            return costCenter
        },
        afterCheckBookPermission() {
            this.getIlleglFrequentPsger('MyFrequentPassenger/GetIlleglFrequentPsger', this.policyParams)
            .then(result => {
                console.log(result, '乘客信息')
                this.illeglPsger = result.data.Result
                if(this.getIllegalPerson()) {
                        //如果违规,获取违规原因和审批人
                    let ruleParams = {
                        TypeString: this.spliceTypeString(result.data.Result),
                        EnterpriseUserId: this.userMess.EnterpriseUserId,
                        Token: this.userMess.Token,
                        UserId: this.userMess.UserId,
                        Kind: "0"
                    }
                    let costCenter = this.bookPermission ? this.filterOrderCostCenter(result.data.Result[0].orderCostCenter) : result.data.Result[0].orderCostCenter
                    Promise.all([this.getSerachReasonByCommpanyId('BreakRuleReason/SerachReasonByCommpanyId', ruleParams),
                                //获取违规原因
                                this.getApprovalAssignmentNew('/Examine/ApprovalAssignmentNew', costCenter)
                                //获取审批人
                    ])
                    .then(data => {
                        console.log(data[0], '违规原因')
                        this.illegalConent = data[0].data.Result;
                        console.log(data[1], '审批人')
                        this.approvalData = data[1].data.Result[0].listExaminatinPassger[0];        //第一个审批人
                    })
                }
            })
        },
        getSerachReasonByCommpanyId(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getReserveInfo(url) {
            return this.$axios.post(url, qs.stringify({
                UserId: this.$storage.getSession('userMess').UserId,
                EmpId: this.$storage.getSession('userMess').EmpId,
                EnterpriseUserId: this.$storage.getSession('userMess').EnterpriseUserId
            }))
        },
        getDepartmentOneEmp(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getApprovalAssignmentNew(url, orderCostCenter) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderCostCenter)}))
        },
        getIlleglFrequentPsger(url, policyParams) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(policyParams)}))
        },
        getPassengerData(url, UserId, Token) {
            return this.$axios.post(url, qs.stringify({
                UserId: UserId,
                Token: Token
            }))
        },
        goToAddPassenger() {
            this.$router.push('/Company')
        },
        goBack() {
            this.$router.go(-1);
        },
        deletePassenger(index) {
            this.displayPassengerData.splice(index,1)
            this.$storage.setSession('psgerAndDepart', this.displayPassengerData)
            if(this.displayPassengerData.length !== 0) {
                this.policyParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                this.afterCheckBookPermission()
            } else {
                this.illegalPerson = []
                this.approvalData = {}
            }
        },
        getOrderNum(url, orderParams){
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderParams)}))
        },
        filterInsuranceData() {
            return this.insuranceInfo.filter((item, index) => {
                return item.isChecked === true
            })
        },
        openEndorse() {
            this.showEndorse = true
        },
        closeEndorse() {
            this.showEndorse = false
        },
        getTotalPrice() {
            let totalPrice = 0
            for(let i = 0;i < this.expenseDetail.length; i++) {
                for(let j = 0;j < this.expenseDetail[i].details.length; j++) {
                    totalPrice += this.expenseDetail[i].details[j].price * this.displayPassengerData.length
                }
            }
            return totalPrice
        },
        //定义一个直接创单的函数
        justOrder(ViolationType, ViolationCheck, ViolationAudit){
            //选中的保险号
            let chosedInsu = this.filterInsuranceData().map(item=>{
                return {ProductCode : item.InsuranceCode }
            });

            let orderParams = {
                "ViolationType": ViolationType,
                "ViolationCheck": ViolationCheck,
                "ViolationAudit": ViolationAudit,
                "MakeupPrice": this.calcPrice,                                        //补差金额

                "CostCenterId": this.illeglPsger[0].orderCostCenter[0].CostCenterId,  //费用归属Id
                "CenterType": this.illeglPsger[0].orderCostCenter[0].CenterType,      //费用归属(1 成本中心 2 部门员工)

                "BreakRuleReason": this.illegalData.Message,                          //违规原因（多个用逗号分隔）？
                "ReasonDetail": this.illeglPsger[0].Message,
                "Illegal": this.illegalData.IsIllegal,                                //是否违规

                "MinCabinCode": this.minPriceData.CabinCode,                          //最低价舱位
                "MinFlightNo": this.minPriceData.FlighNo,                             //最低价航班号
                "MinPolicyId": this.minPriceData.MinPolicyId,                         //最低价航班政策号
                "MinFlightProductId": "0",                                            //最低价航班产品ID，没找到？

                "Price": this.getTotalPrice(),                                        //总价
                "insuranceProduct": chosedInsu,                                       //保险产品CODE列表
                "Passengers": this.displayPassengerData.map((item,index)=>{           //单程乘客信息
                    return {
                        "Mobile": item.Phone,
                        "Name": item.PsgerName,
                        "PassgerUserId": item.PassgerUserId,
                        "CardType": item.CardType,
                        "PassengerType": item.PsgerType,
                        "DepartmentName": item.DepartmentName,
                        "CardId": item.CardID,

                        "CostCenterName": this.approvalData.Name,
                        "CostCenterType": this.approvalData.CenterType,
                        "CostCenterId": this.approvalData.CostCenterId,
                        "DepartmentId":"0",
                        "Illegal": this.illegalConent.length>0?true:false,
                        "PassgerBreakRuleReason": this.illeglPsger[index].Message,
                    }
                }),
                "publicPassengers": this.displayPassengerData.map((item,index)=>{     //往返乘客信息
                    return {
                        "RoseType": item.RoseType,
                        "PassgerUserId": item.PassgerUserId,
                        "Name": item.PsgerName,
                        "Mobile": item.Phone,
                        "Number": item.CardID,
                        "DoumentType": item.CardType,
                        "Sex": item.Gender,
                        "CostCenterName": this.approvalData.Name,
                        "CostCenterType": this.approvalData.CenterType,
                        "CostCenterId": this.approvalData.CostCenterId,
                        "DepartmentId":'0',
                        "DepartmentName": item.DepartmentName,
                        "Illegal": this.illegalConent.length>0?true:false,
                        "PassgerBreakRuleReason": this.illeglPsger[index].Message,
                        "VoyagePassgerBreakRuleReason":'test',
                        "Price": 0,
                        "EmpId": this.userMess.EmpId,
                        "Birthday": this.userMess.BrithDay,
                    }
                }),
                "ExamineDepartment": this.approvalData.Name,                          //审批人部门
                "ExamineName": this.approvalData.ExaminatinName,                      //审批人姓名
                "ExamineUserId": this.approvalData.ExaminatinUserID,                  //审批人Id

                "DepartCityName": this.flightSearchData.DepartCityName,
                "ArriveCityCode": this.cabinData.ArriveCityCode,                      //抵达机场的三字码
                "VipNoCabin": this.cabinData.VipNoCabin,
                "SupplierId": this.cabinData.SupplierId,                              //供应商ID
                "IsChildren": this.cabinData.IsChildren,
                "AirLineProductId": this.cabinData.AirLineProductId,                  //舱位产品ID
                "FlightNo": this.cabinData.FlightNo,
                "CabinCode": this.cabinData.CabinCode,
                "FlightProductId": this.cabinData.FlightProductId,                    //机票产品Id
                "DepartDate": this.cabinData.DepartDate,                              //出发日期
                "VipNoCabinPrice": this.cabinData.VipNoCabinPrice,

                "DepartCityCode": this.cabinData.DepartCityCode,                      //出发城市三字码
                "ArriveCityName": this.flightSearchData.ArriveCityName,
                "TripPurpose": this.travelPurpose,
                "OrderAttribute": 2,                                //因私1，因公2
                "EmpId": this.userMess.EmpId,
                "Mobile": this.userMess.TelPhone,                   //订单联系人电话
                "BookingUserId": this.userMess.UserId,
                "BookingUserName": this.userMess.UserName,          //预订人
                "Token": this.userMess.Token,
                "Email": this.userMess.Emil,
                "OrderLink": this.userMess.UserName,                //订单联系人姓名
                "AgentId": this.userMess.AgentId,
                "EnterpriseUserId": this.userMess.EnterpriseUserId,
                "ExpenseAscription": "2018-05-01 20:10 咸阳国际机场 @ 2018-05-01 21:35 香山机场 @ MU2385／经济舱10折扣 @ 单价707",
                "IsIllegalType": "",                                //？
                "Source": "TMC H5",
                "MarkId": "170705111839000",

                //返程的请求参数
                "VoyageAirLineProductId": this.cabinData.VoyageAirLineProductId,
                "VoyageArriveCityCode": this.cabinData.VoyageArriveCityCode,
                "VoyageFlightNo": this.cabinData.VoyageFlightNo,
                "VoyageDepartCityCode": this.cabinData.VoyageDepartCityCode,
                "VoyageDepartDate": this.cabinData.VoyageDepartDate,
                "VoyageCabinCode": this.cabinData.VoyageCabinCode,
                "VoyageFlightProductId": this.cabinData.VoyageFlightProductId,
                "VoyagePolicyId": this.cabinData.VoyagePolicyId,
                "VoyageSupplierId": this.cabinData.VoyageSupplierId,
                "VoyageVipNoCabin": this.cabinData.VoyageVipNoCabin,
                "VoyageVipNoCabinPrice": this.cabinData.VoyageVipNoCabinPrice,
                "ViolatExpenseAscription": "2018-05-18 06:35 虹桥国际机场 @ 2018-05-18 10:55 双流国际机场 @ HO1269／经济舱6.1折扣 @ 单价997",
                "VoyageDepartCityName": this.flightSearchData.DepartCityName,
                "VoyageArriveCityName": this.flightSearchData.ArriveCityName,
                "VoyageMinCabinCode": this.minPriceData.VoyageCabinCode,
                "VoyageMinFlightNo": this.minPriceData.VoyageFlighNo,
                "VoyageMinPolicyId": this.minPriceData.VoyageMinPolicyId,
            }
            console.log(orderParams, '请求订单参数');
            let url = this.$storage.getSession('flightSearchData').isOneWay==true?'OrderFlight/AddPublicOrder':'Order/CreateMultiPublicOrder';
            //获取订单号
            this.getOrderNum(url, orderParams).then(res=>{
                console.log(res, '获取订单号');
                this.orderNumber = res.data.Result.OrderNumber;
                this.orderInfo = res.data;
            })
        },
        goToPayment() {
            console.log(this.displayPassengerData)
            if(this.displayPassengerData.length == 0){
                this.toast = '请加联系人'
                this.showPositionValue = true;
                return
            }
            if(this.travelPurpose == ''){
                this.toast = '请输入目的'
                this.showPositionValue = true;
                return
            }

            let VoyageMinPriceParams = {
                DepartDate: this.cabinData.DepartDate,
                DepartCityCode: this.cabinData.DepartCityCode,
                ArriveCityCode: this.cabinData.ArriveCityCode,
                FlightNo: this.cabinData.FlightNo,
                CabinCode: this.cabinData.CabinCode,
                AgentId: this.userMess.AgentId,
                VoyageDepartDate: this.cabinData.VoyageDepartDate,
                VoyageDepartCityCode: this.cabinData.VoyageDepartCityCode,
                VoyageArriveCityCode: this.cabinData.VoyageArriveCityCode,
                VoyageFlightNo: this.cabinData.VoyageFlightNo,
                VoyageCabinCode: this.cabinData.VoyageCabinCode,
            }
            let minPriceParams = {
                DepartDate: this.cabinData.DepartDate,
                DepartCityCode: this.cabinData.DepartCityCode,
                ArriveCityCode: this.cabinData.ArriveCityCode,
                FlightNo: this.cabinData.FlightNo,
                CabinCode: this.cabinData.CabinCode,
                AgentId: this.userMess.AgentId,
            }
            let priceURL = this.$storage.getSession('flightSearchData').isOneWay==true?'/Flight/GetMinPrice':'/Flight/GetMinPriceVoyage';
            let priceParams = this.$storage.getSession('flightSearchData').isOneWay==true?minPriceParams:VoyageMinPriceParams;
            //1.获取最低价
            this.$axios.post(priceURL, qs.stringify(priceParams)).then(res=>{
                console.log(res, '获取最低价')
                this.minPriceData = res.data.Result;

                //选中的保险总金额
                let totalInsuPrice = this.filterInsuranceData().map(item=>{
                    return item.Price
                }).reduce((tmp, item)=>{
                    return tmp+item;
                });

                let weiParams = {
                    UserId: this.userMess.UserId,
                    Token: this.userMess.Token,
                    EnterpriseUserID: this.userMess.EnterpriseUserID,
                    Type: 0,                                        //？？？
                    PassengerIds: 0,                                //有多个，常旅客为0，公司员工为员工id
                    MinPrice: this.minPriceData.minprice,           //机票最低价
                    Price: this.cabinData.TicketPrice,              //机票价格？？？
                    Discount: this.cabinData.Discount,              //舱位折扣
                    InsurancePrice: totalInsuPrice,                 //保险总金额
                    VipNoCabinPrice: this.cabinData.VipNoCabinPrice,
                    Otherprice: totalInsuPrice+100,                 //机建，燃油、保险等费用合
                    Departdate: this.cabinData.Departdate,
                    CabinPrice: this.cabinData.CabinPrice,
                    VipNoCabin: this.cabinData.VipNoCabin,
                    ServiceFee: this.cabinData.ServiceFee
                }
                //2.违规判定
                this.$axios.post('/Verification/PublicFlightCalcPrice', qs.stringify(weiParams)).then(res=>{
                    this.illegalData = res.data.Result;
                    this.calcPrice = res.data.Result.Price;
                    console.log(res, '违规价格计算');

                    //1能否继续预订
                    if(res.data.Result.CanOrder){
                        //1.1出行审
                        if(res.data.Result.Isapproval){
                            //1.1.1违规
                            if(res.data.Result.IsIllegal){
                                this.illegalReason = res.data.Result.Message;
                                //(1)补差
                                if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                    this.btnLeft = '提交审核并预订';
                                    this.btnRight = `补差${res.data.Result.Price}元并预订`
                                    this.confirm = true;
                                }else{
                                    //(2)不补差
                                    this.noPay = true;
                                    this.btnLeft = '提交审核并预定';
                                    this.confirm = true;
                                }
                            }else{
                                //1.1.2不违规
                                //(1)补差
                                if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                    this.btnLeft = '提交审核并预订';
                                    this.btnRight = `补差${res.data.Result.Price}元并预订`
                                    this.confirm = true;
                                }else{
                                    //(2)不补差
                                    this.noPay = true;
                                    this.btnLeft = '提交审核并预定';
                                    this.confirm = true;
                                }
                            }
                        }else{
                            //1.2非出行审
                            //1.2.1 非出行审,违规
                            if(res.data.Result.IsIllegal){
                                //1.2.1.1 违规需要审核
                                if(res.data.Result.CanAudit){
                                    //(1)补差
                                    if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                        this.btnLeft = '提交审核并预订';
                                        this.btnRight = `补差${res.data.Result.Price}元并预订`
                                        this.confirm = true;
                                    }else{
                                        //(2)不补差
                                        this.noPay = true;
                                        this.btnLeft = '提交审核并预定';
                                        this.confirm = true;
                                    }
                                }else{
                                    //1.2.1.2 违规不需要审核
                                    //(1)补差
                                    if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                        this.noAudit = true;
                                        this.btnRight = `补差${res.data.Result.Price}元并预订`
                                        this.confirm = true;
                                    }else{
                                        //(2)不补差，直接创单
                                        justOrder(1,3,0);
                                        this.FlightOrderPay = true;
                                    }
                                }
                            }else{
                                //1.2.2 非出行审,不违规
                                //1.2.2.1 不违规需要审核
                                if(res.data.Result.CanAudit){
                                    this.noPay = true;
                                    this.btnLeft = '提交审核并预订';
                                    this.confirm = true;
                                }else{
                                    //1.2.2.2 不违规不需要审核
                                    //不补差，直接创单
                                    justOrder(1,3,0);
                                    this.FlightOrderPay = true;
                                }
                            }
                        }
                    }else{
                        //2不能继续预订
                        alert('你们有预订权限');
                        return
                    }
                })
            })
        },
    }
}
</script>

<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/publicOrder.less";
    @import "../../assets/less/order/ticketCommonOrder.less";
</style>
