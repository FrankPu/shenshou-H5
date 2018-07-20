<template>
    <div class="applayChanges">
        <x-header :showBack="true" :title="'申请改签'"  @go-back="goBack"></x-header>
        <ul class="flightChangesList">
            <li class="flightChangesItem" v-for="(val, index) in lightChangeData" :key="index">
                <div class="timeAndPlace">{{val.time}}</div>
                <div class="applayChangePerson" v-for="(item, i) in val.person" :key="i">
                    {{item.name}}<span class="state">{{item.state}}</span>
                    <label class="check" :class="{checked:item.isChecked}" @click="checkshow(index, i)"></label>
                </div>
            </li>
        </ul>
        <div class="applayChangesReason">
            <span class="changeReason">改签原因</span>
            <span class="returnTicketReason">退票原因</span>
            <img src="../../assets/images/Ticketfilling-3@1x.png" />
        </div>
        <ul class="personMess">
            <li class="contact"><span class="contactText">联系人：</span>小爱的妈</li>
            <li class="tel"><span class="teText">联系电话：</span>1347890987</li>
        </ul>
        <div class="detailReason">备注：改签详细原因</div>
        <div class="chooseDateBtn">选择改签日期</div>
    </div>
</template>

<script>

import XHeader from '../common/header'


export default {
    name: "applaychanges",
    data: function() {
        return {
            lightChangeData: [{
                time: '10月19日济南-大连18:34 起飞',
                person: [{
                    name: '谢娜',
                    state: '退票中',
                    isChecked:false,
                }, {
                    name: '赵宏伟',
                    isChecked:false,

                }]
            }, {
                time: '10月19日济南-大连18:34 起飞',
                person: [{
                    name: '谢娜',
                    state: '退票中',
                    isChecked:false,
                }, {
                    name: '赵宏伟',
                    isChecked:false,
                }]
            }]
        }
    },
    components: {
        XHeader
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        checkshow(index, i) {
            this.lightChangeData[index].person[i].isChecked =! this.lightChangeData[index].person[i].isChecked
            
        }
    }
}
</script>

<style scoped lang="less">
    .applayChanges {
        background: #F0F0F1;
        color: #363636;
        width:100%;
        height: 100%;
        position: absolute;
        .flightChangesList {
            margin-top: 4rem;
            .flightChangesItem {
                color: #363636;
                margin-top: .4rem;
                background: #fff;
                padding: .8rem 1.2rem 0 1.2rem;
                .timeAndPlace {
                     font-size: 1.4rem;
                     border-bottom: solid 1px #FBFBFC;
                     padding-bottom: .8rem;
                }
                .applayChangePerson {
                    padding: 1.2rem 0;
                    border-bottom: solid 1px #F1F1F2;
                    position: relative;
                    &:last-child {
                        border-bottom: solid 0 #F1F1F2;
                    }
                    .check {
                        display: inline-block;
                        width: 2rem;
                        height: 2rem; 
                        position: absolute;
                        top:1rem;  
                        margin: auto;
                        border-radius: .2rem;
                        right: 1.2rem; 
                        background-color: #F0F0F1
                    }
                    .checked {
                            text-align: center;
                            background-color: #2475DD
                    }
                    .checked:after{
                        content: '';
                        display: inline-block;
                        border: .2rem solid #ffffff;
                        border-top-width: 0;
                        border-right-width: 0; 
                        width: 1.2rem;
                        height: .6rem;
                        transform: rotate(-50deg);
                    }
                }
                .state {
                    color: #3C81DF;
                    margin-left: .4rem;
                }
            }
        }
        .applayChangesReason {
            margin-top: .4rem;
            background: #fff;
            padding: 1.2rem;
            position: relative;
            .returnTicketReason {
                margin-left: 1.2rem;
            }
            img {
                position: absolute;
                right: 1.2rem;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            
        }
        .personMess {
            margin-top: .4rem;
            background: #fff;
            padding: 0 1.2rem;
            list-style: none;
            li {
                padding: 1.2rem 0;
                border-bottom: solid 1px #F1F1F2;
                &:last-child {
                    border-bottom: solid 0 #F1F1F2;
                }
            }
            .contactText, .teText {
                width: 6.4rem;
                display: inline-block;
            }
        }
        .detailReason {
            margin-top: .4rem;
            padding: 1.2rem;
            background: #fff;
        }
        .chooseDateBtn {
            height: 3rem;
            text-align-last: center;
            margin: 2.4rem 1.6rem 0 1.6rem;
            background: #2577E3;
            border-radius: 4px;
            color: #fff;
            line-height: 3rem;
        }
        
    }
</style>
