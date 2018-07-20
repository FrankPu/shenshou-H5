<template>
    <div class="Submission">
        <x-header :showBack="true" :title="'提交成功'"  @go-back="goBack"></x-header>
        <div class="SubmBox">
               <img src="../../assets/images/icon/susseed@2x.png" alt="">
               <p class="ptop">您的改签申请已经 提交成功！我们将尽快为您处理订单。改签审核通过后，预计XX处理完成。操作成功之后，将会为您发送确认短信，请注意查收！！</p>

               <p class="clolored">改签具有实时性，同时受航司舱位限制，因此不确保可以改签成功</p>>
        </div>
    </div>
</template>

<script>

import XHeader from '../common/header'


export default {
    name: "Submission",
    data: function() {
        return {
           
        }
    },
    components: {
        XHeader
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        
    }
}
</script>

<style scoped lang="less">
    .Submission {
       .SubmBox{
           margin-top: 8rem;
              width: 90%;
              margin-left: 5%;
              text-align: center;
              img{
                 
                  width: 14rem;
              }
              p{
                  text-align: left;
                  font-size: 1.4rem;
              }
              .ptop{
                  margin-top: 2rem;
                  color: #777777;
              }
              .clolored{
                  margin-top: .5rem;
                  color: #FB6376;
              }
       }
    }
</style>
