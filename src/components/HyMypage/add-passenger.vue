<template>
      <div class="MyInmod">
            <x-header :showBack="true" :title="'修改旅客信息'" @go-back="goBack"></x-header>
            <div id="MyInmodform">               
                    <div  class="modivname">
                        <div class="moformbox mofrotop">
                                <div class="molblet"> <p>姓名</p> </div>
                                <div class="moinput">
                                    <input type="text" v-model="userName" placeholder="与证件保持一致">
                                </div>
                        </div>
                        <div class="moformbox mofrotop">
                                <div class="molblet"><p>手机号码</p></div>
                                <div class="moinput">
                                    <input type="text" v-model="phone" placeholder="请输入手机号码">
                                </div>
                        </div>
                        <div class="moformbox mofrotop"> 
                            <div class="molblet"><p>证件类型</p></div>
                            <popup-picker value-text-align="'left'" :data="list1" v-model="identityType" class="popicker">
                                <div class="moinput"></div>
                            </popup-picker>
                            <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">     
                        </div>
                        <div class="moformbox ">
                            <div class="molblet"><p>证件号</p></div>
                            <div class="moinput">
                                <input type="text" v-model="cardId" placeholder="与证件保持一致">
                            </div>
                         </div> 
                         <div class="moformbox mofrotop">
                            <div class="molblet"><p>性别</p></div>
                            <popup-picker value-text-align="'left'" :data="list2" v-model="gender" class="popicker">
                                <div class="moinput"> </div>
                            </popup-picker>
                            <img src="../../assets/images/mine/hsai.png" alt="" class="Inimgse">
                        </div>     
                    </div>
                  
                   <button class="inomodbutt" @click="editPsger()">提交</button>
            </div>   
         </div>
</template>
<script>
import qs from 'qs'
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import PopupPicker from 'vux/src/components/popup-picker/index'

import XHeader from '../common/header'

export default {
    components: {
        Tabbar,
        TabbarItem,
        PopupPicker,
        XHeader
    },
    data: function() {
        return {
            identityType: ['身份证'],
            gender: ['男'],
            list1: [['身份证']],
            list2: [['男', '女']],
            userInfo: this.$route.params.user,
            userName: '',
            phone: '',
            cardId: ''
        } 
    },
    methods: {        
        goBack(){
                this.$router.push('/myinformation');
        },
        editPsger(){
            this.$axios.post('/MyFrequentPassenger/AddFrequentPsger', qs.stringify({
                UserId: this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                Name: this.userName,
                Mobile: this.phone,
                IdentityType: 1,                    //证件类型，好像只有1
                Number: this.cardId,
                Gender: this.gender[0]=='男'?1:2,   //1：男， 2：女
                DoumentType: 1                      //1：身份证， 2：护照， 3：军官证
            })).then(res=>{
                console.log(res)
                this.$router.push('/myinformation')
            })
        }
    },
    created(){
        if(JSON.stringify(this.$route.params) != '{}'){             //编辑已有联系人
            this.userName = this.$route.params.user.PsgerName,
            this.cardId = this.$route.params.user.CardID,
            this.phone = this.$route.params.user.Phone
        }else{                                                      //新增联系人
            console.log('我是新增')
        }

        
    }
}
</script>

<style scoped lang="less">
    body{
        background-color: #F5F5F5;
    }  
    .vux-cell-box:not(:first-child):before {
         border-top:0;  
    }
    .MyInmod{
        width: 100%;
        height: auto;
        font-family: '微软雅黑';
        overflow: hidden;
       .modertop{
            width: 100%;
            height: .4rem;
            background-color: blue;
            line-height: .4rem;
            color:#fff;
            text-align: center;
        }
        #MyInmodform{
            margin-top: .43rem;
        }
        .modivname{
            width: 96%;
            margin-left: 2%;
            margin-top: .1rem;
            height: 2.53rem;    


        }
        .moformbox{
            width: 100%;
            height: .35rem;
            background-color: #ffffff;
            position: relative;
        }
        .Inimgse{
            position:absolute;
            top: .14rem;
            right: .2rem;
        }
        .mofrotop{
           border-bottom: .02rem solid #F5F5F5; 
        }
        .molblet{
            width: .7rem;
            height: 100%;
            line-height: .35rem;           
            float: left;
            text-align: left;        
        }
        .moppirev{
            position: relative;
            z-index: 9999;
            border: 1px solid;
        }
        .molblet p{
            padding-left: .13rem;
        }
        .moinput{
            width: 60%;
            height: 100%;
            float: left;
        }
        .moinput > input{
            border: 0;
            outline:medium;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
        }
        .mofrotop >  .popicker{               
            line-height: .35rem;
            color: #757575;
        }
        .inomodbutt{
            width: 96%;
            height: .4rem;
            margin-left: 2%;
            border-radius: 0.05rem;  
            color:#fff;
            background-color: #2577E3;
            border: none;
        }
    }   
</style>
