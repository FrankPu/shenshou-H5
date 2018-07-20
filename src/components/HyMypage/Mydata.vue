<template>
      <div class="Mydata">
            <x-header :showBack="true" :title="'个人中心'" @go-back="goBack"></x-header>
            <ul class="Mydataul">
              <router-link to="/Mydataname"> 
                <li class="Mydataultop"><p>姓名 <span>{{userInfo.UserName}}</span> <img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt=""></p></li>
              </router-link>
                <li><p>联系电话 <span>{{userInfo.TelPhone}}</span> </p></li>
                <li @click="toIdCard()"><p>证件 <img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt=""></p></li>
                <li>
                    <p>性别
                        <span>
                            <popup-picker value-text-align="'left'" :data="genderList" v-model="gender" @on-change="changeGender" class="popicker">
                                <div class="moinput"></div>
                            </popup-picker>
                        </span> 
                        <img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt="">
                    </p>
                </li>
                <li>
                    <p>出生日期
                        <span>  
                            <datetime v-model="birthday" :readonly="readonly" @on-change="changeBirthday"></datetime>
                        </span>
                        <img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt="">
                    </p>
                </li>
                <li><p>邮箱 <span>{{userInfo.Emil}}</span></p></li>
                <li><p>部门 <span>{{userInfo.DepartmentName}}</span></p></li> 
            </ul>
             <ul class="Mydataul passw">
                <router-link to="/Mydatapassw"> 
                   <li><p>修改登录密码 <img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt=""></p></li> 
                </router-link>
            </ul>
            
            <button id="Signout" @click="logOut()">退出登录</button>
            <!-- 修改用户名 -->
            <!-- <user-name v-show="showChangeName" @click="changeName()"></user-name> -->
            <!-- 证件信息 -->
            <!-- <id-card v-show="showIdCard" @click="changeIdCard()"></id-card> -->
      </div>
</template>
<script>
import qs from 'qs'
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import PopupPicker from 'vux/src/components/popup-picker/index'
import Datetime from 'vux/src/components/datetime/index'
import Group from 'vux/src/components/group/index'
import XHeader from '../common/header'

import UserName from './Mydata-name'    //修改用户名
import IdCard from './Mydata-identity'  //修改身份证

 export default {
      name: 'Mydata',
        components: {
            Datetime,
            Group,
            PopupPicker,
            XHeader,
            UserName,
            IdCard
        },
      data: function() {
            return {
                readonly: false,
                birthday: '',
                gender: ['男'],
                genderList: [['男', '女']],
                userInfo:{},
                showChangeName:false,
                showIdCard:false
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
            changeGender(value){
                let sex = '';
                if(value[0] == '男'){
                    sex = 1;
                    this.gender = ['男']
                }else if(value[0] == '女'){
                    sex = 2;
                    this.gender = ['女']
                }
                this.$axios.post('/MyPersonalCenter/UpdatetPersonalCenter', qs.stringify({
                    UserID:this.$storage.getSession('userMess').UserID,
                    Token:this.$storage.getSession('userMess').Token,
                    EmpId:this.$storage.getSession('userMess').EmpId,
                    Value: sex,
                    Type: 3     //修改性别
                })).then(res=>{

                })
            },
            changeBirthday (value) {
                this.$axios.post('/MyPersonalCenter/UpdatetPersonalCenter', qs.stringify({
                    UserID:this.$storage.getSession('userMess').UserID,
                    Token:this.$storage.getSession('userMess').Token,
                    EmpId:this.$storage.getSession('userMess').EmpId,
                    Value: value,
                    Type: 4     //修改生日
                })).then(res=>{

                })
            },
            toIdCard(){
                this.$router.push({
                    path:'/Mydataidentity',
                    name:'Mydataidentity',
                    params:{

                    }
                })
            },
            changeName(){
                this.showChangeName = true;
            },
            changeIdCard(){
                this.showIdCard =true;
            },
            logOut(){
                // sessionStorage.clear(); //清空session
                this.$router.push('/')
            }
     },
     created(){
         this.$axios.post('/MyFrequentPassenger/PersonalCenter', qs.stringify({
             UserId:this.$storage.getSession('userMess').UserId,
             Token:this.$storage.getSession('userMess').Token,
             EmpId:this.$storage.getSession('userMess').EmpId
         })).then(res=>{
             this.userInfo = res.data.Result;
             this.birthday = this.userInfo.BrithDay;
             this.gender = this.userInfo.Sex;
         })
     }
    
}
</script>
<style scoped lang="less">
    .Mydata{ 
        a{
            text-decoration:none; 
        }
        .Mydataul{
            width: 100%;
            height: auto;
            background-color: #ffffff;
            .Mydataultop{
                margin-top: .42rem;
            }
            li{
            width: 90%;
            margin-left: 5%;
            height: .37rem;
            line-height: .37rem;
            color:#000000;
            position: relative;
            span{
                float: right;
                margin-right: .1rem;
            }
            img{
                width: .1rem;
                position: absolute;
                top: .14rem;
                right: -.02rem;
            }    
        }    
    }
    .passw{
        border-top: .04rem solid #F5F5F5; 
        li{
            font-size: .16rem;
        }
    }
    #Signout{
        width: 80%;
        height: .35rem;
        background-color: #2474DE;
        color: #ffffff;
        border: 0;
        border-radius: .04rem; 
        margin-left: 10%;
        margin-top: .4rem;
    }
    
    .vux-popup-header .vux-popup-header-left{color: #3696FD;font-weight: 600;font-size: .15rem}
    .vux-popup-header .vux-popup-header-right{color: #3696FD;font-weight: 600;font-size: .15rem}
    .dp-container .dp-header .dp-item.dp-left {color: #3696FD;font-weight: 600;font-size: .15rem}
    .dp-container .dp-header .dp-item.dp-right {color: #3696FD;font-weight: 600;font-size: .15rem}
    .dp-container .dp-header .dp-item {color: #000000;font-weight: 600;font-size: .15rem}
     
}   
</style>
