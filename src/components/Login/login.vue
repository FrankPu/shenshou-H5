<template>
    <div class="loginIndex">
        <x-header :showBack="true"></x-header> 
        <ul class="loginWay">        
            <li class="oneWay" @click="chooseLoginWay(index ,tab.type)" v-for="(tab,index) in tabs" :key="index" :class="{active:active===index}">
                {{tab.text}}       
            </li>    
        </ul>   
        <div class="loginInput">
            <div class="loginAccount">
                <img class="phoneIcon" src="../../assets/images/login/phoneg.png" />
                <input type="text" v-model="account" :placeholder="placeholder" />
            </div>
            <div class="loginPassword">
                <img class="passIcon" src="../../assets/images/login/pwdg@2x.png" />
                <input placeholder="密码" v-model="password" type="text" />
                <span v-if="currentType == 'passwordLogin'" class="sendDynamicPassword" @click="getDynamicCode">发送动态密码</span>
                <img class="eyeIcon" v-else src="../../assets/images/login/eyeg.png" @click="changePassType"/>
            </div>
            <div class="retrievePass">找回密码</div>  
        </div>        
        <div class="loginBtn" @click="login">登录</div>
        <div class="registerBtn">注册新用户</div> 
        <!-- <confirm v-model="show" :content="'该号码已经注册神兽会员,是否直接登陆?'" :confirmText="'去登陆'" :cancelText="'取消'" @confirm="confirm"></confirm> -->
    </div>
</template>

<script>

import XHeader from '../common/header'
import Confirm from '../common/confirm'
// import { mapMutations } from 'vuex'
import { mapGetters, mapActions } from 'vuex'

import qs from 'qs'

export default {
    name: "login",
    data: function() {
        return {
            active: 0,
            show: false,
            account: '18683298102',
            password: '888888',
            pwdType:'password',
            tabs: [{
                type: 'accountLogin',
                text: '神兽账号登录'
            }, {
                type: 'passwordLogin',
                text: '动态密码登录'
            }],
            placeholder: '手机号/会员名/昵称/邮箱',
            currentType: 'accountLogin',
            eycIcon: '../../assets/images/login/eyeg.png'
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
        chooseLoginWay(index, val) {
            this.active = index
            this.currentType = val
            this.placeholder = val == 'accountLogin' ? '手机号/会员名/昵称/邮箱' : '请输入正确的手机号码'
        },
        changePassType() {           
            this.pwdType == 'password' ? 'text' : 'password'
        },
        getDynamicCode() {
            this.$axios.post('Login/GetLoginValidate', qs.stringify({
                phoneNumber: 18683298102                
            })).then(res => {
 
            }).catch(error => {

            })
        },
        login() {
            let url = this.currentType == 'accountLogin' ? 'Login/LoginAccount' : 'Login/LoginPhoneAccount';
            this.$axios.post(url, qs.stringify({
                Account: this.account,
                PassWord: this.password                 
            })).then(res => {
                console.log(res);
                if(res.data.Result == null ){
                    alert('登陆失败');
                    return
                }
                this.$storage.setSession('userMess', res.data.Result)     
                //this.$store.dispatch('getModuleInfo', res.data.Result)
                this.$router.push('/homepage');
            }).catch(error => {
                console.log(error)
            })
            // let loginParams = {
            //     url: url,
            //     params: {
            //         Account: this.account,
            //         PassWord: this.password 
            //     }                
            // }
            // this.$store.dispatch('getModuleInfo', loginParams).then((res) => {
            // })
        }
    }
}
</script>

<style lang="less">
    body {
        background: #fff;
    }
    .loginIndex {
        padding: 0 .24rem;
        .shenshou-header {
            background: #fff;
        }
        .loginWay {
            display: flex;
            height: .36rem;
            text-align-last: center;
            margin: .64rem 0rem 0 0rem;
            border-radius: 4px;  
            border-top: #A7C9F6 solid 1px;  
             border-bottom: #A7C9F6 solid 1px; 
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
        .loginInput {
            position: relative;
            .loginAccount {
                margin-top: .3rem;
            }
            .loginPassword {
                margin-top: .12rem;
                position: relative;
                .sendDynamicPassword, .eyeIcon {
                    position: absolute;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    line-height: .36rem;
                    color: #2F7AE9;
                }
                .eyeIcon {
                    width: .2rem;
                }
            }
            .loginAccount, .loginPassword {
                height: .36rem;
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
                .phoneIcon, .passIcon {
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
            .retrievePass {
                margin-top: .04rem;
                position: absolute;
                right: 0;
            }
        }
        
        .loginBtn {
            margin-top: .48rem;
        }
        .registerBtn {
            margin-top: .12rem;
        }
        .loginBtn, .registerBtn {
            height: .36rem;
            line-height: .36rem;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            background: #2577E3; 
        }

    }
</style>
