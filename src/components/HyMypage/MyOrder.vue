<template>
  <div class="myOrder">
       <!-- <div class="Ordertop">我的订单</div> -->
      <x-header :showBack="true" :title="'我的订单'" @go-back="goBack"></x-header>
      <ul class="Orderul">
            <li @click="toggle(tab.type, index)" v-for="(tab,index) in tabs" :key="index" :class="{active:active===index}">
                  {{tab.name}}
            </li>
      </ul>
      <div id="center" class="centerContent" style="top:.95rem;bottom:0;">
      <!--立即支付-->
            <div class="Orcen_box" v-for="item in data" :key="item.OrderNumber">
                <hr class="hr"/>
                <div class="Orcent1">
                        <span class="Orspan1">订单号：{{item.OrderNumber}}</span>
                        <span class="Orspan2">日期：{{item.BookingTime}}</span>
                </div>
                <div class="Orboxbeer">
                        <img src="../../assets/images/mine/feiji.png" alt="" class="Orinnmg">
                        <span>机票</span>
                        <span class="Orspan3">￥{{item.PayPrice}}</span>
                </div>
                <div class="Orboxbeer2" @click="toOrderDetail(item)">
                    <img src="../../assets/images/mine/qu.png" alt="" class="Orinnmg">
                    <p class="Orboxp1">{{item.OrderList[0].ProductName}}<span class="Orspan4">{{item.AuditStatusStr}}</span></p>
                    <p>{{item.OrderList[0].OrderDate}}<br/>{{item.OrderList[0].ProductDetails}}</p>
                </div>
                <div class="Orboxbeer2" @click="toOrderDetail(item)" v-if="item.OrderList.length > 1">
                    <img src="../../assets/images/mine/fan.png" alt="" class="Orinnmg">
                    <p class="Orboxp1">{{item.OrderList[1].ProductName}}<span class="Orspan4">{{item.AuditStatusStr}}</span></p>
                    <p>{{item.OrderList[1].OrderDate}}<br/>{{item.OrderList[1].ProductDetails}}</p>
                    <p class="Orboxp2">乘机人 ：{{item.OrderList[0].Passengers}}</p>
                </div>
                <div v-if="item.UserStatus == 1 && item.AuditStatus != 0" class="mai">
                    <button class="Orzhifu but" @click="goPay(item.OrderNumber)">立即支付</button>
                    <button class="Orquxiao but" @click="cancelOrder(item)">取消订单</button>
                </div>
            </div>
      <!--已经完成-->
            <!-- <div class="Orcen_box">
                          <hr class="hr"/>
                          <div class="Orcent1">
                                <span class="Orspan1">订单号：123456789</span>
                                <span class="Orspan2">预定日期：2017-5-12</span>
                          </div>
                          <div class="Orboxbeer">
                                  <img src="../../assets/images/mine/huoc.png" alt="" class="Orinnmg">
                                  <span>火车</span>
                                  <span class="Orspan3">￥566</span>
                          </div>
                          <div class="Orboxbeer2">
                                  <img src="../../assets/images/mine/fan.png" alt="" class="Orinnmg">
                                  <p class="Orboxp1">成都 — 上海 <span class="Orspan5">已完成</span></p>
                                  <p>2017-11-17 12:55至15:28<br/>ZH1948(T2)出发</p>
                                  <p class="Orboxp2">乘机人 ：张XX</p>
                          </div>
              </div> -->
          <!--已经取消-->
              <!-- <div class="Orcen_box">
                          <hr class="hr"/>
                          <div class="Orcent1">
                                  <span class="Orspan1">订单号：123456789</span>
                                  <span class="Orspan2">预定日期：2017-5-12</span>
                          </div>
                          <div class="Orboxbeer">
                                  <img src="../../assets/images/mine/huoc.png" alt="" class="Orinnmg">
                                  <span>酒店</span>
                                  <span class="Orspan6">￥566</span>
                          </div>
                          <div class="Orboxbeer2">
                                  <img src="../../assets/images/mine/fan.png" alt="" class="Orinnmg">
                                  <p class="Orboxp6">成都 — 上海 <span class="Orspan6">已完成</span></p>
                                  <p>2017-11-17 12:55至15:28<br/>ZH1948(T2)出发</p>
                                  <p class="Orboxp5">入住人 ：张XX</p>
                          </div>
               </div> -->
    </div>
    <!-- 底部按钮 -->
    <ul id="btm">
              <li @click="btmtole(Bindex,btn.we)"  v-for="(btn,Bindex) in btmbox" :key="Bindex" :class="{btmclad:btmclad==Bindex}" >
                        {{btn.typepage}}
              </li>
    </ul>
    <popup v-model="resrtionshow" position="bottom" class="resrtion" style="bottom:.4rem;"> 
        <div class="Orleixdiv">
              <ul class="Orleixdivul">
                          <li @click="cancel()">取消</li>
                          <li class="Orleixdivli" @click="clearProductType()">清空已选</li>
                          <li @click="confirmProductType()">确定</li>
              </ul>
              <button class="Orleixdivbuttn" @click="productType(index,lists.type)" v-for="(lists,index)  in listss" :key="index" :class="{btmclad1:btmclad1==index}">
                          {{lists.name}}
              </button>
       </div>
    </popup>
    <popup v-model="Oractive" position="bottom" class="resrtion" style="bottom:.4rem;"> 
        <div class="Orleixdiv">
                <ul class="Orleixdivul">
                            <li @click="cancel()">取消</li>
                            <li class="Orleixdivli" @click="clearOrderType()">清空已选</li>
                            <li @click="confirmOrderType()">确定</li>
                </ul>
                <button class="Orleixdivbuttn1" @click="orderType(index,lists1.type)" v-for="(lists1,index)  in listss1" :key="index" :class="{btmclad2:btmclad2==index}">
                        {{lists1.name}}
                </button>
        </div>
    </popup>
    <!-- 机票订单详情弹出层 -->
    <flight-order-detail v-if="showFlightOrderDetail" @go-back="offFlighDetail()" :orderNumber="orderNumber"></flight-order-detail>
  </div>
</template>

<script>
import qs from 'qs'
import Tab from 'vux/src/components/tab/tab'
import TabItem from 'vux/src/components/tab/tab-item'
import Sticky from 'vux/src/components/sticky/index'
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import FlightOrderDetail from './flight-order-detail'
export default {
    components: { 
          Tab,
          TabItem,
          Sticky,
          XHeader,
          FlightOrderDetail,
          Popup
    },
    data () {
        return {
            resrtionshow:false,   
            Oractive:false,
            data:[],
            UserId:this.$storage.getSession('userMess').UserId,
            Token:this.$storage.getSession('userMess').Token,
            PageIndex: 1,
            PageSize: 10,
            OrderState:1,   //1全部订单 2待审批 3待支付 4待出行
            ProductType:0,  //0全部订单 1机票订单 2酒店订单
            OrderType:0,    //0全部订单 1因私订单 2因公订单
          active: 0,
          currentView: '',
          tabs: [
                  {
                      name: '全部订单',
                      type: 'allOrder'
                  },
                  {
                      name: '待审批',
                      type: 'pending'
                  },
                  {
                      name: '待支付',
                      type: 'paying'
                  }
          ],
          btmclad:3,
          currentwe:"cha1",
          btmbox:[
                  {
                      typepage:'产品类型',
                      we:"cha1"
                  },
                  {
                      typepage:'订单类型',
                      we:"cha2"
                  }
          ],
        // 产品类型，千万不要改数字
          btmclad1:0,
          currentbottom:'chalis1',
          listss:[
                  {
                      name:'不限',
                      type:0
                  },
                  {
                      name:'酒店',
                      type:2
                  },
                  {
                      name:'机票',
                      type:1
                  },
                  {
                      name:'火车票',
                      type:3
                  },
                  {
                      name:'用车',
                      type:4
                  }
          ],
        // 订单类型，千万不要改数字
          btmclad2:0,
          currentbottom1:'chali1',
          listss1:[
                  {
                    name:'不限',
                    type:0
                  },
                  {
                    name:'因公',
                    type:2
                  },
                  {
                    name:'因私',
                    type:1
                  }
          ],

          showFlightOrderDetail:false,
          orderNumber: ''   //订单号
        }
    },
    methods: {
        offFlighDetail(){
            this.showFlightOrderDetail = false;
        },
        goBack(){
            this.$router.go(-1);
        },
        toOrderDetail(item){
            this.orderNumber = item.OrderList[0].OrderId;
            this.showFlightOrderDetail = true;
        },
        //顶部状态切换
        toggle(type, index){
            this.active = index;
            this.currentView = type;

            this.data = [];
            if(type == 'pending'){
                this.$axios.post('/Order/GetOrder', qs.stringify({
                    UserId: this.UserId,
                    Token: this.Token,
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize,
                    OrderState: 2                  //1全部订单 2待审批 3待支付 4待出行
                })).then(res=>{
                        this.data = res.data.Result
                    }
                ).catch(error=>console.log(error))
            }else if(type == 'paying'){
                this.$axios.post('/Order/GetOrder', qs.stringify({
                    UserId: this.UserId,
                    Token: this.Token,
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize,
                    OrderState: 3                  //1全部订单 2待审批 3待支付 4待出行
                })).then(res=>{
                        this.data = res.data.Result
                    }
                ).catch(error=>console.log(error))
            }else{
                this.$axios.post('/Order/GetOrder', qs.stringify({
                    UserId: this.UserId,
                    Token: this.Token,
                    PageIndex: this.PageIndex,
                    PageSize: this.PageSize,
                    OrderState: 1                  //1全部订单 2待审批 3待支付 4待出行
                })).then(res=>{
                        this.data = res.data.Result
                    }
                ).catch(error=>console.log(error))
            }
        } ,
        // 取消订单
        cancelOrder(item){
            this.$axios.post('/Order/CancelFlightOrder', qs.stringify({
                UserId: this.UserId,
                Token: this.Token,
                OrderNumber: item.OrderNumber
            })).then(res=>console.log(res))
        },
        // 底部产品类型
        productType(index,type){
            this.btmclad1 = index
            this.currentbottom = type

            this.ProductType = type
        },
        // 底部订单类型
        orderType(index,type){
            this.btmclad2 = index
            this.currentbottom1 = type

            this.OrderType = type
        },
        // 取消类型转变
        cancel(){
            this.resrtionshow = false;
            this.Oractive = false;
        },
        // 清空已选择的类型
        clearProductType(){
            this.btmclad1 = 0
            this.currentbottom = 0

            this.ProductType = 0
        },
        clearOrderType(){
            this.btmclad2 = 0
            this.currentbottom1 = 0

            this.OrderType = 0
        },
        // 确认类型转变
        confirmProductType(){
            this.resrtionshow = false;
            this.$axios.post('/Order/GetOrder', qs.stringify({
                UserId:this.UserId,
                Token:this.Token,
                PageIndex:1,
                PageSize:8,
                OrderState:this.OrderState,     //1全部订单 2待审批 3待支付 4待出行
                ProductType:this.ProductType,   //0全部订单 1机票订单 2酒店订单
                OrderType:this.OrderType        //0全部订单 1因私订单 2因公订单
            })).then(res=>{
                    this.data = res.data.Result
                }
            )
        },
        confirmOrderType(){
            this.Oractive = false;
            this.$axios.post('/Order/GetOrder', qs.stringify({
                UserId:this.UserId,
                Token:this.Token,
                PageIndex:1,
                PageSize:8,
                OrderState:this.OrderState,     //1全部订单 2待审批 3待支付 4待出行
                ProductType:this.ProductType,   //0全部订单 1机票订单 2酒店订单
                OrderType:this.OrderType        //0全部订单 1因私订单 2因公订单
            })).then(res=>{
                    this.data = res.data.Result
                }
            )
        },
        goPay(orderNumber){
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
                OrderNumber: orderNumber,			//必须是双引号包裹的字符串
                Token:this.$storage.getSession('userMess').Token,
                PayType:1,								//1支付宝，2微信(需要多加衣个AppId)，3银联，4钱包
                Title:'神兽企业版',
                Source:'TMC H5',
                OperateUserId:'', 		//可为空
                Returnurl:'www.baidu.com',//支付成功后跳转页面
                UserIp: ip   				//手机 IP
            })).then(res=>{
                console.log(res);
                window.location.href = res.data.Result.Url;
                //todo	订单正在支付
            })
    	},
    // 类型选择
        btmtole(x , y){
            this.btmclad = x
            this.currentwe = y
          if (x==0) {
                  this.resrtionshow =! this.resrtionshow ;
                  this.Oractive=false
          }
          if (x==1) {
                  this.Oractive =! this.Oractive;
                  this.resrtionshow=false
          }
        }
    },
    created(){
        // 获取待审批订单
        if(this.$route.params.type == 'pending'){
            this.active = 1;

            this.$axios.post('/Order/GetOrder', qs.stringify({
                UserId:this.UserId,
                Token:this.Token,
                PageIndex:1,
                PageSize:8,
                OrderState: 2,     //1全部订单 2待审批 3待支付 4待出行
                ProductType:this.ProductType,   //0全部订单 1机票订单 2酒店订单
                OrderType:this.OrderType        //0全部订单 1因私订单 2因公订单
            })).then(res=>{
                    console.log(res)
                    this.data = res.data.Result
                }
            )
        }else if(this.$route.params.type == 'paying'){
            //获取待支付订单
            this.active = 2;

            this.$axios.post('/Order/GetOrder', qs.stringify({
                UserId:this.UserId,
                Token:this.Token,
                PageIndex:1,
                PageSize:8,
                OrderState: 3,     //1全部订单 2待审批 3待支付 4待出行
                ProductType:this.ProductType,   //0全部订单 1机票订单 2酒店订单
                OrderType:this.OrderType        //0全部订单 1因私订单 2因公订单
            })).then(res=>{
                    console.log(res)
                    this.data = res.data.Result
                }
            )
        }else{
            //获取全部订单
            this.$axios.post('/Order/GetOrder', qs.stringify({
                UserId:this.UserId,
                Token:this.Token,
                PageIndex:1,
                PageSize:8,
                OrderState: 1,     //1全部订单 2待审批 3待支付 4待出行
                ProductType:this.ProductType,   //0全部订单 1机票订单 2酒店订单
                OrderType:this.OrderType        //0全部订单 1因私订单 2因公订单
            })).then(res=>{
                    console.log(res, '全部订单');
                    this.data = res.data.Result
                }
            )
        }

    },
    components: {
          Tab,
          TabItem,
          Sticky,
          XHeader,
          FlightOrderDetail
    }
}
</script>
<style>
    .Ordertop{
        height: .4rem;
        background-color: blue;
        line-height: .4rem;
        color:#fff;
        text-align: center;
    }
    .Orderul{
        width: 100%;
        height: .4rem;
        color: #9C9C9C;
        background-color: #fafafa;
        position: absolute;
        top: .55rem;
    }
    .Orderul > li{
        list-style: none;
        float: left;
        width: 33%;
        height: .4rem;
        font-size: .15rem;
        font-family: '微软雅黑';
        line-height: .4rem;
        text-align: center;
    }
    .active{
        color:#2577E3;
        border-bottom: 0.02rem solid #2577E3;
        background-color: #ffffff;
    }

    #center{
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0 0 .4rem 0;
       
    }
   .hr{
        height: 0.05rem;
        width: 100%;
        background-color:#F0F0F0;
        border: 0;
    }
    .Orcent1{
        display: flex;
        height: .4rem;
        background-color:#F2F8FF;
        line-height: .4rem;
        font-size: 0.05rem;
        color: #777;
    }
    .Orspan1{
        /* float: left; */
        padding-left: .1rem;
        flex: 1.5;
    }
    .Orspan2{
        /* float: right;       */
        padding-right: .1rem;
        flex:1;
        text-align: right;
    }
    .Orboxbeer{
        height: .35rem;
        line-height: .35rem;
        font-size: .14rem;
        color: #333;
        background-color: #ffffff;
        font-family:'微软雅黑';
        border-bottom: 0.01rem solid  #EFEFEF ;
        position: relative;
        text-align: left;
        padding-left: .3rem;
    }
    .Orinnmg{
        position:absolute;
        width: .13rem;
        left: .13rem;
        top: .11rem;
    }
    .Orspan3{
        position: absolute;
        right: .15rem;
        color: #FF2211;
        font-size: .2rem;
    }
    .Orboxbeer2{
        height:auto;
        line-height: .2rem;
        font-size: .14rem;
        color: #c1c1c1;
        background-color: #ffffff;
        font-family:'微软雅黑';
        border-bottom: 0.01rem solid  #EFEFEF ;
        position: relative;
        text-align: left;
        padding-left: .3rem;
        padding-bottom: .1rem;
    }
    .Orboxp1{
        padding-top: 0.07rem;
        color: #000000;
        font-size: .13rem;
        font-weight: bold;
    }
    .Orboxp6{
        padding-top: 0.07rem;
        color: #c1c1c1;
        font-size: .13rem;
        font-weight: bold;
    }
    .Orboxp2{
        color: #444 ;
    }
    .Orboxp5{
        color: #c1c1c1 ;
    }
    .Orspan4{
        float: right;
        padding-right: .15rem;
        font-size: .14rem;
        color: #FF9143;
    }
    .Orspan5{
        float: right;
        padding-right: .15rem;
        font-size: .14rem;
        color: #3782E5;
    }
    .Orspan6{
        float: right;
        padding-right: .15rem;
        font-size: .14rem;
        color: #c1c1c1;
    }
    
    .mai{
        width: 100%;
        height:.4rem;
    }
    .Orquxiao{
        color: #BABABA;
        background-color:#fff;
        border: 1px solid #BABABA;
    }
    .Orzhifu{
        background-color:#FF7200;
        border: 1px solid #FF7200;
        color: #ffffff;
    }  
    .but{
        float: right;;
        margin-right: .1rem;
        margin-top: 0.05rem;
        width: .7rem;
        height: .27rem;
        margin-bottom: 0.07rem;
    }   
    #btm{ 
        width: 100%;
        height: .4rem;
        position: fixed;
        background-color:#fff;
        border: 0;
        bottom: 0;
        z-index: 9999;
         border-top: 0.01rem solid #2577E3;           
    }
    #btm >li{
        float: left;
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: .4rem;
        list-style: none;
        color:#2577E3;
    }
    #btm > .btmclad{
        color: #ffffff;
        background-color: #2577E3;
    }

    .Orleixdiv{
        width: 100%;
        height:auto;
        background-color:#fff;
        border-top:  0.02rem #e4e4e4 solid;
        margin-bottom:1rem;
        text-align: left; 
    }  
    .Orleixdivul{
        margin: 0;
        padding: 0;
        width: 100%;
        height:.4rem;
        border-bottom: 0.005rem solid #e4e4e4;
    }
    .Orleixdivul > li{
        float: left;
        list-style: none;
        line-height: .4rem;
        text-align:center;
        width: 33.3%;
        border-right: 0.001rem solid #e4e4e4; 
    }
    .Orleixdivbuttn{
        float: left;
        width:20%;
        height:.3rem;
        margin-left:4.3%;
        margin-top: .13rem;
        border-radius: 0.03rem;     
        border-style: none;   
        color: #444;
        background-color:#EFEFF4;
        outline:medium;
    }
    .btmclad1{
        color: #ffffff;
        background-color: #2577E3; 
        border: 0.01rem solid #2577e3;  
    }
    .Orleixdivbuttn1{
        float: left;
        width: 22%;
        height:.3rem;
        margin-left: 8.5%;
        margin-top: .13rem;
        border-radius: 0.03rem;     
        border-style: none;   
        color: #444;
        background-color:#EFEFF4;
        outline:medium;
    }
    .btmclad2{
        color: #ffffff;
        background-color: #2577E3; 
        border: 0.01rem solid #2577e3;   
    }
</style>
