<template>
      <div class="Entstaff">
            <x-header :showBack="true" :title="'请选择常旅客'" @go-back="goBack">
                  <div slot="right" class="icon">
                        <router-link to="/Company"> 
                              <span>公司员工</span>   
                              <img src="../../assets/images/addenterl.png" alt="">
                        </router-link>
                  </div>
            </x-header>
            <div class="AddEnts" @click="addPassenger">
                  <img src="../../assets/images/addenter.png" alt="">
                  <span>添加旅客</span>
            </div>
            <ul class="EntsChoice" >
                  <li v-for="(choice,i) in EntsChoice" :key="i">
                        <p class="Choicetit">{{choice.PsgerName}}</p>
                        <p v-if="choice.Phone">电话号码：{{choice.Phone}}</p>
                        <p v-if="choice.CardID">身份证：{{choice.CardID}}</p>
                        <p class="Choicebott" v-if="!choice.Phone || !choice.CardID">信息不全点击补充</p>
                        <img src="../../assets/images/addenterbule.png" alt="">
                        <label class="check" @click="checked(choice)" :class="{checked:choice.isChecked}"></label>
                  </li>
            </ul>
            <div class="EntsCfid">
                  <div class="entsdiv" @click="operPopup">已选择：{{chosedEnts.length}}人</div>
                  <div @click="sureEntsPerson()">确定</div>
            </div>
            <popup v-model="showPopup" position="bottom">
                  <ul class="chosedPersonList">
                        <li class="chosedPersonItem" v-for="(item, index) in chosedEnts" :key="index">
                              {{item.PsgerName}}
                              <span class="deleteData" @click="deleteData(item, index)"><span></span></span>
                        </li>
                  </ul>
            </popup>
      </div>
</template>
<script>

import XHeader from '../common/header'
import Popup from '../common/popup/index'
import qs from 'qs'

 export default {
      name: 'Entstaff',
      components: {
            XHeader,
            Popup
      },
      data: function() {
            return {
                  valsage:"",
                  EntsChoice:[],
                  showPopup: false,
                  chosedEnts: []
            } 
      },
      created() {
            this.$axios.post('MyFrequentPassenger/GetFrequentPsger', qs.stringify({
                  UserId: this.$storage.getSession('userMess').UserId,
                  Token: this.$storage.getSession('userMess').Token
            })).then((res) => {
                  this.EntsChoice = this.EntsChoice.concat(res.data.Result)
                  this.EntsChoice.map((item, index) => {
                    item.isChecked = false
                 })
                 
            }).catch((error) => {

            })
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
            checked(item){
                  item.isChecked = !item.isChecked
                  this.EntsChoice = [...this.EntsChoice]
                  this.$storage.setSession('allEntsData', this.EntsChoice)
                  this.chosedEnts = this.filterChosedEnts()
            },
            sureEntsPerson() {
                  this.chosedEnts = this.filterChosedEnts()
                  this.$router.go(-1)
                  this.$storage.setSession('entsData', this.chosedEnts)
            },
            filterChosedEnts() {
                  return this.EntsChoice.filter((item, index) => {
                        return item.isChecked
                  })
            },
            operPopup() {
                  if(this.chosedEnts.length === 0) {
                        this.showPopup = false
                        return 
                  }
                  this.showPopup = !this.showPopup
            },
            deleteData(item, index) {
                  this.chosedEnts.splice(index, 1)
                  this.EntsChoice.map((val, i) => {
                        if(item.CardID === val.CardID) {
                              val.isChecked = false
                        }
                  })
                  if(this.chosedEnts.length === 0) this.showPopup = false
            },
            addPassenger() {
                  this.$router.push('/addpsger')
            }
     }   
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
   
    .Entstaff{
          background-color: #ffffff;
          height: auto;
           .icon{
                  position: relative;
                  font-size: .1rem;
                  img{
                        position: absolute;
                        width: .1rem;
                        top: -.025rem;
                        left: -.51rem;
                  }
                  span{
                        position: absolute;
                        top: -.05rem;
                        left: -.4rem;
                        color: #C7D7F6;
                  }
            }
            .AddEnts{
                  margin-top: .4rem;
                  line-height: .35rem;
                  height: .35rem;
                  position: relative;
                  width: 100%;
                  border-bottom: .01rem solid #f5f5f5; 
                  img{
                        position: absolute;
                        margin-top: .1rem;
                        left:.08rem;
                        width: .13rem;
                  }
                  span{
                        padding-left: .25rem;
                        color: #2B7AE4;
                  }
            }
            .EntsChoice{
                  width: 100%;
                  height: auto;
                  li{
                        border-bottom: .01rem solid #f5f5f5; 
                        list-style: none;
                        min-height: .3rem;
                        height: auto;
                        padding-bottom:.05rem;
                        position: relative;
                        p{    
                              
                              color: #8D8D8D;
                              padding-left: .25rem;
                        }
                        .Choicetit{
                              font-size: .13rem;
                              color: #000000;
                              padding-top: .05rem;
                        }
                        .Choicebott{
                              position: absolute;
                              right: 0;
                              bottom: .05rem;
                              font-size: .1rem;
                        }
                        img{
                              position: absolute;
                              width: .11rem;
                              top: .06rem;
                              left: .07rem;
                        }
                        .check {
                              display: inline-block;
                              width: .12rem;
                              height: .12rem; 
                              position: absolute;
                              background-color: #8D8D8D;
                              top: .1rem;  
                              margin: auto;
                              border-radius: .02rem;
                              right: .1rem;
                        }
                        .checked {
                              text-align: center;
                              background-color: #2475DD;
                        }
                        .checked:after{
                              content: '';
                              display: inline-block;                              
                              border: .01rem solid #ffffff;
                              border-top-width: 0;
                              border-right-width: 0; 
                              width: .08rem;
                              height: .05rem;
                              margin-bottom: .04rem;
                              transform: rotate(-50deg);
                        }
                  }
            }
            .EntsCfid{
                 position: fixed;
                 z-index: 22;
                 bottom: 0;
                 height: .4rem;
                 line-height: .4rem;
                 width: 100%;
                 background: #2475DD;
                 color: #ffffff;
                 z-index: 502;
                 div{
                        float: left;
                        width: 50%;
                        text-align: center;
                 }
                 .entsdiv{
                       background-color: #5694E5;
                 }
            }
            .vux-popup-dialog {
                 bottom: .4rem;
            }
            .vux-popup-mask {
                  bottom: .4rem;
            }
            .chosedPersonList {
                  .chosedPersonItem {
                        display: inline-block;
                        width: 25%;
                        text-align: center;
                        padding: .08rem 0;
                        border-bottom: solid 1px #EBEBEB;
                        .deleteData {
                              background-color: #BEBEBE;
                              text-align: center;
                              width: .12rem;
                              height: .12rem;
                              line-height: .12rem;
                              border-radius: 50%;
                              display: inline-block;
                              margin-left: .04rem;
                              span {
                                    display: inline-block; 
                                    width: .08rem;
                                    height: .01rem; 
                                    background: #fff;
                                    line-height: 0;
                                    font-size:0;
                                    vertical-align: middle;
                                    transform: rotate(45deg);
                              } 
                              span:after {
                                    content:'';
                                    display: block;
                                    width: .08rem;
                                    height: .01rem; 
                                    background: #fff;                    
                                    transform: rotate(-90deg);
                              }
                        }
                  }
            }
    }
</style>
