<template>
    <div class="order trainOrder publicOrder">
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
                <div style="flex:1;display:flex" class="seatInfo" :class="{seatActive: seatTypeStr == item.SeatTypeStr}" v-for="(item,index) in train.SeatInfos" :key="index" @click="chooseSeat(item, index)">
                    <div style="flex:3">
                        <p>{{item.SeatTypeStr}}</p>
                        <p>{{item.SeatNum}}张</p>
                        <p>￥{{item.TicketFee}}</p>
                    </div>
                    <p style="flex:1;align-self:flex-end" class="seatred" v-if="item.IsIllegal">【违】</p>
                </div>
            </div>
            <div class="passenger">
                <div class="passengerTitle">
                    <span class="addPassenger">出行人 <span>请确保姓名证件填写正确</span></span>
                    <span class="goToAdd" @click="goToAddPassenger" v-if="bookPermission">添加</span>
                </div>
                <ul class="passengerList" v-if="displayPassengerData.length > 0">
                    <li class="passengerItem" v-for="(item,index) in displayPassengerData" :key="index">
                        <img class="deleteIcon" v-if="bookPermission" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(index)" />
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
            <Policy :illegalPerson="illegalPerson" :illegalConent="illegalConent"></Policy>
            <div class="travelPurpose"><input type="text" v-model="travelPurpose" placeholder="请输入出行目的" /></div>
            <div class="approvalMess">
                <ul class="approvalList">
                    <li class="approvalItem" v-if="JSON.stringify(approvalData) !== '{}'">
                        <span class="approvalTitle">审批部们</span>
                        <span class="approvalName">{{approvalData.Name}}</span>
                    </li>
                    <li class="approvalItem" v-if="JSON.stringify(approvalData) !== '{}'">
                        <span class="approvalTitle">审批人</span>
                        <span class="approvalName">{{approvalData.ExaminatinName}}</span>
                    </li>
                    <li class="approvalItem">
                        <span class="approvalTitle">联系人</span>
                        <span class="approvalName">{{this.userMess.UserName}}</span>
                    </li>
                    <li class="approvalItem">
                        <span class="approvalTitle">手机号码</span>
                        <span class="approvalName">{{this.userMess.TelPhone}}</span>
                    </li>
                </ul>
            </div>
            <!-- 保险 -->
            <train-insurance :passengerNum="getPersonNum"></train-insurance>
        </div>
        <!-- 底部费用明细 -->
        <expense-detail :isOneWay="true" :type="'train'" @go-to-penment="goToPayment" :personNum="getPersonNum"
                        :expenseDetailData="getTrainExpenseDetail">
        </expense-detail>
        <!-- 出行目的toast -->
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toast" position="middle"></toast>
        <!-- 支付按钮弹窗 -->
        <order-popup @to-audit="toAudit" @to-pay="toPay" @off-shade="offShade" :confirm="confirm" :btnLeft="btnLeft" :btnRight="btnRight" :illegalReason="illegalReason" :noPay="noPay" :noAudit="noAudit"></order-popup>
        <!-- 下单成功跳支付 -->
        <flight-pay @show-pay="showFlightOrderPay" :FlightOrderPay="FlightOrderPay" :orderNumber="orderNumber"></flight-pay>
    </div>
</template>
<script>
import XHeader from '../common/header'
import TrainInsurance from './train-insurance'
import ExpenseDetail from '../TicketOrder/expense-detail'
import Policy from '../commonBusComponents/policy'
import qs from 'qs'
import { mapGetters, mapActions, mapState  } from 'vuex'
import { Toast } from 'vux'
import OrderPopup from '../common/Payment/order-popup'
import FlightPay from '../Flight/flight-pay'

export default {
    components: {
        XHeader,
        TrainInsurance,
        ExpenseDetail,
        Policy,
        Toast,
        OrderPopup,
        FlightPay
    },
    data() {
        return {
            toast: '',                  //出行目的弹窗文字
            showPositionValue: false,   //出行目的弹窗
            userMess: this.$storage.getSession('userMess'),                     //用户信息
            train: this.$storage.getSession('trainData'),                       //选中的火车信息
            trainItemData: this.$storage.getSession('trainItemData'),           //选中的火车座位信息
            seatPrice: this.$storage.getSession('trainItemData').TicketFee,
            displayPassengerData: [],
            approvalData: {},
            chosedSeat: {}, //选中的座位信息
            travelPurpose: 'test',  //出行目的,
            bookPermission: false, //是否可为他人预定，true则可以
            policyParams: {},
            illeglPsger: [],
            illegalPerson: [],
            illegalConent: [],
            bookPermission: false,
            expenseDetail: [],
            policyParams: {
                ArriveStation: this.$storage.getSession('trainData').ArriveStation,
                DepartureDate: this.$storage.getSession('trainData').FromTime,
                EnterpriseUserId: this.$storage.getSession('userMess').EnterpriseUserId,    //公司ID
                FromStation: this.$storage.getSession('trainData').FromStation,
                SeatName: this.$storage.getSession('trainItemData').SeatTypeStr,      //座位类型
                Token: this.$storage.getSession('userMess').Token,         //TOKEN
                TrainCode: this.$storage.getSession('trainData').TrainCode,                  //预定车次
                UserId: this.$storage.getSession('userMess').UserId
            },
            seatTypeStr: this.$route.query.SeatTypeStr,      //点中的座位的类型名

            confirm: false,                                 //支付弹窗
            noPay: false,                                   //是否补差，不补差时只显示一个审核按钮
            noAudit: false,                                 //是否需要审核，在不要审核时不显示
            btnLeft: '',                                    //付款审核弹窗左
            btnRight: '',                                   //付款审核弹窗右
            illegalReason: '',                              //违规原因
            examine:[],                                     //审批人全部信息
            calcPrice: 0,                                   //违规信息和补差计算
            illegalData: [],                                //违规信息和补差
            orderNumber: "",                                //订单号
        }
    },
    computed: {
        getTotalPrice() {            //计算总价
            let totalPrice = 0
            for(let i = 0;i < this.expenseDetail.length; i++) {
                for(let j = 0;j < this.expenseDetail[i].details.length; j++) {
                    totalPrice += this.expenseDetail[i].details[j].price * this.displayPassengerData.length
                }
            }
            return totalPrice
        },
        getPersonNum() {
            return this.displayPassengerData.length
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
            this.expenseDetail = expenseDetailData
            return expenseDetailData
        }
    },
    created(){
        this.$axios.post('Verification/CheckBookPermission', qs.stringify({    //判断是否可为他人预定
            UserId: this.userMess.UserId,
            EmpId: this.userMess.EmpId,
            EnterpriseUserId: this.userMess.EnterpriseUserId
        })).then(res => {
            console.log(res, '能否预定')
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
                    console.log(res, '默认旅客')
                    //接着获取乘客及归属部门，判定是否违规
                    this.displayPassengerData.push(result.data.Result)
                    this.policyParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                    this.afterCheckBookPermission()
                })
            } else {
                this.displayPassengerData = this.$storage.getSession('psgerAndDepart') ? this.$storage.getSession('psgerAndDepart') : []
                if(this.displayPassengerData.length !== 0) {
                    this.policyParams.listIlleglFrequentPsgerModel = this.displayPassengerData
                    //乘客违规判定
                    this.afterCheckBookPermission()
                }
            }
        })
    },
    methods: {
        //关闭弹窗提示
        offShade(){
            this.confirm = false;
        },
        //支付弹窗审核按钮
        toAudit(){
            this.justOrder(1,3,0);
            // this.confirm = false;
            // this.$router.push('/myorder');
        },
        //补差
        toPay(){
            alert('我去补差了');
            this.justOrder(1,2,0);
            this.confirm = false;
        },
        getBreakRuleReason(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getApprovalPerson(url, params) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderCostCenter)}))
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
        goBack(){
            this.$router.go(-1);
        },
        spliceTypeString(data) {
            let typeString = ''
            data.map(item => {
                typeString += item.TypeString
            })
            return typeString
        },
        afterCheckBookPermission() {
            this.getIlleglFrequentPsger('/MyFrequentPassenger/GetIlleglFrequentPsgerForTrain', this.policyParams)
            .then(result => {
                console.log(result, '乘客违规判定');    //返回值ViolationType就是后面的ButtonType，为审批类型
                this.illeglPsger = result.data.Result
                if(this.getIllegalPerson()) {
                        //如果违规,获取违规原因和审批人
                    let ruleParams = {
                        TypeString: this.spliceTypeString(result.data.Result),
                        EnterpriseUserId: this.userMess.EnterpriseUserId,
                        Token: this.userMess.Token,
                        UserId: this.userMess.UserId,
                        Kind: "2"            //0、机票，1、酒店，2、火车票
                    }
                    let costCenter = this.bookPermission ? this.filterOrderCostCenter(result.data.Result[0].orderCostCenter) : result.data.Result[0].orderCostCenter
                    Promise.all([this.getSerachReasonByCommpanyId('BreakRuleReason/SerachReasonByCommpanyId', ruleParams),
                                //获取违规原因
                                this.getApprovalAssignmentNew('/Examine/ApprovalAssignmentNew', costCenter)
                                //获取审批人
                    ])
                    .then(data => {
                        console.log(data[0], '违规原因')
                        console.log(data[1], '审批人')
                        this.illegalConent = data[0].data.Result        //违规原因
                        this.approvalData = data[1].data.Result[0].listExaminatinPassger[0];        //第一个审批人
                        this.examine = data[1].data.Result[0];          //审批人全部信息
                    })
                }
            })
        },
        getIlleglFrequentPsger(url, policyParams) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(policyParams)}))
        },
        //选出乘客中违规的人
        getIllegalPerson() {
            this.illegalPerson = this.illeglPsger.filter(item => {
                return item.IsIllegal
            })
            return this.illegalPerson.length > 0
        },
        getSerachReasonByCommpanyId(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getApprovalAssignmentNew(url, orderCostCenter) {
            return this.$axios.post(url, qs.stringify({'json': JSON.stringify(orderCostCenter)}))
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
        //添加乘客
        goToAddPassenger(token) {
            this.$router.push('/Company')
        },
        //删除乘客
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
        chooseSeat(seat){
            console.log(seat)
            this.seatPrice = seat.TicketFee;
            this.trainItemData = seat;                      //座位信息
            this.$storage.setSession('trainItemData', seat) //座位信息

            this.seatTypeStr = seat.SeatTypeStr;
        },
        filterInsData(data) {
            return data.filter((item, index) => {
                return item.isChecked
            })
        },
        //定义一个直接创单的函数
        justOrder(ViolationType, ViolationCheck, ViolationAudit){
            //选中的保险号
            let chosedInsuId = this.trainInsuranceInfo.filter(item=>{
                return item.isChecked
            }).map(item=>{
                return {
                    ProductCode: item.InsuranceCode
                }
            });

            //选中的乘客信息
            let chosePsger = this.displayPassengerData.map((item,index)=>{
                return {
                    "Mobile": item.Phone,
                    "Name": item.PsgerName,
                    "PassgerUserId": item.PassgerUserId,
                    "PassengerType": item.PsgerType,
                    "DepartmentName": item.DepartmentName,
                    "CardType": item.CardType,
                    "CardId": item.CardID,
                    "CostCenterName": this.approvalData.Name,
                    "CostCenterType": this.approvalData.CenterType,
                    "CostCenterId": this.approvalData.CostCenterId,
                    "DepartmentId":"0",
                    "Illegal": this.illegalConent.length>0?true:false,
                    "PassgerBreakRuleReason": this.illeglPsger[index].Message,
                }
            });

            let orderParams = {
                "ViolationType": ViolationType,
                "ViolationCheck": ViolationCheck,
                "ViolationAudit": ViolationAudit,
                // "DeliveryAddressId": 0,
                // "Details": "",
                "CostCenterId": this.illeglPsger[0].orderCostCenter[0].CostCenterId,  //费用归属Id
                "CenterType": this.illeglPsger[0].orderCostCenter[0].CenterType,      //费用归属(1 成本中心 2 部门员工)

                "TrainCode": this.train.TrainCode,
                "DepartureDate": this.train.FromTime,       //出发时间

                "FromStation": this.train.FromStation,
                "ArriveStation": this.train.ArriveStation,

                "SeatType": this.seatTypeStr,
                "BookingAmount": this.displayPassengerData.length,

                "insuranceProduct": chosedInsuId,
                "Passengers": chosePsger,

                "ExamineDepartment":this.approvalData.Name,                                 //审批人部门
                "ExamineName": this.approvalData.ExaminatinName,                            //审批人姓名
                "ExamineUserId": this.approvalData.ExaminatinUserID,                        //审批人ID

                "ReasonDetail": this.illeglPsger[0].Message,                         //违规原因集合
                "BreakRuleReason": this.illegalData.Message,                         //违规原因（多个用逗号分隔）？
                "Illegal": this.illegalData.IsIllegal,                                //是否违规

                "MakeupPrice": this.calcPrice,                                       //补差金额
                "PayPrice": this.getTotalPrice,                                      //付款金额

                "UserId": this.userMess.UserId,
                "EmpId": this.userMess.EmpId,
                "Mobile": this.userMess.TelPhone,
                "BookingUserId": this.userMess.UserId,
                "BookingUserName": this.userMess.UserName,                           //预订人
                "OrderLink": this.userMess.UserName,                                 //预订人
                "EnterpriseUserId": this.userMess.EnterpriseUserId,
                "Token": this.userMess.Token,
                "Email": this.userMess.Emil,
                "AgentId": this.userMess.AgentId,
                "ExpenseAscription": "2018-05-01 20:10 咸阳国际机场 @ 2018-05-01 21:35 香山机场 @ MU2385／经济舱10折扣 @ 单价707",
                "TripPurpose": this.travelPurpose,                                          //出行目的
                "Remark":"",
                "Source":"TMC H5",
                "MarkId":"170705111839000",                                         //品牌ID
            }
            console.log(orderParams, '下单参数')
            this.$axios.post('/Order/CreatePublicTrainOrder', qs.stringify({'json': JSON.stringify(orderParams)})).then(res=>{
                console.log(res, '获取订单号');
                this.orderNumber = res.data.Result.OrderNumber;
            })
        },
        //支付按钮
        goToPayment(){
            //检测是否有选乘机人
            if(this.displayPassengerData.length < 1){
                this.toast = '请加联系人'
                this.showPositionValue = true;
                return
            }
            //检测出行目的
            if(this.travelPurpose == ''){
                this.toast = '请输入目的'
                this.showPositionValue = true;
                return
            }
            // 选中的保险价格
            let chosedInsuPrice = this.getTrainExpenseDetail[1].details.map(item=>{
                return item.price
            }).reduce((tmp, next)=>{
                return tmp + next
            })
            //选中的保险
            // let chosedInsu = this.trainInsuranceInfo.filter(item=>{
            //     return item.isChecked
            // })

            let weiParams = {
                ArriveStation: this.train.ArriveStation,                                        //出发站点
                // DepartureDate: this.$route.query.DepartureDate,                              //出发时间
                DepartureDate: this.$storage.getSession('trainSearchData').DepartureDate,       //出发时间
                FromStation: this.train.FromStation,                                            //抵达站点
                TrainCode: this.train.TrainCode,
                EnterpriseUserID: this.userMess.EnterpriseUserId,
                PassengerIds: '',
                Price: this.trainItemData.SettleFee,       //总价=票+保险+座位
                SettleFee: this.trainItemData.SettleFee,   //座位价格
                SeatType: this.trainItemData.SeatTypeStr,                   //座位类型，传的字符串，可能有问题
                InsurancePrice: chosedInsuPrice,            //选中的保险金额
                TrainType: this.train.TrainType,        //火车类型
                BookingAmount:1                         //预订座位数
            }
            //计算火车违规和补差
            this.$axios.post('/Verification/PublicTrainCalcPrice', qs.stringify(weiParams)).then(res=>{
                this.illegalData = res.data.Result;
                this.calcPrice = res.data.Result.Price;
                console.log(res, '计算违规和补差');

                //能够预订，开始各种判定
                if(res.data.Result.CanOrder){
                    //1 出行审
                    if(res.data.Result.Isapproval){
                        //1.1违规
                        if(res.data.Result.IsIllegal){
                            //(1)补差
                            if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                this.btnLeft = '提交审核并预订';
                                this.btnRight = `补差${res.data.Result.Price}元并预订`
                                this.confirm = true;
                            }else{
                                //(2)不补差
                                // this.justOrder(1,0,1);
                                this.noPay = true;
                                this.btnLeft = '提交审核并预定';
                                this.confirm = true;
                            }
                        }else{
                            //1.2 不违规
                            //(1)补差
                            if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                this.btnLeft = '提交审核并预订';
                                this.btnRight = `补差${res.data.Result.Price}元并预订`
                                this.confirm = true;
                            }else{
                                //(2)不补差
                                this.btnLeft = '提交审核并预定';
                                this.noPay = true;
                                this.confirm = true;
                            }
                        }
                    }else{  //2 非出行审
                        //2.1 违规
                        if(res.data.Result.IsIllegal){
                            //2.11 需要审核
                            if(res.data.Result.CanAudit){
                                //(1)补差
                                if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                    this.btnLeft = '提交审核并预订';
                                    this.btnRight = `补差${res.data.Result.Price}元并预订`
                                    this.confirm = true;
                                }else{
                                    //(2)不补差
                                    this.btnLeft = '提交审核并预定';
                                    this.noPay = true;
                                    this.confirm = true;
                                }
                            }else{  //2.12 不需要审核
                                //(1)补差
                                if(res.data.Result.IsCompensation && res.data.Result.Price>0){
                                    this.noAudit = true;
                                    this.btnRight = `补差${res.data.Result.Price}元并预订`
                                    this.confirm = true;
                                }else{
                                    //(2)不补差，直接创单
                                    this.justOrder(1,3,0);
                                    this.FlightOrderPay = true;
                                }
                            }
                        }else{  //2.2 非出行审，不违规
                            //2.21 不违规需要审核
                            if(res.data.Result.CanAudit){
                                this.noPay = true;
                                this.btnLeft = '提交审核并预订';
                                this.confirm = true;
                            }else{  //2.22 不违规不需要审核，直接创单
                                this.justOrder(1,3,0);
                                this.FlightOrderPay = true;
                            }
                        }
                    }
                }else{
                    alert('你没有订购的权限');
                    return;
                }
            })

        }
    }
}
</script>
<style lang="less">
    @import "../../assets/less/order/commonOrder.less";
    @import "../../assets/less/order/publicOrder.less";
    @import "../../assets/less/order/trainCommonOrder.less";
</style>
