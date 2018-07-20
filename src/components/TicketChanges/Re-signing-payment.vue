<template>
    <div class="Resigningpayment">
        <x-header :showBack="true" :title="'改签支付'"  @go-back="goBack"></x-header>
        <div class="DetailsBox">
            <div class="DetailsBoxlist">
                  <p class="BOXph">2017-11-07 周一 07:25  经济特价舱</p>
                  <p>成都(双流国际机场) - 上海(浦东国际机场)  <span class="BOXphspan">996/人</span></p>
            </div> 
            <div class="DetailsBoxlist1">
                  <p class="BOXph1">乘机人 <span  class="BOXphspan1">周三舱</span></p>
                  <p> <span  class="BOXphspan1">身份证：51113569465456489462152</span></p>
            </div> 
            
            <div class="DetailsBoxlist2">
                  <p class="BOXph1">应付金额： <span  class="BOXphspan1">￥996</span> <span class="BOXphspan2">订单详情 ></span></p>
                  
            </div>         
            <hr class="hr">
            <div class="Respaymet">
                 <div class="paikdtype">
                        <img src="../../assets/images/login/pays.png" alt="">
                        <span>支付宝</span>
                        <label class="check" :class="{checked:isChecked}" @click="checktogg()"></label>
                 </div>
                  <div class="paikdtype">
                        <img src="../../assets/images/login/wechats.png" alt="">
                        <span>微信支付</span>
                        <label class="check" :class="{checked:isChecked1}" @click="checktogg1()"></label>
                 </div>
            </div>
        </div>
        <div id="zhifu">立即支付</div>
    </div>
</template>

<script>

import XHeader from '../common/header'

export default {
    name: "Resigningpayment",
    data: function() {
        return {
           isChecked:false,
           isChecked1:false,
        }
    },
    components: {
        XHeader
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        checktogg(){
            this.isChecked =! this.isChecked
        },
        checktogg1(){
            this.isChecked1 =! this.isChecked1
        }
    }
    }

</script>

<style scoped lang="less">
    .Resigningpayment {
        .hr{
            width: 100%;
            height: .5rem;
            background-color: #e4e4e4;
            border: 0;
        }
        .DetailsBox{
            background-color: #ffffff;
            width: 100%;
            height: auto;
            margin-top: 4rem;
        }
        .DetailsBoxlist{
           width:100%;
           height:6rem;
           line-height:2rem;
           border-bottom:1px solid #e4e4e4;
           p{
               padding-left: 5%;
               font-size: 1.3rem;
               color: #666;
           }
           .BOXph{
               font-size: 1.8rem;  
               padding-top: 1.5rem;       
               color: #000000;
           }
           span{
               font-size: 1.8rem;
               color: #FE5858;
           }
           .BOXphspan{
              float: right;
              padding-right: 5%;
           }
       }
       .DetailsBoxlist1{
           width:90%;
           margin-left: 5%;
           height:6rem; 
           line-height:2rem;
           border-bottom:1px solid #e4e4e4;
           position: relative;
           .BOXph1{
               font-size: 1.5rem;
               padding-top: 1rem;
           }
           .BOXphspan1{
               position: absolute;
               left: 6rem;
               color: #888888;
           }
           .BOXphspan2{
               position: absolute;
               right: 0;
               font-size: 1.4rem;
               color: #FE5858;
           }
       }
       .DetailsBoxlist2{
           width:90%;
           margin-left: 5%;
           height:4rem; 
           line-height:4rem;
         
           position: relative;
           .BOXph1{
               font-size: 1.5rem;
              
           }
           .BOXphspan1{
               position: absolute;
               left: 6rem;
               font-size: 1.6rem;
               color: #FE5858;
           }
           .BOXphspan2{
               position: absolute;
               right: 0;
               font-size: 1.4rem;
               color: #277DD8;
           }
       }
       .Respaymet{
           width: 100%;
           height: auto;
           .paikdtype{
               position: relative;
               width: 100%;
               height: 4rem;
               line-height: 4rem;
               border-bottom:0.1rem solid #e4e4e4; 
           }
           img{
               width: 2rem;
               top: 1rem;
               left: 5%;
               position: absolute;
           }
           span{
                padding-left:12%;
                font-size: 1.6rem;
           }
           .check {
                display: inline-block;
                width: 2rem;
                height: 2rem; 
                position: absolute;
                top:1rem;  
                margin: auto;
                border-radius:1rem;
                right: 1.2rem; 
                background-color: #F0F0F1
            }
            .checked {
                text-align: center;
                background-color: #2475DD;
            }
            .checked:after{
                position: relative;
                left:0.1rem;
                top:-1.1em;
                content: '';
                display: inline-block;
                border: .2rem solid #ffffff;
                border-top-width: 0;
                border-right-width: 0; 
                width: 1rem;
                height: .5rem;
                transform: rotate(-50deg);
            }

       }
       #zhifu{
           position: absolute;
           bottom: 10rem;
           width: 70%;
           margin-left: 15%;
           height: 3.5rem;
           background-color: #2475DD;
           text-align: center;
           line-height: 3.5rem;
           color: #ffffff;
           font-size: 1.6rem;
       }
    }
</style>
