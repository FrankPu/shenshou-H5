<template>
      <div class="MyAirtck centerContent">
                <x-header :showBack="true" :title="'机票订单详情'" @go-back="$emit('go-back')"></x-header>
                <header class="Airheader">
                        <div class="headerLeft">
                                <p class="Help1">{{detailData.UserStatusStr}}</p>
                                <p class="Help2">请在12：00前付款，否则订单将失效哦</p>
                        </div>
                       <div class="headerright">
                                <p class="HeRp1"><span>￥</span>{{detailData.PayPrice}}</p>
                                <p class="HeRp2">价格明细</p>
                        </div>
                </header>
                <div class="operbutton">
                        <router-link to="#"><button class="butkey1">改签</button></router-link>
                        <router-link to="#"><button class="butkey2">退票</button></router-link>
                </div>
                <div class="AirState">
                        <div class="AirSufa">
                                <p class="AirSucc">改签已成功 <span>陈明明 <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse"></span></p>
                        </div>
                        <div class="AirSufa">
                                <p class="Airfail">退票已拒绝 <span>；陈晓华；王晓晓；陈明明 <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse"></span></p>
                        </div>
                </div>
            <!-- 主题内容 -->
           
                <div class="Airation">
                         <!-- 航班信息 -->
                        <div class="ationTitle">
                                <img src="../../assets/images/mine/bule.png" alt="">
                                <span>航班信息</span>
                        </div>
                        <div class="ationTicket">
                                <div class="AirationSign">
                                        <div class="flight">
                                                <button>改签单</button>
                                                <img src="../../assets/images/mine/MU.png" alt="">
                                                <span>10月2日 东方航空MU5120 经济舱</span>
                                        </div>
                                        <div class="Actual">
                                                <img src="../../assets/images/icon/blueRow.png" alt="">
                                                <span>实际承运 南方航空CA8899</span>
                                        </div>
                                        <div class="Timetable">
                                                <div class="Timestart">
                                                        <p class="startime">08:00</p>
                                                        <p class="startress">双流机场 T2</p>
                                                </div>
                                                <div class="Timechannel">
                                                        <p>经停</p>               
                                                        <img src="../../assets/images/mine/posint1.png" alt="">                                   
                                                        <p>成都</p>
                                                        <p>3h18m</p>
                                                </div>
                                                <div class="TimeEnd Timestart">
                                                        <p class="startime">08:00</p>
                                                        <p class="startress">双流机场 T2</p>
                                                </div>
                                        </div>
                                        <div class="Airservice">
                                                <div class="service Accuracy">
                                                        <img src="../../assets/images/mine/Accuracy.png" alt="">
                                                        <span>准点率：{{detailData.PunctualityRate}}</span>     
                                                </div>
                                                <div class="service Restaurant">
                                                        <img src="../../assets/images/mine/Restaurant.png" alt="">
                                                        <span>{{detailData.Meals}}</span>
                                                </div>
                                                <div class="service RModel">
                                                        <img src="../../assets/images/mine/RModel.png" alt="">
                                                        <span>{{detailData.Aircraft}}</span>
                                                </div>
                                        </div>
                                </div>                             
                        </div>
                        <div class="operbutton operbuttonsign">
                                <router-link to="#"><button class="butkey1">立即支付</button></router-link>
                                <router-link to="#"><button class="butkey2">取消订单</button></router-link>
                        </div>
                        <div class="Airchange">
                                <span>查看退改签政策</span>
                                <img src="../../assets/images/icon/arrowy@2x.png" alt="" class="changeimg">
                        </div>
                        <div class="ationTicket">
                                <div class="AirationSign">
                                        <div class="flight">
                                                <button id="fligbut">原航班</button>
                                                <img :src="detailData.AirlineImg" alt="">
                                                <span>10月2日 东方航空MU5120 经济舱</span>
                                        </div>
                                        <div class="Actual">
                                                <img src="../../assets/images/icon/blueRow.png" alt="">
                                                <span>实际承运 南方航空CA8899</span>
                                        </div>
                                        <div class="Timetable">
                                                <div class="Timestart">
                                                        <p class="startime">{{detailData.DepartTime}}</p>
                                                        <p class="startress">{{detailData.DepartAirport}}{{detailData.DepartTerminal}}</p>
                                                </div>
                                                <div class="Timechannel">
                                                        <p></p>               
                                                        <img src="../../assets/images/mine/posint1.png" alt="">                                   
                                                        <p>.</p>
                                                        <p>{{detailData.FlightTime}}</p>
                                                </div>
                                                <div class="TimeEnd Timestart">
                                                        <p class="startime">{{detailData.ArriveTime}}</p>
                                                        <p class="startress">{{detailData.ArriveAirport}} {{detailData.ArriveTerminal}}</p>
                                                </div>
                                        </div>
                                        <div class="Airservice">
                                                <div class="service Accuracy">
                                                        <img src="../../assets/images/mine/Accuracy.png" alt="">
                                                        <span>准确率：{{detailData.PunctualityRate}}</span>     
                                                </div>
                                                <div class="service Restaurant">
                                                        <img src="../../assets/images/mine/Restaurant.png" alt="">
                                                        <span>{{detailData.Meals}}</span>
                                                </div>
                                                <div class="service RModel">
                                                        <img src="../../assets/images/mine/RModel.png" alt="">
                                                        <span>{{detailData.Aircraft}}</span>
                                                </div>
                                        </div>
                                </div>                             
                        </div>
                        <div class="AirChoice">
                              <img src="../../assets/images/icon/shield@2x.png" alt="" class="chsure">
                              <span class="chsurespan1">已选：航延险/意外险/ 2人/份</span>
                        </div>
                        <div class="Airensure">
                              <img src="../../assets/images/icon/icon1@2x.png" alt="" class="chsure">
                              <span class="chsurespan1">延误有保证，最高赔付200元</span>
                              <span class="chsurespan">详细说明 <img src="../../assets/images/icon/rightRow@2x.png" alt=""></span>
                        </div>
                        <!-- 旅客信息 -->
                        <div class="ationTitle">
                                <img src="../../assets/images/mine/bule.png" alt="">
                                <span>旅客信息</span>
                        </div>
                        <div class="AirPassenger" v-for="item in detailData.passengerEntity" :key="item.PassengerId">
                              <!-- <div class="passnode passBoder1">
                                   <label class="lable">乘机人</label>
                                   <div class="labrig">
                                           <span>张小明</span>
                                           <span>王小明</span>
                                           <span>李晓明</span>
                                           <span class="labrcolor">证件 | 票号</span>
                                           <span>张小明</span>
                                           <span>王小明</span>
                                           <span>李晓明</span>
                                   </div>
                              </div> -->
                              <div class="passnode passBoder2">
                                   <label class="lable">乘机人</label>
                                   <div class="labrig">
                                           <span>{{item.PassengerName}}</span>   
                                   </div>
                              </div>
                              <div class="passnode passBoder3">
                                   <label class="lable">身份证</label>
                                   <div class="labrig">
                                           <span>{{item.CertificateNumber}}</span>   
                                   </div>
                              </div>
                              <div class="passnode passBoder3">
                                   <label class="lable">票号</label>
                                   <div class="labrig">
                                           <span>D15242525</span> 
                                           <span class="labrcolor">{{item.TicketStatusStr}}</span>  
                                   </div>
                              </div>
                        </div>
                        <div class="AirPassenger passBoder4">
                              <div class="passnode passBoder6">
                                   <label class="lable">联系人</label>
                                   <div class="labrig">
                                           <span>{{detailData.OrderLink}}</span> 
                                   </div>
                              </div>  
                        </div>           
                         <div class="AirPassenger passBoder5">
                              <div class="passnode passBoder6">
                                   <label class="lable">联系电话</label>
                                   <div class="labrig">
                                           <span>{{detailData.Mobile}}</span> 
                                   </div>
                              </div>  
                        </div>
                        <div class="AirPassenger passBoder8" v-if="1 == false">
                              <div class="passnode passBoder6">
                                   <label class="lable">配送地址</label>
                                   <div class="labrig passBoder7">
                                           <span>{{detailData.BiilInfo.Addressee}}  {{detailData.BiilInfo.Phone}}</span> <br>
                                           <span>{{detailData.BiilInfo.Address}}</span>
                                   </div>
                              </div>  
                        </div>
                         <div class="AirPassenger passBoder4">
                              <div class="passnode passBoder6">
                                   <label class="lable">订单编号</label>
                                   <div class="labrig">
                                           <span>{{detailData.OrderNumber}}</span> 
                                           <!-- <span class="labrcolor">复制</span> -->
                                   </div>
                              </div>  
                        </div>
                        <div class="AirPassenger passBoder5">
                              <div class="passnode passBoder6">
                                   <label class="lable">下单时间</label>
                                   <div class="labrig">
                                           <span>{{detailData.BookingTime}}</span> 
                                   </div>
                              </div>  
                        </div>

                </div>
                
      </div>
</template>
<script>
import qs from 'qs'
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import XHeader from '../common/header'

export default {
    data() {
        return {
                detailData: {}
        } 
    },
     methods: {

    },
    created(){
        this.$axios.post('/OrderFlight/GetOrderFlight', qs.stringify({
                UserId: this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                OrderNumber: this.orderNumber
        })).then(res=>{
                console.log(res)
                this.detailData = res.data.Result;
        })
    },
    components: {
      Tabbar,
      TabbarItem,
      XHeader
    },
    props:['orderNumber']
 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
      .MyAirtck{
              position: fixed;
              top: 0;
              bottom: 0;
              width: 100%;
              background: #ffffff;
              z-index: 555;
              
           width: 100%;
           height: auto;
           font-family: '微软雅黑';
           text-align: center;
      } 
        /* 头部  */
       .Airheader{
                height: .4rem;
                width: 100%;
                background-color: #2474DE; 
                margin-top: .4rem;
        }
        .headerLeft{
                float: left;
                width: 70%;
                height: 100%;
                text-align:left;
        }
        .headerLeft  .Help1{
                color: #F7F7FA;
                font-size: .17rem;
                padding-left: .15rem;
        }
        .headerLeft  .Help2{
                color: #EEF5FD;
                font-size: .13rem;
                padding-left: .15rem;
        }
        .headerright{
                float: right;
                width: 30%;
                height: 100%;
                text-align: right;
        }
        .headerright .HeRp1{
                color: #F7F7FA;
                font-size: .17rem;
                padding-right: .15rem;
        }
        .headerright .HeRp2{
                color: #EEF5FD;
                font-size: .13rem;
                padding-right: .15rem;
        }
        .operbutton {
                width: 100%;
                height: .5rem; 
                background-color:#fff;   
        }
        .operbutton button{
                float: right;
                width: .7rem;
                height: .3rem;
                margin-top: .1rem;
                border-radius: .05rem;
                margin-right: .2rem;
                font-size: .15rem;
        }
        .operbutton .butkey1{
                background-color: #2577E3;
                color: #F9F8E8;
                border: 0;
        }
        .operbutton .butkey2{
                background-color: #ffffff;
                color: #2577E3;      
                border: 1px solid #2577e3;
        }
        .AirState{
                width: 100%;
                margin-top: 0.05rem;
        }
        .AirSufa{
                width: 100%;
                height: .4rem;
                background-color:#ffffff;
                border-bottom: 0.01rem #F3F3F3 solid;
                text-align: left;
                line-height: .4rem; 
        }
        .AirSufa p{
                padding-left: .15rem;
                font-size: .13rem;
        } 
        .AirSucc{
                color: #45B820;
        }
        .Airfail{
                 color: #FD2213;
        }
        .AirSucc  span{
                float: right;
                padding-right: .15rem;
                color: #787878;
        }
        .Airfail  span{
                float: right;
                padding-right: .15rem;
                color: #787878;
        }
        /* 主题内容 */
          /* 航班信息 */
        .Airation{
            width: 100%;
            height: auto;
            min-height: 1.2rem;
            background-color: #ffffff;   
            margin-top: 0.05rem;     
             .ationTitle{
                width: 100%;
                height: .4rem;
                border-bottom: 0.01rem solid #F5F5F5;
                text-align: left;
                position:relative;            
        }
        .ationTitle img{
                 padding-left: .15rem;
                 padding-top: .1rem;
                 height: .2rem;
                 width: 0.02rem;
        }
        .ationTitle span{
                position: absolute;
                left: .2rem;
                top: 0.09rem;
                font-family: "微软雅黑";
                font-size: .18rem;     
        } 
        .ationTicket{
                width: 96%;
                height: 1.5rem;
                margin-left: 2%;
                background-color: #E4F0FF;
                border-radius: .1rem; 
                margin-top: .1rem;
                margin-bottom: .1rem;
        }
        .flight{
                width: 100%;
                height: .3rem;
                text-align: left;
                line-height: .3rem;
                
        }
        .flight button{
                background-color: #FF9E00;
                width: .45rem;
                height: .17rem;
                line-height: .17rem;
                border: 0;
                color:#fff;
                border-radius: 0.03rem;
                margin-left: .1rem;
        }
        #fligbut{
                 background-color: #2578E5;     
        }
        .flight img{
                position:relative;
                top: 0.04rem;
                margin-left: 0.07rem;
                height: .15rem;
        }
        .flight span{
                 font-size: .15rem;
                color: #282D33;
        }
        .Actual{
                width: 100%;
                height: .15rem;   
                text-align: left;
                line-height: .15rem;
                margin-top: -0.05rem;
        }
        .Actual img{
                 margin-left: .64rem;
                
        }
        .Actual span{
                font-size: .15rem;
                color: #357ADF;
                padding-left: 0.05rem;
        }
        .Timetable{
                width: 90%;
                margin-left: 5%;
                height: .6rem;
                margin-top: .1rem;
                border-bottom: 1px solid #e4e4e4;
        }
        .Timestart{
                width: 31%;
                height: 100%;      
                float: left;  
                line-height: .3rem;
        }
        .Timestart .startime{
                font-size:2.3rem;
                color: #333435
        }
        .Timestart .startress{
                font-size: .12rem;
                color: #ABACAD;
              
        }
        .Timechannel{
                width: 28%;
                height: 100%;
                float: left;
                line-height: .2rem; 
                margin-left: 5%;
                position:relative;
        }
        .Timechannel p{
                font-size: .15rem;
                color: #333435
        }
        .Timechannel img{
                position:absolute;
                top: .15rem;
                width: 95%;
                left: 0;
                height: 0.06rem;      
        }
        .TimeEnd{
                margin-left:5%;
        }
        .Airservice{
                width: 100%;
                height: .3rem;
        }
        .service{
                float: left;              
                text-align: left;
                position:relative;
                line-height: .3rem;
                margin-left: 4%;
        }
        .service img{
                width: .15rem;
                position:absolute;
                top: 0.08rem;

        }
        .service span{
                font-size: 0.16rem;
                padding-left: .2rem;
                color: #636468;
        }
        .operbuttonsign{
                border-top: 1px solid #e4e4e4;
                margin-top: .1rem; 
        }
        .Airchange{
                width: 100%;
                height: .4rem;
                border-bottom: 0.05rem solid #F5F5F5;
                text-align: left;
                background-color:#FEF5E4;
                position: relative;            
        }
        .Airchange span{
                color: #FF9E00;
                padding-left: .2rem;
                font-family: "微软雅黑";
                font-size: .18rem;
                line-height: .4rem;
                
        }
        .Airchange .changeimg{
                position: absolute;
                right: .2rem;
                width: .14rem;
                top: .12rem;
                 
        }
        .AirChoice{
                width: 100%;
                height: .4rem;
                border-top: 0.05rem solid #F5F5F5;
                text-align: left;         
                position:relative;    
                line-height: .4rem;
        }
        .Airensure{
                width: 100%;
                height: .4rem;
                text-align: left;     
                background-color: #F3F8FE;    
                position:relative;  
                line-height: .4rem; 
                border-bottom: 0.05rem #f5f5f5 solid; 
        }
        .chsure{
                position:absolute;
                width: .15rem;
                left: .13rem;
                top: .13rem;
        }
        .chsurespan1{
                color: #3488EC;
                font-size: .15rem;
                padding-left: .3rem;
        }
        .chsurespan{
                float:right;
                color: #3488EC;
                font-size: .15rem;
                padding-right: .25rem;
        }
        .chsurespan img {
                position: absolute;
                width: .12rem;
                top: .15rem;
                right: .1rem;
        }
        /* 旅客信息 */
        .AirPassenger{
                width: 100%;
                height:auto;              
        }
        .passnode{
                width: 94%;    
                margin-left: 4%;
                text-align: left;
                line-height: .25rem;
                font-size: .15rem;
        }
        .passBoder1{
                border-top: 0.01rem solid #e4e4e4;
                height: .5rem;
        }
        .passBoder2{
                border-top: 0.01rem solid #F3F3F3;
                height: .25rem;
                margin-top: 0.03rem;
        }
        .passBoder3{
                height: .25rem;
        }
        .passBoder4{
                border-top: 0.05rem solid #f5f5f5;
                height: .45rem; 
        }
        .passBoder5{
                border-top: 0.01rem solid #f5f5f5;
               height: .45rem; 
        }
        .passBoder6{
                height: .45rem;
                line-height: .45rem;
        }
         .passBoder7{
                line-height: .25rem;
        }
         .passBoder8{
                border-top: 0.05rem solid #f5f5f5;
                height: .5rem; 
         }
        .lable{
                float: left;
                width: .5rem;
                color: #999999;
        }
        .labrig{
                float: left;
                width: 80%;
        }
        .labrig > span{
                padding-left: 5.4%;
                
        }
        .labrcolor{
                color: #3488EC;
        } 
        }
       
</style>
