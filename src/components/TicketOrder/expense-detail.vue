<template>
    <div class="totalView">
        <div class="total">
            <div class="totalPrice">
                <div class="price">￥<span class="priceNum">{{getTotalPrice}}</span></div>      
                <!-- <span class="price">￥<span class="priceNum">123</span></span> -->
                <!-- <span v-if="type === 'flight'" class="discountText">(已优惠<span class="discountPrice">￥{{getReductionPrice}}</span>)</span> -->
                <div class="totalPriceText">订单总价</div>
            </div>
            <span class="detailed" @click="goToExpenseDetail">
                <span class="detailedText">明细</span>   
                <img src="../../assets/images/Ticketfilling-8@1x.png" />    
            </span>
            <span class="penmentBtn" @click="$emit('go-to-penment')">去付款</span>
        </div>
        <popup v-model="expenseDetailShow" width="100%" :position="'bottom'">
            <div class="expenseDetailTitle">费用明细</div>
            <ul class="expenseDetailList">
                <li v-for="(item, index) in expenseDetailData" :key="index" class="expenseDetailItem">                    
                    <div class="detailType">{{item.text}}</div>
                    <div class="item" v-for="(val, i) in item.details" :key="i">
                        <span>{{val.name}}</span>
                        <span class="price">
                            ￥<span>{{val.price}}</span>
                            <span v-if="type === 'hotel' && item.type === 'hotel'">({{daysNum}}晚)x{{roomNum}}</span>
                            <span v-else-if="item.type !== 'invoice'"> x{{personNum}} 人</span>                           
                        </span>
                    </div>
                </li>
            </ul>
        </popup> 
        <!-- <div class="addPrompt" v-else>
            <popup v-model="expenseDetailShow" :height="'1rem'">                   
                <div class="addPromptBox">
                    <div class="addPromptText">请添加旅客。</div>
                    <div class="addPromptBtn" @click="closePopup">确定</div>
                </div>            
            </popup> 
        </div> -->

    </div>
</template>

<script>


import Popup from '../common/popup/index'

export default {
    name: 'expense-detail',
    components: {
        Popup
    },
    props: {
        expenseDetailData: [Object, Array],
        personNum: Number,
        isOneWay: Boolean,
        type: String,
        roomTotalPrice: Number,
        roomNum: String,
        daysNum: Number
    },
    data: function() {
        return {
            expenseDetailShow: false,
            showConfirm: false
        }
    },
    computed: {
        getReductionPrice() {
            return this.isOneWay && this.type === 'flight' ? this.$storage.getSession('cabinData').ReductionPrice : this.$storage.getSession('cabinData').ALLReductionPrice
        },
        getTotalPrice() {
            let totalPrice = 0
            for(let i = 0;i < this.expenseDetailData.length; i++) {
                for(let j = 0;j < this.expenseDetailData[i].details.length; j++) {
                    totalPrice += this.expenseDetailData[i].details[j].price * this.personNum                    
                }
            }
            return totalPrice
        }
    },
    methods: {
        goToExpenseDetail() {
            this.expenseDetailShow = true            
        },
        closePopup() {
            this.expenseDetailShow = false
        }
    }
}
</script>
 
<style lang="less"> 
    .totalView {
        position: absolute;
        width: 100%;
        bottom: 0; 
        height: .54rem;
        .vux-popup-dialog {
            overflow-y: hidden;
        }
        .total {
            height: .54rem;
            background: #fff;
            display: flex;
            padding-left: .06rem;
            .totalPrice {
                flex: 3;
                .totalPriceText, .price {
                    width: .8rem;
                    text-align: center;
                }
            }
            .detailed {
                flex: 1;
                font-size: .14rem;
                line-height: .54rem;
                color: #2379FB;
                img, span {
                    vertical-align: middle;
                }               
            }
            
            .penmentBtn {
                flex: 1.5;
                text-align: center;
                background: #2474DE;
                color: #fff;
                font-size: .14rem;
                line-height: .54rem;
                vertical-align: middle;
            }
            .discountPrice, .price {
                color: #F96464;
            }
            .priceNum {
                font-size: .2rem;
            }
            .discountText {
                font-size: .14rem;
            }
            .discountText {
                color: #3B3B3B;
            }
        }
        .expenseDetailTitle {
            color: #2C2C2C;
            height: .4rem;
            font-size: .16rem;
            line-height: .4rem;
            text-align: center;
            background: #fff;
            border: solid 1px #F3F3F4;
            position: fixed;
            width: 100%;
            z-index: 1;
        }
        .expenseDetailList {
            height: 100%;
            background: #fff;
            padding: 0 .12rem;
            list-style: none;
            margin-top: .4rem;
            overflow-y: scroll;
            .expenseDetailItem {
                border-bottom: solid 1px #F2F2F3;
                padding: .08rem 0;
            }
            .item {
                margin-top: .08rem;
                color: #9E9E9E;
                position: relative;
                .price {
                    position: absolute;
                    right: 0;
                    color: #FF6262;
                    span, label {
                        font-size: .16rem;
                    }
                    label {
                        color: #B6B6B6;
                    }
                }
            }
            .detailType {
                font-size: .14rem;
                color: #4B4B4B;
            }
        }
        .addPrompt {
            .addPromptBox {
                position: relative;
                height: 100%;
                .addPromptText {
                    padding: .18rem .14rem;
                    font-size: .14rem;
                }
                .addPromptBtn {
                    position: absolute;
                    bottom: .18rem;
                    right: .14rem;
                    color: #2474DE;
                }
            }
            
        }
    }      
    
</style>
