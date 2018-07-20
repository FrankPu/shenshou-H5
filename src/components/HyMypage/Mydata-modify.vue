<template>
      <div class="Mydataname">
            <x-header :showBack="true" :title="'修改证件号码'" @go-back="goBack"></x-header>
            <ul class="Mydataul">
                <li class="Mydataultop">
                    <input type="text" v-model="idHolder" placeholder="请输入证件号码">
                </li>
            </ul>
            <button id="Signout" @click="confirmChange()">确定修改</button>
      </div>
</template>
<script>
import qs from 'qs'

import XHeader from '../common/header'

 export default {
      name: 'Mydataname',
        components: {
            XHeader
        },
      data: function() {
            return {
                idHolder: this.$storage.getSession('idCardData').CertificateNumber.toString()
            } 
      },
      methods: {
            goBack(){
                this.$router.go(-1);
            },
            confirmChange(){
                this.$axios.post('/MyCertificate/UpdateCertificate', qs.stringify({
                    Type: this.$storage.getSession('idCardData').CertificateType,           //1 身份证 2 护照 3 军官证 4 回乡证 5 台胞证 6 港澳通行证 7其他
                    Code: this.idHolder,                                                    //证件号
                    CertificateId: this.$storage.getSession('idCardData').CertificateId,    //证件ID
                    EmpId: this.$storage.getSession('userMess').EmpId                       //员工ID
                })).then(res=>{
                    console.log(res)
                    // this.$router.go(-1)
                })
            },
            
            getApprovalData(url, json) {
                return this.$axios.post(url, qs.stringify({'json': JSON.stringify(json)}))
            },
     },
     created(){
        //  console.log(index,2222)
        //  this.idHolder = idCard[0].CertificateNumber
    //      this.getApprovalData('/MyCertificate/UpdateCertificate', {
    //                 Type: 1,
    //                 Code: 511322199210154912,
    //                 // CertificateId: this.$route.params.item.CertificateId,
    //                 CertificateId: this.idCard.CertificateId,
    //                 EmpId: this.$storage.getSession('userMess').EmpId
    //      }).then(res=>{
    //          console.log(res)
    //      })
     },
     props: ['idCard']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.Mydataname{ 
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: #ffffff;
    .Mydataul{
        width: 100%;
        height: auto;
        .Mydataultop{
            margin-top: .52rem;
        }
        li{
           width: 80%;
           margin-left: 10%;
           height: .3rem;
           line-height: .3rem;
           color:#000000;
           position: relative; 
           input{
               width: 100%;
               height: 100%;
               background-color: #ffffff;
               border: .01rem solid  #3696FD;  
               border-radius: .04rem;  
              
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
    }   
}   
</style>
