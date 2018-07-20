<template>
      <div class="Entstaff">
            <popup v-model="show" position="right" width="100%">
                  <x-header :showBack="true" :title="'请添加企业员工'" @go-back="$emit('close-popup')"></x-header>
                  <ul class="EntsChoice" >                                              
                        <li v-for="(choice, i) in entsList" :key="i" @click="checked(choice, i)">
                              <p class="Choicetit">{{choice.PsgerName}}</p>
                              <p v-if="choice.Phone">电话号码：{{choice.Phone}}</p>
                              <p v-if="choice.CardID">身份证：{{choice.CardID}}</p>
                              <p class="Choicebott" v-if="!choice.Phone || !choice.CardID">信息不全点击补充</p>
                              <img src="../../assets/images/addenterbule.png" alt="">
                              <label class="check" :class="{checked: choice.isChecked}"></label>
                        </li>
                  </ul>
                  <div class="EntsCfid" @click="sureStaff">确定</div>
            </popup>
      </div>
</template>
<script>


import XHeader from '../common/header'
import Popup from '../common/popup/index'

 export default {
      name: 'Entstaff',
      components: {
            Popup,
            XHeader
      },
      props: {
            show: Boolean,
            entsChoice: [Object, Array]
      },
      data() {
            return {
                  entsList: this.entsChoice
            } 
      },
      methods: {
            checked(item, i){
                  //this.$set(this.entsList, i, )
                  this.entsList[i].isChecked = !this.entsList[i].isChecked
                  this.entsList = [...this.entsList]
            },
            sureStaff() {
                  let staff = this.entsList.filter(item => {
                        return item.isChecked
                  })
                  console.log(staff, '哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇哈士奇')
                  this.$emit('sure-staff', staff)
            }
      },
      watch: {
            entsChoice(val) {
                  this.entsList = val              
            }
      }
}
</script>

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
          
            .EntsChoice{
                  margin-top: .43rem;
                  width: 100%;
                  height: auto;
                  li{
                        border-bottom: .01rem solid #f5f5f5; 
                        list-style: none;
                        min-height: .3rem;
                        height: auto;
                        padding-bottom: .05rem;
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
                 height: .35rem;
                 line-height: .35rem;
                 width: 100%;
                 background: #2475DD;
                 color: #ffffff;
                 text-align: center;
            }
    }
</style>
