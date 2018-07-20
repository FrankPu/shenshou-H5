<template>
<div>
    <div class="payment text-center">
        <img src="~@/assets/images/pay/err2.png" class="payIcon"/>
        <p class="paymentRe fontSize-8">支付失败</p>
        <div class="paymentBtn">
            <button class="payIconLeft blueBor blueStateFont btn">其他方式支付</button>
            <button class="payIconRight btn">查看订单</button>
        </div>
    </div>
    <div class="paymentMoney bgGray flexBtwn fontSize-6">
        <div class="flexBtwn" style="width: 100%;">
            <p>个人账户支付：<span class="redStateFont"><span class="fontSize-4">￥</span>80</span></p>
            <p >支付宝</p>
        </div>
    </div>
</div>
</template>
<script>
    

</script>
<style scoped>
@import '../../../assets/css/test.css';

.payIcon{
    width: .616rem;
    height: .616rem;
    margin:0 auto;
}

.payment{
    padding: .744rem 0;
}
.payment .paymentRe{
    line-height: .344rem;
}

.paymentBtn {
    margin-top: .24rem;
}

.paymentMoney{
    padding: 0 .304rem;
    height: .784rem;
    flex-wrap: wrap;
}
</style>
