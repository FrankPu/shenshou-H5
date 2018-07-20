<template>
    <div class="passenger">
        <div class="passengerTitle">
            <span class="addPassenger">{{title}}</span>
            <span class="goToAdd" @click="showAddPopup">添加
                <img class="back" src="../../assets/images/Ticketfilling-2@1x.png" />
            </span>
        </div>         
        <ul class="passengerList">            
            <li class="passengerItem" v-for="(item, index) in displayPassengerData" :key="index">                
                <img class="deleteIcon" src="../../assets/images/Ticketfilling-4@1x.png" @click="deletePassenger(index)" />
                <div class="passengerMess">
                    <div class="passengerName">{{item.PsgerName}}</div>
                    <div class="passengerID">身份证：{{item.UserId}}</div>
                </div>
                
            </li>               
        </ul>          
    </div>
</template>

<script>

import PopupHeader from '../common/popup-header'
import PassengerListItem from '../common/passenger-list-item'

import Popup from '../common/popup/index'
import qs from 'qs'


export default {
    name: 'private-add-passenger',
    components: {
        Popup,
        PopupHeader,
        PassengerListItem
    },
    props: {
        title: String
    },
    data: function() {
        return {
            insuranceData: [],
            productDescription: [],
            isPublic: false,
            passengerData: [],
            displayPassengerData: [],
            passengerNum: 0
        }
    },
    created() {
        Promise.all([this.getPassengerData('MyFrequentPassenger/GetFrequentPsger', '1709291753573829', '517013db993b2d89ad34a5b5387db7b51.0.76Y87HH1M3JJQCWEA7QCP2FGW41D48922E12F339D56386C1D58D767E5C6A1217A')])
        .then(res => {
            this.passengerData = res[0].data.Result
        })
        .catch(err => {

        });
    },
    methods: {
        getPassengerData(url, UserId, Token) {
            return this.$axios.post(url, qs.stringify({
                UserId: UserId,
                Token: Token     
            }))
        },
        showAddPopup() {
            this.$router.push({path: '/MyInmod'})
        },
        cancleClick() {

            this.displayPassengerData = []
        },
        deletePassenger(index) {
            this.displayPassengerData.splice(index,1)
        },
        sureClick() {

        },
        chooosePassenger(data, isChecked, index) {
            if(isChecked) {
                this.displayPassengerData.push(data)
            } else {
                this.displayPassengerDatathis = this.displayPassengerData.splice(index, 1)
            }
        }
    }
}
</script>
 
<style scoped lang="less">    
    .passenger {
        background: #fff;
        margin-top: 0.06rem;
        font-size: .14rem; 
        .passengerTitle {
            border-bottom: solid 1px #F7F7F8;
            padding: .12rem;
            position: relative;  
        }              
        .addPassenger {
            color: #252525;                
        }
        .goToAdd {
            position: absolute;
            right: .12rem;
            color: #266FCC;
            border: solid 1px #266FCC;
            border-radius: 0.02rem;
            height: .24rem;
            line-height: .14rem;
            top: 0;
            bottom: 0;
            margin: auto;
            padding:0  0.08rem 0 0.08rem;
            img {
                margin-left: 0.04rem;
                margin-top: 0.01rem;
                position: relative;
                top: 0.01rem;
            }
        }
        .passengerList {
            padding: 0 1.2rem;
            .passengerItem {
                margin-top: .4rem;
                .deleteIcon {
                    vertical-align: middle;
                }
                .passengerMess {
                    display: inline-block;
                    margin-left: .4rem;
                    padding: .8rem 0;
                    vertical-align: middle;
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
            }
        }    
    } 
    
</style>
