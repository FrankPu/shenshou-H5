<template>
  <div class="hotelOrder privateOrder order">
    <x-header :showBack="true" :title="'酒店订单填写'" @go-back="goBack">
        <span slot="right">查看详情</span>
    </x-header>
    <div class="centerContent">
        <hotel-order-card :roomData="roomData" :daysNum="getDaysNum"></hotel-order-card>
        <div class="roomNum">
            <span class="roomText">房间数<span>(每间最多可住2人)</span></span>
            <span class="num">{{getRoomNum}}间</span>
            <img class="back" src="../../assets/images/hotel/arrow.png" />
        </div>
        <ul class="choseRoomNumBlock">
            <li :class="[{'roomNumBlockActive': index === currentRoomNunIndex}, 'roomNumBlockItem']"
                v-for="(item, index) in list" :key="index" @click="choseRoomNum(item, index)">
                {{item}}
            </li>
        </ul>
        <ul class="passengerBlock">
            <li class="passengerBlockItem" v-for="(item, index) in getPassengerBlock" :key="index" @click="chosePassenger(item, index)">
                <img v-if="item.isChecked" src="../../assets/images/hotel/Selectthebox.png" />
                <img v-else src="../../assets/images/hotel/uncheck.png" />
                <span class="blockText">{{item.PsgerName}}</span>
            </li>
        </ul>
        <div class="checkInPerson">
            <span class="checkInText"><span>入住人</span></span>
            <ul class="passengerList">
                <li class="passengerItem" v-for="(item, index) in displayPassengerData" :key="index">
                    <img class="deleteIcon" src="../../assets/images/hotel/deletebutton.png" @click="deletePassenger(item, index)" />
                    <input class="passengerName" placeholder="每间只需填写1人姓名" v-model="item.PsgerName" />
                </li>
            </ul>
            <span class="contactIcon" @click="goToEntsStaff"><img src="../../assets/images/hotel/contact.png" /></span>
        </div>
        <div class="contactsPerson">
            <div class="contactsItem">
                <span>联系手机</span>
                <input v-model="contactsPersonTel" placeholder="用于接收通知" type="text" />
            </div>
        </div>
        <div class="invoiceSwitch">
            <group>
                <x-switch title="发票" v-model="showInvoice"></x-switch>
            </group>
        </div>
        <invoice :title="'酒店发票'" :showInvoice="showInvoice"></invoice>
    </div>
    <expense-detail :isOneWay="true" :type="'hotel'" @go-to-penment="goToPayment" :personNum="getPersonNum"
        :expenseDetailData="getExpenseDetailData" :roomTotalPrice="getRoomTotalPrice" :roomNum="identityType[0]"
        :daysNum="getDaysNum">
    </expense-detail>
    <test :showStaff="showStaff" @close-staff="closeStaff"></test>
    
    <popup>
         
    </popup>
  </div>
</template>

<script>

import HotelOrderCard from './hotel-order-card'
import ExpenseDetail from '../TicketOrder/expense-detail'
import PrivateAddPassenger from '../commonBusComponents/private-add-passenger'

import PopupPicker from 'vux/src/components/popup-picker/index'
import XHeader from '../common/header'
import XSwitch from 'vux/src/components/x-switch/index'
import Group from 'vux/src/components/group/index'
import Popup from '../common/popup/index'
import Invoice from '../commonBusComponents/invoice'

import Test from '../TicketOrder/test'


import qs from 'qs'

import { mapState  } from 'vuex'

import { getDayNum } from '../../utils/utils.js'

export default {
    name: 'privatehotelorder',
    components: {
        HotelOrderCard,
        XHeader,
        ExpenseDetail,
        PrivateAddPassenger,
        PopupPicker,
        XSwitch,
        Group,
        Test,
        Popup,
        Invoice
    },
    data: function() {
        return {
            identityType: ['1间'],
            list: ['1间','2间','3间','4间','5间','6间','7间','8间','9间', '10间'],
            displayPassengerData: [{ PsgerName: '', CardID: '' }],           
            contactsPersonTel: '',
            hotelItemDetail: this.$storage.getSession('hotelItemDetail'),
            hotelData: this.$storage.getSession('hotelData'),
            currentRoomNunIndex: 0,
            roomNum: 1,
            roomData: {},
            showStaff: false,
            unDisplayNum: 0,
            showInvoice: false
        }
    },
    computed: {
        getPersonNum() {
            let displayPassengerData = this.displayPassengerData.filter(item => {
                return item.PsgerName !== ''
            })
            return displayPassengerData.length
        },
        getExpenseDetailData() {
            let hotelExpenseDetail = [{
                type: 'hotel',
                text: this.$storage.getSession('hotelData').HotelName,
                details: [{
                    name: this.hotelItemDetail.RoomName,
                    price: this.hotelItemDetail.Price
                }]
            }]

            if(this.showInvoice) {
                let invoiceData = {
                    type: 'invoice',
                    text: '发票',
                    details: [{
                        name: '发票',
                        price: 10
                    }]
                }
                hotelExpenseDetail.push(invoiceData)
            }
            return hotelExpenseDetail
        },
        getDaysNum() {
            let startTime = this.$storage.getSession('hotelData').CheckInTime
            let endTime = this.$storage.getSession('hotelData').CheckOutTime
            return getDayNum(startTime, endTime)
        },
        getRoomTotalPrice() {
            return parseInt(this.identityType) * this.hotelItemDetail.RoomPrice
        },
        ...mapState([
            'staff'
        ]),
        getPassengerBlock() {
            return this.staff.staffList.length > 8 ? this.staff.staffList.splice(0, 8) :  this.staff.staffList
        },
        getRoomNum() {
            this.currentRoomNunIndex = this.displayPassengerData.length - 1
            return this.displayPassengerData.length
        }
    },
    created() {
        this.roomData = {
            roomName: this.hotelItemDetail.RoomName,
            roomBedType: this.hotelItemDetail.BedType,
            hotelName: this.hotelData.HotelName,
            checkInTime: this.hotelData.CheckInTime,
            checkOutTime: this.hotelData.CheckOutTime,
            breakfastStr: this.hotelItemDetail.BreakfastStr,
            isConfirm: this.hotelItemDetail.IsConfirm,
            policyTypeString: this.hotelItemDetail.PolicyTypeString
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goToExpenseDetail() {
            this.expenseDetailShow = true
        },
        goToPenment() {
            this.$router.push('/paysuccess')
        },
        choseRoomNum(item, index) {
            this.currentRoomNunIndex = index
            let num = parseInt(item)
            if(num > this.roomNum) {
                for(let i = 0; i < num - this.roomNum; i++) {
                    this.displayPassengerData.push({ PsgerName: '', CardID: '' })
                }
            } else {
                this.displayPassengerData.splice(num)
            }
            this.roomNum = this.displayPassengerData.length
            this.displayPassengerData = [...this.displayPassengerData]

        },
        getUnDisplayNum() {
            let unDisplayNum = this.displayPassengerData.filter(item => {
                return item.PsgerName === ''
            })
            return unDisplayNum
        },
        chosePassenger(item, index) {
            this.staff.staffList[index].isChecked = !this.staff.staffList[index].isChecked
            this.staff.staffList = [...this.staff.staffList]
            let unDisplayNum = this.getUnDisplayNum().length
            if(item.isChecked) {
                if(unDisplayNum) {
                    for(let i = 0; i < this.displayPassengerData.length; i++) {
                        if(this.displayPassengerData[i].PsgerName === '' && item.isChecked) {
                            this.displayPassengerData[i] = JSON.parse(JSON.stringify(item))
                            return
                        }
                    }
                } else {
                    this.displayPassengerData.push(JSON.parse(JSON.stringify(item)))
                }
            } else {
                this.displayPassengerData.map((val, index) => {
                    if(val.CardID === item.CardID) {
                        this.displayPassengerData.splice(index, 1)
                    }
                })
                if(this.displayPassengerData.length === 0) this.displayPassengerData = [{ PsgerName: '', CardID: '' }]
            }
        },
        deletePassenger(item, index) {          //删除乘机人
            this.staff.staffList.map((val, index) => {
                if(item.CardID === val.CardID) {
                    val.isChecked = false
                }
            })
            this.displayPassengerData.splice(index, 1)
            if(this.displayPassengerData.length === 0) this.displayPassengerData = [{ PsgerName: '', CardID: '' }]
        },
        goToEntsStaff() {
            this.showStaff = true
        },
        closeStaff(data) {
            this.showStaff = false
            this.displayPassengerData = data
            if(this.displayPassengerData.length === 0) this.displayPassengerData = [{ PsgerName: '', CardID: '' }]
        },
        goToPayment() {

        }
    }
}
</script>

<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/hotelCommonOrder.less";
    @import "../../assets/less/order/privateOrder.less";
    .hotelOrder {
        .totalView .expenseDetailList {
            padding-bottom: .6rem;
        }
        .roomNum {
            position: relative;
            .num {
                position: absolute;
                right: .37rem;
            }
        }
        .choseRoomNumBlock {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: .03rem .12rem .15rem .12rem;
            background-color: #fff;
            font-size: .15rem;
            .roomNumBlockItem {
                height: .27rem;
                width: 18%;
                line-height: .27rem;
                text-align: center;
                color: #666;
                border: #e9e9e9 solid 1px;
                border-radius: .04rem;
                margin-top: .12rem;
            }
            .roomNumBlockActive {
                color: #2577e3;
            }
        }
        .passengerBlock {
            display: flex;
            padding: .03rem .12rem .15rem .12rem;
            margin-top: .05rem;
            background-color: #fff; 
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            border-bottom: solid 1px #e9e9e9;       
            .passengerBlockItem {
                font-size: 0;
                text-align: center;
                position: relative;
                width: .79rem;
                height: .27rem;
                margin-top: .12rem;
                text-align: center;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .blockText {
                    font-size: .15rem;
                    line-height: .27rem;
                }
            }        
        }
        .checkInPerson {
            display: flex;
            background-color: #fff;
            position: relative;
            padding: .12rem 0;
            .checkInText {
                color: #666;
                font-size: .15rem;
                width: .74rem;
                text-align: center;
                display: inline-block;
                height: 100%;
                
            }
            .passengerList {
                width: auto;
                .passengerItem {
                    height: .45rem;
                    line-height: .45rem;
                    border-bottom: solid 1px #e9e9e9;
                }
                .deleteIcon {
                    vertical-align: middle;
                }
                .passengerName {
                    border: none;
                    vertical-align: middle;
                }
            }
            .contactIcon {
                width: .41rem;
                text-align: center;
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                img {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }
        .invoice {
            padding: 0 .12rem;
            margin-top: .06rem;
            background-color: #fff;
            .invoiceTitle {
                padding: .08rem 0;
                border-bottom: solid 1px #e9e9e9;
                .titleRightContent {
                    color: #262626;
                    margin-left: .08rem;
                }
            }
            .invoiceName, .invoiceAddress, .invoicePrice {
                padding: .08rem 0;
            }
            .leftTitle {
                color: #999;
                font-size: .14rem;
            }
            .rightContent {
                margin-left: .08rem;
                
                font-size: .14rem;
                display: inline-block;
            }
            .price {
                color: #ff5555;
            }
        }
    }
    
    
</style>
