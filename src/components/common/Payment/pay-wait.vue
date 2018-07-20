<template>
<div class="text-center noData" style="margin-top:30%;">
    <img src="~@/assets/images/pay/imgPay@2x.png" class="payIcon"/>
    <p class="fontSize-7 " style="line-height: 2;">支付正在处理，请稍后~</p>
    <p class="fontSize-6 fontLight" style="line-height: 2;">如果支付遇到问题，建议您返回选择其他方式</p>
    <div  class="paymentBtn">
        <button class="payIconLeft blueBor blueStateFont btn">支付遇到问题</button>
        <button class="payIconRight btn">支付完成</button>
    </div>
</div>
</template>
<script>
    

</script>
<style scoped>
@import '../../../assets/css/test.css';

.payIcon {
    width: .912rem;
    height: 1.048rem;
    margin: 0 auto;
}

.paymentBtn {
    margin-top: .4rem;
}

.noData{
    margin-top: 30%;
}
.noData img{
    width: .8rem;
    height: .8rem;
    margin: 0.08rem auto;
}
.noData p{
    line-height: 2;
}
</style>
