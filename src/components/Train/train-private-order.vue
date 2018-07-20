<template>
    <div class="trainOrder privateOrder order">
        <x-header :showBack="true" :title="'订单信息'" @go-back="goBack">
                <!-- <span slot="right" class="icon ddicon">因公</span> -->
        </x-header>
        <div class="centerContent">
            <div class="TORback">
                <p class="backP">{{train.FromTime}}</p>
                <div class="Airation">
                    <div class="ationTicket">
                        <div class="AirationSign">
                            <div class="Timetable">
                                <div class="Timestart">
                                    <p class="startime">{{train.StartStation}}</p>
                                    <p class="startress">{{train.StartTime}}</p>
                                </div>
                                <div class="Timechannel">
                                    <p>{{train.TrainCode}}</p>
                                    <p class="Timechannelp"><img src="../../assets/images/train/icon20@1x.png" alt=""></p>
                                    <p class="Timechanneltimp">{{train.CostTimeFormat}}</p>
                                </div>
                                <div class="TimeEnd Timestart">
                                    <p class="startime">{{train.EndStation}}</p>
                                    <p class="startress">{{train.EndTime}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="backmyon">￥{{seatPrice}}</p>
            </div>
            <div class="seat" style="display:flex">
                <div style="flex:1;" class="seatInfo" :class="{seatActive: seatTypeStr == item.SeatTypeStr}" v-for="(item,index) in train.SeatInfos" :key="index" @click="chooseSeat(item, index)">
                    <p>{{item.SeatTypeStr}}</p>
                    <p>{{item.SeatNum}}张</p>
                    <p>￥{{item.TicketFee}}</p>
                </div>
            </div>
            <div class="passenger">
                <div class="passengerTitle">
                    <span class="addPassenger">出行人 <span>请确保姓名证件填写正确</span></span>
                    <span class="goToAdd" @click="goToAddPassenger">添加</span>
                </div>
                <ul class="passengerList" v-if="entsData.length > 0">
                    <li class="passengerItem" v-for="(item,index) in entsData" :key="index">
                        <img class="deleteIcon" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(item, index)" />
                        <div class="passengerMess">
                            <div class="passengerName"></div>
                            <div class="passengerID">
                                <p class="passengerIDad">{{item.PsgerName}}</p>
                                <p> 身份证：{{item.CardID}}</p>
                            </div>
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
            <train-insurance :passengerNum="getPersonNum"></train-insurance>
            <div class="invoiceSwitch">
                <group>
                    <x-switch title="发票" v-model="showInvoice"></x-switch>
                </group>
            </div>
            <invoice :title="'保险发票'" :showInvoice="showInvoice"></invoice>
        </div>
        <!-- 底部费用明细 -->
        <expense-detail :isOneWay="true" :type="'train'" @go-to-penment="goToPayment" :personNum="getPersonNum"
                        :expenseDetailData="getTrainExpenseDetail" :totalPrice="totalPrice">
        </expense-detail>
        <!-- 出行目的toast -->
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toast" position="middle"></toast>
        <!-- 付款方式弹层 -->
        <flight-pay @show-pay="showOrderPay" :FlightOrderPay="FlightOrderPay" :orderNumber="orderNumber"></flight-pay>
    </div>
</template>
<script>
import qs from 'qs'
import { mapState  } from 'vuex'
import XHeader from '../common/header'
import TrainInsurance from './train-insurance'
import ExpenseDetail from '../TicketOrder/expense-detail'
import XSwitch from 'vux/src/components/x-switch/index'
import Group from 'vux/src/components/group/index'
import Toast from 'vux/src/components/toast/index'
import FlightPay from '../Flight/flight-pay'      //火车订单支付
import Invoice from '../commonBusComponents/invoice'

export default {
    components: {
        XHeader,
        TrainInsurance,
        ExpenseDetail,
        Toast,
        FlightPay,
        Group,
        XSwitch,
        Invoice
    },
    data() {
        return {
            toast: '',                                                  //出行目的弹窗文字
            showPositionValue: false,                                   //出行目的弹窗
            train: this.$storage.getSession('trainData'),                   //具体选中的车次信息
            userMess: this.$storage.getSession('userMess'),                 //用户信息
            seatPrice: this.$storage.getSession('trainItemData').TicketFee,            
            entsData: [],
            totalPrice: 0,
            approvalData: [],
            trainItemData: {},  //点中的座位信息
            seatTypeStr: this.$route.query.SeatTypeStr,      //点中的座位的类型名
            FlightOrderPay: false,                          //火车支付弹层
            orderNumber:'',       //订单号
            contacts: {
                contactsPersonName: this.$storage.getSession('userMess').UserName,
                contactsPersonTel: this.$storage.getSession('userMess').TelPhone
            },
            showInvoice: false
        }
    },
    computed: {
        getPersonNum() {
            return this.entsData.length
        },
        ...mapState([
            'trainInsuranceInfo'
        ]),
        getTrainExpenseDetail(state) {
            let trainItemData = this.$storage.getSession('trainItemData')
            let trainPriceObj = [{
                name: trainItemData.SeatTypeStr,
                price: trainItemData.TicketFee
            }]

            if(trainItemData.ServiceFee !== 0) {
                trainPriceObj.push({
                    name: '服务费',
                    price: trainItemData.ServiceFee
                })
            }

            let trainPrice = {
                type: "train",
                text: "火车票",
                details: trainPriceObj
            }
            let expenseDetailData = [trainPrice]

            let insArr = this.trainInsuranceInfo.filter(item => {
                return item.isChecked
            })


            if(insArr.length > 0) {
                insArr = this.formatInsuranceData(insArr)
                expenseDetailData.push({
                    text: '保险费用',
                    type: 'insurance',
                    details: insArr
                })
            }
            return expenseDetailData
        }
    },
    created(){
        this.entsData = this.$storage.getSession('entsData') ? this.entsData.concat(this.$storage.getSession('entsData')) : []

    },
    methods: {
        showOrderPay(){   //关闭订单支付弹出层
            this.FlightOrderPay = false
        },
        goBack(){
            this.$router.go(-1);
        },
        chooseSeat(seat, index){
            this.seatPrice = seat.TicketFee;
            this.trainItemData = seat;                      //座位信息
            this.$storage.setSession('trainItemData', seat) //座位信息

            this.seatTypeStr = seat.SeatTypeStr
        },
        goToAddPassenger() {   //添加联系人
            this.$router.push({
                path:'/Entstaff'
            })
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
        deletePassenger(item, index) {          //删除乘机人
            let allEntsData = this.$storage.getSession('allEntsData')
            allEntsData.map((val, index) => {
                if(item.CardID === val.CardID) {
                    val.isChecked = false
                }
            })
            this.$storage.setSession('allEntsData', allEntsData)
            this.entsData.splice(index,1)
            this.$storage.setSession('entsData', this.entsData)
        },
        filterInsData(data) {
            return data.filter((item, index) => {
                return item.isChecked
            })
        },
        //支付按钮
        goToPayment(){

            //检测联系人添加
            if(this.entsData.length < 1){
                this.toast = '请加联系人'
                this.showPositionValue = true;
                return
            }

            //选中的保险
            let chosedInsu = this.trainInsuranceInfo.filter(item=>{
                return item.isChecked
            })

            //选中的保险号
            let chosedInsuId = chosedInsu.map(item=>{
                return {
                    ProductCode: item.InsuranceCode
                }
            })

            //乘客信息
            let chosePsger = this.entsData.map(item=>{
                return {
                    "DoumentType": item.CardType,
                    "Name": item.PsgerName,
                    "Number": item.CardID,
                    "Mobile": item.Phone
                }
            })


            let trainParams = {
                "Details": "",
                "BillList": "",
                "AgentId": this.userMess.AgentId,
                "DeliveryAddressId": 0,
                "ArriveStation": this.train.ArriveStation,
                "BookingAmount": this.entsData.length,                      //预订座位数
                "passengers": chosePsger,
                "EnterpriseUserId": this.userMess.EnterpriseUserId,
                "SeatType": this.seatTypeStr,
                "MarkId":"170705111839000",
                "insuranceProduct": chosedInsuId,                             //选中的保险号
                "OrderLink": this.userMess.UserName,
                "BookingUserName": this.userMess.UserName,                  //预订人
                "BookingUserId": this.userMess.UserId,
                "UserId": this.userMess.UserId,
                "BillInfoId": 0,
                "PayPrice": "536",
                "BillPrice": 0,
                // "AddressId":221,
                "Token": this.userMess.Token,
                "Phone": this.userMess.TelPhone,
                "Mobile": this.userMess.TelPhone,                           //订单联系人电话
                "Email": this.userMess.Emil,
                "Remark":"",                                                //备注
                "FromStation": this.train.FromStation,
                "Addressee": "",
                "DepartureDate": this.$storage.getSession('trainSearchData').originDepartureDate,
                "Source":"TMC H5",
                "TrainCode": this.train.TrainCode
            }
            this.$axios.post('/Order/CreateTrainOrder', qs.stringify({'json': JSON.stringify(trainParams)})).then(res=>{
                this.orderNumber = res.data.Result;
                this.FlightOrderPay = true;
            })
        }
    }

}
</script>
<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/trainCommonOrder.less";
    @import "../../assets/less/order/privateOrder.less";
  
</style>
