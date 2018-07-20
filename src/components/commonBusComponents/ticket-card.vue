<template>        
    <div class="Airation">
                <!-- 航班信息 -->
        <div class="ationTitle" v-if="isShowHeader">
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
                        <span>准确率：90%</span>     
                    </div>
                    <div class="service Restaurant">
                        <img src="../../assets/images/mine/Restaurant.png" alt="">
                        <span>有餐饮</span>
                    </div>
                    <div class="service RModel">
                        <img src="../../assets/images/mine/RModel.png" alt="">
                        <span>中型机</span>
                    </div>
                </div>
            </div>                             
        </div>
    </div>
</template>
<script>

export default {
    name: 'ticket-card',
    data: function() {
        return {
            money:"350.00"
        } 
    },
    props: {
        isShowHeader: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
        /* 主题内容 */
          /* 航班信息 */
    .Airation{
        width: 100%;
        height: auto;
        min-height: 1.2rem;
        background-color: #ffffff;   
        margin-top: 0.04rem;     
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
            font-size: .14rem;     
        } 
        .ationTicket{
            width: 96%;
            height: 1.5rem;
            margin-left: 2%;
            // background-color: #E4F0FF;
            border-radius: .1rem .1rem .1rem .1rem; 
        }
        .flight{
            width: 100%;
            height: .3rem;
            text-align: left;
            line-height: .3rem;                
        }
        .flight button{
            background-color: #FF9E00;
            width: .4rem;
            height: .15rem;
            line-height: .15rem;
            border: 0;
            color:#fff;
            border-radius: 0.03rem 0.3rem 0.03rem 0.03rem;
            margin-left: .1rem;
        }
        #fligbut{
            background-color: #2578E5;     
        }
        .flight img{
            position:relative;
            top: 0.04rem;
            margin-left: 0.05rem;
            height: .15rem;
        }
        .flight span{
            font-size: .14rem;
            color: #282D33;
        }
        .Actual{
            width: 100%;
            height: .15rem;   
            text-align: left;
            line-height: .14rem;
            margin-top: -0.05rem;
        }
        .Actual img{
            margin-left: .64rem;
                
        }
        .Actual span{
            font-size: .14rem;
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
            line-height: .24rem;
        }
        .Timestart .startime{
            font-size: .2rem;
            color: #333435
        }
        .Timestart .startress{
            font-size: .14rem;
            color: #ABACAD;
                
        }
        .Timechannel{
            width:28%;
            height:100%;
            float: left;
            line-height: .18rem; 
            margin-left: 5%;
            position:relative;
        }
        .Timechannel p{
            font-size:  .14rem;
            color: #333435;
            text-align: center;
            
        }
        .Timechannel img{
            position:absolute;
            top: .13rem;
            width: 95%;
            left: 0;
            height: 0.06rem;      
        }
        .TimeEnd{
            margin-left: 5%;
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
            margin-left:4%;
        }
        .service img{
            width: .15rem;
            position:absolute;
            top: 0.08rem;

        }
        .service span{
            font-size: .14rem;
            padding-left: .2rem;
            color: #636468;
        }
    }
       
</style>
