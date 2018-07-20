<template>
      <div class="Changeinformation">
                <x-header :showBack="true" :title="'改签信息确认'" @go-back="goBack"></x-header>
               
            <!-- 主题内容 -->
                <div class="Airation">
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
                        <div class="ationTicket">
                                <div class="AirationSign">
                                        <div class="flight">
                                                <button id="fligbut">原航班</button>
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
                                                        <p></p>               
                                                        <img src="../../assets/images/mine/posint1.png" alt="">                                   
                                                        <p>.</p>
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
                                       
                        <div class="Airchange">
                                <span>查看退改签政策</span>
                                <img src="../../assets/images/icon/arrowy@2x.png" alt="" class="changeimg">
                        </div>
                        <div class="Changeifora Changeboder">
                            <p class="Changeiforatop">周三舱</p>
                            <p class="Changeiforap">身份证:21032251584185621</p>
                        </div>
                        <div class="Changeifora1 Changeboder1">
                              <p>费用归属 <span>市场部</span></p>                 
                        </div>
                        <div class="Changeifora1 Changeboder1">
                              <p>改签原因 <span>修改王明明证件号为：2235633</span></p>                 
                        </div> 
                       <div class="Changeifora1 Changeboder">
                              <p class="Changeiforap1">政策违规</p>                 
                        </div>
                        <div class="Changeifora1 Changeboder1">
                              <p>周三舱 <button class="changebutt" disabled="disabled">违</button></p>                 
                        </div>
                        <div class="Changeifora Changeboder">
                            <p class="Changeiforatop">低价航班</p>
                            <p class="Changeiforablue">只能预定当前低价航班</p>
                        </div>
                        <div class="Changeifora Changeboder">
                            <p class="Changeiforatop">提前天数</p>
                            <p class="Changeiforablue">只能预定3天之后的航班</p>
                        </div>
                        <div class="Changeifora Changeboder1">
                            <p class="Changeiforatop">抵扣限制</p>
                            <p class="Changeiforablue">只能预定自己差率政策相关折扣的机票产品</p>
                        </div>
                         <div class="Changeifora1 Changeboder">
                              <p>审批部门 <span class="changeright">技术部</span></p>                 
                        </div>
                        <div class="Changeifora1 Changeboder1">
                              <p>审批人 <span class="changeright">刘庆</span></p>                 
                        </div>
                        <div class="Changeifora Changeboder1">
                            <p class="Changeiforatop">出行目的 <input type="text" placeholder="请输入出行目的"></p>
                        </div>
                        <div class="Changeifora1 Changeboder">
                              <p class="Changeiforatop3">联系人 <span >刘庆</span></p>                 
                        </div>
                        <div class="Changeifora1 Changeboder">
                              <p class="Changeiforatop3">手机号码 <span>151445154215</span></p>                 
                        </div>
                </div>
                
      </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import XHeader from '../common/header'
export default {
  name: 'Changeinformation',
  data: function() {
      return {
         money:"350.00"
      } 
  },
   methods: {
      goBack(){
         this.$router.go(-1);
      }
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  }
 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
      body{
          background-color: #F5F5F5;
          font-size: 62.5%;
      }  
        /* 主题内容 */
          /* 航班信息 */
        .Airation{
         
            width: 100%;
            height: auto;
            min-height: 12rem;
            background-color: #ffffff;   
            margin-top:4.3rem;     
             .ationTitle{
                width: 100%;
                height: 4rem;
                border-bottom: 0.1rem solid #F5F5F5;
                text-align: left;
                position:relative;            
        }
        .AirationSign{
               text-align:center;
        }
        .ationTitle img{
                 padding-left:1.5rem;
                 padding-top:1rem;
                 height: 2rem;
                 width: 0.2rem;
        }
        .ationTitle span{
                position: absolute;
                left: 2rem;
                top:0.9rem;
                font-family: "微软雅黑";
                font-size: 1.8rem;     
        } 
        .ationTicket{
                width: 96%;
                height: 15rem;
                margin-left: 2%;
                background-color: #ffffff;
                border-radius:1rem 1rem 1rem 1rem; 
                margin-top: 1rem;
                margin-bottom: 1rem;
        }
        .flight{
                width: 100%;
                height: 3rem;
                text-align: left;
                line-height: 3rem;
                
        }
        .flight button{
                background-color: #FF9E00;
                width: 4rem;
                height:1.5rem;
                line-height:1.7rem;
                border: 0;
                color:#fff;
                border-radius:0.3rem 0.3rem 0.3rem 0.3rem;
                margin-left: 1rem;
        }
        #fligbut{
                 background-color: #2578E5;     
        }
        .flight img{
                position:relative;
                top: 0.4rem;
                margin-left: 0.7rem;
                height:1.5rem;
        }
        .flight span{
                 font-size: 1.4rem;
                color: #282D33;
        }
        .Actual{
                width: 100%;
                height: 1.5rem;   
                text-align: left;
                line-height: 1.5rem;
                margin-top: -0.5rem;
        }
        .Actual img{
                 margin-left: 6.4rem;
                
        }
        .Actual span{
                font-size: 1.4em;
                color: #357ADF;
                padding-left:0.5rem;
        }
        .Timetable{
                width: 90%;
                margin-left: 5%;
                height: 6rem;
                margin-top: 1rem;
                border-bottom: 1px solid #e4e4e4;
        }
        .Timestart{
                width:31%;
                height:100%;      
                float: left;  
                line-height:2.6rem;
        }
        .Timestart .startime{
                font-size:2rem;
                color: #333435
        }
        .Timestart .startress{
                font-size: 1.4rem;
                color: #ABACAD;
              
        }
        .Timechannel{
                width:28%;
                height:100%;
                float: left;
                line-height:1.8rem; 
                margin-left:5%;
                position:relative;
        }
        .Timechannel p{
                font-size: 1.4rem;
                color: #333435
        }
        .Timechannel img{
                position:absolute;
                top:1.3rem;
                width: 95%;
                left: 0;
                height:0.6rem;      
        }
        .TimeEnd{
                margin-left:5%;
        }
        .Airservice{
                width: 100%;
                height: 3rem;
        }
        .service{
                float: left;              
                text-align: left;
                position:relative;
                line-height: 3rem;
                margin-left:4%;
        }
        .service img{
                width:1.5rem;
                position:absolute;
                top: 0.8rem;

        }
        .service span{
                font-size: 1.4rem;
                padding-left:2rem;
                color: #636468;
        }
        .operbuttonsign{
                border-top:1px solid #e4e4e4;
                margin-top: 1rem; 
        }
        .Airchange{
                width: 100%;
                height: 3.5rem;
                border-bottom:0.5rem solid #F5F5F5;
                text-align: left;
                background-color:#FEF5E4;
                position:relative;            
        }
        .Airchange span{
                color: #FF9E00;
                padding-left: 2rem;
                font-family: "微软雅黑";
                font-size: 1.4rem;
                line-height: 3rem;
                
        }
        .Airchange .changeimg{
                position: absolute;
                right: 2rem;
                width: 1.4rem;
                top: 1rem;
                 
        }
        .Changeboder{
            border-bottom:.1rem solid #e4e4e4 ;
        }
        .Changeboder1{
           border-bottom:.3rem solid #e4e4e4; 
        }
        .Changeiforatop{
           margin-top:.9rem;
        }
        .Changeifora{
           width:100%;
           height: 4.5rem;
           padding-left:2rem;
           line-height: 2rem;
           p{
              font-size: 1.2rem;
           }
           .Changeiforap{
               font-size: 1rem;
               color: #777777;
           }
           
           .Changeiforablue{
               color: #2578E5;
               font-size: 1.4rem;
           }
           input{
             height: 2rem;
             margin-left: 1rem;
             font-size: 1.2rem;
             background-color: #ffffff;
             color:#555555;
             border: 0;
           }
        }
        .Changeifora1{
            width: 100%;
            height: 3.5rem;
            line-height: 3.5rem;
            font-size: 1.4rem;
            padding-left: 2rem;
            span{
                margin-left: 1rem;
            }
            .Changeiforap1{
               font-size: 1.5rem;
           }
           .changebutt{
               width: 1.5rem;
               height: 1.5rem;
               color: #ffffff;
               background: red;
               border: 0;
               line-height: 0;
           }
           .changeright{
               float: right;
               margin-right: 2rem;
           }
           .Changeiforatop3{
              color: #777777;
           }
        }

     }
       
</style>
