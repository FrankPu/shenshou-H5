<template>
<div class="bgGray">
        <x-header :showBack="true" :title="'设施详情'" @go-back="$emit('back-hotel')"></x-header>
		<div class="hotel-fac-box bgWhite" id="hotelFac">
			<p class="hotel-fac-head">酒店设施</p>
			<div class="hotel-fac-con">
				<p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac6@2x.png"/>网络</p>
				<ul class="hotel-fac-con-det">
					<li class="hotel-fac-con-item">客房WIFI免费</li>
					<li class="hotel-fac-con-item">房间内高速上网</li>
					<li class="hotel-fac-con-item">公用区WIFI免费</li>
				</ul>
			</div>
			<div class="hotel-fac-con">
				<p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac3@2x.png"/>交通服务</p>
				<ul class="hotel-fac-con-det">
					<li class="hotel-fac-con-item">免费停车场</li>
					<li class="hotel-fac-con-item">租车服务</li>
					<li class="hotel-fac-con-item">叫车服务</li>
				</ul>
			</div>
            <div v-show="moreFac">
                <div class="hotel-fac-con">
                    <p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac5@2x.png"/>通用设施</p>
                    <ul class="hotel-fac-con-det">
                        <li class="hotel-fac-con-item">行李寄存</li>
                        <li class="hotel-fac-con-item">24小时前台</li>
                        <li class="hotel-fac-con-item">部分时段大堂经理</li>
                        <li class="hotel-fac-con-item">礼宾服务</li>
                        <li class="hotel-fac-con-item">免费旅游交通图</li>
                        <li class="hotel-fac-con-item">旅游票务</li>
                        <li class="hotel-fac-con-item">叫醒服务</li>
                        <li class="hotel-fac-con-item">邮政服务</li>
                        <li class="hotel-fac-con-item">前台保险柜</li>
                        <li class="hotel-fac-con-item">信用卡结算</li>
                        <li class="hotel-fac-con-item">一次性账单结算</li>
                        <li class="hotel-fac-con-item">快速办理入住</li>
                    </ul>
                </div>
                <div class="hotel-fac-con">
                    <p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac2@2x.png"/>活动设施</p>
                    <ul class="hotel-fac-con-det">
                        <li class="hotel-fac-con-item">行李寄存</li>
                        <li class="hotel-fac-con-item">24小时前台</li>
                        <li class="hotel-fac-con-item">部分时段大堂经理</li>
                        <li class="hotel-fac-con-item">礼宾服务</li>
                        <li class="hotel-fac-con-item">免费旅游交通图</li>
                        <li class="hotel-fac-con-item">旅游票务</li>
                        <li class="hotel-fac-con-item">叫醒服务</li>
                        <li class="hotel-fac-con-item">邮政服务</li>
                        <li class="hotel-fac-con-item">前台保险柜</li>
                        <li class="hotel-fac-con-item">信用卡结算</li>
                        <li class="hotel-fac-con-item">一次性账单结算</li>
                        <li class="hotel-fac-con-item">快速办理入住</li>
                    </ul>
                </div>
                <div class="hotel-fac-con">
                    <p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac1@2x.png"/>服务项目</p>
                    <ul class="hotel-fac-con-det">
                        <li class="hotel-fac-con-item">行李寄存</li>
                        <li class="hotel-fac-con-item">24小时前台</li>
                        <li class="hotel-fac-con-item">部分时段大堂经理</li>
                        <li class="hotel-fac-con-item">礼宾服务</li>
                        <li class="hotel-fac-con-item">免费旅游交通图</li>
                        <li class="hotel-fac-con-item">旅游票务</li>
                        <li class="hotel-fac-con-item">叫醒服务</li>
                        <li class="hotel-fac-con-item">邮政服务</li>
                        <li class="hotel-fac-con-item">前台保险柜</li>
                        <li class="hotel-fac-con-item">信用卡结算</li>
                        <li class="hotel-fac-con-item">一次性账单结算</li>
                        <li class="hotel-fac-con-item">快速办理入住</li>
                    </ul>
                </div>
                <div class="hotel-fac-con">
                    <p class="hotel-fac-con-head"><img class="disInlneBlk vl-sub" src="~@/assets/images/hotel/hotelfac4@2x.png"/>客房设施</p>
                    <ul class="hotel-fac-con-det">
                        <li class="hotel-fac-con-item">行李寄存</li>
                        <li class="hotel-fac-con-item">24小时前台</li>
                        <li class="hotel-fac-con-item">部分时段大堂经理</li>
                        <li class="hotel-fac-con-item">礼宾服务</li>
                        <li class="hotel-fac-con-item">免费旅游交通图</li>
                        <li class="hotel-fac-con-item">旅游票务</li>
                        <li class="hotel-fac-con-item">叫醒服务</li>
                        <li class="hotel-fac-con-item">邮政服务</li>
                        <li class="hotel-fac-con-item">前台保险柜</li>
                        <li class="hotel-fac-con-item">信用卡结算</li>
                        <li class="hotel-fac-con-item">一次性账单结算</li>
                        <li class="hotel-fac-con-item">快速办理入住</li>
                    </ul>
                </div>
            </div>
			<p @click="showMoreFac()" class="hotel-fac-con-more h100 text-center blueColor">查看更多<img class="disInlneBlk vl w-16 ml05" src="~@/assets/images/hotel/btn_b@2x.png"/></p>
		</div>
		
		<div class="hotel-fac-box bgWhite mt05">
			<p class="hotel-fac-head">酒店政策</p>
			<div class="hotel-fac-con" v-for="(policy,index) in hotelDetail.policy" :key="index">
				<p class="hotel-fac-con-head">{{policy.PloicyName}}</p>
				<ul class="hotel-fac-con-det hotel-fac-con-det-child">
					<li class="hotel-fac-con-item flex1">{{policy.PolicyText}}</li>
				</ul>
			</div>

		</div>
		
		<div class="hotel-fac-box bgWhite mt05">
			<p class="hotel-fac-head">酒店地址  <span class="fr blueColor">去地图查看</span></p>
			<div class="hotel-fac-con">
				<ul class="hotel-fac-con-det hotel-fac-con-det-child">
					<li class="hotel-fac-con-item">{{hotelDetail.AddressLine}}</li>
				</ul>
			</div>
		</div>
		
		<div class="hotel-fac-box bgWhite mt05">
			<p class="hotel-fac-head">酒店介绍</p>
			<div class="hotel-fac-con">
				<ul class="hotel-fac-con-det hotel-fac-con-det-child">
					<li class="hotel-fac-con-item">装修时间：{{hotelDetail.BulitTime}}  </li>
					<li class="hotel-fac-con-item">开业时间：{{hotelDetail.BulitTime}}  </li>
					<li class="hotel-fac-con-item more">{{hotelDetail.Description}}</li>
					<li class="hotel-fac-con-item moreBtn" @click="showMoreDes()"><img class="w-16" src="~@/assets/images/hotel/btn_b@2x.png"/></li>
				</ul>
			</div>
		</div>
		
		<div class="hotel-fac-box bgWhite mt05 mb6 ">
			<p class="hotel-fac-head disFlex justContent1 alignItem2">联系酒店：13800138000  <img class="w-25 vl" src="~@/assets/images/hotel/hotelfac_phone@2x.png"/></p>
		</div>
		<div class="hotel-fac-fixed bgWhite">
			<p><img class="disInlneBlk vl-bottom w-21 mr1" src="~@/assets/images/hotel/hotelfac_time@3x.png"/>最新预订：半小时前</p>
			<p class="fontSize-5 blueBg hotel-fac-horse">查看房型</p>
		</div>
	</div>
</template>
<script>
import qs from 'qs'
import XHeader from '../common/header'
export default {
	 components: {
            XHeader
      },
  data(){
      return {
         moreFac : false,
         moreDes : false
      }
  },
  created(){
	     let detailParams = {
            UserId: this.$storage.getSession('userMess').UserId,
            Token: this.$storage.getSession('userMess').Token,
            HotelInfoID:"354894",
        }
        this.$axios.post('/HotleInfoDetial/HotleSynopsis', qs.stringify(detailParams)).then(res=>{
            console.log(res,"856325632085632")
        })
  },
  methods :{
      showMoreFac(){ 
          this.moreFac = ! this.moreFac
      },
      showMoreDes(){
          this.moreDes = ! this.moreDes 
	  },
	   goBack(){
                 this.$router.go(-1);
      },
  },
  props:['hotelDetail']
}
</script>

<style scoped>
@import '../../assets/css/test.css';
.bgGray{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
.alignItem1 {
	align-items: baseline;
}

.alignItem2 {
	align-items: center;
}

.justContent1 {
	justify-content: space-between;
}

.justContent2 {
	justify-content: space-around;
}

.ml021 {
	margin-left: .168rem;
}

.ml05 {
	margin-left: .04rem;
}

.ml1 {
	margin-left: .08rem;
}

.ml5 {
	margin-left: .4rem;
}

.mt02 {
	margin-top: .016rem;
}

.mt025 {
	margin-top: .02rem;
}

.mt05 {
	margin-top: .04rem;
}

.mt1 {
	margin-top: .08rem;
}

.mt-02 {
	margin-top: -.016rem;
}

.mt15 {
	margin-top: .12rem;
}

.mt2 {
	margin-top: .16rem;
}

.mt25 {
	margin-top: .2rem;
}

.mt47 {
	margin-top: .376rem;
}

.mt55 {
	margin-top: .44rem;
}

.mb05 {
	margin-bottom: .04rem;
}

.mb55 {
	margin-bottom: .44rem;
}

.mb58 {
	margin-bottom: .464rem;
}

.mr075 {
	margin-right: 0.06rem;
}

.mr15 {
	margin-right: .12rem;
}

.mr375 {
	margin-right: .3rem;
}

.mlr15 {
	margin-left: .12rem;
	margin-right: .12rem;
}

.pr1 {
	padding-right: .08rem;
}

.pl1 {
	padding-left: .08rem;
}

.pr15 {
	padding-right: .12rem;
}

.pl15 {
	padding-left: .12rem;
}

.pt1 {
	padding-top: .08rem;
}

.pt15 {
	padding-top: .12rem;
}

.pad1 {
	padding: .08rem;
}

.pad15 {
	padding: .12rem;
}

.pdlr1 {
	padding-left: .08rem;
	padding-right: .08rem;
}

.pdlr15 {
	padding-left: .12rem;
	padding-right: .12rem;
}

.pdtb075 {
	padding-top: 0.06em;
	padding-bottom: 0.06rem;
}

.pdtb1 {
	padding-top: .08rem;
	padding-bottom: .08rem;
}

.pdtb15 {
	padding-top: .12rem;
	padding-bottom: .12rem;
}

.fontSize-09 {
	font-size: .072rem;
}

.fontSize-11 {
	font-size: .088rem;
}

.fontSize-13 {
	font-size: .104rem;
}

.fontSize-15 {
	font-size: .12rem;
}

.fontSize-17 {
	font-size: .136rem;
}

.fontSize-18 {
	font-size: .144rem;
}

/*白色背景*/
.bgWhite {
	background: white;
}

.yellowBgDrak {
	background: #FF9C00;
}

.lightBlueBg {
	background: #F3F8FE;
}

.blueBg {
	background: #2577E3;
}

.blackColor {
	color: black;
}

.blackColor1 {
	color: #333;
}

/*红色字体*/
.redColor {
	color: #fe574f;
}

/*蓝色字体*/
.blueColor {
	color: #1a77e1;
}

.grayColor1 {
	color: #8e8e8e;
}

.grayColor2 {
	color: #686868;
}

.grayColor3 {
	color: #666;
}

.grayColor4 {
	color: #999;
}

.greColor {
	color: #00A304;
}

.yellowColor {
	color: #ff7800;
}

.whiteColor {
	color: #fff;
}

.w-13 {
	width: .104rem;
	height: .104rem;
}

.w-16 {
	width: .128rem;
	height: .128rem;
}

.w-17 {
	width: .136rem;
	height: .136rem;
}

.w-21 {
	width: .168rem;
	height: .168rem;
}

.w-25 {
	width: .2rem;
	height: .2rem;
}

.ww-79 {
	width: .632rem;
}

/*右箭头图标*/
/*加号图标*/
.list-icon-right,
.list-icon-add {
	width: .014rem;
	height: .014rem;
}

/*感叹号图标*/
.list-icon-a {
	width: .016rem;
	height: .016rem;
}

.list-icon-shield {
	width: .017rem;
	height: .017rem;
	margin-top: -0.003rem;
}

.list-icon-minuse {
	width: .021rem;
	height: .021rem;
}

.wh15 {
	width: .015rem;
	height: .015rem;
}

.wh15 img {
	width: 100%;
	margin: 0 auto;
	height: auto;
}

.blueBtnNbg {
	background: transparent;
	border: 1px solid #2269c1;
	color: #2269c1;
	border-radius: .004rem;
}

.blueBtnNbg img {
	margin-left: .005rem;
}

.addBtn {
	padding: .01rem .016rem;
}

.fillBox,
.borderb {
	border-bottom: 1px solid #e9e9e9;
}

.fillTitle {
	padding: .0075rem .015rem;
}

.w100 {
	width: 100%;
}

.w77 {
	width: 77% !important;
}

.z-table {
	border: 1px solid #1a77e1;
	border-radius: .004rem;
	overflow: hidden;
}

.label-icon-3 {
	height: .016rem;
	line-height: 1;
	padding: .002rem;
	border-radius: .002rem;
	background: #fa0000;
	color: #fff;
}

.illegalIcon {
	height: .016rem;
	background: red;
	color: #fff;
	margin-left: .01rem;
	padding: 0.002rem;
	border-radius: .002rem;
	line-height: 1;
}

.inputNew {
	width: 100%;
	border: none;
	height: 100%;
	color: #000000;
	font-size: 0.014rem;
}

.main-list-title {
	padding: 0 .015rem;
	border-bottom: 1px solid #e9e9e9;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: .016rem;
	height: .045rem;
}

.main-list-title .pl1 {
	border-left: 2px solid #1a77e1;
}

.main-list-con {
	padding: 0.01rem 0.015rem;
	font-size: .014rem;
}

.space {
	padding: 0.01rem 0.015rem;
}

.fixBox {
	position: fixed;
	bottom: 0;
	border-top: 1px solid #e9e9e9;
}

.fixBox img {
	display: inline-block;
}

.h60 {
	height: 0.03rem;
	line-height: 0.03rem;
	overflow: hidden;
}

.h90 {
	height: .045rem;
	line-height: .045rem;
	overflow: hidden;
}

.h100 {
	height: .4rem;
	line-height: .4rem;
	overflow: hidden;
}

.btn1 {
	background: #fff;
	border: 1px solid #e9e9e9;
	color: #666;
	border-radius: .026rem;
}

.btn2 {
	background: #1a77e1;
	border: none;
	color: #fff;
	border-radius: .026rem;
}

.btn3 {
	background: #fff;
	border: 1px solid #fff;
}

.btn4 {
	background: #fff;
	border: 1px solid #1a77e1;
	color: #1a77e1;
}

.btn-one .blueBtn {
	width: 100%;
	height: 0.045rem;
	line-height: 0.045rem;
	border-radius: 0.004rem;
	letter-spacing: 0.001rem;
}

.circular-box {
	position: relative;
	width: 0.06rem;
	height: 0.03rem;
	margin-top: 0.001rem;
	background: #fff;
	border-radius: 0.015rem;
}

.circular-box .circular-box-btn {
	position: absolute;
	display: block;
	left: 0;
	width: 0.03rem;
	height: 0.03rem;
	background: #c7c7c7;
	border-radius: 100%;
	transition: all .3s;
}



/* 改到这里 */
.circular-box .circular-box-btn.active {
	left: .24rem;
	background: #1a77e1;
}

.redbtn {
	background: #fff;
	border: 1px solid red;
	color: red;
}

.graybtn {
	background: #eee;
	color: #333;
}

.fanG {
	border: 1px solid transparent;
	width: .64rem;
	line-height: .24rem;
	border-radius: .032rem;
	text-align: center;
}

.fanG.active {
	border: 1px solid #1a77e1;
	color: #1a77e1;
	background: #fff;
}

.yellowbtn {
	background: #fff;
	border: 1px solid #ff7800;
	color: #ff7800;
}

.flexType1 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: .12rem;
	padding-right: .12rem;
}

.flexType2 {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-left: .12rem;
	padding-right: .12rem;
}

.flexType3 {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-left: .12rem;
	padding-right: .12rem;
}

.overflowX {
	width: 100%;
	white-space: nowrap;
	overflow-x: scroll;
	overflow-y: hidden;
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
}

.textWrap {
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.vl {
	vertical-align: middle;
}

.vl-sub {
	vertical-align: sub;
}

.vl-bottom {
	vertical-align: bottom;
}

.vl-text-top {
	vertical-align: text-top;
}

.yellowTag {
	height: .172rem;
	line-height: .172rem;
	border: 1px solid #FF6600;
	color: #FF6600;
	font-size: 0.096rem;
	border-radius: 0.032rem;
	padding-left: 0.04rem;
	padding-right: 0.04rem;
}

.noBgOk input[type=checkbox]:before {
	background: transparent;
}

.noBgOk input[type=checkbox]:checked:before {
	background: transparent;
}

.noBgOk input[type=checkbox]:checked:after {
	border-color: #1a77e1;
}

.sliderBox {
	padding-bottom: .16rem;
	margin-bottom: .08rem;
	overflow: hidden;
}

.sliderBox > div.disFlex {
	margin-bottom: .16rem;
}

.zh-slider {
	position: relative;
	width: 100%;
	height: 0.032rem;
	background: #eee;
	border-radius: 0.08rem;
}

.zh-slider .zh-slider-bg {
	height: 100%;
	position: absolute;
	right: 0;
	left: 0;
	background: #1a77e1;
}

.zh-slider .zh-slider-l,
  .zh-slider .zh-slider-r {
	position: absolute;
	top: 50%;
	width: .216rem;
	height: .216rem;
	margin-top: -.1088rem;
	border: 1px solid #e9e9e9;
	border-radius: 50%;
	box-shadow: inset 0 0 0.0025rem rgba(153, 153, 153, 0.35);
	background: #fff;
}

.zh-slider .zh-slider-l {
	left: 0;
}

.zh-slider .zh-slider-r {
	right: 0;
}

.hotel-fac-box {
	padding-left: 0.096rem;
	padding-right: 0.096rem;
	font-size: .112rem;
}

.hotel-fac-head {
	width: 100%;
	height: .424rem;
	line-height: .424rem;
	font-size: .128rem;
}

.hotel-fac-con {
	border-top: 1px solid #eee;
}

.hotel-fac-con-head {
	font-size: .12rem;
	padding-top: .1rem;
}

.hotel-fac-con-head > .disInlneBlk {
	width: .16rem;
	height: .16rem;
	margin-right: .08rem;
}

.hotel-fac-con-det {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-left: .24rem;
	padding-top: .1rem;
}

.hotel-fac-con-item {
	width: 33.333333%;
	padding-bottom: .1rem;
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #666;
}

.more {
	text-indent: .2em;
	white-space: normal;
	line-height: .2rem;
    /* max-height: 8rem; */
    max-height: 100%;
}

.hotel-fac-con-more {
	border-top: 1px solid #eee;
}

.hotel-fac-box.mt05 .hotel-fac-con-det {
	padding-left: 0;
}

.hotel-fac-con-det-child .hotel-fac-con-item {
	width: 100%;
}

.moreBtn {
	display: flex;
	align-items: center;
	justify-content: space-between;
	justify-content: center;
}

.mb6 {
	margin-bottom: .48rem;
}

.hotel-fac-fixed {
	position: fixed;
	width: 100%;
	height: .44rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	bottom: 0;
	padding-left: .096rem;
	font-size: .112rem;
	color: #666;
	overflow: hidden;
}

.hotel-fac-horse {
	height: 100%;
	line-height: .44rem;
	padding-left: .16rem;
	padding-right: .16rem;
	color: #fff;
}
</style>
