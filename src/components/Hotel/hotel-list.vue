<template>
      <div class="Hotellist">
            <x-header :showBack="true" :title="'酒店'" @go-back="goBack"></x-header>
          <!--头部Input的查找 -->
            <div id="HotelTopPut">
                    <div class="HotlTopleft" id="firstSelect">
                                <p>住 <span id="startDate" @click="showDate('start')">{{formatDepartDate}}</span></p>
                                <p>离 <span id="endDate" @click="showDate('end')">{{formarArriveDate}}</span></p>
                                <img src="../../assets/images/hotel/date@2x.png" alt="">
                    </div>
                    <div class="HotlTopright" @click="showPopup()">
                              <img src="../../assets/images/hotel/search@2x.png" alt="">
                              <input type="text" id="" value="" placeholder="关键字/位置/品牌/酒店名" disabled="disabled">
                    </div>
            </div>
        <!-- 头部选项卡 -->
            <ul class="tabs clearfix" id="Hoteul" >  
                <li class="Hoteli" v-for="(tab,index) in tabsName" :key="index" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">   
                    {{tab.name}}
                </li>  
            </ul>  
             <!-- 推荐排序 -->
            <div class="tab-card">
                <div class="listulbox"  v-bind:class="{listulboxtran:istransition5}" >
                    <ul class="cardUl">
                        <li @click="toggle(liindex,cardUl)" v-for="(cardUl,liindex) in listulbox" :key="liindex" :class="{active:active1===liindex}">
                            {{cardUl.Name}}
                        </li>
                    </ul>
                </div>
                <div class="ki" @click="choose()"></div>
            </div>
            <!-- 星级价格 -->
            <div class="tab-card"  >
                <div class="listulbox" v-bind:class="{listulboxtran:istransition6}">  
                    <P class="Starp">星级</P>
                    <ul class="Starul"> 
                       <li class="stearad" @click="strtagg1(skeyindex,starkey)" v-bind:class="{Starkey1:starkey.isActive}" v-for="(starkey,skeyindex) in starktybox" :key="skeyindex" >
                                {{starkey.Name}}
                        </li> 
                    </ul> 
                    <p class="Starp">价格</p>
                    <div class="range"> 
                        <p >
                            <span>￥{{rangePrice[0]}}</span>
                            <span class="showPrice">
                                {{maxPrice===rangePrice[1]?'不限':'￥'+rangePrice[1]}}
                            </span>
                        </p>
                        <Slider :tip-format="format" v-model="rangePrice" range :max="maxPrice"></Slider>
                        <p class="cicransa">
                            <span>￥0</span>
                            <span>￥150</span>
                            <span>￥300</span>
                            <span>￥450</span>
                            <span>￥600</span>
                            <span class="cicranrig">不限</span>
                            <span class="cicranrig">￥1000</span>
                        </p>
                    </div>    
                    <div class="dixbutton">
                        <button class="dixbutReset" @click="Nostrtagg1()">重置</button>
                        <button class="dixbutDetermine" @click="yesstrtagg1">确定</button>
                    </div>                                
                </div>
                <div class="ki" @click="choose()"></div>
            </div>
            <!-- 酒店位置 -->
            <div class="tab-card"  >
                <div class="listulbox"   v-bind:class="{listulboxtran:istransition7}"> 
                   <ul class="Hotelposition"> <!--酒店左边-->
                        <li class="tepion" @click="pilintogg(pilindex,telpli.KeyWords)" v-bind:class="{Hotelpli:telplitogg === pilindex}"  v-for="(telpli,pilindex) in Hotelposition" :key="pilindex">
                            <span class="tepionspan">{{telpli.KeyWords}}</span> 
                        </li>
                    </ul> 
                     <!-- 类型一 -->    
                    <ul class="positionbox"  >
                        <li class="tiosc" @click="checkedtogg(checkindex,checkbox)" v-for="(checkbox,checkindex) in tioscheckbox" :key="checkindex">
                            <span class="tepionspan"> {{checkbox.Name}}</span>
                            <label class="check" :class="{checked:checkbox.isActive}"></label>
                        </li>
                    </ul>
                    <!-- 类型2 -->
                    <ul class="positionbox" style="display:none">
                        <li class="tiosc1" @click="checkedtogg1(checkindex1)" v-for="(checkbox1,checkindex1) in tioscheckbox" :key="checkindex1">
                            <span class="tepionspan"> {{checkbox1.Name}}</span>
                            <label class="checkm" :class="{checkedm:checkbox1.isActive}"></label>
                        </li>
                    </ul>
                    <!-- 类型三 -->
                    <ul class="positionbox" style="display:none">
                        <ul class="Subwayline">
                            <li @click="KeyWords(wayindex)" v-for="(Words,wayindex) in Subwayline" :key="wayindex" :class="{active:Worsractive === wayindex}" >
                                {{Words.KeyWords}}
                            </li>
                        </ul>
                        <ul class="Subwaystation">
                            <li class="Subtion" @click="Subwaystion(Sunindex,Subtion)" v-for="(Subtion,Sunindex) in tioscheckbox" :key="Sunindex">
                               <span class="tepionspan">{{Subtion.Name}}</span>
                               <label class="check" :class="{checked:Subtion.isActive}"></label>
                            </li>     
                        </ul>
                    </ul>
                    <div class="bottbox1">
                        <div class="bottletf" @click="NoHotellocation">重置</div>
                        <div class="bottright" @click="YseHotellocation">完成</div>
                    </div>   
                </div>
                <div class="ki" @click="choose()"></div>
            </div>
            <!-- 综合删选 -->
            <div class="tab-card" >
                  <div class="listulbox" v-bind:class="{listulboxtran:istransition8}">    
                       <ul class="Hotelposition">
                            <li class="tepion9" @click="pilintogg9(pilindex9)" v-bind:class="{Hotelpli:telplitogg9 === pilindex9}"  v-for="(telpli9,pilindex9) in Hotelposition9" :key="pilindex9">
                                <span class="tepionspan">{{telpli9.KeyWords}}</span> 
                            </li>
                       </ul>  
                      <!-- 类型一 -->
                       <ul class="positionbox Hotelbrand">
                           
                            <ul class="Subwayline">
                               <li @click="HOTbrand(branindex)" v-for="(Words,branindex) in hotelfata" :key="branindex" :class="{active:Branactive === branindex}" >
                                    {{Words.KeyWords}}型
                                </li> 
                            </ul>
                            <ul class="Subwaystation">
                                <li class="Hbareen" @click="HOTbareen(Sunindex,Subtion)" v-for="(Subtion,Sunindex) in tioscbareen" :key="Sunindex">
                                    <p class="tepionspan">{{Subtion.Name}}</p>
                                    <label class="checkm" :class="{checkedm:Subtion.isActive}"></label>
                                </li>     
                            </ul>
                        </ul>
                       <ul class="positionbox Hotelbrand" style="display:none">   
                            <li class="services" @click="Facilities(Sunindex,Subtion)" v-for="(Subtion,Sunindex) in tioscbareen" :key="Sunindex">
                                <p class="tepionspan">{{Subtion.Name}}</p>
                                <label class="checkm" :class="{checkedm:Subtion.isActive}"></label>
                            </li>     
                       </ul>
                       <div class="bottbox1">
                                <div class="bottletf" @click="Nocomprehensive">重置</div>
                                <div class="bottright" @click="Yescomprehensive">完成</div>
                       </div>  
                  </div>
                  <div class="ki" @click="choose()"></div>
            </div>
            
            <loading v-if="hotelData.length<1"></loading>
        
            <!-- 主题内容  Scroller  ref="scrollerBottom"-->
            <div id="HotelContBoxL">
                <scroller lock-x height="150%"  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200" >
                    <div class="box2" height="100%" id="lock">
                            <div class="IntroductionList" v-for="item in hotelData" :key="item.HotelInfoID" @click="toHotelDetail(item)">
                            <div class="InListleft">
                                <img :src="item.FirstImg" alt="">
                            </div>
                            <div class="InListright">
                                <p class="rightfontWolde">{{item.HotelName}}</p>
                                <p class="rightfontWolde1"><span>{{item.CtripCommRate}}分 超棒</span> {{item.CommentCount}}条评论 | {{item.HotelStarRate}}星级</p>    
                                <p class="rightfontWolde1">{{item.DistanceStr}}</p>
                                <p>
                                    <button disabled="disabled" class="rightfonbut1">热卖</button>
                                    <button disabled="disabled" class="rightfonbut2">休闲度假</button>
                                </p> 
                                <p  class="rightfontWolde2">{{item.BookingDescribe}}</p> 
                                <div class="rightfontdiv">
                                    <p class="rightfontWolde1"><span>￥</span><span class="rightfontspan">{{item.MinPrice}}</span>起</p>
                                    <p class="rightfontWolde3">低价即将 售完</p>
                                </div>  
                            </div>
                        </div> 
                        <!-- <div v-for="(val, i) in bottomCount" :key="i">placeholder {{val}}</div>-->     
                        <load-more tip="loading" v-show="loadingshow"></load-more> 
                     </div>
                </scroller>
            </div>
        <!-- 关键字搜索弹层 -->
        <hotelsearc ref="child" :areaMess="areaMess" :searchshow="searchshow" @heateimg="heateimg"></hotelsearc>
        <!-- 日期弹框 -->
        <date-popup-picker :show="showDatePicker" :currDate="currDate" :currState="currState" :endLocal="'CTU'" :startLocal="'XIY'"
            :isOneWay="false" @close-date-picker='closeDatePicker' @go-back="close">
        </date-popup-picker> 
    </div>
</template>
<script>
import qs from 'qs'
import XHeader from '../common/header'
import Hotelsearc from './keyword-search'
//临时模拟数据
import Hotelcity from '../common/addressPicker/hotelcity.json'
import { futimesSync } from 'fs';
// 价格区间滑块
 import {Slider} from 'iview'
import 'iview/dist/styles/iview.css'
import $ from 'jquery'
import Loading from '../common/loading'
import DatePopupPicker from '../common/datepicker-popup'
import { initDate, getAfterDate, formatDate } from '../../utils/utils.js';
import Scroller  from 'vux/src/components/scroller/index'
import LoadMore  from 'vux/src/components/load-more/index'

export default {
    name: 'Hotellist',
    components: {
        XHeader,
        Hotelsearc,
        Slider,
        Loading,
        DatePopupPicker,
        Scroller,
        LoadMore
    },
    watch: {
        rangePrice(newVal, oldVal) {
            console.log(`价格范围在${newVal[0]}-${newVal[1]}之间`);
        }
    },
    data: function() {
        return { 
            showDatePicker: false,
            currState: 'start',
            currDate: [initDate(new Date())],  
            departDate: initDate(new Date()),
            arriveDate: getAfterDate(new Date(), 3),   
            rangePrice: [0, 1000],  // 酒店滑块值范围
            maxPrice: 1000,         // 滑块最大值
            Hotelcity:{},
            searchshow: false,//搜索弹框
            user: {},
            hotelData: [],//主题内容
            CheckInDate: this.$route.query.CheckInDate,     //入住时间
            CheckOutDate: this.$route.query.CheckOutDate,   //离店时间
            onFetching: false,
            bottomCount: 20,
            Pagecontdex:1, 
            ListParameter:{}, 
            SearchCriteria:[],
            loadingshow:false,
        // 头部选项
            tabsName: [
                {name: "推荐/排序",isActive: true}, 
                {name: "星级/价格",isActive: false},
                {name: "酒店位置",isActive: false},
                {name: "综合筛选",isActive: false},
            ],  
            // active:false,
            //推介排序
            active1: 0,  
            listulbox:[], 
            //价格、星级
            starktybox:[],
            //酒店位置
            telplitogg:0,
            Hotelposition:[],
            //距离
            tioscheckbox:[],     
            //地铁
            Worsractive:0,
            Subwayline:[],
            //综合删选
            telplitogg9:0,
            Hotelposition9:[],
            Branactive:0,
            tioscbareen:[],
            hotelfata:[],
            istransition5:false,
            istransition6:false,
            istransition7:false,
            istransition8:false,
            params: this.$route.query,
            areaMess: {
                cityId: this.$route.query.CityId,
                areaId: this.$route.query.AreaID,
                cityName: this.$route.query.CityName
            }
        } 
    },
    
    computed: {
        formatDepartDate() {
            return formatDate(this.departDate)
        },
        formarArriveDate() {
            return formatDate(this.arriveDate)
        }
    },
    created(){   
            
            this.user = this.$storage.getSession('userMess');
            let  HotelListSearchData = this.$storage.getSession('hotelSearchData')
            this.SearchCriteria = HotelListSearchData.listSearchCriteria
            //头部筛选 HotelFilter/GetHotleInfoFilterNew || HotleInfo/HotleInfoSearchNew
            let  HotelScreen2 ={
                UserId:this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                CityName:HotelListSearchData.citybox.cityname,
                CityId:HotelListSearchData.citybox.cityid,
                AreaId:HotelListSearchData.citybox.AreaId,   
            }
            this.$axios.post('/HotelFilter/GetHotleInfoFilterNew', qs.stringify(HotelScreen2)).then((res) => {
                this.Hotelcity = res.data
                let Hotelscreen =  this.Hotelcity
                this.listulbox = Hotelscreen.Result.listSortSearch //listSortSearch 推荐排序;
                 
                this.starktybox = Hotelscreen.Result.listStarSearch
                this.starktybox.map(item => {item.isActive = false})  
                this.starktybox[0].isActive = true//listStarSearch 星级价格
                
                let Hotelpos = this.Hotelposition = this.Hotelcity.Result.addressScreening   
                this.Hotellocation(Hotelpos,true)//酒店位置 
                
                let compre = this.Hotelposition9 = this.Hotelcity.Result.comprehensiveScreening   
               
                this.Hotellocation(compre,false)   //综合筛选
                this.hotelfata = this.Hotelposition9[0].listSearch
            })   
            let ListParameter = this.ListParameter ={
                UserId:this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                Pageindex:this.Pagecontdex,//页数
                Pagecount:10,//条数
                CheckInDate:HotelListSearchData.CheckInDate,//时间 currDate
                CheckOutDate:HotelListSearchData.CheckOutDate,//HotelListSearchData.CheckOutDate,//时间
                AreaID:HotelListSearchData.citybox.AreaId,
                City:HotelListSearchData.citybox.cityname,
                CityId:HotelListSearchData.citybox.cityid,
                CurrentItude:"",//经纬度
                OneMoney:HotelListSearchData.OneMoney,//价格 
                TwoMoney:HotelListSearchData.TwoMoney,//价格
                Keyword: HotelListSearchData.Keyword.Name == null?"":HotelListSearchData.Keyword.Name,//关键字
                listSearchCriteria:JSON.stringify(this.SearchCriteria), //筛选条件{} 
            }
            this.HotelListInfoSearchNew(ListParameter)
    },
    methods: {   
        HotelListInfoSearchNew(ListParameter){
                this.$axios.post('/HotleInfo/HotleInfoSearchNew', qs.stringify(ListParameter)).then((res) => {
                   let Resultlist = res.data.Result.hotelList
                   this.hotelData = this.hotelData.concat(Resultlist)
                })  
         },
        //上拉加载更多
         onScrollBottom () {
            if (this.onFetching) {
                // do nothing
            } else {
                this.onFetching = true
                
                this.Pagecontdex += 1
                let dexlogn =  this.Pagecontdex
                if(dexlogn < 3){
                    this.loadingshow = false
                }else{
                     this.loadingshow = true
                }
               
                this.ListParameter.Pageindex = this.Pagecontdex
                this.HotelListInfoSearchNew(this.ListParameter)     
                setTimeout(() => {
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.reset()
                })
                this.onFetching = false
               this.loadingshow =false
                }, 2000)
                
            }
        },
        Hotellocation(Hotelpos,size){ //酒店位置和综合筛选初始化
            Hotelpos.map(item =>{     
                item.listSearch.map(item =>{
                    item.listSearchCriteria.map(type =>{
                        type.isActive = false;
                    })
                    item.listSearchCriteria[0].isActive = true;    
                })               
            }) 
            if(size == true){
               this.tioscheckbox = this.Hotelposition[0].listSearch[0].listSearchCriteria;
            }else{
               this.tioscbareen = this.Hotelposition9[0].listSearch[0].listSearchCriteria;
            }   
        },       
        format(val) {// 酒店价格区间 
            return "￥" + val;
        },       
        getHotelList(url, params) {//不知道
            return this.$axios.post(url, qs.stringify(params))
        },
        goBack(){
            this.$router.go(-1);
        },
        showPopup() {//打开搜索
            this.searchshow = true
             this.$refs.child.ketpage(this.$storage.getSession('hotelSearchData').citybox)
        },
        heateimg(){//关闭搜索
			this.searchshow = false
        },
        //头部选项
        choose(){
            var tabCardCollection = document.querySelectorAll(".tab-card"),  
            len = tabCardCollection.length;  
            for(var i = 0; i < len; i++) {  
                this.istransition5 = false
                this.istransition6 = false
                this.istransition7 = false
                this.istransition8 = false
                tabCardCollection[i].style.display = "none";       
            }  
        },
        tabsSwitch: function(tabIndex) {               
            var tabCardCollection = document.querySelectorAll(".tab-card"), 
            len = tabCardCollection.length;  
            for(var i = 0; i < len; i++) {  
            if(tabCardCollection[i].style.display == "block"){
                tabCardCollection[i].style.display = "none"; 
                this.istransition5 = false
                this.istransition6 = false
                this.istransition7 = false
                this.istransition8 = false
                return
            }
                tabCardCollection[i].style.display = "none";  
                this.tabsName[i].isActive = false;  
            }  
            if(tabIndex == 0){
                this.istransition5 =true
            };
            if(tabIndex ==1){
                this.istransition6 =true
            };
            if(tabIndex ==2){
                this.istransition7 =true
            };
            if(tabIndex == 3){
                this.istransition8 =true
            };
            this.tabsName[tabIndex].isActive = true;
            tabCardCollection[tabIndex].style.display = "block";                           
        }, 
        //推介排序
        toggle(i, item){   
            this.active1 = i   
           // this.istransition6=false; 
            document.querySelectorAll(".tab-card")[0].style.display = "none";
            this.hotelData = []
            this.Pagecontdex = 1 
            this.$nextTick(() => {
               this.$refs.scrollerBottom.reset({top: 0})
            })
            this.ListParameter.Pageindex = this.Pagecontdex
            this.SearchCriteria = [ item ] 
            this.ListParameter.listSearchCriteria = JSON.stringify(this.SearchCriteria)
            this.HotelListInfoSearchNew(this.ListParameter)
           
        },
        Unrestricted(Resetarray,index){//不限制 Resetarray==数组对象  index == 下标  lenght==长度      
            if(index == 0){        
                Resetarray.map(item => {
                    item.isActive = false
                })  
                Resetarray[index].isActive = true  
            }else{
                Resetarray[0].isActive =false
                Resetarray[index].isActive =! Resetarray[index].isActive  
                let cunt = 0
                Resetarray.map(item => {
                    if(item.isActive) cunt ++
                })
                if(cunt === 0) {
                    Resetarray[0].isActive = true  
                }
            }
        },
        //星级价格
        strtagg1(index,item){
            this.starktybox = [...this.starktybox]
            let Resetarray = this.starktybox
            this.Unrestricted(Resetarray,index)  
        },  
        Nostrtagg1(){
            this.starktybox = [...this.starktybox]
            this.starktybox.map(item=>{item.isActive = false})   
            this.starktybox[0].isActive=true
            this.rangePrice=[0, 1000]
        },
        yesstrtagg1(){
            let rangePrice=this.rangePrice; //价格
            let starbox = this.starktybox;        
            let a = this.starktybox.filter(item => {
                return item.isActive == true && item.Name != "不限"
            })
            this.hotelData = []
            this.Pagecontdex = 1 
            this.$nextTick(() => {
               this.$refs.scrollerBottom.reset({top: 0})
            })
            this.ListParameter.Pageindex = this.Pagecontdex
            //
            this.SearchCriteria = a
            this.ListParameter.listSearchCriteria = JSON.stringify(this.SearchCriteria)//集合对象
            this.ListParameter.OneMoney = this.rangePrice[0] 
            this.ListParameter.TwoMoney = this.rangePrice[1] 
            this.HotelListInfoSearchNew(this.ListParameter)
            //关闭窗口
            this.istransition5=false;
            document.querySelectorAll(".tab-card")[1].style.display = "none";
            this.Nostrtagg1()
        },
        //酒店位置 左边
        pilintogg(pilindex,type){
            console.log(type, 333333333333333333333333333333333)
            this.telplitogg = pilindex;
            var posonbox = document.querySelectorAll(".positionbox")
            this.tioscheckbox=this.Hotelposition[pilindex].listSearch[0].listSearchCriteria
            if(type == "商圈"){   
                posonbox[1].style.display ="block"; 
                posonbox[0].style.display ="none"; 
                posonbox[2].style.display ="none";
            }else if(type == "地铁"){
                this.Subwayline = this.Hotelposition[pilindex].listSearch
                posonbox[2].style.display ="block"; 
                posonbox[0].style.display ="none"; 
                posonbox[1].style.display ="none"; 
            }else{  
                posonbox[0].style.display ="block"; 
                posonbox[1].style.display ="none"; 
                posonbox[2].style.display ="none";
            }
        },
        //酒店位置 类型一
        checkedtogg(index,item){
                this.tioscheckbox = [... this.tioscheckbox]
                this.tioscheckbox.map(item=>{item.isActive = false})
                this.tioscheckbox[index].isActive = true 
        },
        //酒店位置  类型二 
        checkedtogg1(index){ 
             this.tioscheckbox = [... this.tioscheckbox]  
             let Resetarray = this.tioscheckbox
             this.Unrestricted(Resetarray,index)   
        },
        //酒店位置  类型三
        KeyWords(index){
            this.Worsractive = index
            this.tioscheckbox = this.Subwayline[index].listSearchCriteria
        },
        Subwaystion(index,item){
            this.tioscheckbox = [... this.tioscheckbox]
            this.tioscheckbox.map(item=>{item.isActive = false})
            this.tioscheckbox[index].isActive = true 
        },
        NoHotellocation(){
                let Hotelpos = this.Hotelposition = this.Hotelcity.Result.addressScreening 
                this. Hotellocation(Hotelpos,true);
                this.telplitogg = 0;
                this.Worsractive = 0;
                var posonbox = document.querySelectorAll(".positionbox")
                posonbox[0].style.display ="block"; 
                posonbox[1].style.display ="none"; 
                posonbox[2].style.display ="none"
        },
        YseHotellocation(){
            let locationSelect = [] //酒店位置获取到的值
                this.Hotelposition.map(item =>{     
                item.listSearch.map(item =>{
                        item.listSearchCriteria.map(type =>{
                            if(type.isActive == true && type.Name != '不限'){
                               locationSelect.push(type)
                            }
                        })
                })                  
            })
            this.hotelData = []
            this.Pagecontdex = 1 
            this.$nextTick(() => {
               this.$refs.scrollerBottom.reset({top: 0})
            })
            this.ListParameter.Pageindex = this.Pagecontdex

            this.SearchCriteria = locationSelect
            this.ListParameter.listSearchCriteria = JSON.stringify(this.SearchCriteria)//集合对象
            this.HotelListInfoSearchNew(this.ListParameter)
            //关闭窗口
           // this.istransition7=false;
            document.querySelectorAll(".tab-card")[2].style.display = "none";
            this.NoHotellocation()
        },
        //综合删选 左边 
        pilintogg9(index){
            var posonbox = document.querySelectorAll(".Hotelbrand")
            if(index == "0"){
                posonbox[0].style.display ="block"; 
                posonbox[1].style.display ="none"; 
                this.tioscbareen = this.Hotelposition9[0].listSearch[0].listSearchCriteria;
            }else{
                posonbox[1].style.display ="block"; 
                posonbox[0].style.display ="none"; 
                this.tioscbareen = this.Hotelposition9[1].listSearch[0].listSearchCriteria;
            }
            this.telplitogg9 = index;
        },
        //综合删选  类型一
         HOTbrand(index){
           this.Branactive = index;
           this.tioscbareen = this.Hotelposition9[0].listSearch[index].listSearchCriteria;
        },
        HOTbareen(index,item){
            this.tioscbareen = [... this.tioscbareen]     
            let Resetarray =  this.tioscbareen
            this.Unrestricted(Resetarray,index)   
        },
        Facilities (index,item){
            this.tioscbareen = [... this.tioscbareen]  
            let Resetarray =  this.tioscbareen
            this.Unrestricted(Resetarray,index) 
        },
        Nocomprehensive(){
            let compre = this.Hotelposition9 = this.Hotelcity.Result.comprehensiveScreening   
            this.Hotellocation(compre,false)   //综合筛选
            this.telplitogg9 = 0;
            this.Branactive = 0;
            var posonbox = document.querySelectorAll(".Hotelbrand")
            posonbox[0].style.display ="block"; 
            posonbox[1].style.display ="none"; 
        },
        Yescomprehensive(){
            let locationSelect = [] //综合筛选获取到的值
            this.Hotelposition9.map(item =>{     
                item.listSearch.map(item =>{
                        item.listSearchCriteria.map(type =>{
                           if(type.isActive == true && type.Name != '不限'){
                                locationSelect.push(type)
                            }
                        }) 
                })                   
            })
            this.hotelData = []
            this.Pagecontdex = 1 
            this.$nextTick(() => {
               this.$refs.scrollerBottom.reset({top: 0})
            })
            this.ListParameter.Pageindex = this.Pagecontdex

            this.SearchCriteria = locationSelect
            this.ListParameter.listSearchCriteria = JSON.stringify(this.SearchCriteria)//集合对象
            this.HotelListInfoSearchNew(this.ListParameter)
            //关闭窗口
            this.istransition8=false;
            document.querySelectorAll(".tab-card")[3].style.display = "none";
            this.Nocomprehensive()
        },
        //跳转酒店详情
        toHotelDetail(item){
            item.CheckInTime = this.CheckInDate,            //因为酒店数据里面不带入住、离店时间
            item.CheckOutTime = this.CheckOutDate,   
            console.log(this.CheckOutDate, 3333333333333333333333333)         
            this.$storage.setSession('hotelData', item);    //存入点击的酒店数据

            item.cityId = this.areaMess.cityId
            item.isBusiness = this.$route.query.isBusiness
            this.$router.push({
                path:'/hoteldetail',
                query: item
            });
        },
        showDate(type) {
            this.currState = type
            this.showDatePicker = true
        },
        closeDatePicker(item) {
            if(this.isOneWay) {
                this.showDatePicker = false
                this.departDate = item.DepartDate
                this.currDate[0] = item.DepartDate
            } else {
                if(this.currState == 'start') {
                    this.departDate = item.DepartDate
                    this.currDate[0] = item.DepartDate
                    this.currState = 'end'
                    this.currDate = [...this.currDate]
                } else {
                    if(new Date(this.currDate[0]).getTime() > new Date(item.DepartDate).getTime()) {
                        this.currState = 'start'
                        this.departDate = item.DepartDate
                        this.currDate[0] = this.DepartDate
                        this.currDate = [...this.currDate]
                        return
                    } else {
                        this.arriveDate = item.DepartDate
                        this.currDate[1] = this.ArriveDate
                        this.currDate = [...this.currDate]
                        this.showDatePicker = false
                    }
                    
                }
            }
        },
        close() {
            this.shoDatePicker = false
        }
    }
}
     
</script>

<style  lang="less">

   
.Hotellist{
    background-color: #F5F5F5;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y:auto;
    ::-webkit-scrollbar {display:none}
    // 
    button{
        outline:none;
    }
    .dixbutton{
              width: 100%;
              height: .35rem;
              margin-top: 0.05rem;
              border-top:0.01rem solid #e4e4e4; 
              padding: 0;
              button{
                  background-color: #ffffff;
                  width: 49.2%;
                  height: 100%;
                  border: 0;
                  font-size: 0.15rem;
                  line-height: 0.35rem;
                  margin: 0;
                  padding: 0;
              }
              .dixbutDetermine{
                  background-color: #2775E1;
                  color: #ffffff;
              }
        }
     .ivu-slider-button {
        width: 25px;
        height: 25px;
        border: 2px solid #4395FF;
        border-radius: 50%;
        background-color: #fff;
        margin-top: -6px;
     }
    .ivu-slider-bar {
        background: #4395FF; 
    }
    .ivu-slider-wrap {
      width: 90%;
      margin-left: 4%;
    }
    
    a{
        text-decoration:none; 
    }
    .range{
        margin-top:0.05rem;
        width: 95%;
        margin-left:2.5%;
        .rangu{
            text-align: left;
        }
        p{
            font-size: 0.13rem;
            color: #000000;
        }
        .showPrice{
            float: right;
        }
        .cicransa{
            color: #DFDFDF;
            font-size: 0.12rem;
            span{
                padding-left: 0.03rem;
            }
            .cicranrig{
                float: right;
            }
        }
    }
    //
   
    // 
    #HotelTopPut{
        position: fixed;
        z-index:3;
        height:.3rem;
        top: .06rem;
        width: 70%;
        left: 15%;
        background-color: #fff;
        border:0.01rem solid #e4e4e4;
        border-radius:.05rem .05rem .05rem .05rem; 
        .HotlTopleft{
            float: left;
            width: 35%;
            height: 100%;
            border-right: .01rem dashed #e4e4e4;        
        }
        .HotlTopleft p{      
            padding-left:.2rem;
            font-size:.09rem;
            line-height: .13rem;
                    
        }   
        .HotlTopleft span{
            color: #2577E3;
            
        }
        .HotlTopleft img{
            position:relative;
            top: -.22rem;
            left: .01rem;
            width:.15rem;
        }
        .HotlTopright{
            float:left;
            width:64%;
            height:100%;
        }
        .HotlTopright input{
            width: 80%;
            height: 100%; 
            border: 0; 
            background-color: #ffffff;
            margin-left: .04rem;   
        }
        .HotlTopright input::-webkit-input-placeholder{ /*WebKit browsers*/
            font-size: .1rem
        }
        .HotlTopright img {
            position: relative;
            width: .15rem;
            top: 0.03rem;
            left:0.03rem;
        }
    }
    .active{
        color:#2577E3;
    }
    .tab-card{
        position: fixed;
        z-index: 3;
        top: .8rem;
        bottom: 0;
        width: 100%;
        display: none;
        background-color: rgba(127,127,127,0.3);
        overflow:hidden;
        .listulbox{
            max-height: 2.7rem;
            min-height: 1.6rem;
            width: 100%;
            background-color:#fff;  
            position: relative;
            top:-1.8rem; 
        }
        .listulboxtran{
            top:0rem;
            transition:0.5s;
            -moz-transition: 0.5s; /* Firefox 4 */
            -webkit-transition: 0.5s; /* Safari 和 Chrome */
            -o-transition:0.5s; /* Opera */
        }  
    }
    #Hoteul{
        background-color: #ffffff;
        position: fixed;
        z-index: 4;
        width: 100%;
        height: .4rem;
        top: .4rem;
        border-bottom: 0.01rem solid #e4e4e4;
        .Hoteli{
            float: left;
            width: 25%;
            list-style: none;
            text-align:center;
            line-height: .4rem;
            font-size: .14rem;
        } 
    }
    .cardUl{
        width: 100%;
        height:100%;  
        li{
            height: 24.5%;
            width: 100%;
            line-height: .4rem;
            padding-left: .2rem;
            border-bottom:0.01rem #e4e4e4 solid;
        }
    }
    .Starp{
        font-size: .15rem;
        padding-left: .1rem;
    }
    .Starul{
        width: 100%;
        height:0.7rem;
        margin-bottom: 0.05rem;
        li{
            float: left;
            list-style: none; 
            text-align: center; 
            width:.62rem;
            height:.25rem;
            line-height:.25rem;
            margin-left: .1rem;
            margin-top:0.05rem;
            background-color: #eeeeee; 
            border: 1px solid #eeeeee;
        }
        .Starkey1{
            color:#2577E3;
            border: 1px solid #2577E3;
        }
    }
   .Hotelposition{
        width: 30%;
        height: 2.0rem;
        overflow: auto;
        background-color:#eeeeee;
        li{
            width: 100%;
            height: .3rem;
            text-align:center;
            line-height: .3rem;
            list-style: none;
            color: #888888;
        }
        .Hotelpli{
            background-color: #ffffff;
            color: #2577E3;
        } 
    }
    .tepionspan{
        padding-left: .1rem;
        width:70%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }   
    .bottbox1{
        width: 100%;
        height:0.35rem;
        margin-top:0.02rem;
        font-size: 0.15rem;
        line-height:0.35rem;
        border:0.01rem solid #e4e4e4; 
        .bottletf{
            float: left;
            width: 50%;
            height: 100%;
            color: #2577E3;
            text-align:center;
        }
        .bottright{
            float: left;
            width: 50%;
            height: 100%;
            color: #ffffff;  
            text-align:center;
            background-color: #2577E3;
        }
    }
    .positionbox{
        position: absolute;
        top: 0;
        right: 0;
        width: 70%;
        height: 2.0rem;
        overflow: auto;
        li{
            width: 100%;
            height: .3rem;
            line-height: .3rem;
            list-style: none;
            border-bottom:0.01rem solid #e4e4e4; 
            position: relative;
        }
        .Subwayline{
          width:20%;
          height:auto;
          position: fixed;
          text-align: center;
            li{
                border: 0;
            }
        }
        .Subwaystation{
            width: 69%;
            float: right;
            li{
                padding-left: 0.01rem;
            }
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    .check {
        display: inline-block;
        width: .2rem;
        height: .2rem; 
        position: absolute;
        top: 0;  
        margin: auto;
        border-radius: .02rem;
        right: .12rem;
    }
    .checked {
        text-align: center;
    }
    .checked:after{
        content: '';
        display: inline-block;
        border: .02rem solid #2475DD;
        border-top-width: 0;
        border-right-width: 0; 
        width: .12rem;
        height: .06rem;
        transform: rotate(-50deg);
    }
    /////////////////////////////////////////////////////////////////////////////
   .checkm{
        display: inline-block;
        width: .15rem;
        height: .15rem; 
        position: absolute;
        top: .1rem;  
        margin: auto;
        background-color: #999999;
        border-radius: .02rem;
        right: .12rem;
    }
    .checkedm {
        text-align: center;
        background-color: #2475DD;
        
    }
    .checkedm:after{
        content: '';
        display: inline-block;
        border: .02rem solid #ffffff;
        border-top-width: 0;
        border-right-width: 0; 
        width: .08rem;
        height: .05rem;
        transform: rotate(-50deg);
        margin-bottom: .1rem; 
    }
    /////////////////////////////////////////////////////////////////////////////
    .ki{
         width: 100%;
         height: .40rem;
    }
    // 主题内容
    #HotelContBoxL{
        width: 100%;
        height: 3.9rem;
        margin-top: .8rem;
        
    }   
    .IntroductionList{
        width: 100%;
        height: 1.1rem;   
        background-color: #ffffff;
        border-bottom:#F0F0F0 solid .01rem; 
    }
    .InListleft{
        text-align:center;
        width: 32%;
        height: 100%;
        float: left;
    }
    .InListleft img{
        margin: .2rem 0rem .15rem 0rem;
        width: .8rem;
        height: 65%;
    }
    .InListright{
         width: 67%;
         height:100%;
         float: left;
         position: relative;
    }
    .InListright p{
        width: 100%;
        line-height: .19rem;
        padding-left: .05rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .rightfontWolde{
        font-size: .16rem;
        margin-top: .1rem;
        color: #585858;
    }
    .rightfontWolde1{
        color:#C0C0C0;
    }
    .rightfontWolde2{
        color:#70A5EC;
    }
    .rightfontWolde3{
        color:#FF7800;
        font-size: .13rem;
    }
    .rightfontWolde1 span{
        color: #FF7800;
        font-size: .13rem;
    }
    .rightfonbut1{
        background-color: #ffffff;
        border: .01rem solid red;
        color: red;
        width: .3rem; 
        height: .15rem;
        line-height: .15rem;
        font-size: .1rem; 
    }
    .rightfonbut2{
        background-color: #ffffff;
        border: .01rem solid #FF811B;
        color: #FF811B;
        height: .15rem;
    line-height: .15rem;
        width: .5rem;  
    }
    .rightfontdiv{
        position:absolute;
        bottom: .15rem;
        right: .1rem;
        width: 1.0rem;
        height: auto;
        text-align: center;
    }
    .rightfontWolde1  .rightfontspan{
       color: #FF7800;
       font-size: .18rem;
    }

    
   
      
    

}
 </style>
