<template>
    <div class="Hotelposition">
        <x-header :showBack="true" :title="hotelDetail.HotelName" @go-back="goBack"></x-header>
        <div class="positionup">
                <router-link to="/hotelimage">
                    <img :src="hotelDetail.FirstImg" alt="">
                    <div>{{hotelDetail.HotelName}}<span>{{hotelDetail.ImageCount}}张</span></div>  
                </router-link>          
        </div>
        <ul class="positioncenter">
                <li class="Entevaluate"><span>{{hotelDetail.CtripUserRate}}分</span>/{{hotelDetail.UserCommentCount}}条评价</li>
                <li class="Entaddress">
                        <img src="../../assets//images/hotel/Location.png" alt="">
                        <p class="Entcenter">{{hotelDetail.AddressLine}}</p>        
                        <span class="Entright" @click="toMap()">地图/街景</span>
                </li>
                <li class="Entservice">
                        <div class="servifolot" v-for="(facility,index) in hotelDetail.hotelAllFacility" :key="index">
                                    <img :src="facility.ImagUrl" alt="">
                                    <p>{{facility.Name}}</p>
                        </div>
                        <span class="Entright" @click="facilityDetail()">详情/设施</span>   
                </li>
                <li class="Enttime">
                        <p>4-28<span>入住 — </span>4-29<span>离店</span>  </p> 
                        <img  class="ds" src="../../assets/images/hotel/date@2x.png" alt="">
                    <span class="Entright">共1晚 <img src="../../assets/images/fightOrder/Ticketfilling-1@1x.png" alt=""></span>
                </li>
                <li class="EntChoice">
                        <button @click="goPay">进入订单</button>
                        <button @click="EntChoice(index,screen.name)" :class="{buttoncheck:screen.ischack}" v-for="(screen,index) in ScreenBut" :key="index">{{screen.name}}</button>
                        <span class="Entright" @click="Entright()">筛选 <img src="../../assets/images/fightOrder/Ticketfilling-1@1x.png" alt=""></span>
                </li>
        </ul>
        <div  v-show="hotelDetailList">
            <div class="hotelDetailList" v-for="(datalist,dataindex) in roomDetail" :key="dataindex">
                <div class="dataky">
                    <img class="headImg" :src="datalist.RoomImageUrl"/>
                    <div class="hotelDetailList-con">
                        <div class="List-con">
                            <p class="blackColor1">{{datalist.RoomTitle}}</p>
                            <p class="mt1">{{datalist.RoomSize}}ｍ²   {{datalist.RoomWindow}}</p>
                        </div>
                        <div class="List-com">
                            <span class="yellowColor">￥</span>
                            <b class="fontSize-7 yellowColor">{{datalist.RoomPrice}}</b>
                            <span>起</span>     
                            <!-- :class="{triteat:datalist.istriteat}" -->
                            <img src="../../assets/images/hotel/hotionup.png" alt="" :class="{triteat:datalist.istriteat}" @click="showPriceList(dataindex)" >
                        </div>
                    </div>
                </div>
                <!-- 房间list v-show="datalist.istriteat" -->
                <div  class="priceList" v-show="datalist.istriteat" v-for="(val, i) in datalist.hotelRoomDetail" :key="i">
                    <div class="fontleft">
                        <p class="blolo">{{val.RoomName}}</p>
                        <p class="graor3">
                            {{val.BreakfastStr}} 
                            {{val.BedType}}
                            </p>
                        <p class="mtgr">{{val.PolicyTypeString}}</p>
                    </div>
                    <div class="fonlowColo">
                        <p>￥<b class="font7">{{val.Price}}</b> <button v-show="true">违</button></p>
                        
                    </div>
                    <div class="bookBt">
                        <button class="blueBtn lessBtn" @click="goPay(val)"><p class="">预订</p><p class="onPay">在线付</p></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="nohoteldatalist" v-show="nohoteldatalist">
                <img src="../../assets/images/kpng.png" alt="">
        </div>
        <!-- 筛选弹出层 -->
        <popup v-model="resrtionshow" position="bottom" class="resrtion"> 
                <div class="resfidxbox">
                        <div v-for="(list,item) in Screeningtype" :key="item">
                            <p class="fixdtype">{{list.type}}</p>
                            <div class="dixdbutt">
                                <button @click="Beddata(index,list.Bedbox)" :class="{buttoncheck:Bed.isbend}" v-for="(Bed,index) in list.Bedbox" :key="index">
                                    {{Bed.name}}
                                </button>      
                            </div>
                        </div>
                        
                        <!-- <p class="fixdtype">早餐</p>
                        <div class="dixdbutt">
                                <button>含早</button>
                                <button>单早</button>
                                <button>双早</button>
                        </div>
                        <p class="fixdtype">支付方式</p>
                        <div class="dixdbutt">
                                <button>在线付</button>
                                <button>到店付</button>
                        </div> -->
                        <p class="fixdtype">价格</p>
                        <div class="range">
                            <p >
                                <span>￥{{rangePrice[0]}}</span>
                                <span class="showPrice">
                                    {{maxPrice===rangePrice[1]?'1000+':'￥'+rangePrice[1]}}
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
                            <button @click="NoScreening" class="dixbutReset" >重置</button>
                            <button @click="YseScreening" class="dixbutDetermine" >确定</button>
                        </div>
                </div>
        </popup>
        <!-- 设施详情弹层 -->
        <facility-detail v-if="showFacility" @back-hotel="backHotel" :hotelDetail="hotelDetail"></facility-detail>
        <!-- 酒店地图 -->
        <Map :showMap="showMap" @off-map="offMap" :latitude="latitude" :longitude="longitude"></Map>
    </div>
</template>
<script>
import qs from 'qs'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import XSwitch from 'vux/src/components/x-switch/index'
import Popup from '../common/popup/index'
// 价格区间滑块
import {Slider} from 'iview'
import 'iview/dist/styles/iview.css'
import XHeader from '../common/header'
import FacilityDetail from './facility-detail'
import facilityDetailVue from './facility-detail.vue'
import loginVue from '../Login/login.vue'
import { Stream } from 'stream'
import Map from './map'

export default {
    components: {
        XSwitch,
        XHeader,
        Popup,
        FacilityDetail,
        Slider,
        Map
    },
    data() {
        return {
            longitude: '104.065837',
            latitude: '30.657349',
            showMap: false,                        //是否显示酒店地图
            hotelDetailList:true,
            nohoteldatalist:false,
            show1: false,
            titleSize:"112",
           // priceList : true,
           // istriteat:0,
            resrtionshow:false,
            rangePrice: [0, 1000],  // 酒店滑块值范围
            maxPrice: 1000,         // 滑块最大值
            hotelDetail: {},
            roomDetail:[],
            showFacility: false,
            ScreenBut:[
                    {name:"免费取消",ischack:false},
                    {name:"大床",ischack:false},
                    {name:"双床",ischack:false},
                    {name:"含早",ischack:false},
                    ],
            Screeningtype:[
                {   type:"床型",
                    Bedbox:[
                        {name:"大床",isbend:false},
                        {name:"双床",isbend:false}, 
                        {name:"三人床/家庭床",isbend:false},
                    ],
                },
                {   type:"早餐",
                    Bedbox:[
                        {name:"含早",isbend:false},
                        {name:"单早",isbend:false}, 
                        {name:"双早",isbend:false},
                    ],
                },
                {
                    type:"支付方式", 
                    Bedbox:[
                    {name:"在线付",isbend:false},
                    {name:"到店",isbend:false},       
                    ]
                },
            ],
            isBusiness: parseInt(this.$route.query.isBusiness)          
        } 
    },
        // 监听酒店价格区间值变化
    watch: {
        rangePrice(newVal, oldVal) {
            console.log(`价格范围在${newVal[0]}-${newVal[1]}之间`);
        }
    },
    methods: {
        offMap(){
            this.showMap = false;
        },
        // 酒店价格区间 
        format(val) {
            return "￥" + val;
        },
        Entright(){
            this.resrtionshow = true
        },
        goBack(){
                this.$router.go(-1);
        },
        showPriceList(dataindex){   
             this.roomDetail = [...this.roomDetail]
             this.roomDetail[dataindex].istriteat = !this.roomDetail[dataindex].istriteat 
        },
        goPay(data){
            this.$storage.setSession('hotelItemDetail', data)
            if(this.isBusiness) this.$router.push({path: '/publicHotelOrder', query: {
                cityId: this.$route.query.cityId
            }})
            else this.$router.push('/privateHotelOrder')
        },
        //设施详情弹层
        facilityDetail(){
            this.showFacility = true;
        },
        //从设施详情返回
        backHotel(){
            this.showFacility = false;
        },
        //酒店地图
        toMap(){
            this.showMap = true;
        },
        EntChoice(index,name){
            this.ScreenBut[index].ischack =! this.ScreenBut[index].ischack
            if(index == 1){
                 this.ScreenBut[2].ischack = false
            }else if(index == 2){
                   this.ScreenBut[1].ischack = false
            }     
        }, 
        pagelenght(index,type){
             
        },
        Beddata(index,list){
            list.map(item => {
                if(list[index].isbend ==true){
                    list[index].isbend =true
                }else{
                    item.isbend = false
                }
            })
            list[index].isbend =! list[index].isbend
        },
        NoScreening(){
             this.Screeningtype.map(item =>{
                   item.Bedbox.map(dex =>{
                       dex.isbend = false
                   })
             })
             this. rangePrice = [0, 1000]
        },
        YseScreening(){

        },
        Period(data){
            let roomlength =data.length
            if(roomlength == 0){
                this.hotelDetailList =false;
                this.nohoteldatalist = true;
                return
            }
            data.map(item => {
                item.istriteat = false
            })
        }
    },
    created(){
        let detailParams = {
            CheckInTime: this.$route.query.CheckInTime,
            CheckOutTime: this.$route.query.CheckOutTime,
            CityCode: this.$route.query.CityCode,
            HotelInfoID: this.$route.query.SourceHotelCode,
            UserId: this.$storage.getSession('userMess').UserId,
            Token: this.$storage.getSession('userMess').Token,
            AgentId: this.$storage.getSession('userMess').AgentId,           
            
            EmpId:this.$storage.getSession('userMess').EmpId,
            EnterpriseID:this.$storage.getSession('userMess').EnterpriseUserId,
            BookPermission:this.$storage.getSession('userMess').BookPermission,

            // Token:"79a4ddc3ff957cb1f90dc5528f7be26d1.3.0K2DPI81PN9020LEOCI4OG494CVI46J744e5a3a6b3237ba10bc803e169c332a6f",
            // UserId:"41711061513540492",
            // CheckInTime:"2018-05-05", 
            // CheckOutTime:"2018-05-06",
            // AgentId:"0",
            // CityCode:"2511",
            // HotelInfoID:"8553038",
        }
        //酒店上半截详情（公私通用）
        this.$axios.post('/HotleInfo/HotleInfoDetialSearch', qs.stringify(detailParams)).then(res=>{
            console.log(res)
            this.hotelDetail = res.data.Result;
            this.longitude = res.data.Result.Longitude;
            this.latitude = res.data.Result.Latitude;
        })
        //酒店下半截房间信息（因公）
            if(this.isBusiness){
                this.$axios.post('/HotleInfo/GetPbulicHotelRoomPrice', qs.stringify(detailParams)).then(res=>{
                    console.log(res, '因公房间信息')   
                    this.roomDetail = res.data.Result;    
                    let roomlength =this.roomDetail.length
                    if(roomlength == 0){
                    this.hotelDetailList =false;
                    this.nohoteldatalist = true;
                    return
                    }
                    this.roomDetail.map(item => {
                        item.istriteat = false
                }) 
                })
            }else{
            //酒店下半截房间信息（因私）
            this.$axios.post('/HotleInfo/GetHotelRoomPrice', qs.stringify(detailParams)).then(res=>{
                console.log(res, '因私房间信息')
                this.roomDetail = res.data.Result;    
                let roomlength =this.roomDetail.length
                if(roomlength == 0){
                    this.hotelDetailList =false;
                    this.nohoteldatalist = true;
                    return
                    }
                    this.roomDetail.map(item => {
                        item.istriteat = false
                })   
            })
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less"> 
    .Hotelposition{
       position: absolute;
       width: 100%;
       top: .4rem;
       bottom: 0;
       overflow-y: auto;
       overflow-x: hidden;
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
       a{
           text-decoration:none; 
       }
        .positionup{
            width:100%;
            height: 1.4rem;
            color: #ffffff;
            font-size: .14rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            div{
                position: absolute;
                bottom: .1rem; 
                left: .1rem;
                width: 100%;
                color: #ffffff;
                span{
                    float: right;
                    padding-right: .2rem;
                }
            }
        }
        .positioncenter{
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            font-size: .14rem;
            background-color: #ffffff;
            li{
                height: .4rem;
                width: 100%;
                line-height: .4rem;
                border-bottom:.01rem solid #e4e4e4; 
                position: relative;  
            } 
          
            .Entevaluate{
                padding-left: .1rem;
                font-size: .12rem;
                span{
                    font-size: .14rem;
                    color: #FD5258;
                }
               
            }
            .Entaddress{
                img{
                    position: absolute;
                    width: .15rem;
                    top: .13rem;
                    left: .1rem;
                }

                .Entcenter{
                    width: 60%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-left: .3rem;
                    color: #5A5A5A;
                }
                .Entright{
                    position:absolute;
                    right: .1rem;
                    top: 0rem;
                    color: #1180F3;
                }
            }
            .Entservice{
                .servifolot{
                    padding: 0 0.03rem 0 0.03rem;
                    margin-top: .06rem;
                    height: .32rem;
                    line-height: .13rem;
                    text-align: center;
                    font-size: .11rem;
                    color: #5A5A5A;
                    float: left;
                    img{
                        width: .13rem;
                        height: .13rem;
                    }
                }
                .Entright{
                    position:absolute;
                    right: .1rem;
                    top: 0rem;
                    color: #1180F3;
                 }
            }
            .Enttime{
                 .ds{
                    position: absolute;
                    width: .15rem;
                    top: .12rem;
                    left: .1rem;
                }
                p{
                    padding-left: .3rem;
                }
                span{
                    font-size: .1rem;
                    color: #5A5A5A;
                }
                .Entright{
                    position:absolute;
                    right: .1rem;
                    top: 0rem;
                    color: #1180F3;
                }
            }
            .EntChoice{
                .Entright{
                    position:absolute;
                    right: .1rem;
                    top: 0rem;
                    color: #1180F3;
                }
                button{
                     border: 0;
                     height: .23rem;
                     line-height: .23rem;
                     background-color: #EEEEEE;
                     border-radius: .04rem;
                     color: #5A5A5A;
                     padding:0 .1rem 0 .1rem;  
                     margin-left: 0.04rem;
                     border: 1px solid #ffffff;
                }
                .buttoncheck{
                    background-color: #ffffff;
                    color: #2775E1;
                    border: 1px solid #2775E1;
                }
            }
        }
        .hotelDetailList {
            width: 100%;
            padding-top: 0.03rem;
            padding-bottom: 0.03rem;
            border-bottom: 1px solid #e4e4e4;
            background-color: #f5f5f5;
            .dataky{
                background-color: #ffffff;
                height: .9rem;
                width: 100%;
                .headImg {
                    width: 25%;
                    height: .7rem;
                    margin:.05rem;
                }
                .hotelDetailList-con{
                    float: right;
                    width: 71%;
                    height: .5rem;
                    margin-top: .2rem;
                    div{
                        float: left;
                    }
                    .List-con{
                        width: 59%;
                        line-height: .25rem;
                        .blackColor1{
                            font-size: .15rem;
                            padding-left: .05rem;
                            line-height: .15rem;
                        }
                        .mt1{
                            color: #A8A8A8;
                            font-size: .12rem;
                              padding-left: .07rem;
                        }
                    }
                    .List-com{
                        width: .75rem;
                        color: #A8A8A8;
                        line-height: .5rem;
                        position: relative;
                        .yellowColor{
                             color: #FE7E80;    
                        }
                        .fontSize-7{
                            font-size: .16rem;
                        }
                        img{
                            position: absolute;
                            right:0;
                            top: .19rem;
                            width: .15rem;;
                        }
                        
                        .triteat{
                            
                            transform:rotate(180deg);
                            -ms-transform:rotate(180deg); 	/* IE 9 */
                            -moz-transform:rotate(180deg); 	/* Firefox */
                            -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                            -o-transform:rotate(180deg); 	/* Opera */   
                        }
                    }
                }
            }
            .priceList{
                height: .7rem;
                width: 100%;
                div{
                    float: left;
                }
                .fontleft{
                    width:40%;
                    padding-left: .1rem;
                    line-height: .15rem;
                    .blolo{
                        width: 100%;
                        padding-top: .05rem;
                        font-size: .14rem;
                        text-overflow:ellipsis; 
                        overflow:hidden; 
                        white-space: nowrap; 
                    }
                    .graor3{
                        color: #A8A8A8;
                        font-size: .14rem;
                    }
                    .mtgr{
                        font-size: .14rem;
                        color: #FD5258;
                    }
                }
                .fonlowColo{
                    
                    font-size: .14rem;
                    text-align: center;
                    color: #FE7E80;
                    width: 30%;
                    .font7{
                        font-size: .17rem;
                        line-height: .6rem;
                    }
                    button{
                     background-color: #FD5258;
                     color: #ffffff;
                     width: .2rem;
                     height: .2rem;
                     line-height: .2rem;
                     border: 0;
                    }
                }
                .bookBt{
                    button{
                        width: .6rem;
                        height: .42rem;
                        border: .01rem solid #2775E1;
                        background-color: #2775E1;
                        color: #ffffff;
                        border-radius: .05rem;
                        overflow: hidden; 
                        margin-top: .12rem;
                        p{
                              height: .2rem;
                              width: 100%;
                        }
                        .onPay{
                            background-color: #ffffff;
                            color: #2775E1;
                          
                            line-height: .22rem;
                        }
                    }
                }
            }
        }     
        .resrtion{              
            .resfidxbox{
                width: 100%;
                height: auto;
                background-color: #ffffff;
                .fixdtype{
                    color: #A8A8A8;
                    font-size: .14rem;
                    padding: .05rem 0 .03rem .11rem;
                }
                .dixdbutt{
                    margin-top: .01rem;
                    font-size: .13rem;
                    button{
                        margin-left: .1rem;
                        height: .26rem;
                        line-height: .26rem;
                        border: .01rem solid;
                        color: #000000;
                        border-radius: .03rem; 
                        background-color: #ffffff;
                        padding:0 .1rem 0 .1rem; 
                    }
                    .buttoncheck{
                        background-color: #ffffff;
                        color: #2775E1;
                        border: 1px solid #2775E1;
                    }  
                }
            }
        }
        .range{
            margin-top: .1rem;
            width: 90%;
            margin-left:5%;
            p{
                font-size: .15rem;
                color: #000000;
            }
            .showPrice{
                float: right;
            }
            .cicransa{
                color: #DFDFDF;
                font-size: .12rem;
                span{
                    padding-left: .03rem;
                }
                .cicranrig{
                   float: right;
                }
            }
        }
        .dixbutton{
              width: 100%;
              height: .35rem;
              margin-top: .05rem;
              border-top:.01rem solid #e4e4e4; 
              padding: 0;
              button{
                  background-color: #ffffff;
                  width: 49.2%;
                  height: 100%;
                  border: 0;
                  font-size: .15rem;
                  line-height: .35rem;
                  margin: 0;
                  padding: 0;
              }
              .dixbutDetermine{
                  background-color: #2775E1;
                  color: #ffffff;
              }
        }
        .nohoteldatalist{
            img{
                width: 100%;
                padding-bottom: 1.5rem;
            }
        }
        
       
    } 



</style>
