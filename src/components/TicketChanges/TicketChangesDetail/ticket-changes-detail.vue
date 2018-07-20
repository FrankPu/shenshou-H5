<template>
    <div class="ticketChangeDetail">
        <x-header :showBack="true" :title="'改签详情'"  @go-back="goBack"></x-header>
        <div class="payCard">
            <div class="payCardTop">
                <span class="text">改签待出票</span>
                <span class="price">￥<label>889</label></span>
            </div>
            <div class="payBtn">
                <button class="cancle">立即取消</button>
                <button class="toPay ">立即支付</button>
               
            </div>
        </div>
        <ticket-card></ticket-card>
        <div class="ticketChangeProgress">
            <div class="progressHeader">改签进度</div>
            <flow orientation="vertical" style="height:14.4rem;">
                <flow-state state="1" :title="'提交申请'" is-done>
                </flow-state>
                <flow-line is-done></flow-line>
                <flow-state state="2" :title="'改签受理中'" is-done></flow-state>
                <flow-line is-done></flow-line>
                <flow-state state="3" :title="'改签支付成功'"></flow-state>
                <flow-line></flow-line>
                <flow-state state="4" :title="'改签出票成功'"></flow-state>
            </flow>
        </div>
        <div class="insuranceMess">
            <div class="insuranceMessHeader">保险信息</div>
            <div class="insuranceCont">
                <div class="insuranceType">意外险</div>
                <div class="insuranceType">延误险：延误有保障，最高赔付200元</div>
            </div>
        </div>
        <!-- 旅客信息 -->
        <div class="insuranceMess">
            <div class="insuranceMessHeader">旅客信息</div>
        </div>
        <div class="AirPassenger"> 
            
            <div class="passnode passBoder1">
                <label class="lable">乘机人</label>
                <div class="labrig">
                        <span>张小明</span>
                        <span>王小明</span>
                        <span>李晓明</span>
                        <span class="labrcolor">证件 | 票号</span>
                        <span>张小明</span>
                        <span>王小明</span>
                        <span>李晓明</span>
                </div>
            </div>
            <div class="passnode passBoder2">
                <label class="lable">乘机人</label>
                <div class="labrig">
                        <span>张小明</span>   
                </div>
            </div>
            <div class="passnode passBoder3">
                <label class="lable">身份证</label>
                <div class="labrig">
                        <span>5111XXXXXXXXXA54</span>   
                </div>
            </div>
            <div class="passnode passBoder3">
                <label class="lable">票号</label>
                <div class="labrig">
                        <span>D15242525</span> 
                        <span class="labrcolor">已改签</span>  
                </div>
            </div>
            <div class="passnode passBoder2">
                <label class="lable">乘机人</label>
                <div class="labrig">
                        <span>张X想</span>   
                </div>
            </div>
            <div class="passnode passBoder3">
                <label class="lable">身份证</label>
                <div class="labrig">
                        <span>5111XXXXXXXXXA54</span>   
                </div>
            </div>
            <div class="passnode passBoder3">
                <label class="lable">票号</label>
                <div class="labrig">
                        <span>D15242525</span> 
                </div>
            </div>  
        </div>
        <div class="AirPassenger passBoder4">
            <div class="passnode passBoder6">
                <label class="lable">联系人</label>
                <div class="labrig">
                        <span>李小明</span> 
                </div>
            </div>  
        </div>           
        <div class="AirPassenger passBoder5">
            <div class="passnode passBoder6">
                <label class="lable">联系电话</label>
                <div class="labrig">
                        <span>188754535115</span> 
                </div>
            </div>  
        </div>
        <div class="AirPassenger passBoder8">
            <div class="passnode passBoder6">
                <label class="lable">配送地址</label>
                <div class="labrig passBoder7">
                        <span>177****4457  15122211487</span> <br>
                        <span>四川省成都市青羊区紫东楼段</span>
                </div>
            </div>  
        </div>
        <div class="AirPassenger passBoder4">
            <div class="passnode passBoder6">
                <label class="lable">订单编号</label>
                <div class="labrig">
                        <span>P154236423434</span> 
                            <span class="labrcolor">复制</span>
                </div>
            </div>  
        </div>
        <div class="AirPassenger passBoder5">
            <div class="passnode passBoder6">
                <label class="lable">下单时间</label>
                <div class="labrig">
                        <span>2017-5-15 12:33:11</span> 
                </div>
            </div>  
        </div>
    </div>
</template>

<script>

import XHeader from '../../common/header'
import TicketCard from '../../commonBusComponents/ticket-card'
import Flow from 'vux/src/components/flow/flow'
import FlowState from 'vux/src/components/flow/flow-state'
import FlowLine from 'vux/src/components/flow/flow-line'


export default {
    name: "ticketChangesDetail",
    data: function() {
        return {
            
        }
    },
    components: {
        XHeader,
        TicketCard,
        Flow,
        FlowState,
        FlowLine
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less">
    .ticketChangeDetail {
        background: #F0F0F1;
        width: 100%;
        .payCard {
            margin-top: 4rem;
            padding-left: 1.2rem;
            background: #fff;
            width: 100%;
            .payCardTop {
                height: 4rem;
                line-height: 4rem;
                border-bottom: solid 1px #FAFAFA;
                .text {
                    color: #167BEF;
                    font-size: 1.4rem;
                }
                .price {
                    color: #FF5252;
                    float: right;
                    float: right;
                    margin-right: 1.2rem;
                    clear: both;
                    label {
                        font-size: 1.6rem;
                    }                    
                }
            }
        }
        .payBtn {
                height: 4rem;
                line-height: 4rem;
                width: 100%;
                margin: 0;
                padding: 0;
                button{
                    float: right;
                    margin-right:1rem; 
                    width: 6rem;
                    height: 2.7rem;
                    border-radius: .2rem;
                    margin-top:0.5rem;
                    font-size: 1.2rem;
                    line-height: 2.7rem;
                    color: #fff;
                    background: #2474DE;
                    text-align: center;
                    border: 0;
                }
                .cancle{
                    margin-right: -2rem;
                }
            }
        .ticketChangeProgress {
            background: #fff;
            margin-top: .4rem;
            .weui-wepay-flow {
                padding: 1.2rem;
            }
            .weui-wepay-flow__bd {
                align-items: left;
            }
            .weui-wepay-flow__li_done .weui-wepay-flow__state,
            .weui-wepay-flow__process {
                background-color: #16C86A;
            }
            .weui-wepay-flow_vertical .weui-wepay-flow__process {
                width: .1rem;
            }
            .weui-wepay-flow__line {
                left: .5rem;
                width: .1rem;
            }
        }
        .insuranceMess {
            margin-top: .4rem;
            background: #fff;
            font-size: 1.4rem;
            .insuranceCont {
                padding-left: 1.2rem;
            }
            .insuranceType{
                color: #999999;
                line-height:2rem;
            }
        }
        .progressHeader, .insuranceMessHeader {
            padding: 1.2rem;
            border-bottom: solid 1px #FAFAFA;
            font-size: 1.4rem;
        }
        .AirPassenger{
                width: 100%;
                height:auto;      
                background-color:#ffffff        
        }
        .passnode{
                width: 94%;    
                margin-left: 4%;
                text-align: left;
                line-height:2.5rem;
                font-size: 1.4rem;
        }
        .passBoder1{
                border-top:0.1rem solid #e4e4e4;
                height: 5rem;
        }
        .passBoder2{
                border-top:0.1rem solid #F3F3F3;
                height:2.5rem;
                margin-top: 0.3rem;
        }
        .passBoder3{
                height: 2.5rem;
        }
        .passBoder4{
                border-top:0.5rem solid #f5f5f5;
                height: 4.5rem; 
        }
        .passBoder5{
                border-top:0.1rem solid #f5f5f5;
               height: 4.5rem; 
        }
        .passBoder6{
                height: 4.5rem;
                line-height: 4.5rem;
        }
         .passBoder7{
                line-height:2.5rem;
        }
         .passBoder8{
                border-top:0.5rem solid #f5f5f5;
                height: 5rem; 
         }
        .lable{
                float: left;
                width:5rem;
                color: #999999;
        }
        .labrig{
                float: left;
                width:80%;
        }
        .labrig > span{
                padding-left:5.4%;
                
        }
        .labrcolor{
                color: #3488EC;
        } 
        
    }
    
</style>
