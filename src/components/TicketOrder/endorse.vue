<template>
    <div class="flightEndorse">
        <popup v-model="showEndorse" width="88%" height="29.5rem">       
            <div class="endorseTop">
                <img class="closeIcon" src="../../assets/images/layer/error@2x.png" @click="$emit('close-endorse')" />
                <div class="endorseTopHeader" v-if="!isOneWay">
                    <div class="headerItem" v-for="(item, index) in tabData" :key="index" @click="switchTab(item, index)">
                        <span :class="{'active': index === currIndex}">{{item}}</span>
                    </div>
                </div>
                <ul class="endorseMessList">
                    <li class="endorseMessItem">
                        <img src="../../assets/images/layer/img-3@2x.png" />
                        <span class="mess">{{endorsData.HeadStr}}</span>
                    </li>
                    <li class="endorseMessItem">
                        <img src="../../assets/images/layer/img-2@2x.png" />
                        <span class="mess">{{endorsData.MiddleStr}}</span>
                    </li>
                    <li class="endorseMessItem">
                        <img src="../../assets/images/layer/img-1@2x.png" />
                        <span class="mess">{{endorsData.BottomStr}}</span>
                    </li>
                </ul>
            </div>
            <div class="endorseDesc">
                <p class="descTitle">退改签说明</p>
                <div class="descTable">
                    <div class="descItem" v-for="(item, index) in endorsData.APPGuest" :key="index">
                        <span class="descName">{{item.Key}}</span>
                        <span class="descContent">{{item.Values}}</span>
                    </div>
                </div>
            </div>
        </popup>         
    </div>
</template>

<script>

import Popup from '../common/popup/index'
import qs from 'qs'
export default {
    name: 'endors',
    components: {
        Popup
    },
    data: function() {
        return {
            tabData: ['单程', '往返'],
            currIndex: 0,
            endorsData: []
        }
    },
    props: {
        showEndorse: Boolean,        
        isOneWay: Boolean
    },
    created() {
        this.getEndorseData(0)
    },
    methods: {
        switchTab(item, index) {
            this.currIndex = index
            this.getEndorseData(index)
        },
        getEndorseData(index) {
            let carninData = this.$storage.getSession('cabinData')
            let endorsParams = {
                DepartDate: carninData.DepartDate,
                DepartCityCode: carninData.DepartCityCode,
                ArriveCityCode: carninData.ArriveCityCode,
                AirLineCode: carninData.AirLineCode,
                FlightNo: carninData.FlightNo,
                CabinCode: carninData.CabinCode,
                CabinPrice: carninData.CabinPrice,
                Discount: carninData.Discount
            }
            if(!this.$storage.getSession('flightSearchData').isOneWay && index === 1) {
                endorsParams.DepartCityCode = carninData.ArriveCityCode
                endorsParams.ArriveCityCode = carninData.DepartCityCode
            } else if(!this.$storage.getSession('flightSearchData').isOneWay && index === 0 || this.$storage.getSession('flightSearchData').isOneWay) {
                endorsParams.DepartCityCode = carninData.DepartCityCode
                endorsParams.ArriveCityCode = carninData.ArriveCityCode
            }

            this.$axios.post('/FlightInfo/SearchGuestRule', qs.stringify(endorsParams))
                .then(res => {
                    this.endorsData = res.data.Result
                }).catch(err => {});
        }
    }
}
</script>

<style scoped lang="less">  
    .flightEndorse {
        .vux-popup-dialog {
            overflow-y: hidden;
        }
        .endorseTop {
            padding: .12rem 0;
            position: relative;
            background-image: url("../../assets/images/layer/bg-1@2x.png");
            .closeIcon {
                position: absolute;
                height: .1rem;
                width: .1rem;
                right: .08rem;
                top: .08rem;
            }
            .endorseTopHeader {
                display: flex;
                margin-bottom: .08rem;
                .headerItem {
                    flex: 1;
                    padding: 0 0 .08rem 0;
                    font-size: .14rem;
                    text-align: center;                    
                }
                .headerItem:first-child {
                    padding-left: .6rem;
                }
                .headerItem:last-child {
                    padding-right: .6rem;
                }
                span {
                    position: relative;
                    padding-bottom: .08rem;
                }
                .active {
                    color: #2674DB;
                }
                .active:after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: .02rem;
                    bottom: 0;
                    left: 0;
                    background-color: #2674DB;
                }
            }
            .endorseMessList {
                padding: 0 .12rem;
                .endorseMessItem {
                    margin-top: .06rem;
                    img {
                        height: .15rem;
                        width: .15rem;
                        vertical-align: middle;
                    }
                    .mess {
                        vertical-align: middle;
                        margin-left: .06rem;
                    }
                }
            }
        }
        .endorseDesc {
            padding: .12rem .12rem 0 .12rem;
            .descTitle {
                font-size: .16rem;
            }
            .descTable {
                margin-top: .08rem;
                border: solid 1px #D9D9D9;
                .descItem {
                    display: flex;
                    .descName {
                        width: .5rem;
                        padding: .12rem 0;
                        display: inline-block;
                        text-align: center;
                        vertical-align: middle;
                        border-bottom: solid 1px #D9D9D9;
                    }
                    .descContent {
                        flex: 1;
                        padding: .08rem 0 .08rem .08rem;
                        border-bottom: solid 1px #D9D9D9;
                        border-left: solid 1px #D9D9D9;
                    }
                }
            }
        }
    }
</style>
