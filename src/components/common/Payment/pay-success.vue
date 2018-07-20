<template>
<div>
    <div class="payment text-center">
        <img src="~@/assets/images/pay/ok2.png" class="payIcon"/>
        <p class="paymentRe fontSize-8">支付成功</p>
        <div class="paymentBtn">
            <button class="payIconLeft blueBor blueStateFont btn" @click="showOrder()">查看订单</button>
            <button class="payIconRight btn" @click="backHome()">返回首页</button>
        </div>
    </div>
    <div class="paymentMoney bgGray fontSize-6">
        <div class="">
            <p>公司账户支付：<span class="redStateFont"><span class="fontSize-4">￥</span>800</span></p>
        </div>
        <div class="disFlex">
            <p class="payBy flex3">个人账户支付：<span class="redStateFont"><span class="fontSize-4">￥</span>80</span></p>
            <p class="payBy flex1 text-right">支付宝</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        showOrder(){
            this.$router.replace('/MyOrder')
        },
        backHome(){
            this.$router.replace('/')
        }
    }
}

</script>
<style scoped>
@import '../../../assets/css/test.css';

.payIcon{
    width: .616rem;
    height: .616rem;
    margin: 0 auto;
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

.paymentMoney div {
    padding: .1rem 0;
}
</style>
