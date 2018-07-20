<template>
    <div class="DetailsofCharges">
        <x-header :showBack="true" :title="'费用明细'"  @go-back="goBack"></x-header>
        <div class="DetailsBox">
            <div class="DetailsBoxlist kistrtop">
                    <p>订单总价  <span>￥1025</span></p>
            </div>
            <div class="DetailsBoxlist">
                    <p>员工支付  <span>￥1025</span></p>
            </div>
            <div class="DetailsBoxlist">
                    <p>公司支付  <span>￥1025</span></p>
            </div>
             <hr class="hr"/>
            <div class="DetailsBoxlist">
                    <p>2017-11-07 深圳航空 ZH45914  经济舱</p>
            </div>
            <div class="DetailsBoxlist">
                    <p>成都 - 上海</p>
            </div>
            <div class="DetailsBoxlist kistrtop1">
                    <p>改签费  <span>￥10 × 1</span></p>
            </div>
            <div class="DetailsBoxlist">
                    <p>快递费  <span>￥26 × 1</span></p>
            </div>
        </div>
    </div>
</template>

<script>

import XHeader from '../common/header'


export default {
    name: "DetailsofCharges",
    data: function() {
        return {
           
        }
    },
    components: {
        XHeader
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        
    }
}
</script>

<style scoped lang="less">
    .DetailsofCharges {
        .hr{
            width: 100%;
            height: .5rem;
            background-color: #e4e4e4;
            border: 0;
        }
        .DetailsBox{
            background-color: #ffffff;
            width: 100%;
            height:auto;
            margin-top: 4rem;
        }
        .kistrtop{
            padding-top:1rem;
        }
        .kistrtop1{
            border-top:0.1rem  solid #e4e4e4; 
        }
        .DetailsBoxlist{
           width: 90%;
           margin-left:5%;
           height:3rem;
           line-height: 3rem;
           font-size: 1.5rem;

           p{
             color: #000000;
           }
           span{
               float: right;
             
               color: #FE5858;
                font-size: 1.7rem;
            
           }
       }
    }
</style>
