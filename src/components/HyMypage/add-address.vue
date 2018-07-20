<template>
      <div class="MyInmod">
            <x-header :showBack="true" :title="'添加地址'" @go-back="goBack"></x-header>
            <div>                
                <div  class="modivname">
                    <div class="moformbox mofrotop">
                         <div class="molblet"><p>姓名</p></div>
                            <div class="moinput">
                                <input type="text" v-model="addressee" placeholder="请填写收件人姓名">
                            </div>
                        </div> 
                        <div class="moformbox mofrotop">
                            <div class="molblet"><p>手机号码</p></div>
                            <div class="moinput">
                                <input type="text" v-model="mobile" placeholder="请填写手机号码">
                            </div>
                        </div>     
                        <div class="moformbox mofrotop"> 
                            <div class="molblet"><p>所在地区</p></div>
                        <!-- <group> -->
                            <x-address title="请选择" @on-hide="logHide" @on-show="logShow" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" :placeholder="value.toString()" ></x-address>
                        <!-- </group> -->
                        </div>  
                        <div class="moformbox mofrotop">
                            <div class="molblet"><p>详细地址</p></div>
                            <div class="moinput">
                                <input type="text" v-model="address" placeholder="不必重复填写省市区信息">
                            </div>
                        </div>  
                    </div>                
                    <button class="inomodbutt" @click="editAddress()">提交</button>      
            </div>   
        </div>   
</template>
<script>
// import { Tabbar, TabbarItem } from 'vux'   不要以这种方式引用，会出问题
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import Tabbar from 'vux/src/components/tabbar/tabbar'
import TabbarItem from 'vux/src/components/tabbar/tabbar-item'
import PopupPicker from 'vux/src/components/popup-picker/index'
import qs from 'qs'
import XHeader from '../common/header'
import { XAddress,ChinaAddressV4Data } from 'vux'
export default {
    components: {
        Tabbar,
        TabbarItem,
        PopupPicker,
        XHeader,
        XAddress
    },
    data: function() {
        return {
            addressData: ChinaAddressV4Data,
            phone:"11645123416569+56256",//手机号码        
            Certifi:"511114454578983985529",//证件号
            //Gender:"男",//性别
            value1: ['身份证'],
            value2: ['男'],
            list1: [['身份证', '签证', '士兵证', '军官证', '没有证', '其他', '不告诉你']],
            list2: [['男', '女',  '不告诉你']],
            value: [],
            addressee:'',
            mobile:'',
            province: '',
            city:'',
            district:'',
            address:''
        } 
    },
    methods: {        
        goBack(){
            this.$router.push('/myinformation')
        },
        editAddress(){
            this.$axios.post('/Address/UpdateAddress', qs.stringify({
                PostCode: null,
                Address: this.address,
                Mobile: this.mobile,
                UserId: this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token,
                Province: this.province,        //省
                City: this.city,                //市
                District: this.district,        //区       
                Addressee: this.addressee       //详细地址                
            })).then(res=>{

            })
        },
        logHide (str) {
            console.log('on-hide', str)
        },
        logShow (str) {
            console.log('on-show')
        },
        //地址更改
        onShadowChange (ids, names) {
            console.log(ids, names);
        },
    },
    created(){
        console.log(this.$route.params)
        if(JSON.stringify(this.$route.params) != '{}'){             //编辑已有地址
            this.addressee = this.$route.params.address.Addressee,
            this.mobile = this.$route.params.address.Mobile,
            this.address = this.$route.params.address.Address,
            this.province = this.$route.params.address.Province,
            this.city = this.$route.params.address.City,
            this.district = this.$route.params.address.District
            // console.log([this.province, this.city, this.district])
        }else{                                                      //新增地址
            console.log('我是新增')
        }        
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    body{
        background-color: #f5f5f5;
    }  
    .vux-cell-box:not(:first-child):before {
         border-top:0;  
    }
    .MyInmod{
        width: 100%;
        height: auto;
        font-family: '微软雅黑';
        overflow: hidden;
        .modertop{
            width: 100%;
            height: .4rem;
            background-color: blue;
            line-height: .4rem;
            color:#fff;
            text-align: center;
        }
        .modivname{
            width: 96%;
            margin-left:2%;
            margin-top: .45rem;
            height: 1.93rem;                        
        }
        .monameleft{
            float: left;
            width: 80%;
            height: 100%;
        }
        .monameright{
            float: right;
            width: 18%;
            height: 100%;             
            background-color: #ffffff;
        }
        .moformbox{
            width: 100%;
            height: .35rem;
            background-color: #ffffff;
            position:relative;
        }
        .Inimgse{
            position:absolute;
            top: .14rem;
            right: .2rem;
        }
        .mofrotop{
           border-bottom: .02rem solid #F5F5F5; 
        }
        .molblet{
            width: .7rem;
            height: 100%;
            line-height: .35rem;           
            float: left;
            text-align: left;        
        }
        .moppirev{
            position: relative;
            z-index: 9999;
            border: 1px solid;
        }
        .molblet p{
            padding-left: .13rem;
        }
        .moinput{
            width: 60%;
            height: 100%;
            float: left;
        }
        .moinput > input{
            border: 0;
            outline:medium;
            height: 100%;
            width: 100%;
            background-color: #ffffff;
        }
        .mofrotop >  .popicker{               
            line-height: .35rem;
            color: #757575;
        }
        .inomodbutt{
            width: 96%;
            height: .4rem;
            margin-left: 2%;
            border-radius: 0.05rem;  
            color:#fff;
            background-color: #2577E3;
        }
    } 
</style>
