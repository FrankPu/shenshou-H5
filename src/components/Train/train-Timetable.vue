<template>
      <div class="TrainTimetable">
                <x-header :showBack="true" :title="'列车时刻表'" @go-back="goBack"></x-header>     
            <!-- 主题内容 -->
               <div class="tbody">
                      <div>车站</div>
                      <div>到达</div>
                      <div>发车</div>
                      <div>停留</div>
               </div>
               <ul class="tlist">
                     <li class="ttable" v-for="(list,i) in ttable" :key="i">
                           <div>{{list.Station}}</div>
                           <div>{{list.Arrive}}</div>
                           <div>{{list.Start}}</div>
                           <div>{{list.Stop}}</div>
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
  name: 'TrainTimetable',
  data: function() {
      return {
           ttable:[
                {
                    Station:"贵阳北",
                    Arrive:"--",
                    Start:"13:53",
                    Stop:"--",
                },
                {
                    Station:"凯里南",
                    Arrive:"14:31",
                    Start:"14:34",
                    Stop:"3分钟",
                },
                {
                    Station:"铜仁南",
                    Arrive:"15:09",
                    Start:"15:14",
                    Stop:"5分钟",
                },
                {
                    Station:"贵阳北",
                    Arrive:"--",
                    Start:"13:53",
                    Stop:"3分钟",
                },
                {
                    Station:"贵阳北",
                    Arrive:"--",
                    Start:"13:53",
                    Stop:"3分钟",
                },
                {
                    Station:"贵阳北",
                    Arrive:"--",
                    Start:"13:53",
                    Stop:"3分钟",
                },
           ]
      } 
  },
   methods: {
      goBack(){
         this.$router.go(-1);
      }
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  }
 
}
</script>
<style scoped lang="less">
    .TrainTimetable{
        background-color: #e4e4e4;
        margin: 0;
        padding-top: .4rem;
          .tbody{
              width: 100%;
              height: .3rem;
              margin-top: .05rem;
              background-color: #ffffff;
              div{
                  float: left;
                  width: 25%;
                  line-height: .3rem;
                  height: 100%;
                  font-size: .14rem;
                  text-align: center;
              }
          }
          .tlist{
              width: 100%;
              height: auto;
              margin-top: .07rem;
              color: #8C8C8C;
              li:first-child{  color:#2577E3;}
              li{
                   width: 100%;
                   height: .3rem;
                   margin-top: .01rem;
                   background-color: #ffffff;
                    div{
                        float: left;
                        width: 25%;
                        line-height: .3rem;
                        height: 100%;
                        text-align: center;
                    }
                    
              }
          }
          
    }
        
        
       
</style>
