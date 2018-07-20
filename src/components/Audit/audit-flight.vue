<template>
  <div class="bgGray" style="margin-top: 4rem;">
    <!-- header -->
    <div class="topHeader disFlex clearFix">
      <router-link to='/' style="position: relative"><img src="~@/assets/images/icon/back.png" alt="goBack" class="goBack"></router-link>
      <div class="topInfo fontSize-8">
          <span class="goAddress">机票订单审核信息</span>
      </div>
    </div>
     <div>
       <!-- 订单信息 -->
       <div class="orderInfo">
         <div class="orderTitle disFlex  fontSize-7">
           <p class="flex1">我的订单</p>
           <p class="flex1 text-right blueStateFont">待审批</p>
         </div>
         <div class="orderDetail fontSize-4">
           <div class="orderNum disFlex">
             <div class="flex3">订单编号：1321546585228</div><div class="flex1 text-right redStateFont">￥1790</div>
           </div>
           <div class="orderTime disFlex">
             <div class="flex3">下单时间：2018/4/9 8:43:52</div><div class="flex1 text-right darkGrayFont">费用明细</div>
           </div>
           <div class="payment disFlex">
             <div class="flex1">员工支付￥<span class="redStateFont">0</span></div><div class="flex1 text-right">公司需付￥<span class="redStateFont">1790</span></div>
           </div>
         </div>
       </div>

       <!-- 机票信息 -->
       <div class="flightInfo">
         <p class="flightTitle fontSize-7">机票信息</p>
         <FlightInfo></FlightInfo>
       </div>

       <!-- 旅客信息 -->
       <div class="passengerInfo">
         <p class="passengerTitle fontSize-7">旅客信息</p>
         <div class="fare disFlex">
           <p class="name flex1 darkGrayFont">和冬冬</p>
           <p class="department flex1 darkGrayFont">技术部</p>
           <p class="isOut flex2 text-right redStateFont">违规</p>
         </div>
       </div>

       <!-- 违规原因 -->
       <div class="reason">
         <p class="reasonTitle fontSize-7">去程违规原因</p>
         <div>
           <p>低价航班</p>
           <p class="blueStateFont">违规原因：只能预订当前低价行帮</p>
         </div>
         <div>
           <p>提前天数</p>
           <p class="blueStateFont">违规原因：只能预订3天之后的航班</p>
         </div>
         <div>
           <p>折扣限制</p>
           <p class="blueStateFont">违规原因：只能预订自己差旅政策相关折扣的机票产品</p>
         </div>
       </div>

       <!-- 出行目的 -->
       <div class="purpose">
         <p class="purposeTitle">出行目的</p>
         <div><p>出行目的：测试测试测试</p></div>
       </div>
     </div>
    </div>
</template>
<script>
import FlightInfo from '@/components/Flight/flight-info'

export default {
  data(){
    return {
      
    }
  },
  components: {
    FlightInfo
  },
  props :['title']
}
</script>
<style scoped>
@import '../../assets/css/test.css';

.orderInfo, .flightInfo, .passengerInfo, .reason, .purpose{
  background: #ffffff;
  margin-bottom: 0.4rem;
}

.orderTitle, .flightTitle, .passengerTitle, .reasonTitle, .purposeTitle{
  height: 3.5rem;
  line-height: 3.5rem;
  border-bottom: 1px solid #eeeeee;
  padding: 0 1rem;
}

.orderDetail div{
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
}

.fare{
  height: 3rem;
  line-height: 3rem;
  padding: 0.2rem 1rem 0.2rem 1rem;
}

.reason div, .purpose div{
  padding: 0.4rem 1rem 0.4rem 1rem;
}
</style>