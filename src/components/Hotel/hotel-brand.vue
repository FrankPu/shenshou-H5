<template>
      <div class="Hotelbrand"> 
          <popup v-model="brandshow"  width="100%" position="right">
                <div class="brand">
                       <span>{{brandtitle}}</span>
                      <img src="../../assets/images/icon/back.png" alt=""  @click="$emit('Hotelbrand')">
                </div>
                <div class="BrandBox">
                         <ul class="boxleft">
                               <!--  -->
                              <li @click="lefttitle(boxleft, leftindex)" :class="{leftbule:isleftcolor === leftindex}" v-for="(boxleft,leftindex) in BrandBox" :key="leftindex">{{boxleft.KeyWords}}</li>
                         </ul>
                         <ul class="boxright">
                                <li @click="righttitle(rigindex,boxright)" :class="{rightbule:isrightcolor === rigindex}" v-for="(boxright,rigindex) in BrandBRight" :key="rigindex">{{boxright.Name}}</li>
                         </ul>
                </div>
          </popup>
      </div>
</template>
<script>
import XHeader from '../common/header'
import Popup from '../common/popup/index'
// 临时模拟数据
import Seahbrand from '../common/addressPicker/searchtwo.json'
 export default {
      name: 'Hotelbrand',
      components: {
            XHeader,
            Popup
      },
      props: {
            brandshow: Boolean,
            brandtitle: String,
        },
      data: function() {
            return {
               Seahbrand: Seahbrand,  
               BrandBox:[],
               BrandBRight:[],
               isleftcolor:0,
               isrightcolor:0,
               currentKeyWords: '',

            } 
      },
      created(){
           //if(this.brandtitle == "品牌"){
                  console.log(this.Seahbrand.Result)
                  this.BrandBox = this.Seahbrand.Result;
                  this.BrandBRight = this.Seahbrand.Result[0].listSearchCriteria
           //}
      },
      methods: {
            lefttitle(boxleft, i){
                  this.isleftcolor = i;
                  this.currentKeyWords = boxleft.KeyWords
                  this.BrandBRight = this .Seahbrand.Result[i].listSearchCriteria
            },
            righttitle(i,item){
                  this.isrightcolor = i      
                  let currentBrand = item
                  currentBrand.KeyWords = this.currentKeyWords
                  this.$emit('chose-key-word', currentBrand)
            }
      }
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

      .brand{
            width: 100%;
            height: .4rem;
            background-color:#2577E3;
            text-align: center;
            line-height: .4rem;
            position: relative;  
      }
      .brand span{
            font-size: .18rem;
            color: #ffffff;
      }
      .brand  img{
            position: absolute;
            left: .15rem;
            width: .2rem;
            top: .1rem;
      }
      .BrandBox{
            position: absolute;
            width: 100%;
            bottom: 0;
            top: .4rem;
            background-color: #ffffff;
            list-style: none;
      }
      .boxleft{
            width:25%;
            height: 100%;    
            float: left;
            border-right: .01rem solid #e4e4e4;
      }
      .boxleft > li{
            width: 100%;
            height: .35rem;
            text-align: center;
            line-height: .35rem;
            background-color: #e4e4e4
      }
      .boxleft > .leftbule{
            color: #2577E3;
            background-color: #ffffff;

      }
      .boxright{
            float: left;
            width: 74%;
            height: 100%;
            overflow-y: auto;
      }
      .boxright li{
            width: 100%;
            height: .35rem;
            text-align: left;
            line-height: .35rem;
            padding-left: .15rem;
            background-color: #ffffff;
            border-bottom: .01rem solid #e4e4e4;
      }
      .boxright > .rightbule{
            color: #2577E3;
            background-color: #ffffff; 
      }
</style>
