<template>   
    <div class="delayDesc">
        <img src="../../assets/images/Ticketfilling-7@1x.png" />
        <span class="text">延误有保障，最高赔付200元</span>
        <span class="goDesc" @click="gotoDesc">详细说明</span>
        <img class="goIcon" src="../../assets/images/Ticketfilling-1@1x.png" />
        <popup v-model="show" height="100%" width="100%" position="right" @touchmove.prevent>         
            <x-header :showBack="true" :title="'保险详情说明'" :showMore="false" @go-back="goBack"></x-header>
            <div class="detailContent">
                <div class="voyageInsurance" v-for="(item, index) in productDescription" :key="index">
                    <p class="insuranceName">{{item.InsuranceName}}</p>
                    <div v-html="item.ProductDescription.replace(/\；/g, '<br/>')" class="aviationAccident"></div>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>

import Popup from '../common/popup/index'
import XHeader from '../common/header'
import qs from 'qs'

export default {
    name: 'delay-desc',
    components: {
        Popup,
        XHeader
    },
    data: function() {
        return {
            show: false,
            productDescription: []
        }
    },
    methods: {
        gotoDesc() {
            this.show = true
            let insuranceParams = {
                UserId: this.$storage.getSession('userMess').UserId, //配置参数
                Token: this.$storage.getSession('userMess').Token, //配置参数
                Type: '1' 
            } 
            this.$axios.post('InsuranceInfo/GetInsurance', qs.stringify(insuranceParams)).then(res => {
                this.productDescription = res.data.Result
            })
        },
        goBack() {
            this.show = false
        }
    }
}
</script>
 
<style scoped lang="less">  
    .delayDesc {
        padding: .12rem;
        color: #2379FB;
        font-size: .14rem;
        img, .goDesc {
            vertical-align: middle;
        }
        .goIcon, .goDesc {
            position: absolute;
        }
        .goIcon {
            right: .12rem;
            margin-top: .045rem;
        }
        .goDesc {
            right: .24rem;
        }
        .detailContent {
            margin-top: .4rem;
            height: 100%;
            background: #fff;
            padding: .12rem;
            .voyageInsurance {
                margin-top: .24rem;
                &:first-child {
                    margin-top: 0;
                }
                .aviationAccident {
                    margin-top: .16rem;
                    color: #2D2D2D;
                }
                .insuranceName {
                    color: #272727;
                    font-size: .16rem;
                    font-weight: 700;
                }
            }            
        }
    }
</style>
