<template>
  <div class="privateOrder ticketOrder order">
    <x-header :showBack="true" :title="'机票订单填写'" @go-back="goBack"></x-header>

    <div class="orderContent">
        <order-card :isOneWay="flightSearchData.isOneWay"></order-card>
        <div class="ticketPrice">
            <span class="personType">成人票价<span class="personPrice">￥{{getPersonPrice}}</span></span>
            <span class="otherType">机建燃油<span class="otherPrice">￥{{fuelOilPrice}}</span></span>
            <span class="endorse" @click="openEndorse">退改签规则</span>
            <img class="back" src="../../assets/images/rightRow@2x.png" />
        </div>
        <div class="passenger">
            <div class="passengerTitle">
                <span class="addPassenger">添加乘机人</span>
                <span class="goToAdd" @click="goToAddPassenger">添加<img class="back" src="../../assets/images/Ticketfilling-2@1x.png" /></span>
            </div>
            <ul class="passengerList">
                <li class="passengerItem" v-for="(item, index) in displayPassengerData" :key="index" v-if="item">
                    <img class="deleteIcon" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(item, index)" />
                    <div class="passengerMess">
                        <div class="passengerName">{{item.PsgerName}}</div>
                        <div class="passengerID">身份证：{{item.CardID}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="contactsPerson">
            <div class="contactsItem">
                <span>联系人</span>
                <input v-model="contacts.contactsPersonName" type="text" />
            </div>
            <div class="contactsItem">
                <span>手机号码</span>
                <input v-model="contacts.contactsPersonTel" type="text" />
            </div>
        </div>
        <!-- 保险 -->
        <ticket-insurance :passengerNum="getPersonNum" :type="1"></ticket-insurance>
        <delay-desc></delay-desc>
        <div class="invoiceSwitch">
            <group>
                <x-switch title="发票" v-model="showInvoice"></x-switch>
            </group>
        </div>
        <invoice :title="'机票行程单+保险发票'" :showInvoice="showInvoice"></invoice>
    </div>
    <!-- 费用明细 -->
    <expense-detail :isOneWay="flightSearchData.isOneWay" :type="'flight'" @go-to-penment="goToPayment" :personNum="getPersonNum" :expenseDetailData="getExpenseDetailData"></expense-detail>
    <endorse :isOneWay="flightSearchData.isOneWay" :showEndorse="showEndorse" @close-endorse="closeEndorse"></endorse>
    <!-- 付款方式弹层 -->
    <flight-pay @show-pay="showOrderPay" :OrderPay="OrderPay" :orderNumber="orderNumber"></flight-pay>
    <!-- 出行目的toast -->
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toast" position="middle"></toast>
  </div>
</template>

<script>
import qs from 'qs'
import OrderCard from './order-card'
import TicketInsurance from './ticket-insurance'
import DelayDesc from '../commonBusComponents/delay-desc'
import ExpenseDetail from './expense-detail'
import Endorse from './endorse'
import XHeader from '../common/header'
import XSwitch from 'vux/src/components/x-switch/index'
import Group from 'vux/src/components/group/index'
import Toast from 'vux/src/components/toast/index'
import Invoice from '../commonBusComponents/invoice'

import FlightPay from '../Flight/flight-pay'
import { mapState  } from 'vuex'


export default {
    name: 'ticketorder',
    components: {
        OrderCard,
        TicketInsurance,
        DelayDesc,
        XHeader,
        ExpenseDetail,
        Endorse,
        FlightPay,
        Toast,
        XSwitch,
        Group,
        Invoice
    },
    data: function() {
        return {
            toast: '',                  //出行目的弹窗文字
            showPositionValue: false,   //出行目的弹窗
            insuranceData: this.$storage.getSession('insurance'),
            show: false,
            displayPassengerData: [],
            passengerNum: 0,
            fuelOilPrice: this.$storage.getSession('ticketData').MachineBuildExpenses + this.$storage.getSession('ticketData').FuelExpenses,
            ReductionPrice: 0,
            totalPrice: 0,
            expenseDetailData: [],
            userMess:{},
            flightSearchData:{},
            ticketData:{},
            cabinData:{},
            showEndorse: false,
            endorsData: [],
            entsData: [],
            OrderPay: false,
            orderNumber:'',     //订单号
            contacts: {
                contactsPersonName: this.$storage.getSession('userMess').UserName,
                contactsPersonTel: this.$storage.getSession('userMess').TelPhone
            },
            showInvoice: false
        }
    },
    created() {
        this.userMess = this.$storage.getSession('userMess');
        this.flightSearchData = this.$storage.getSession('flightSearchData');
        this.ticketData = this.$storage.getSession('ticketData');
        this.cabinData = this.$storage.getSession('cabinData');

        this.displayPassengerData = this.displayPassengerData.concat(this.$storage.getSession('entsData'));
        //乘机人数据

        let endorsParams = {
            DepartDate: this.cabinData.DepartDate,
            DepartCityCode: this.cabinData.DepartCityCode,
            ArriveCityCode: this.cabinData.ArriveCityCode,
            AirLineCode: this.cabinData.AirLineCode,
            FlightNo: this.cabinData.FlightNo,
            CabinCode: this.cabinData.CabinCode,
            CabinPrice: this.cabinData.CabinPrice,
            Discount: this.cabinData.Discount
        }

        Promise.all([this.getEndorseData('/FlightInfo/SearchGuestRule', endorsParams),
                    this.getInvoiceData('/BillInfo/GetDefaultNew', {
                        UserId: this.$storage.getSession('userMess').UserId,
                        Token: this.$storage.getSession('userMess').Token
                    })])
            .then(res => {
                this.endorsData = res[0].data.Result
            }).catch(err => {});
    },
    computed: {
        getPersonNum() {
            return this.displayPassengerData.length
        },
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

            let insuranceData = this.insuranceInfo.filter((item, index) => {
                return item.isChecked == true
            })
            let expenseDetail = [ticketPrice]
            insuranceData = this.formatInsuranceData(insuranceData)
            if(insuranceData.length !== 0) {
                expenseDetail.push({
                    text: '保险',
                    type: 'insurance',
                    details: insuranceData
                })
            }
            expenseDetail.push(this.formatReductionPrice())
            return expenseDetail
        }
    },
    methods: {
        showOrderPay(){   //关闭订单支付弹出层
            this.OrderPay = false
        },
        getInvoiceData(url, params) {
            return this.$axios.post(url, qs.stringify(params))
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
        getPassengerData(url, UserId, Token) {
            return this.$axios.post(url, qs.stringify({
                UserId: UserId,
                Token: Token
            }))
        },
        // 数据封装
        getEndorseData(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getOrderNum(url, orderParams){
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderParams)}))
        },
        goToAddPassenger(token) {
            this.$router.push({
                path:'/Entstaff',
                params:{
                    type: token
                }
            })
        },
        goToPayment() {
            if(this.displayPassengerData.length < 1){
                this.toast = '请加联系人'
                this.showPositionValue = true;
                return
            }

            //选中的乘机人
            if(this.displayPassengerData.length === 0) return
            let chosePsger = this.displayPassengerData.map(item=>{
                return {
                    DoumentType:item.CardType,
                    Name:item.PsgerName,
                    Number:item.CardID,
                    Mobile:item.Phone
                }
            })

            //选中的保险
            let chosedInsu = this.filterInsuranceData()

            //因公还是因私
            let OrderAttribute = 3; //1因私，2因公
            if(this.flightSearchData.isBusiness == 1){
                OrderAttribute = 2;
            }else{
                OrderAttribute = 1
            }
            //请求订单号的参数
            let orderParams = {
                AgentId: this.userMess.AgentId,
                OrderAttribute: OrderAttribute,                             //因公、因私
                DepartCityCode: this.cabinData.DepartCityCode,            //出发机场的三字码
                VipNoCabin: this.cabinData.VipNoCabin,
                DeliveryAddressId: 0,
                BillList: "",
                PolicyId: this.cabinData.PolicyId,
                Details: "",
                EnterpriseUserId: this.userMess.EnterpriseUserId,
                BookingUserId: this.userMess.UserId,
                CabinCode: this.cabinData.CabinCode,
                MarkId: "170705111839000",                                 //不知道是什么
                ArriveCityCode: this.cabinData.ArriveCityCode,         //抵达机场的三字码
                VipNoCabinPrice: this.cabinData.VipNoCabinPrice,
                Passengers: chosePsger,
                insuranceProduct: chosedInsu,
                IsChildren: this.cabinData.IsChildren,
                SupplierId: this.cabinData.SupplierId,
                FlightProductId: this.cabinData.FlightProductId,
                OrderLink: this.userMess.UserName,
                Token: this.userMess.Token,
                Mobile: this.userMess.TelPhone,
                Email: this.userMess.Emil,
                BillInfoId: 0,
                BillPrice: 0,
                Phone: "",
                Channel: "CozyTripEnterpriseIOS",
                Addressee: "",
                Source: "TMC H5",
                AirLineProductId: this.cabinData.AirLineProductId,
                DepartDate: this.cabinData.DepartDate,
                FlightNo: this.cabinData.FlightNo,

                //返程的请求参数
                VoyageAirLineProductId: this.cabinData.VoyageAirLineProductId,
                VoyageArriveCityCode: this.cabinData.VoyageArriveCityCode,
                VoyageFlightNo: this.cabinData.VoyageFlightNo,
                VoyageDepartCityCode: this.cabinData.VoyageDepartCityCode,
                VoyageDepartDate: this.cabinData.VoyageDepartDate,
                VoyageCabinCode: this.cabinData.VoyageCabinCode,
                VoyageFlightProductId: this.cabinData.VoyageFlightProductId,
                VoyagePolicyId: this.cabinData.VoyagePolicyId,
                VoyageSupplierId: this.cabinData.VoyageSupplierId,
            }

            let isOneWay = this.$storage.getSession('flightSearchData').isOneWay;
            let url = '';
            if( isOneWay == true ){                   //单程、因私
                url = 'OrderFlight/AddOrder';
            }else if( isOneWay == false){             //往返、因私
                url = 'Order/CreateMultiPrivateOrder'
            }

            this.getOrderNum(url, orderParams).then(res=>{
                this.orderNumber = res.data.Result;
                this.OrderPay = true;
                // this.$storage.setSession('flightOrderNumber', res.data.Result);  待删
            })
        },
        goBack() {
            this.$router.go(-1);
        },
        deletePassenger(item, index) {          //删除乘机人
            let allEntsData = this.$storage.getSession('allEntsData')
            allEntsData.map((val, index) => {
                if(item.CardID === val.CardID) {
                    val.isChecked = false
                }
            })
            this.$storage.setSession('allEntsData', allEntsData)
            this.displayPassengerData.splice(index,1)
            this.$storage.setSession('entsData', this.displayPassengerData)
        },
        filterInsuranceData() {
            return this.insuranceData.filter((item, index) => {
                return item.isChecked === true
            })
        },
        addPassenger() {
            this.$router.push({path: '/MyInmod'})
        },
        openEndorse() {
            this.showEndorse = true
        },
        closeEndorse() {
            this.showEndorse = false
        }
    }
}
</script>

<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/ticketCommonOrder.less";
    @import "../../assets/less/order/privateOrder.less";
    .ticketOrder {
        .invoice .vux-no-group-title {
            margin-top: 0;
        }
    }
</style>
