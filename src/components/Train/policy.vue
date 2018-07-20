<template>
    <div class="policy" v-if="policyData.length != 0">
        <div class="policyTitle">
            <img class="noticeIcon" src="../../assets/images/Ticketfilling-5@1x.png" />
            <span class="policyText">政策违规</span>
        </div>
        <div class="policyList">
            <ul class="policyListHeader">
                <li class="illegalPersonItem" v-for="(item, index) in policyData" :key="index">
                    <span class="illegalPersonName">{{item.PsgerName}}</span>
                    <span class="tip">违</span>
                </li>
            </ul>
            <ul class="policyListMess">
                <li class="policyItem" v-for="(item, index) in policyListMess" :key="index">
                    <p class="policyType">{{item.title}}</p>
                    <p class="policyCont" @click="chooseReason(index)">{{item.content}}</p>
                </li>
            </ul>
        </div>

        <popup v-model="show">
            <div class="policyPopupTitle">违规政策</div>
            <div class="illegalText" @click="reasonContent">{{illegalText}}</div>
        </popup>
    </div>
</template>

<script>
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import qs from 'qs'

export default {
    name: 'policy',
    components: {
        XHeader,
        Popup
    },
    props: {
        //policyData: [Object, Array]
    },
    data: function() {
        return {
            show: false,
            illegalText: [],
            currIndex: 0,
            policyListMess: [],
            policyData: []
        }
    },
    created() {
        
    },
    methods: {
        chooseReason(index) {
            this.currIndex = index
            this.show = true;
            let message = this.policyData[0].Message.split('@')
            this.illegalText = message[index]
        },
        reasonContent() {
            this.show = false
            this.policyListMess[this.currIndex].content = this.illegalText
        }
    }
}
</script>
 
<style scoped lang="less">
#shenshouMask {
    height: 5rem;
    width: 5rem;border: 1px solid red;
}
    .policy {
        background: #fff;
        margin-top: .6rem;
        font-size: 1.4rem;
        border: solid 1px #fff;
        li {
            list-style: none;
        }
        .policyList {
            margin: .6rem 1.2rem;
            border: solid 1px #64A7FE;
            border-radius: .4rem;
            .policyListHeader {
                display: flex; 
                padding: .8rem .4rem;
                background: #E8F2FF;                  
            }
            .illegalPersonItem {
                flex: 1;
                text-align: center;
                .tip {
                    color: #fff;
                    background: #FE0902;
                    padding: 0 .2rem;
                    border-radius: .2rem;
                }
            }
            .policyListMess {
                padding: .2rem .8rem .8rem .8rem;
                .policyItem {
                    margin-top: .6rem;
                }
                .policyCont {
                    color: #5189E0;
                    margin-top: .2rem;
                }                  
            }
        }
        .policyPopupTitle {
            color: #3F84E1;
            text-align: center;
            font-size: 1.4rem;
            height: 4rem;
            line-height: 4rem;
            position: relative;
            background: #F1F1F6;
            &:after {
                content: '';
                width: 100%;
                height: .2rem;
                background: #2474DE;
                display: inline-block;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }  
        .illegalText {           
            padding: .8rem 1.2rem;
            border-bottom: solid 1px #F9F9F9;
        }         
        .noticeIcon, .policyText {
            vertical-align: middle
        }
        .policyTitle {
            border-bottom: solid 1px #F7F7F8;
            padding: 1.2rem;
            position: relative;  
        }  

        .policyMask {
            background: rgba(0, 0, 0, 0.5);
            height: 100%;
            width: 100%;
        }
    }
</style>
