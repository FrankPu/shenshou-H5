<template>
    <div class="insurance">
        <div class="chosedInsurance" @click="showInsurancePopup">
            <img src="../../assets/images/Ticketfilling-6@1x.png" />
            <!-- <span class="insuranceText" v-if="chosedIns">已选：</span> -->
            <span class="insuranceText" v-if="chosedIns">已选择 {{chosedIns}} {{chosedNum}}份/{{passengerNum}}人</span>
            <span class="insuranceText" v-else>购买百万保险，为您和亲友投一份保障</span>
        </div>
        <popup v-model="show" height="100%" width="100%" position="right">    
            <x-header :showBack="true" :title="'选择保险'" @go-back="show = false"></x-header>     
            <ul class="insuranceList">
                <li v-for="(item, index) in insuranceInfo" :key="index" class="insuranceItem">       
                    <div class="itemTop">
                        <span class="insuranceName">航班{{item.InsuranceName}}</span>
                        <img src="../../assets/images/Ticketfilling-5@1x.png" />
                        <span class="insurancePrice">￥<span class="person">{{item.Price}}/人</span></span>
                        <span class="insuranceNum" v-if="item.num >= 2">x{{item.num}}</span>
                    </div>
                    <!-- <div class="insuranceDesc">哈哈哈哈</div>   -->
                    <!-- <label :class="[{'checked': item.isChecked}, 'check']" @click="filterInsuranceInfo(index)"></label>            -->
                    <label :class="[{'checked': item.isChecked}, 'check']" @click="chooseInsurance(index)"></label>
                </li>
            </ul>
            <div class="sureBtn" @click="sureClick">确认</div>             
        </popup>
    </div>    
</template>

<script>

import XHeader from '../common/header'
import Popup from '../common/popup/index'
import { mapState  } from 'vuex'

import qs from 'qs'

export default {
    name: 'ticket-insurance',
    components: {
        Popup,
        XHeader
    },
    props: {
        passengerNum: Number
    },
    computed: {
        chosedIns() {
            let chosedIns = '';
            this.insuranceInfo.map((item, index) => {
                if(item.isChecked) {
                    chosedIns += item.InsuranceName + '/'
                }
            })
            return chosedIns
        },
        chosedNum() {
            let chosedNum = 0;
            this.insuranceInfo.map((item, index) => {
                item.isChecked && chosedNum ++
            })
            return chosedNum
        },
        ...mapState([
            'insuranceInfo'
        ])
    },
    created() {
        let insuranceParams = {
            url: '/InsuranceInfo/GetInsurance',
            params: {
                UserId: this.$storage.getSession('userMess').UserId, //配置参数
                Token: this.$storage.getSession('userMess').Token, //配置参数
                Type: '1' 
            }
        }
        this.$store.dispatch('getInsuranceInfo', insuranceParams) 
    },
    data: function() {
        return {
            show: false,
            insuranceData: []
        }
    },
    methods: {
        showInsurancePopup() {
            this.show = true
        },
        sureClick() {
            this.show = false         
        },
        chooseInsurance(index) {
            this.$store.commit('GET_CHOSED_INSURANCE_SUCCESS', index)
        }
    }
}
</script>
 
<style scoped lang="less">
    @import "../../assets/less/insurance.less";
</style>