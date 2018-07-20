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
            <input type="text" placeholder="请输入搜索内容"> 
            <img src="../../assets/images/cad.png" alt="">
        </div>
        <div class="Compantbox">
            <div class="Compantit">成都八千翼科技有限责任公司(0)</div>
            <ul class="conmboxlist">
                    <li class="boxli" v-for="(boxli,boxlidex) in conmboxlist" :key="boxlidex">
                        <div class="boxlitop" @click="boxlitop(boxli, boxlidex)">
                            <img src="../../assets/images/201135551.png" alt="" class="boxtopadd" v-if="boxli.IsChecked">
                            <img src="../../assets/images/20113555.png" alt="" class="boxtopadd" v-else>            
                            <span>{{boxli.Name}}  （ {{boxli.Count}} ）</span>
                            <img src="../../assets/images/rightRow@2x.png" alt="" class="boxtopaddrow">
                        </div>
                        <!-- <ul class="boxlitopshow" v-show="boxli.IsChecked">
                            <li  class="vshowdaeta" v-for="(vshowdaeta,vshowdaetadex) in staffList" :key="vshowdaetadex">
                                <div class="vshowup" @click="vshowup(vshowdaetadex,boxlidex)">
                                    <img src="../../assets/images/fightOrder/Ticketfilling-2@1x.png" alt="" class="boxtopdode" v-show="vshowdaeta.upadd">
                                    <img src="../../assets/images/fightOrder/wrr.png" alt="" class="boxtopdode" v-show="vshowdaeta.upare">
                                    <span>{{vshowdaeta.PsgerName}}</span>
                                    <img src="../../assets/images/rightRow@2x.png" alt="" class="boxtopaddpring">
                                </div>
                            </li> 
                        </ul> -->
                    </li>
            </ul>
        </div>
        <div class="EntsCfid">
            <div class="entsdiv">已选择：{{gerStaffCount}}人</div>
            <div @click="commitPerson">确定</div>
        </div>
        <AdditionsEmployee :show="show" @close-popup="closePopup" :entsChoice="staffList[currentKey]" @sure-staff="sureStaff"></AdditionsEmployee>
    </div>
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import qs from 'qs'

import XHeader from '../common/header'
import AdditionsEmployee from './additionsEmployee'

 export default {
    name: 'Company',
    components: {
        XHeader,
        AdditionsEmployee
    },
    data: function() {
        return {
            user: this.$storage.getSession('userMess'),
            conmboxlist: [],
            staffList: {},
            show: false,
            chosedStaff: [],
            currentKey: '',
            staff: [],
            currentDepartName: ''
        } 
    },
    created() {
        this.$axios.post('/MyFrequentPassenger/GetListDepartment', qs.stringify({
            UserId: this.user.UserId,
            EnterpriseUserId: this.user.EnterpriseUserId,
            Token: this.user.Token
        })).then((res) => {       
            this.conmboxlist = res.data.Result
        })
    },
    computed: {
        gerStaffCount() {
            let count = 0
            this.chosedStaff.map(item => {
                let property = item.TId in item
                if(property) {
                    count += item[item.TId].length
                }
            })              
            return count
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        closePopup() {
            this.show = false
        },
        boxlitop(item, boxlidex){//第一级
            this.conmboxlist[boxlidex].IsChecked = !this.conmboxlist[boxlidex].IsChecked
            this.conmboxlist = [...this.conmboxlist]
            this.show = true
            this.currentKey = item.TId
            this.currentDepartName = item.Name
            let hasProperty = item.TId in this.staffList
            if(!hasProperty){
                  this.$axios.post('/MyFrequentPassenger/GetDepartmentEmp', qs.stringify({
                    UserId: this.user.UserId,
                    EnterpriseUserId: this.user.EnterpriseUserId,
                    DepartmentId: item.TId,
                    Token: this.user.Token,
                    EmpId: this.user.EmpId,
                    KeyValue: ''
                })).then((res) => {
                    this.staffList[item.TId] = res.data.Result
                    this.staffList[item.TId].map(item => {
                        item.isChecked = false
                    }) 
                    this.staffList = {...this.staffList}
                    this.chosedStaff.push(item)
                })
            }      
        },
        sureStaff(staff) {
            this.show = false
            let curIn = 0
            this.chosedStaff.filter((item, index) => {
                if(item.TId === this.currentKey) curIn = index
            })
            if(staff.length === 0) this.chosedStaff.splice(curIn,1) 
            else {
                staff.map(item => {
                    item.DepartmentName = this.currentDepartName
                })
                this.chosedStaff[curIn][this.currentKey] = staff
            }
            this.chosedStaff = [...this.chosedStaff]            
        },
        commitPerson() {
            let arr = []
            this.chosedStaff.map(item => {
                item[item.TId].map(val => {
                    arr.push(val)
                })
            })
            this.$storage.setSession('psgerAndDepart', arr)
            this.$router.go(-1)
        }
    }  
}

</script>
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
            background-color:#E9E9E9;
            margin-top: .42rem;
            position: relative;
            input{
                width: 90%;
                margin-left: 5%;
                background-color: #ffffff;
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
        .Compantbox{
            width: 100%;
            height: auto;
            .Compantit{
                width: 100%;
                height: .35rem;;
                line-height: .35rem;
                padding-left: .15rem;
                border-bottom: .01rem solid #e4e4e4; 
            }
           
            .conmboxlist{
                width: 100%;
                height:auto;
                margin: 0;
                padding: 0; 
                // 第一层级
                .boxli{  
                    width: 100%;
                    height: auto;
                    min-height: .3rem;
        
                    //  第一层级 div
                    .boxlitop{
                        position: relative;
                        width: 100%;
                        height: .35rem;;
                        line-height: .35rem;
                        padding-left: .15rem;
                        border-bottom: .01rem solid #e4e4e4; 
                        span{
                            padding-left: .13rem;
                            font-size: .13rem;
                        }
                        .boxtopadd{
                            position: absolute;
                            top: .105rem;
                            width: .13rem;
                            left: .12rem;
                        }
                        .boxtopaddrow{
                            width: .11rem;
                            position: absolute;
                            right: .05rem;
                            top: .1rem;
                        }
                    }
                    //第二层 ul
                    .boxlitopshow{
                         width:90%;
                         height: auto;
                         margin-left: 10%;
                         margin-top: .05rem;
                         //第二层 li
                         .vshowdaeta{
                             width: 100%;
                             height:auto;
                             border-left: .01rem solid #e4e4e4; 
                            //第二层 li duv
                            .vshowup{
                                width: 100%;
                                height: .2rem;
                                line-height: .2rem;
                                position: relative;
                                span{
                                    padding-left: .22rem;
                                    font-size: .1rem;
                                    color: #999999;
                                }
                                .boxtopdode{
                                    position: absolute;
                                    top: .05rem;
                                    width: .1rem;
                                    left: .05rem;
                                }
                                .boxtopaddpring{
                                    width: .1rem;
                                    position: absolute;
                                    right: .08rem;
                                    top: .05rem
                                }
                            }
                            //第三层ul
                            .showname{
                                width: 90%;
                                height: auto;
                                margin-left: 10%;
                                  //第三层li
                                .shownamelist{
                                    width: 100%;
                                    height: auto;
                                    ////第三层div
                                    .showtype{
                                        width: 100%;
                                        height: .2rem;
                                        line-height: .2rem;
                                        position: relative;
                                        span{
                                            padding-left: .22rem;
                                            font-size: .1rem;
                                            color: #999999;
                                        }
                                        .boxtopaddpring{
                                            width: .1rem;
                                            position: absolute;
                                            right: .08rem;
                                            top: .05rem
                                        }
                                    }
                                }
                            }   
                        }
                    }
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
                 div{
                        float: left;
                        width: 50%;
                        text-align: center;
                 }
                 .entsdiv{
                       background-color: #5694E5;
                 }
            }
   }
</style>
