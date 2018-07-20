<template>
      <div class="Company">
            <x-header :showBack="true" :title="'请添加企业员工'" @go-back="goBack">
                   <div slot="right" class="icon">
                       <router-link to="/Entstaff"> 
                         <span>常旅客</span>   
                         <img src="../../assets/images/addenterl.png" alt="">
                       </router-link>
                   </div>
            </x-header>
             <div class="AddEnts">
                    <input type="text" placeholder="请输入搜索内容" v-model="valsage" @input="sss"> 
                    <img src="../../assets/images/cad.png" alt="">
             </div>
             <ul class="EntsChoice" >
                     <li v-for="(choice,i) in EntsChoice1" :key="i">
                         <p class="Choicetit">{{choice.title}}</p>
                         <p v-if="choice.Telephone">电话号码：{{choice.Telephone}}</p>
                         <p v-if="choice.Certificates">身份证：{{choice.Certificates}}</p>
                         <p class="Choicebott">{{choice.department}}</p>
                         <img src="../../assets/images/addenterbule.png" alt="">
                        
                     </li>
             </ul>
            
             
      </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'

import XHeader from '../common/header'

 export default {
      name: 'Company',
      components: {
            Tabbar,
            TabbarItem,
            XHeader
      },
      data: function() {
            return {
                valsage:"",
                EntsChoice1:[],
                EntsChoice:[
                       {
                         title:"田潇华",
                         Telephone:"87451208965",
                         Certificates:"45245572875587365878",
                         department:"技术部",
                       },
                       {
                         title:"李四",
                         Telephone:"8745120896532",
                         Certificates:"45245572875587365878",
                         department:"技术部",
                       },
                       {
                         title:"王五",
                         Telephone:"8745120896532",
                         department:"技术部",
                       },
                       {
                         title:"田潇华",
                         Certificates:"45245572875587365878",
                         department:"技术部",
                       },
                 ]
             
            } 
      },
      methods: {
            goBack(){
                 this.$router.go(-1);
            },
             sss() {
                let Citstring = this.EntsChoice;
                let ass = []
                if(this.valsage !=""){
                    for(var j = 0 ;j< Citstring.length;j++){
                        if(Citstring[j].title.match(this.valsage)){
                            ass.push(Citstring[j])
                            this.EntsChoice1 = ass
                        
                        } 
                    }
                        
                }  
        }
     }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
   
    .Company{
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
            width: 100%;
            height: .4rem;
            background-color:#ffffff;
            margin-top: .42rem;
            position: relative;
            input{
                width: 90%;
                margin-left: 5%;
                background-color: #E9E9E9;
                height: .3rem;
                border: 0;
                border-radius: .05rem;
                margin-top: .05rem;
                padding-left: .15rem;
            }
            img{
                position: absolute;
                right:8%;
                top: .12rem;
                height: .16rem;
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
                              right: .1rem;
                              top: .1rem;
                              font-size: .1rem;
                        }
                        img{
                              position: absolute;
                              width: .11rem;
                              top: .06rem;
                              left: .07rem;
                        }
                      
                  }
            }
       
   }
</style>
