<template>
      <div class="Mydatapassw">
            <x-header :showBack="true" :title="'获取验证码'" @go-back="goBack"></x-header>
            <ul class="Mydataul">
                <li class="Mydataultop">
                    <input type="text" value="18612349876"/> 
                    <span v-show="ZNNDshow" @click="timedown()">点击获取验证码</span>
                     <span v-show="ZNNDhied">重新获取({{time2}})</span>
                </li>
                <li>
                    <input type="text" v-model="valsage"  @input="putcheck" placeholder="输入验证码"/> 
                </li>
            </ul>
             <button class="Signout" :class="{SignoutOK:isout}"  @click="Signout()">下一步</button>
                <div v-show="datashow">
                    <countdown v-model="time2" :start="start" ></countdown>
                </div>
      </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Group from 'vux/src/components/group/index'
import Cell from 'vux/src/components/cell/index'
import Countdown from 'vux/src/components/countdown/index'
import XSwitch from 'vux/src/components/x-switch/index'

import XHeader from '../common/header'

 export default {
      name: 'Mydatapassw',
        components: {
            Group,
            Cell,
            Countdown,
            XSwitch,
            XHeader
        },
      data: function() {
              return {
                    valsage:"",
                    isout:false,
                    ZNNDshow:true,
                    ZNNDhied:false,
                    datashow:false,
                    time2: 60,
                    value: '',
                    start: false,
              }
      },
    watch: {
        time2(old) {
            if(old == 0) {
                this.time2 = 60
                this.start = false
                this.ZNNDshow=true
                this.ZNNDhied=false
            }
         }
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
            timedown(){ 
                    console.log('1')
                   this.ZNNDshow =false;
                   this.ZNNDhied = true;
                   this.start=true; 
            } ,
            putcheck(){
                  let Code = this.valsage;
                  if(Code == ""){
                          this.isout=false
                  }else{
                      this.isout=true
                  }
            },
            Signout(){
                  let Code = this.valsage;
                  if(Code == ""){
                        alert('输入验证码哦！！！！')
                  }else{
                      alert('OK')
                  }
                
            }   
     }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .Mydatapassw{ 
       .Mydataul{
        width: 100%;
        height: auto;
        
        .Mydataultop{
            margin-top: .42rem;
        }
        li{
           width: 80%;
           margin-left: 10%;
           height: .37rem;
           line-height: .37rem;
           color:#000000;
           border-bottom: .01rem solid #f5f5f5; 
           position: relative;
           input{
               width: 50%;
               height: 100%;
               border: 0;
           }
           span{
               color: #2474DE;
               float: right;
               margin-right: .1rem;
           }    
        }    
    }
    .Signout{
        width: 80%;
        height: .35rem;
        color: #ffffff;
        border: 0;
        border-radius: .04rem; 
        margin-left: 10%;
        margin-top: .4rem;
    } 
    .SignoutOK{
        background-color: #2474DE;
    }
     
}   
</style>
