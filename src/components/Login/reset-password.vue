<template>
    <div class="loginIndex">
        <x-header :showBack="true"></x-header> 
        <ul class="resetWay">        
            <li class="oneWay" @click="chooseResetWay(index ,tab.type)" v-for="(tab,index) in tabs" :key="index" :class="{active:active===index}">
                {{tab.text}}       
            </li>    
        </ul>   
        <div class="telOrEmailInput">
            <div class="telOrEmail">
                <img src="../../assets/images/login/phoneg.png" />
                <input type="text" :placeholder="telPlaceholder" />
            </div>
            <div class="telOrEmailCode">
                <img src="../../assets/images/login/code@2x.png" />
                <input type="text" :placeholder="emailPlaceholder" />
                <span class="sendDynamicPassword">发送动态密码</span>
            </div> 
        </div> 
        <div class="prompt">验证码会发送到注册邮箱，请注意查收</div>       
        <div class="resetBtn">重置密码</div> 
        <div class="prompt">提示：如果您原来的手机号已经停用，请拨打神兽客服热线：4007-999-999</div> 
    </div>
</template>

<script>

import XHeader from '../common/header'
import Confirm from '../common/confirm'

export default {
    name: "reset-password",
    data: function() {
        return {
            active: 0,
            tabs: [{
                type: 'tel',
                text: '手机号找回'
            }, {
                type: 'email',
                text: '邮箱找回'
            }],
            telPlaceholder: '请输入注册时使用的手机号',
            emailPlaceholder: '请输入短信验证码',
            currentType: 'tel'
        }
    },
    components: {
        XHeader,
        Confirm
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        chooseResetWay(index, val) {
            this.active = index
            this.currentType = val
            this.telPlaceholder = val == 'tel' ? '请输入注册时使用的手机号' : '请输入注册时使用的邮箱'
            this.emailPlaceholder = val == 'tel' ? '请输入短信验证码' : '请输入邮箱验证码'
        }
    }
}
</script>

<style scoped lang="less">
    .loginIndex {
        padding: .2rem;
        .shenshou-header {
            background: #fff;
        }
        .resetWay {
            display: flex;
            height: .36rem;
            text-align-last: center;
            margin: .64rem 0rem 0 0rem;
            border-radius: 4px; 
            border-top: solid 1px #2577E3;
            border-bottom: solid 1px #2577E3;    
            .oneWay {
                color: #fff;
                text-align: center;
                display: inline-block;
                flex: 1;
                color: #9C9C9C;
                background: #fff;
                height: 100%;
                line-height: .36rem;
                &.active {
                    background: #2577E3;  
                    color: #fff;   
                }
            }           
        }
        .telOrEmailInput {
            position: relative;
            .telOrEmail {
                margin-top: .3rem;
            }
            .telOrEmailCode {
                margin-top: .12rem;
                position: relative;
                .sendDynamicPassword, .eyeIcon {
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    height: 100%;
                    line-height: .36rem;
                    color: #2F7AE9;
                }
            }
            .telOrEmail, .telOrEmailCode {
                height: .4rem;
                border-bottom: solid 1px #EFEFF0;
                border-top: solid 1px #EFEFF0;
                width: 100%;
                position: relative;
                input {
                    display: inline-block;
                    height: 100%;
                    width: 100%;
                    border: none;
                    text-indent: .3rem;
                }
                img {
                   position: absolute;
                   display: inline-block;
                   width: .2rem;
                   height: .2rem;
                   top: 0;
                   left: .04rem;
                   bottom: 0;
                   margin: auto;
                }
            }
        }
        .resetBtn {
            margin-top: .24rem;
            height: .36rem;
            line-height: .36rem;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            background: #2577E3; 
        }
        .prompt {
            margin-top: .08rem ;
            font-size: .14rem;
            color: #585858;
        }
    }
</style>
