<template>
  	<div class="hotelsearch" ref="child">
		<popup v-model="searchshow" width="100%" position="right">	
			<div class="bgWhite fixBoxT" style="z-index: 1;">
				<div class="blueBg pdtb15 hotelDtBox disFlex">
					<img src="~@/assets/images/icon/back.png" class="heateimg" @click="$emit('heateimg')"/>
					<div class="h60 bgWhite disFlex alignItem2" style="width:100%;">
						<input  @click="openSearcriteria"  type="text" name=""  value="" placeholder="酒店名/关键字/品牌" id="hotelPosition"/>
					</div>
				</div>
			</div>
			<!--搜索历史-->
			<div class="key-box" id="keywordSearch" style="margin-top:.5rem;">
				<div class="key-box-title flexType1">
					<p class="grayColor3">
						<img class="w-16" src="~@/assets/images/hotel/keyicon0@3x.png" alt="" />搜索历史
					</p>
					<p class="blueColor" id="keywordClear">
						<img class="delete-icon" src="~@/assets/images/hotel/delete@2x.png"/>清空
					</p>
				</div>
				<div class="key-box-con flexType1" id="historyCon">
					<!--<p class="key-box-con-item active">王府井2商圈</p>-->
				</div>
				<input type="hidden" id="historyList"/>
			</div>	
			<!--品牌       @click="TArealistlen()"-->
			<div class="key-box"  v-for="(soption,index) in Searchbox" :key="index">
				<div class="key-box-title flexType1">
					<p class="grayColor3">
						<img class="w-16" src="~@/assets/images/hotel/keyicon5@3x.png" alt="" />{{soption.KeyWords}}({{soption.Type}})
					</p>
					<p class="blueColor" >
						<img class="rightIcon" src="~@/assets/images/icon/rightRow@2x.png" :class="{tranrota:soption.TAreatranrota}" @click="TArealistlen(soption.Type,index)"/>
					</p>
				</div>
				<div class="key-box-con flexType1" :class="{listpage:soption.TArealistpage}">
					 <p class="key-box-con-item" v-for="(searchCriteria,itindex) in soption.searchCriteria" :key="itindex" @click="choseKeyWord(searchCriteria,itindex,soption.KeyWords)">
					    {{searchCriteria.Name}}
					 </p> 
				</div>
			</div>
			<!-- 搜索 -->
		   <div class="Searcriteria" v-show="Searcriteria">
				<div class="crittop">
					<img  @click="CloseSearcriteria()"  src="../../assets/images/fightOrder/back2.png" alt=""/>
					<input type="text" placeholder="请输入搜索条件" v-model="valsage" @input="searchdata">
					<span>搜索 ></span>
				</div>
				<ul class="critbox"  >
					<li @click="critbox(datalist)" v-for="(datalist,daindex) in searchdatabox" :key="daindex">{{datalist.Name}}
						<span class="ktyw">{{datalist.KeyW}}</span>
					</li>
				</ul>
		   </div>
        </popup>
        <!--品牌或者地铁-->
		<div class="Hotelbrand"> 
			<popup v-model="brandshow"  width="100%" position="right">
				<div class="brand">
					<span>{{brandtitle}}</span>
					<img src="../../assets/images/icon/back.png" alt=""  @click="Hotelbrand">
				</div>
				<div class="BrandBox">
					<ul class="boxleft">
						<li @click="lefttitle(boxleft, leftindex)" :class="{leftbule:isleftcolor === leftindex}" v-for="(boxleft,leftindex) in BrandBox" :key="leftindex">{{boxleft.KeyWords}}</li>
					</ul>
					<ul class="boxright">
						<li @click="righttitle(rigindex,boxright)" :class="{rightbule:isrightcolor === rigindex}" v-for="(boxright,rigindex) in BrandBRight" :key="rigindex">{{boxright.Name}}</li>
					</ul>
				</div>
			</popup>
        </div>
	</div>
</template>
<script>
import qs from 'qs'
import Popup from '../common/popup/index'
import Hotelbrandn from'./hotel-brand'
// 临时模拟数据
import Searchlist from '../common/addressPicker/search.json'
import Seahbrand from '../common/addressPicker/searchtwo.json'
export default {
	data(){
		return {
			keyword:'',
			userMess: this.$storage.getSession('userMess'),
			//品牌
			// brandlist:[],
			//商圈 
			//TArealist:[],
			Searcriteria:false,
			TArealistpage:true,
			TAreatranrota:false,
			Searchlist: Searchlist,
			Searchbox:[],
			searchdatabox:[],
			brandshow: false,
			brandtitle:"",
			valsage:"",
			Seahbrand: Seahbrand,  
			BrandBox:[], //地铁左边
			BrandBRight:[],//地铁右边
			isleftcolor:0,
			isrightcolor:0,
			currentKeyWords: '高档',
			areaMess:{}
		}
	},
  props: {
	  searchshow: Boolean,
	 // areaMess: Object
  },
  components: {
	  Popup,
	  Hotelbrandn
  },
    created(){

       
    },
	methods:{
		ketpage(type){
			this.areaMess = type
			this.$axios.post('HotelFilter/HotelSearchCriteriaNew', qs.stringify({
			UserId: this.userMess.UserId,
			Token: this.userMess.Token,
			CityId: type.cityid,
			AreaId: type.AreaId,
			CityName: type.cityname
		}))
		.then((res) => {    //酒店搜索条件
			this.Searchbox = res.data.Result
			this.Searchbox.map(item => {
				item.TAreatranrota = false;
				item.TArealistpage = true ;
			})  
		})
		},
		openSearcriteria(){
            this.Searcriteria =true
		},
		CloseSearcriteria(){
			this.Searcriteria =false
		},
		Hotelbrand(){
			this.brandshow = false
		},
		critbox(data){//搜索
			this.$emit('chose-key-word', data)
			
		},
		lefttitle(boxleft, i){ //左边
			this.isleftcolor = i;
			this.currentKeyWords = boxleft.KeyWords
			this.BrandBRight = boxleft.listSearchCriteria
		},
		righttitle(i,item){//地铁或品牌
				this.isrightcolor = i      
				let currentBrand = item
				currentBrand.KeyWords = this.currentKeyWords
				this.brandshow = false
				this.$emit('chose-key-word', currentBrand)
			
		},//其他
		choseKeyWord(item,dex,key) {
			let itempage = item
			item.wodekey=key
			this.$emit('chose-key-word', itempage)
		},
		searchdata(){
			this.$axios.post('MyTravelPolicy/HotelLinkSearch', qs.stringify({
				Value: this.valsage,
				CityId: this.areaMess.cityid,
				CityName: this.areaMess.cityname
			})).then(res => {
				 console.log(res)
				this.searchdatabox = res.data.Result

			})
		},
		getHotelSearchCriteriaNew(Type) {
			console.log(this.areaMess.cityid,this.areaMess.cityname,"*******111111111****",Type)
            this.$axios.post('HotelFilter/GetHotleInfoFilterDetail', qs.stringify({
				Type:Type,
				CityId:this.areaMess.cityid,
				CityName:this.areaMess.cityname
			}))
			.then((res) => {
				this.BrandBox = res.data.Result;
				this.BrandBRight = this.BrandBox[0].listSearchCriteria;
				this.BrandBRight = res.data.Result[0].listSearchCriteria;
			})
		},
		TArealistlen(type,index){
			console.log(type, 333333333333333333333333333)
			if(type == "12"){
				this.brandshow =true;
				this.brandtitle = type
			}else if(type == "3"){
					this.brandshow =true;
					this.brandtitle = type 
			}else{
			   this.Searchbox = [...this.Searchbox]
			   this.Searchbox[index].TAreatranrota = ! this.Searchbox[index].TAreatranrota
			   this.Searchbox[index].TArealistpage = ! this.Searchbox[index].TArealistpage
			   return
			}
            this.getHotelSearchCriteriaNew(type)
		},
		
		
	}
}
</script>
<style scoped>
@import '../../assets/css/test.css';
.Searcriteria{
	position: fixed; 
	z-index:3;
	top: 0;
	bottom: 0;
	width: 100%;
	background-color: rgba(25, 25, 25, 0.5)
}
.crittop{
	position: fixed;
	top: 0;
	z-index: 3;
	width: 100%;
	height: .35rem;
	position: relative;
	background-color: #ffffff;		
}
.crittop img{
            position: absolute;
			left: .15rem;
			width: .15rem;
			top: .1rem;
}
.crittop input{
	width: 1.7rem;
	height: .25rem;
	background-color: #f5f5f5;
	border: .01rem solid #1a77e1;
	border-radius: .04rem; 
    position: absolute;
	left: .5rem;
	top: .05rem;
	padding-left: .1rem;

}
.crittop span{
	color: #1a77e1;
	font-size: .15rem;
	position: absolute;
	right: .1rem;
	top: .1rem;
}
.critbox{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	padding-top: .35rem;
    overflow-x: hidden;
	overflow-y: auto;
	list-style: none;
}
.critbox li{
	width: 100%;
	height: .35rem;
	line-height: .35rem;
	padding-left: .07rem;
	background-color: #ffffff;
	border-top: .01rem #e4e4e4 solid;
}
.ktyw{
	float: right;
	padding-right: .15rem;
}
/* 11111111111111 */
.heateimg{
       margin-left: -.3rem;
}
.pdtb15 {
	padding-top: .12rem;
	padding-bottom: .12rem;
}

.hotelDtBox {
	padding-left: .42rem;
	padding-right: .42rem;
}

.hotelDtBox .h60 {
	border-radius: 0.04rem;
}

.h60 {
	height: .24rem;
	line-height: .24rem;
	overflow: hidden;
}

.alignItem2 {
	align-items: center;
}

.flexType1 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: .12rem;
	padding-right: .12rem;
}

.w-16 {
	position: relative;
	top: -.1rem; 
	width: .16rem;
	height: .16rem;
}

.ml1 {
	margin-left: .08rem;
}

.mr15 {
	margin-right: .12rem;
}


.tabBox {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 .12rem;
	font-size: .128rem;
	text-align: center;
}

.tabBox .tabBoxItem {
	width: .512rem;
}

.tabBox .disInlneBlk {
	height: .384rem;
	line-height: .4rem;
	border-bottom: .016rem solid transparent;
}

.tabBox .active .disInlneBlk {
	border-bottom: 0.016rem solid #1a77e1;
	color: #1a77e1;
}

.fixBoxT {
	position: fixed;
	top: 0;
	width: 100%;
	border-bottom: 1px solid #e9e9e9;
}

.flight-screen {
	min-height: .2rem;
	height: auto !important;
}

.flight-screen .flight-screen-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: .12rem;
	padding-right: .12rem;
	height: .4rem;
	background: #555;
	color: #fff;
}

.flight-screen .flight-screen-body {
	min-height: .8rem;
	height: auto !important;
	background: #ffffff;
}

.flight-screen .flight-screen-body .width30 {
	float: left;
	min-width: .48rem;
	text-align: center;
	width: auto !important;
	margin: 0.08rem .12rem;
	background: #fff;
	border: 1px solid #1a77e1;
	color: #1a77e1;
	border-radius: 0.04rem;
	height: .24rem;
	line-height: .24rem;
}
.flight-screen .flight-screen-body .active {
	background: #1a77e1;
	color: #ffffff;
}
.hoteldate {
	border-right: 1px dashed #e9e9e9;
}
.hoteldate p {
	line-height: 1.2;
}
.hotelDtBox {
	padding-left: .42rem;
	padding-right: .42rem;
}
.hotelDtBox .h60 {
	border-radius: 0.04rem;
}
#hotelPosition::-webkit-input-placeholder {
	color: #999;
}
#hotelPosition::-moz-placeholder {
	color: #999;
}
#hotelPosition:-ms-input-placeholder {
	color: #999;
}
#hotelPosition:-moz-placeholder {
	color: #999;
}
#hotelPosition {
	border: none;
}
.key-box {
	margin-top: .08rem;
	background: #fff;
	font-size: .128rem;
}
#keywordSearch {
	margin-top: .58rem;
}
.key-box-title {
	height: .36rem;
	line-height: .36rem;
	border-top: .03rem solid #eee;
	border-bottom: 1px solid #eee;
}
.key-box-title img {
	display: inline-block;
	margin-right: .04rem;
	vertical-align: sub;
}
.key-box-title .w-16 {
	width: .16rem;
	height: .16rem;
	vertical-align: bottom;
}

.key-box-title .rightIcon {
	width: .128rem;
	height: .128rem;
	margin-right: -0.032rem;
}

.delete-icon {
	width: .128rem;
	height: .152rem;
}

.key-box-con {
	flex-wrap: wrap;
	padding: 0;
	font-size: .112rem;
	text-align: center;
}
.listpage{
	height: .5rem;
	width: 100%;
	overflow: hidden;
}
.tranrota{
	transform:rotate(90deg);
	-ms-transform:rotate(90deg); 	/* IE 9 */
	-moz-transform:rotate(90deg); 	/* Firefox */
	-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
	-o-transform:rotate(90deg); 	/* Opera */
}

.key-box-con .key-box-con-item {
	width: 25%;
	height: .25rem;
	text-align: center;
	padding: 0 .03rem 0 0.03rem;
	line-height: .25rem;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.key-box-con .key-box-con-item.active {
	background: #f6f4f5;
}



.brand{
	width: 100%;
	height: .4rem;
	background-color:#2577E3;
	text-align: center;
	line-height: .4rem;
	position: relative;  
}
.brand span{
	font-size: .18rem;
	color: #ffffff;
}
.brand  img{
	position: absolute;
	left: .15rem;
	width: .2rem;
	top: .1rem;
}
.BrandBox{
	position: absolute;
	width: 100%;
	bottom: 0;
	top: .4rem;
	background-color: #ffffff;
	list-style: none;
}
.boxleft{
	width:25%;
	height: 100%;    
	float: left;
	border-right: .01rem solid #e4e4e4;
}
.boxleft > li{
	width: 100%;
	height: .35rem;
	text-align: center;
	line-height: .35rem;
	background-color: #e4e4e4
}
.boxleft > .leftbule{
	color: #2577E3;
	background-color: #ffffff;

}
.boxright{
	float: left;
	width:74%;
	height: 100%;
	overflow-y: auto;
}
.boxright li{
	width: 100%;
	height: .35rem;
	text-align: left;
	line-height: .35rem;
	padding-left: .15rem;
	background-color: #ffffff;
	border-bottom: .01rem solid #e4e4e4;
}
.boxright > .rightbule{
	color: #2577E3;
	background-color: #ffffff; 
}
</style>
