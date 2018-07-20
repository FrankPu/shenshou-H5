<template>
  <div class="bgGray">
    <!--订单明细-->
    <div class="payDetail bgWhite blackColor">
        <div class="flexType1 h60 fontSize-6  disFlex">
            <p class="flex1">订单总价</p>
            <p class="flex1 text-right"><span class="mr05 redColor fontSize-4">￥</span><span class="  redColor">1040</span></p>
        </div>
        <div class="flexType1 h60 fontSize-6 disFlex">
            <p class="flex1">员工支付</p>
            <p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="redColor">1040</span></p>
        </div>
        <div class="flexType1 h60 fontSize-6 disFlex"><p class="flex1">公司支付</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="  redColor">1040</span></p></div>
        <div class="flexType1 h60 fontSize-6 disFlex"><p class="flex1">已优惠</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">-￥</span><span class="  redColor">540</span></p></div>
    </div>

    <div class="orderDetail fontSize-13 bgWhite mt05" id="">
        <div class="borderb mlr15 pdtb15">
            <div class="blackColor1 fontSize-6 mb05 disFlex"><span class="mr1 flex1">机票 经济舱</span><span class="fr"><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">1040</span></span></div>
            <div class="grayColor4 disFlex justContent1 mt1 disFlex"><p class="flex1">成人票</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">1040</span>x1人</p></div>
            <div class="grayColor4 disFlex justContent1 mt1 disFlex"><p class="flex1">机建（共2程）</p><p><span class="mr05 redColor fontSize-4">￥</span><span class="mr05 redColor">1040</span>x1人</p></div>
            <div class="grayColor4 disFlex justContent1 mt1 disFlex"><p class="flex1">燃油（共2程）</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">0</span>x1人</p></div>
        </div>
        <div class="borderb mlr15 pdtb15">
            <div class="blackColor1 fontSize-6 mb05 disFlex"><span class="mr1 flex1">保险</span><span class="fr"><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">100</span></span></div>
            <div class="grayColor4 disFlex justContent1 mt1 disFlex"><p class="flex1">新华保险</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">20</span>x1人</p></div>
            <div class="grayColor4 disFlex justContent1 mt1 disFlex"><p class="flex1">太平洋保险</p><p><span class="mr05 redColor fontSize-4 flex1 text-right">￥</span><span class="mr05 redColor">40</span>x2人</p></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
@import '../../assets/css/test.css';

.payDetail, .orderDetail{
    background: #ffffff;
    margin-bottom: 0.05rem;
}

.payDetail div, .borderb div {
    padding : 0.05rem .1rem 0.05rem .1rem;
}

.borderb{
    border-bottom: 1px solid #eeeeee;
    padding: .1rem 0;
}


</style>
