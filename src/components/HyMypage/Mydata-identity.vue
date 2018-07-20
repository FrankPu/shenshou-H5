<template>
      <div class="Mydataidend">
            <x-header :showBack="true" :title="'证件'" @go-back="goBack">
                 <span slot="right" class="icon" @click="save()">保存</span>   
            </x-header>
            
            <ul class="Mydataul" v-for="(item,index) in idCard" :key="index">
                <li class="Mydataultop" @click="changeIdCard(item)"><p>{{type[0]}}<img src="../../assets/images/fightOrder/Ticketfilling-3@2x.png" alt=""><span>{{item.CertificateNumber}}</span></p></li>
            </ul>
            <button id="Signout">
                <popup-picker value-text-align="'left'" :data="typeList" title="添加证件类型" class="popicker"></popup-picker>
            </button>
            <change-id-card v-show="showChangeIdCard" :idCard="idCard"></change-id-card>
      </div>
</template>
<script>
import qs from 'qs'
import PopupPicker from 'vux/src/components/popup-picker/index'
import Datetime from 'vux/src/components/datetime/index'
import Group from 'vux/src/components/group/index'
import XHeader from '../common/header'

import ChangeIdCard from './Mydata-modify'  //修改证件的弹层
 export default {
      name: 'Mydata',
        components: {
            Datetime,
            Group,
            PopupPicker,
            XHeader,
            ChangeIdCard
        },
      data: function() {
            return{ 
                type: ['身份证'],
                typeList: [['身份证', '签证', '士兵证', '军官证', '没有证', '其他', '不告诉你']],
                showChangeIdCard:false,
                idType:'',
                idCard:[]
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
            save(){
                alert('请将信息填写完整')
            },
            changeIdCard(item){
                this.showChangeIdCard = true;
                this.$storage.setSession('idCardData', item)
            }
     },
     created(){
         this.$axios.post('/MyCertificate/GetCertificate', qs.stringify({
             UserId:this.$storage.getSession('userMess').UserId,
             Token:this.$storage.getSession('userMess').Token,
             EmpId:this.$storage.getSession('userMess').EmpId
         })).then(res=>{
             this.idCard = res.data.Result;
         })
     }
}
</script>
<style scoped lang="less">
    .vux-popup-picker-select{
        height: .35rem;
        z-index: 2;
    }
    .vux-popup-picker-value{
         color: #2474DE;
    }
.Mydataidend{ 
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
       .Mydataul{
        width: 100%;
        height: auto;
      
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
           font-size: .14rem;
           span{
               float: right;
           }
           img{
               width: .1rem;
               position: absolute;
               top: .14rem;
               left: .55rem;
           }    
        }    
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
        p{
            position: relative;
            top: -.25rem;
        }
    } 
</style>
