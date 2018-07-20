<template>
	<popup v-model="FlightOrderPay" height="100%" width="100%" position="right">
		<div class="bgGray flightPay" style="height:70rem; overflow-y:none;">
			<div class="topHeader disFlex clearFix">
				<img src="~@/assets/images/icon/back.png" alt="goBack" class="goBack" @click="$emit('show-pay')">
				<div class="topInfo fontSize-8">
					<span class="goAddress">支付方式</span>
				</div>
			</div>
			<div class="orderInfo" style="margin-top: .45rem">
				<div class="payPrice fontSize-3 clearFix">
					<p class="fl">订单号</p>
					<span class="fr goInfo">{{orderNumber}}</span>
				</div>
				<div class="payPrice fontSize-3 clearFix">
					<p class="fl">应付金额</p>
					<span class="fr goInfo"><b class="topLeft flex1 fontSize-6 redStateFont"><span class="fontSize-1">￥</span>8888</b></span>
				</div>
			</div>
			<ul class="payModeList">
				<li class="payMode clearFix">
					<img src="~@/assets/images/icon/pay@2x.png" class="icon">
					<span class="fontSize-4">支付宝</span>
					<span class="fr check">
						<input type="radio" class="hideCheck" name="checkWay" checked="checked">
					</span>
				</li>
				<li class="payMode clearFix">
					<img src="~@/assets/images/icon/wechat@2x.png" class="icon">
					<span class="fontSize-4">微信支付</span>
					<span class="fr check">
						<input type="radio" class="hideCheck" name="checkWay">
					</span>
				</li>
			</ul>
			<div class="subBtnBox">
				<button class="subBtn blueBtn" @click="goPay()">支付</button>
			</div>
		</div>
	</popup>
</template>
<script>
import '../../assets/lib/zepto.min.js'
import qs from 'qs'
import Popup from '../common/popup/index'
export default {
  data(){
	  return {

	  }
  },
	props: ['FlightOrderPay','orderNumber'],
  components: {
	  Popup
  },
  methods:{
	  goPay(){
          //获取用户ip
          let ip = '';
          $.ajax({
              url: 'http://freegeoip.net/json/',
              success: function(data){
                  ip = JSON.stringify(data).split(':')[4].split(',')[0]
                  console.log(ip);
              },
              type: 'GET',
              dataType: 'JSON'
          });
		  this.$axios.post('/Pay/PayMoneyForH5', qs.stringify({
			  UserId:this.$storage.getSession('userMess').UserId,
			  OrderNumber: this.orderNumber,			//必须是双引号包裹的字符串
			  Token:this.$storage.getSession('userMess').Token,
			  PayType:1,								//1支付宝，2微信(需要多加衣个AppId)，3银联，4钱包
			  Title:'神兽企业版',
			  Source:'TMC H5',
			  OperateUserId:'', 		//可为空
			  Returnurl:'www.baidu.com',//支付成功后跳转页面
		      UserIp: ip   				//手机 IP
		  })).then(res=>{
			  console.log(res);
			//   window.location.href = res.data.Result.Url;
			  //todo	订单正在支付
		  })
	  }
  }
}
</script>
<style scoped>
@import '../../assets/css/test.css';

.orderInfo {
	margin: 0.04rem 0;
	padding: 0 .12rem;
	background: #ffffff;
}

.orderInfo .flightInfo {
	border-bottom: 1px solid #eeeeee;
}

.orderInfo .flightInfo .allInfo {
	height: .304rem;
	line-height: .304rem;
}

.orderInfo .flightInfo .address {
	height: .216rem;
	line-height: 1;
}

.orderInfo .payPrice {
	height: .4rem;
	line-height: .4rem;
}

.payModeList {
	padding: 0 .12rem;
	background: #ffffff;
}

.payModeList .payMode {
	height: .4rem;
	line-height: .4rem;
}

.payModeList .payMode .icon {
	width: .16rem;
	height: .16rem;
}

.allInfomation {
	border-bottom: 1px solid #eeeeee;
}

.allInfomation .pal {
	padding-left: 0.08rem !important;
}

.allInfomation .personInfo {
	padding-top: .112rem;
}

.allInfomation .personInfo .someOne {
	padding-bottom: .112rem;
}

.allInfomation .personInfo .name {
	height: .2rem;
}

.allInfomation .bookRoomInfo {
	border-bottom: 1px solid #eeeeee;
}

.allInfomation .bookRoomInfo .flex1 {
	padding: .12rem 0;
}

.allInfomation .borRight {
	border-right: 1px solid #eeeeee;
}

.bookRoomInfo {
	width: 100%;
}

.iright, .itop {
	margin-top: -0.016rem;
}

.titlePeople {
	width: .52rem;
}

/*退票*/
.pad {
	padding: 0 .12rem;
}

.oneRefundInfo {
	background: #ffffff;
	margin-bottom: 0.04rem;
}

.oneRefundInfo .oneTitle {
	height: .28rem;
	line-height: .28rem;
}

.oneRefundInfo .refundPrice {
	height: .32rem;
	line-height: .32rem;
	background: #fff9e9;
	border-bottom: 1px solid #eeeeee;
	border-top: 1px solid #eeeeee;
}

.oneRefundInfo .personSelect {
	height: .4rem;
	line-height: .4rem;
	border-bottom: 1px solid #eeeeee;
}

.inputRefundInfo {
	background: #ffffff;
}

.inputRefundInfo .oneLine {
	line-height: .4rem;
	border-bottom: 1px solid #eeeeee;
}

.inputRefundInfo .oneLine lable {
	width: .616rem;
}

.inputRefundInfo .oneLine input {
	width: 100%;
	border: none;
	height: 90%;
}

.inputRefundInfo .oneLine .imgBox {
	flex-wrap: wrap;
	justify-content: flex-start;
	align-content: space-between;
}

.inputRefundInfo .oneLine .imgBox .oneImg {
	margin: 0 0.04rem 0.08rem 0;
	position: relative;
}

.inputRefundInfo .oneLine .imgBox .oneImg img {
	width: .48rem;
	height: .48rem;
	border: 1px solid #eeeeee;
}

.inputRefundInfo .oneLine .imgBox .oneImg .err {
	position: absolute;
	top: 0.016rem;
	right: 0.016rem;
	display: inline-block;
	width: 0.096rem;
	height: 0.096rem;
	font-size: 0.096rem;
	line-height: 1;
	text-align: center;
	color: #ffffff;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
}

.subBtnBox {
	padding: .32rem 0;
}

.subBtnBox .subBtn {
	display: block;
	margin: 0 auto;
	font-size: .128rem;
	letter-spacing: 0.016rem;
	width: 2.68rem;
	height: .4rem;
	border-radius: 0.04rem;
}

.layerRefundReson {
	width: .326rem;
	position: absolute;
	left: 0;
	right: 0;
	height: auto;
	font-size: .112rem;
	margin: 0 auto;
	margin-top: 50%;
	border-radius: 0.04rem;
	background: #f2f2f2;
	padding-bottom: .24rem;
}

.layerRefundReson .resonTitle {
	line-height: 0.05rem;
	background: #ffffff;
	border-radius: 0.04rem 0.04rem 0 0;
}

.layerRefundReson .secondTitle {
	line-height: .32rem;
	background: #f2f2f2;
	color: #686868;
}

.layerRefundReson .resons {
	padding: 0.08rem .12rem;
	line-height: 9.6;
	background: #ffffff;
	border-bottom: 1px solid #f2f2f2;
}

/*选择保险*/
.insurSelect {
	background: #ffffff;
	height: .496rem;
	line-height: .496rem;
	border-bottom: 1px solid #eeeeee;
}

.insurSelect .checkB {
	width: .4rem;
}

.insurSelect .insurName {
	line-height: .336rem;
	height: .248rem;
}

.insurSelect .insurName .mlspan5 {
	margin-left: .04rem;
}

.insurSelect .insurName .mlspan10 {
	margin-left: 0.08rem;
}

.insurSelect .insurName .blueBor {
	display: inline-block;
	border-radius: 50%;
	line-height: .128rem;
	font-size: .112rem;
	height: .112rem;
	width: .112rem;
	text-align: center;
}

.insurSelect .givePrice {
	line-height: .176rem;
}





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
    top:0;
	right: 50%;
    transform: translateX(50%);
    font-size: .144rem;
}

.goBack {
    margin-top: 0.07rem;
	margin-left: 0.08rem;
	height: .3rem;
	width: .3rem;
}
</style>
