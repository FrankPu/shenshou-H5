<template>
    <div class="passenger">
        <div class="passengerTitle">
            <span class="addPassenger">添加乘机人</span>
            <span class="goToAdd" @click="showAddPopup">添加<img class="back" src="../../assets/images/Ticketfilling-2@1x.png" /></span>
        </div>
        <div class="passengerList">
            <span class="deleteIcon">
                <img class="back" src="../../assets/images/Ticketfilling-4@1x.png" />
            </span>
            <div class="passengerMess">
                <div class="passengerName">周三舱</div>
                <div class="passengerID">身份证：510302198705045</div>
            </div>   
            <div class="ascriptio">
                <span>费用归属 市场部</span>
                <img src="../../assets/images/Ticketfilling-3@1x.png" />
            </div>        
        </div>
        <popup v-model="show" :position="'bottom'">
            <div class="passengerMess">        
                <popup-header :left-text="'取消'" :right-text="'确定'" @on-click-left="sureClick"
            @on-click-right="show = false" :show-bottom-border="false"></popup-header> 
                <div class="listCont">
                    <div class="addBtn">
                        <img src="../../assets/images/Ticketfilling-4@1x.png" />
                        <span class="addText">添加常旅客信息</span>
                    </div>  
                    <ul class="passengerData">
                        <passenger-list-item v-for="(item, index) in listData" :key="index" :item="item"></passenger-list-item>                                 
                    </ul> 
                </div>             
            </div>
        </popup>
    </div>
</template>

<script>

import Popup from '../common/popup/index'
import PassengerListItem from '../common/passenger-list-item'
import PopupHeader from '../common/popup-header'

import qs from 'qs'

export default {
    name: 'add-passenger',
    components: {
        PassengerListItem,
        PopupHeader,
        Popup
    },
    data: function() {
        return {
            show: false,
            listData: [{
                name: '李青',
                tel: '13402827937',
                ID:'33333333333'
            }, {
                name: '竹桑',
                tel: '15678967567',
                ID:'11111111111'
            }]
        }
    },
    methods: {
        showAddPopup() {
            this.show = true
        },
        sureClick() {
            this.show = false
        }
    }
}
</script>
 
<style scoped lang="less">  
    .passenger {
        background: #fff;
        margin-top: .6rem;
        font-size: 1.4rem; 
        .passengerTitle {
            border-bottom: solid 1px #F7F7F8;
            padding: 1.2rem;
            position: relative;  
        }              
        .addPassenger {
            color: #252525;                
        }
        .goToAdd {
            position: absolute;
            right: 1.2rem;
            color: #266FCC;
            border: solid 1px #266FCC;
            border-radius: .2rem;
            height: 2.4rem;
            line-height: 2.4rem;
            top: 0;
            bottom: 0;
            margin: auto;
            padding: 0 .8rem;
            img {
                margin-left: .4rem;
                margin-top: .1rem;
                position: relative;
                top: .1rem;
            }
        }
        .passengerList {
            padding: .8rem 0 .8rem 1.2rem;
            .passengerMess {
                display: inline-block;
                margin-left: .4rem;
                padding-bottom: .8rem;
                border-bottom: solid 1px #F7F7F8;
                .passengerName {
                    color: #252525;
                    font-size: 1.4rem;
                }
                .passengerID {
                    color: #A8A8A8;
                    margin-top: .2rem;
                }
            }
            .ascriptio {
                color: #A8A8A8;
                margin-top: .8rem;
                margin-left: 2.4rem;
                position: relative;
                img {
                    position: absolute;
                    right: 1.2rem;
                    top: .4rem;
                }
            }
        }   
        .passengerMess {
            img {
                vertical-align: middle;
                height: 2rem;
            }
            .listCont {
                padding: 0 1.2rem 2.4rem 1.2rem;
                background: #fff;
            }
            .addBtn {
                border-bottom: solid 1px #E6E6E6;
                padding: 1.2rem 0;
                span {
                    vertical-align: middle;
                }
            }
            .passengerData {
                list-style: none; 
            }
        }        
    } 
</style>
