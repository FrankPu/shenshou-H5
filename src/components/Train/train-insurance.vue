<template>
    
    <div class="insurance">
        <div class="chosedInsurance" @click="showInsurancePopup">
            <img src="../../assets/images/Ticketfilling-6@1x.png" />
            <!-- <span class="insuranceText" v-if="chosedIns">已选：</span> -->
            <span class="insuranceText" v-if="chosedNum > 0">
                <span>已选择</span>               
                <span>意外险</span>
                <span>{{chosedNum}}份/{{passengerNum}}人</span>               
            </span>
            <span class="insuranceText" v-else>点击购买保险</span>
        </div>
        <popup v-model="show" height="100%" width="100%" position="right">    
            <x-header :showBack="true" :title="'选择保险'" @go-back="show = false"></x-header>     
            <ul class="insuranceList">
                <li v-for="(item, index) in trainInsuranceInfo" :key="index" class="insuranceItem">       
                    <div class="itemTop">
                        <span class="insuranceName">{{item.InsuranceName}}</span>
                        <img src="../../assets/images/Ticketfilling-5@1x.png" />
                        <span class="insurancePrice">￥<span class="person">{{item.Price}}/人</span></span>
                        <span class="insuranceNum" v-if="item.num >= 2">x{{item.num}}</span>
                    </div>
                    <div class="insuranceDesc">{{item.ProductDescription}}</div>  
                    <label :class="[{'checked': item.isChecked}, 'check']" @click="chooseInsurance(index)"></label>
                </li>
            </ul>
            <div class="sureBtn" @click="sureClick()">确认</div>             
        </popup>
    </div>    
</template>

<script>
import qs from 'qs'
import Popup from 'vux/src/components/popup/index'
import XHeader from '../common/header'
import { mapGetters, mapActions, mapState  } from 'vuex'
import { isContext } from 'vm';

export default {
    components: {
        Popup,
        XHeader
    },
    data() {
        return {
            show: false
        }
    },
    props: {
        passengerNum: Number
    },
    computed: {
        chosedNum() {
            let chosedNum = 0;
            this.trainInsuranceInfo.map((item, index) => {
                item.isChecked && chosedNum ++
            })
            return chosedNum
        },
        ...mapState([
            'trainInsuranceInfo'
        ])

    },
    created(){
        let params = {
            url: '/InsuranceInfo/GetInsurance',
            params: {
                UserId: this.$storage.getSession('userMess').UserId, //配置参数
                Token: this.$storage.getSession('userMess').Token, //配置参数
                Type: '2',
                TrainTime: this.$storage.getSession('trainData').ArriveTime
            }
        }
        this.$store.dispatch('getTrainInsuranceInfo', params)
    },
    methods: {
        showInsurancePopup() {
            this.show = true
        },
        sureClick() {
            this.show = false
        },
        chooseInsurance(index) { 
            this.$store.dispatch('filterTrainInsuranceInfo', index)         
        }
    }
}
</script>
 
<style scoped lang="less">
    @import "../../assets/less/insurance.less";
</style>
