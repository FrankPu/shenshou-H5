<template>
    <div class="register">
        <x-header :showBack="true"></x-header> 
        <div class="registerInput"> 
            <div class="telInput">
                <img class="phoneIcon" src="../../assets/images/login/phoneg.png" />
                <input type="text" placeholder="请输入正确的手机号码" />
            </div>
            <div class="verificationCodeInput">
                <img class="codeIcon" src="../../assets/images/login/code@2x.png" />
                <input type="text" placeholder="请输入短信验证码" />
                <span class="sendDynamicPassword">发送动态密码</span>
            </div>
            <div class="passwordInput">
                <img class="passIcon" src="../../assets/images/login/pwdg@2x.png" />
                <input type="text" placeholder="密码，6-16位字母或数字" />
                <img class="eyeIcon" src="../../assets/images/login/eyeg.png" />
            </div>   
        </div>      
        <div class="registerBtn" @click="registerAndLogin">注册并登陆</div>  
        <confirm v-model="show" :content="'该号码已经注册神兽会员,是否直接登陆?'" :confirmText="'去登陆'" :cancelText="'取消'" @confirm="confirm"></confirm>
    </div>
</template>

<script>

import XHeader from '../common/header'
import Confirm from '../common/confirm'

export default {
    name: "register",
    data: function() {
        return {
            show: false
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
        registerAndLogin() {
            this.show = true
        },
        confirm() {
            this.show = false
        }
    }
}
</script>

<style lang="less">
    body {
        background: #fff;
    }
    .register {
        .registerInput {
            margin-top: 1.0rem;
            padding: 0 .24rem;
        }
        .telInput, .verificationCodeInput, .passwordInput {
            border-top: solid 1px #F9F9F9;
            border-bottom: solid 1px #E9E9E9; 
            margin-top: .12rem;
            position: relative;
        }
            
        .sendDynamicPassword, .eyeIcon {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            line-height: .36rem;
            color: #2F7AE9;
        }  
              
        input {
            display: inline-block;
            border-right: none;
            height: .4rem;
            border-radius: 4px;            
            border: none;
            text-indent: .08rem;
            vertical-align: middle;
        }
        img {
            vertical-align: middle;
            width: .2rem;
            height: .2rem;
        }
        .registerBtn {
            height: .4rem;
            text-align: center;
            margin: .36rem .16rem 0 .16rem;
            background: #2577E3;
            border-radius: 4px;
            color: #fff;
            line-height: .4rem;
            font-size: .14rem;
        }
    }
</style>
