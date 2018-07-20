<template>
  <div class="order publicOrder hotelOrder">
    <x-header :showBack="true" :title="'酒店订单填写'"></x-header>
    <div class="centerContent">
        <hotel-order-card></hotel-order-card>
        <div class="roomNum">
            <span class="roomText">房间数
                <span class="Num">
                    <popup-picker value-text-align="'left'" :data="list1" v-model="identityType" class="popicker">
                        <div class="moinput"></div>
                    </popup-picker>
                </span>
            </span>       
            <img class="back" src="../../assets/images/rightRow@2x.png" />
        </div>
        <div class="passenger">
            <div class="passengerTitle">
                <span class="addPassenger">添加入住人</span>
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
        <Policy :illegalPerson="illegalPerson" :illegalConent="illegalConent"></Policy>
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
    </div>
    <expense-detail :isOneWay="true" :type="'hotel'" @go-to-penment="goToPayment" :personNum="getPersonNum" 
        :expenseDetailData="getExpenseDetailData" :roomTotalPrice="getRoomTotalPrice" :roomNum="identityType[0]" 
        :daysNum="getDaysNum">
    </expense-detail>
  </div>
</template>

<script>

import HotelOrderCard from './hotel-order-card'
import ExpenseDetail from '../TicketOrder/expense-detail'
import PrivateAddPassenger from '../commonBusComponents/private-add-passenger'

import PopupPicker from 'vux/src/components/popup-picker/index'
import XHeader from '../common/header'
import Policy from '../commonBusComponents/policy'
import qs from 'qs'

import { getDayNum } from '../../utils/utils.js'

export default {
    name: 'privatehotelorder',
    components: {
        HotelOrderCard,
        XHeader,
        ExpenseDetail,
        PrivateAddPassenger,
        PopupPicker,
        Policy
    },
    data: function() {
        return {
            identityType: ['1间'],
            list1: [['1间','2间','3间','4间','5间','6间','7间','8间','9间']],
            displayPassengerData: [],
            contacts: {
                contactsPersonName: this.$storage.getSession('userMess').UserName,
                contactsPersonTel: this.$storage.getSession('userMess').TelPhone
            },
            hotelItemDetail: this.$storage.getSession('hotelItemDetail'),
            hotelData: this.$storage.getSession('hotelData'),
            hotelParams: {},
            userMess: this.$storage.getSession('userMess'),
            illegalReason: '',                              //违规原因
            illeglPsger: [],
            illegalPerson: [],
            illegalConent: [],                              //违规原因（具体）
            bookPermission: false,
            approvalData: {},
        }
    },
    computed: {
        getPersonNum() {
            return this.displayPassengerData.length
        },
        getExpenseDetailData() {
            let hotelExpenseDetail = [{
                type: 'hotel',
                text: this.$storage.getSession('hotelData').HotelName,
                details: [{
                    name: this.hotelItemDetail.RoomTitle,
                    price: this.hotelItemDetail.RoomPrice
                }]
            }]

            return hotelExpenseDetail
        },
        getDaysNum() {
            let startTime = this.$storage.getSession('hotelData').CheckInTime
            let endTime = this.$storage.getSession('hotelData').CheckOutTime
            return getDayNum(startTime, endTime)
        },
        getRoomTotalPrice() {
            return parseInt(this.identityType) * this.hotelItemDetail.RoomPrice
        }
    },
    created() {
        let hotelParams = {
            CheckInTime: this.hotelData.CheckInTime,
            CityId: this.$route.query.cityId,
            EnterpriseUserId: this.userMess.EnterpriseUserId,
            PassgerUserId: this.userMess.UserId,
            Price: this.hotelItemDetail.RoomPrice,
            ProductId: this.hotelData.SourceHotelCode,
            Token: this.userMess.Token
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
                        hotelParams.listIlleglFrequentPsgerModel = this.displayPassengerData                
                        this.afterCheckBookPermission(hotelParams)                       
                    })
                } else {        //可以为他人预订
                    this.displayPassengerData = this.$storage.getSession('psgerAndDepart') ? this.$storage.getSession('psgerAndDepart') : []
                    if(this.displayPassengerData.length !== 0) {
                        hotelParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                        this.afterCheckBookPermission(hotelParams)
                    }
                }     
            })
            .catch(err => {

            });
    },
    methods: {
        goToExpenseDetail() {
            this.expenseDetailShow = true
        },
        goToPenment() {
            this.$router.push('/paysuccess')
        },
        chooosePassenger(data, isChecked, index) {
            if(isChecked) {
                this.displayPassengerData.push(data)
            } else {
                this.displayPassengerDatathis = this.displayPassengerData.splice(index, 1)
            }
            this.passengerNum = this.displayPassengerDatathis.length
        },
        goToAddPassenger() {
            this.$router.push({path: '/Company'})
        },
        deletePassenger(item, index) {          //删除乘机人
            let allEntsData = this.$storage.getSession('allEntsData')
            allEntsData.map((val, index) => {
                if(item.CardID === val.CardID) {
                    val.isChecked = false
                }
            })
            this.displayPassengerData.splice(index,1)
        },
        spliceTypeString(data) {
            let typeString = ''
            data.map(item => {
                typeString += item.TypeString
            })
            return typeString
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
        afterCheckBookPermission(hotelParams) {
            this.getIlleglFrequentPsger('MyFrequentPassenger/GetIlleglFrequentPsgerForHotel', hotelParams)
            .then(result => {
                this.illeglPsger = result.data.Result
                
                if(this.getIllegalPerson()) {         
                        //如果违规,获取违规原因和审批人
                    let ruleParams = {
                        TypeString: this.spliceTypeString(result.data.Result),
                        EnterpriseUserId: this.userMess.EnterpriseUserId,
                        Token: this.userMess.Token,
                        UserId: this.userMess.UserId,
                        Kind: "1"
                    }
                    let costCenter = this.bookPermission ? this.filterOrderCostCenter(result.data.Result[0].orderCostCenter) : result.data.Result[0].orderCostCenter
                    Promise.all([this.getSerachReasonByCommpanyId('BreakRuleReason/SerachReasonByCommpanyId', ruleParams),
                                //获取违规原因
                                this.getApprovalAssignmentNew('/Examine/ApprovalAssignmentNew', costCenter)
                                //获取审批人
                    ])                                            
                    .then(data => {
                        this.illegalConent = data[0].data.Result;  //违规原因
                        this.approvalData = data[1].data.Result[0].listExaminatinPassger[0]    //审批人
                    })                                                          
                }
            })
        },
        getIllegalPerson() {
            this.illegalPerson = this.illeglPsger.filter(item => {
                return item.IsIllegal
            })
            return this.illegalPerson.length > 0
        },
        getIlleglFrequentPsger(url, params) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(params)}))
        },
        getSerachReasonByCommpanyId(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getApprovalAssignmentNew(url, orderCostCenter) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderCostCenter)}))
        },
        goToPayment() {

        }
    }
}
</script>
 
<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/publicOrder.less";
    @import "../../assets/less/order/hotelCommonOrder.less";
    
</style>
