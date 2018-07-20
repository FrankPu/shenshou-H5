<template>
      <div class="Mydataname">
            <x-header :showBack="true" :title="'修改名称'" @go-back="goBack"></x-header>
            <ul class="Mydataul">
                <li class="Mydataultop">
                    <input type="text" value="" placeholder="请输入姓名" v-model="userName">
                </li>
            </ul>
            <button id="Signout" @click="changeName()">确定</button>
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
                userName:''
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
            changeName(){
                this.$axios.post('/MyPersonalCenter/UpdatetPersonalCenter', qs.stringify({
                    UserId:this.$storage.getSession('userMess').UserId,
                    Token:this.$storage.getSession('userMess').Token,
                    EmpId:this.$storage.getSession('userMess').EmpId,
                    Value: this.userName,
                    Type: 1                     //1用户名，2手机号，3性别，4,生日，5邮箱
                })).then(res=>{
                    if(res.data.ResponseStatus.Ack ==1){    //如果修改成功
                        this.$router.go(-1);
                        console.log(res)
                    }
                })
            }
     }
    
}
</script>
<style scoped lang="less">
.Mydataname{
    z-index: 3; 
    position:fixed;
    top:0;
    bottom:0;
    background: #eeeeee;
    width: 100%;
    .Mydataul{
        width: 100%;
        height: auto;
        .Mydataultop{
            margin-top: .42rem;
        }
        li{
           width: 100%;
           height: .4rem;
           line-height: .4rem;
           color:#000000;
           position: relative; 
           input{
               width: 100%;
               height: 100%;
               background-color: #ffffff;
               border: none;
            //    border: .1rem solid  #3696FD;  
               border-radius: .04rem;  
               padding-left: .1rem;
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
