<template>
    <div class="trainTraindetails">
        <x-header :showBack="true" :title="'车次详情'" @go-back="goBack">
            <span slot="right" class="icon ddicon">
            <router-link to="trainBooktxt">
                预订须知
            </router-link>
            </span>
        </x-header>     
        <!-- 主题内容 -->
        <div class="Airation">
            <div class="ationTicket">
                <div class="AirationSign">
                    <div class="Timetable">
                        <div class="Timestart">
                            <p class="startime">{{train.StartStation}}</p>
                            <p class="startress">{{train.StartTime}}</p>
                        </div>
                        <div class="Timechannel">
                            <router-link to="TrainTimetable">
                                <p>{{train.TrainCode}}</p>               
                                <p class="Timechannelp">......<button>时刻表</button>......</p>                                   
                                <p class="Timechanneltimp">{{train.CostTimeFormat}}</p>
                            </router-link>
                        </div>
                        <div class="TimeEnd Timestart">
                            <p class="startime">{{train.EndStation}}</p>
                            <p class="startress">{{train.EndTime}}</p>
                        </div>
                    </div>                            
                </div>                             
            </div>
        </div>
        <train-header :originDepartureDate="this.seatParams.DepartureDate" @prevDaytypr="prevDaytypr" 
            @nextDaytypr="nextDaytypr" @DatePickertypr="DatePickertypr" :endLocal="endLocal" :startLocal="startLocal"></train-header>
        <ul class="Seatgrade">
            <li v-for="(item,i) in train.SeatInfos" :key="i">
                <div class="Seatdiv">{{item.SeatTypeStr}}</div>
                <div class="numberdiv"><span>{{item.SeatNum==0?'无票':item.SeatNum}}</span><span v-if="item.SeatNum!=0">张</span></div>
                <div class="moneydiv"><p>￥{{item.TicketFee}}</p></div>
                <div class="framediv">
                <button v-if="item.SeatNum != 0" @click="toTrainOrder(item)">预定</button>
                <img src="../../assets/images/shopping.png" alt="">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import qs from 'qs'
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import XHeader from '../common/header'
import TrainHeader from '../common/Dateselection'
import Popup from '../common/popup/index'
export default {
    data() {
        return {
            train:{},
            isBusiness: parseInt(this.$route.query.isBusiness),
            endLocal: this.$route.query.endLocal,
            startLocal: this.$route.query.startLocal,
            seatParams: {
                ArriveStation: this.$route.query.ArriveStation,
                DepartureDate: this.$route.query.DepartureDate,
                FromStation: this.$route.query.FromStation,
                TrainCode: this.$route.query.TrainCode,
                
                AgentId: this.$storage.getSession('userMess').AgentId,
                UserId: this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,

                EmpId: this.$storage.getSession('userMess').EmpId,
                EnterpriseID: this.$storage.getSession('userMess').EnterpriseUserId,
            }
        } 
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        toTrainOrder(item){
            //存入火车具体座位详情
            this.$storage.setSession('trainItemData', item);            
            //跳转因公
            if(this.isBusiness){
                this.$router.push({
                    path: '/trainPublicOrder',
                    query: item
                })
            }else{
                //跳转因私
                this.$router.push(
                    {path: '/trainPrivateOrder',
                    query: item
                });
            }
        },
        getTrainDetail() {
            if(!this.isBusiness){
                this.$axios.post('/Train/SearchTrainSeat', qs.stringify(this.seatParams)).then(res=>{
                    this.train = res.data.Result;
                })
            }else{
                //因公接口
                this.$axios.post('/Train/PublicSearchTrainSeat', qs.stringify(this.seatParams)).then(res=>{
                    this.train = res.data.Result;
                })
            }
        },
        DatePickertypr(date){
            this.seatParams.DepartureDate = date
            this.getTrainDetail()
        },
        nextDaytypr(date){
            this.seatParams.DepartureDate = date
            this.getTrainDetail()
        },
        prevDaytypr(date){
            this.seatParams.DepartureDate = date
            this.getTrainDetail()
        }    
    },
    created(){
        this.getTrainDetail()
        // let seatParams = {
        //     ArriveStation: this.$route.query.ArriveStation,
        //     DepartureDate: this.DepartureDate,
        //     FromStation: this.$route.query.FromStation,
        //     TrainCode: this.$route.query.TrainCode,
            
        //     AgentId: this.$storage.getSession('userMess').AgentId,
        //     UserId: this.$storage.getSession('userMess').UserId,
        //     Token: this.$storage.getSession('userMess').Token,

        //     EmpId: this.$storage.getSession('userMess').EmpId,
        //     EnterpriseID: this.$storage.getSession('userMess').EnterpriseUserId,
        // }
        
        // //因私接口
        // if(!this.isBusiness){
        //     this.$axios.post('/Train/SearchTrainSeat', qs.stringify(seatParams)).then(res=>{
        //         this.train = res.data.Result;
        //     })
        // }else{
        //     //因公接口
        //     this.$axios.post('/Train/PublicSearchTrainSeat', qs.stringify(seatParams)).then(res=>{
        //         this.train = res.data.Result;
        //     })
        // }
    },
    components: {
        Tabbar,
        TabbarItem,
        XHeader,
        TrainHeader,
        Popup
    }
 
}
</script>
<style scoped lang="less">
    .trainTraindetails{
            .trainHeader {
                width: 100%;
                position: relative;
                top: .01rem;
                font-size: .112rem;
                height: .312rem;
                line-height: .312rem;
                background: #ffffff;
                text-align: center;
            }
            a{  
               color: #ffffff;
               text-decoration:none;
            }
           
        .Airation{
            margin-top: .312rem;
            width: 100%;
            height: 1.15rem;
            border-bottom: .03rem solid #f5f5f5;  
               
                .ationTicket{
                    position: relative;
                    border-top: .03rem solid #f5f5f5;  
                    top: .43rem;
                        width: 100%;
                        height: .5rem;           
                        text-align: left;              
                }
                .AirationSign{
                    text-align:center;
                }
                .Timetable{
                          
                        width: 90%;
                        margin-left: 5%;
                        margin-top: .1rem;
                        height: .5rem;
                }
                .Timestart{
                        width:25%;
                        height:100%;      
                        float: left;  
                        line-height: .2rem;
                }
                .Timestart .startime{
                        margin-top: .08rem;
                        font-size: .14rem;
                        color: #ABACAD;
                }
                .Timestart .startress{
                        font-size: .14rem;
                        color: #333435;
                    
                }
                .Timechannel{
                        width:40%;
                        height:100%;
                        float: left;                     
                        margin-left:5%;
                        
                }
                .Timechannel p{
                        font-size: .12rem;
                        color: #555555; 
                        line-height: .13rem; 
                }
                .Timechannel  .Timechannelp{
                          color: #e4e4e4;
                        letter-spacing:-0.2px;
                }
                .Timechannel  button{
                        position:relative;
                        top: .03rem;
                        height: .15rem; 
                        line-height: .15rem;
                        width: .4rem; 
                        font-size: .08rem;
                        color: #2577E3; 
                        background-color: #ffffff;
                        border: 0.005rem solid #2577E3 ;
                        border-radius: .03rem; 
                }
                .Timechannel .Timechanneltimp{
                      line-height:2 .1rem;
                      margin-top: .1rem;
                }
                .TimeEnd{
                        margin-left: 5%;
                }
        }
      
        .disFleximg1{
              position: absolute;
              left: .15rem;
              top: .12rem;
        }
        .disFleximg2{
              position: absolute;
              right: 0rem;
              width: .08rem;
              top: .14rem;
        }
        .disFleximg3{
              position: absolute;
              right: .17rem;
              top: .12rem;
        }
        

       .Seatgrade{
            width: 100%;
            height: auto;
            li{
                width: 100%;
                height: .35rem;
                border-bottom: .01rem #f5f5f5 solid;
                line-height: .35rem;
                div{
                    float: left;
                    height: 100%;
                }
                .Seatdiv{
                    width: 25%;
                    text-align: center;
                }
                .numberdiv{
                    width: 20%;
                    text-align: center;;
                    span{
                        color: #2577E3;
                    }
                }
                .moneydiv{
                     width: 20%;
                    text-align: right;
                   p{
                         color: #FF6060;
                         font-size: .16rem;
                         font-weight: 550;
                   }
                }
                .framediv{
                    width: 35%;
                    text-align: center;
                    position: relative;
                    img{
                      position: absolute;
                      top: .09rem;
                      left: .07rem;
                      width: .15rem;
                    }
                    button{
                        line-height: .22rem;
                        width: .45rem;
                        height: .2rem;
                        margin-top: .08rem;
                        margin-left: .32rem;
                        border: 0;
                        background-color: #2577E3;
                        border-radius: .03rem;
                        color: #ffffff;
                    }
                }
            }
            
            
       }
    }
        
        
       
</style>
