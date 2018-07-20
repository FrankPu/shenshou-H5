<template>
    <div class="policy" v-if="illegalPerson.length > 0">
        <div class="policyTitle">
            <img class="noticeIcon" src="../../assets/images/Ticketfilling-5@1x.png" />
            <span class="policyText">政策违规</span>
        </div>
        <div class="policyList">
            <ul class="policyListHeader">
                <li class="illegalPersonItem" v-for="(item, index) in illegalPerson" :key="index">
                    <span class="illegalPersonName">{{item.PsgerName}}</span>
                    <span class="tip">违</span>
                </li>
            </ul>
            <ul class="policyListMess">
                <li class="policyItem" v-for="(item, index) in getIllagalContent" :key="index">
                    <p class="policyType">{{item.title}}</p>
                    <p class="policyCont" @click="chooseReason(index)">{{item.text}}</p>
                </li>
            </ul>
        </div>
        
        <popup v-model="show">
            <div class="policyPopupTitle">违规政策</div>
            <ul class="illegalText">
                <li class="illegalTextItem" @click="choseIllegalContent(item, i)" v-for="(item, i) in illegalText" :key="i">{{item.Content}}</li>
            </ul>
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
        illegalPerson: [Object, Array],
        illegalConent: [Object, Array]
    },
    data: function() {
        return {
            show: false,
            illegalText: [],
            currIndex: 0,
            currentText: '',
            content: []
        }
    },
    computed: {
        getIllagalContent() {
            this.content = []
            this.illegalConent.map(item => {
                this.content.push({
                    title: item.Name,
                    text: item.BreakRuleReason[0].Content
                })
            })
            return this.content
        }
    },
    methods: {
        chooseReason(index) {
            this.currIndex = index
            this.show = true;
        },
        choseIllegalContent(item, i) {
            this.show = false
            this.content[this.currIndex].text = item.Content
        }
    },
    watch: {
        illegalConent(val) {
            console.log(this.illegalConent, 2222222222222222)
            this.illegalText = this.illegalConent[this.currIndex].BreakRuleReason
        }
    }
}
</script>
 
<style scoped lang="less">
    .policy {
        background: #fff;
        margin-top: .06rem;
        font-size: .14rem;
        border: solid 1px #fff;
        li {
            list-style: none;
        }
        .policyList {
            margin: .06rem .12rem;
            border: solid 1px #64A7FE;
            border-radius: .04rem;
            .policyListHeader {
                display: flex; 
                padding: .08rem .04rem;
                background: #E8F2FF;                  
            }
            .illegalPersonItem {
                flex: 1;
                text-align: center;
                .tip {
                    color: #fff;
                    background: #FE0902;
                    padding: 0 .02rem;
                    border-radius: .02rem;
                }
            }
            .policyListMess {
                padding: .02rem .08rem .08rem .08rem;
                .policyItem {
                    margin-top: .06rem;
                }
                .policyCont {
                    color: #5189E0;
                    margin-top: .02rem;
                }                  
            }
        }
        .policyPopupTitle {
            color: #3F84E1;
            text-align: center;
            font-size: .14rem;
            height: .4rem;
            line-height: .4rem;
            position: relative;
            background: #F1F1F6;
            &:after {
                content: '';
                width: 100%;
                height: .02rem;
                background: #2474DE;
                display: inline-block;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }                        
        .illegalTextItem {
            padding: .08rem .12rem; 
            border-bottom: solid 1px #F7F7F8;
        }         
        .noticeIcon, .policyText {
            vertical-align: middle
        }
        .policyTitle {
            border-bottom: solid 1px #F7F7F8;
            padding: .12rem;
            position: relative;  
        }  

        .policyMask {
            background: rgba(0, 0, 0, 0.5);
            height: 100%;
            width: 100%;
        }
    }
</style>
