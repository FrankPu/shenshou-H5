<template>
    <div :class="['invoiceComponent', { 'hiddenInvoice': !showInvoice} ]">
            <div class="invoice">
                <div class="invoiceTitle">
                    <span class="leftTitle">发票清单</span>
                    <span class="titleRightContent">酒店发票</span></div>
                <div class="invoiceList">
                    <div class="invoiceName">
                        <span class="leftTitle">发票抬头</span>
                        <span class="rightContent">{{invoiceData.Title}}</span>
                    </div>
                    <div class="invoiceAddress">
                        <span class="leftTitle">邮寄地址</span>
                        <div class="rightContent">
                            <div class="name">{{addressData.Addressee}}</div>
                            <div class="tel">{{addressData.Mobile}}</div>
                            <div class="address">{{addressData.Province}} {{addressData.City}} {{addressData.Address}}</div>
                        </div>
                    </div>
                    <div class="invoicePrice">
                        <span class="leftTitle">邮寄费用</span>
                        <span class="ordinaryExpress rightContent">普通快递<span class="price">￥10</span></span>
                        
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import XSwitch from 'vux/src/components/x-switch/index'
import Group from 'vux/src/components/group/index'
import qs from 'qs'


export default {
    name: 'privatehotelorder',
    components: {
        XSwitch,
        Group
    },
    data: function() {
        return {
            invoiceData: {},
            addressData: {}
        }
    },
    props: {
        title: String,
        showInvoice: Boolean
    },    
    created() {
        Promise.all([this.getDefaultBillInfo('/BillInfo/GetDefaultNew', {
            UserId: this.$storage.getSession('userMess').UserId,
            Token: this.$storage.getSession('userMess').Token
        }),
        this.getDefaultAddress('Address/GetDefault', {
            UserId: this.$storage.getSession('userMess').UserId,
            Token: this.$storage.getSession('userMess').Token
        })]).then(res => {
            this.invoiceData = res[0].data.Result
            this.addressData = res[1].data.Result
        })
        
    },
    methods: {
        getDefaultBillInfo(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        },
        getDefaultAddress(url, params) {
            return this.$axios.post(url, qs.stringify(params))
        }
    }
}
</script>

<style lang="less">
    .invoiceComponent {
        .invoice {
            padding: 0 .12rem;
            margin-top: .06rem;
            background-color: #fff;
            .invoiceTitle {
                padding: .08rem 0;
                border-bottom: solid 1px #e9e9e9;
                .titleRightContent {
                    color: #262626;
                    margin-left: .08rem;
                }
            }
            .invoiceName, .invoiceAddress, .invoicePrice {
                padding: .08rem 0;
            }
            .leftTitle {
                color: #999;
                font-size: .14rem;
            }
            .rightContent {
                margin-left: .08rem;
                vertical-align: middle;
                font-size: .14rem;
                display: inline-block;
            }
            .price {
                color: #ff5555;
            }
        }
    }
    .hiddenInvoice {
        display: none;
    }
    
</style>
