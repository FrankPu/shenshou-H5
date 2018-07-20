<template>
      <div class="TrainOrderinformation">
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
                    <div style="flex:1" class="seatInfo" v-for="(item,index) in train.SeatInfos" :key="index" @click="chooseSeat(item)">
                        <p>{{item.SeatTypeStr}}</p>
                        <p>{{item.SeatNum}}张</p>
                        <p>￥{{item.TicketFee}}</p>
                        <p class="seatred" v-if="item.IsIllegal">【违】</p>
                    </div>
                </div>
                <div class="passenger">
                    <div class="passengerTitle">
                        <span class="addPassenger">出行人 <span>请确保姓名证件填写正确</span></span>
                        <span class="goToAdd" @click="goToAddPassenger()">添加</span>
                    </div>         
                    <ul class="passengerList">            
                        <li class="passengerItem" v-for="(item,index) in entsData" :key="index">               
                            <img class="deleteIcon" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(item, index)" />
                            <div class="passengerMess">
                                <div class="passengerName"></div>
                                <div class="passengerID">
                                    <p class="passengerIDad">{{item.PsgerName}}</p>
                                    <p> 身份证：{{item.CardID}}</p>  
                                
                                </div>
                            </div>
                            <div class="costAttr">费用归属<span class="departmentName">技术部</span></div>
                        </li>               
                    </ul>          
                </div>
                <policy></policy>
                <div class="travelPurpose"><input type="text" placeholder="请输入出行目的" /></div>
                <div class="approvalMess">
                    <ul class="approvalList">
                        <li class="approvalItem">
                            <span class="approvalTitle">审批部门</span>
                            <span class="approvalName">技术部</span>
                        </li>
                        <li class="approvalItem">
                            <span class="approvalTitle">审批人</span>
                            <span class="approvalName">刘庆</span>
                        </li>
                        <li class="approvalItem">
                            <span class="approvalTitle">联系人</span>
                            <span class="approvalName">李晓明</span>
                        </li>
                        <li class="approvalItem">
                            <span class="approvalTitle">手机号码</span>
                            <span class="approvalName">13800138000</span>
                        </li>
                    </ul>        
                </div>
                <!-- 保险 -->
                <train-insurance></train-insurance>
            </div>
            <!-- 底部费用明细 -->
            <expense-detail @go-to-penment="goToPayment"></expense-detail>            
      </div>
</template>
<script>
import Policy from '../TicketOrder/policy'  //政策违规
import XHeader from '../common/header'
import TrainInsurance from './train-insurance'
import ExpenseDetail from '../TicketOrder/expense-detail'

export default {
    components: {
        Policy,
        XHeader,TrainInsurance,ExpenseDetail
    },
    data() {
        return {
             train: this.$storage.getSession('trainData'),
             seatPrice: this.$storage.getSession('trainData').TicketFee,
             entsData: [],
             displayPassengerData: [],
             totalPrice:0
        } 
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        chooseSeat(seat){
            this.seatPrice = seat.TicketFee;
        },
        goToAddPassenger(token) {   //添加联系人
            this.$router.push({
                path:'/Entstaff',
                params:{
                    type: token
                }
            })
        },
        deletePassenger(item,index){      //删除联系人
            this.entsData.splice(index, 1);
            this.$storage.setSession('entsData', this.entsData);
        },
        goToPayment(){          //支付按钮
            alert(2)
        }
    },
    created(){
        this.entsData = this.$storage.getSession('entsData');
    }
}
</script>
<style scoped lang="less">
  .TrainOrderinformation{
      background-color: #ffffff;
        .TORback{
            width: 100%;
            height: 9rem;
            margin-top: 4rem;
            background:url('../../assets/images/drt.png');
            background-size:100%100%; 
        
            position: relative;
            .backP{
                color: #ffffff;
                padding-left: 1.5rem;
                font-size: 1.4rem;
            }
            .backmyon{
                position: absolute;
                right: 0.3rem;
                bottom: 2rem;
                font-size:2rem;
                color: #ffffff;
            }
            .Airation{
                width:80%;
                height:7rem;
                .ationTicket{
                    position: relative;
                    width: 100%;
                    top: 1rem;
                    height: 5rem;           
                    text-align: left;
                    color: #ffffff;             
                }
                .AirationSign{
                    text-align:center;
                }
                .Timetable{
                        
                        width: 90%;
                        margin-left: 5%;
                        height: 5rem;
                }
                .Timestart{
                        width:23%;
                        height:100%;      
                        float: left;  
                        line-height:2.2rem;
                }
                .Timestart .startime{
                        font-size: 1.4rem;           
                }
                .Timestart .startress{
                        font-size: 1.9rem;                           
                }
                .Timechannel{
                        width:50%;
                        height:100%;
                        float: left;
                        padding-top: .5rem;                     
                }
                .Timechannel p{
                        font-size: 1.4rem;
                        line-height:1.3rem; 
                }
                .Timechannel  .Timechannelp{
                        letter-spacing:-0.2px;
                }
                
            }
        }
        .seat{
            width: 100%;
            height:7rem;
            border-bottom:.3rem #e4e4e4 solid;
            background: #ffffff;
            .seatInfo{
                border-radius: .4rem;
                margin: .4rem;
                float: left;
                text-align:center;
                color: #666666;
                font-size: 1.6rem;
                line-height:2rem;
                position:relative;
                p:first-child { 
                    padding-top: .3rem;  
                }
                .seatred{
                    position: absolute;
                    bottom: 0rem;
                    left:70%;
                    color: red;
                }
            }
        }
        .passenger {
            background: #fff;
           
            font-size: 1.6rem; 
            .passengerTitle {
                border-bottom: solid 1px #F7F7F8;
                padding: 1.2rem;
                position: relative;  
            }              
            .addPassenger {
                color: #252525;  
                span{    
                    color: #ACACAC;
                    font-size:1rem; 
                }              
            }
            .goToAdd {
                position: absolute;
                right: 1.2rem;
                color: #ffffff;
                background-color: #266FCC;
                border-radius: .2rem;
                height: 2.4rem;
                line-height: 2.4rem;
                top: 0;
                bottom: 0;
                margin: auto;
                padding: 0 .8rem;
                img {
                    margin-left: .4rem;
                    margin-top: .1rem;
                    position: relative;
                    top: .1rem;
                }
            }
            .passengerList {
                padding: 0 1.2rem;
                .passengerItem {
                    margin-top: .4rem;
                    border-bottom: solid 1px #FAFAFA; 
                    .passengerMess {
                        display: inline-block;
                        margin-left: .4rem;
                        padding: .1rem 0;
                        vertical-align: middle;
                        border-bottom: solid 1px #F7F7F8;
                        .passengerName {
                            color: #252525;
                            font-size: 1.2rem;
                        }
                        .passengerID {
                            color: #A8A8A8;
                            margin-top: .2rem;
                            .passengerIDad{
                                color: #333333;
                            }
                        }                        
                    }
                    .costAttr {
                        padding: .4rem 1.2rem .4rem .5rem;
                        color: #757575;
                        .departmentName {
                            margin-left: 1.5rem;
                        }
                    }
                }
            }
            .addPassengerPopup {
                img {
                    vertical-align: middle;
                    height: 2rem;
                }
                .listCont {
                    padding: 0 1.2rem 0 1.2rem;
                    background: #fff;
                }
                .addBtn {
                    border-bottom: solid 1px #E6E6E6;
                    padding: 1.2rem 0;
                    span {
                        vertical-align: middle;
                    }
                }
                .passengerData {
                    list-style: none; 
                }
            }           
        } 
        .travelPurpose{
            margin-top: .3rem;
            input {
                border: none;
                width: 100%;
                height: 3.6rem;
                padding-left: 1.2rem;
            }
            input::-webkit-input-placeholder{
                color: #D5D5D5;
            }
        }
        .approvalMess {
            background: #fff;
            margin-top: .3rem;
            .approvalItem {
                padding: 1.2rem 1rem;
                border-bottom: solid 1px #F7F7F8;
                font-size: 1.6rem;
                .approvalTitle {
                     color: #282828;
                    width: 8rem;
                    display: inline-block;
                }
                .approvalName {
                   color: #939393;
                    font-size: 1.6rem;
                }               
            }
        }
  }
</style>
