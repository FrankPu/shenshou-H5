<template>
    <div class="bgGray">
        <x-header :showBack="true" :title="Headertitle" @go-back="goBack">
            <img slot="right" class="icon ddicon" src="../../assets/images/shopping1.png" />
        </x-header>
        <train-header :originDepartureDate="trainParams.DepartureDate" @prevDaytypr="prevDaytypr"
            @nextDaytypr="nextDaytypr" @DatePickertypr="DatePickertypr" :endLocal="endLocal" :startLocal="startLocal"></train-header>
        <loading v-if="trainListInfo.fetching"></loading>
        <div v-else class="trainTabMain centerContent">
            <div class="oneTrainInfo" v-for="item in trainListInfo.appTrainInfo" :key="item.TrainCode" @click="toTrainDetail(item)">
                <div class="contentTop disFlex">
                    <div class="flex1 goTime">
                        <p class="time blueStateFont">{{item.StartTime}}</p>
                        <p class="citys">{{item.FromStation}}</p>
                    </div>
                    <div class="totTime fontLight">
                        <p class="trainNum">{{item.TrainCode}} <img src="~@/assets/images/icon/ID-ICON@2x.png" alt="" class="icon"></p>
                        <p class="allTime">{{item.CostTimeFormat}}</p>
                    </div>
                    <div class="flex1 arrvTime text-right">
                        <p class="time ">{{item.EndTime}}</p>
                        <p class="citys">{{item.ArriveStation}}</p>
                    </div>
                    <div class="price"><span class="fontSize-6 orgStateFont"><span class="fontSize-1">￥</span>{{item.TicketFee}}</span><span class=" fontSize-1">起</span></div>
                </div>
                <div class="contentBtm disFlex">
                    <span v-for="(val, index) in item.SeatInfos" :key="index">{{val.SeatTypeStr}}: {{val.SeatNum}}张</span>
                </div>
            </div>
        </div>
        <ul class="bgbottmbox">
            <li @click="fixdeboxshow()">
                <img src="../../assets/images/hotel/search@2x.png" alt="">
                <span>筛选</span>
            </li>
            <li class="ening" @click="Screeninglist1(i)" v-for="(seeing,i) in Screeninglist" :key="i" :class="{aivtion:seeing.aivtion}">
                <img :src="seeing.src" alt="">
                <span>{{seeing.text}}</span>
            </li>
        </ul>
        <popup v-model="showSearchPopup" position="bottom">
            <div class="fideboxdiv">
                <div class="fidutt">
                     <div  @click="Reset">清空</div>
                    <div class="fidu" @click="Determine">确定</div>
                </div>
                <div v-for="(screen,i) in trainListInfo.queryConditionDetail" :key="i">
                    <div class="dictrainDL">
                        <img src="../../assets/images/login/defds.png" alt="">
                        <span>{{screen.Key}}</span>

                    </div>
                    <div class="forckeck" v-for="(sctname,j) in screen.queryConditionAppDetail" :key="j">
                        <div class="dictrainDM" @click="ckengeed(i,j)">
                            <label class="check" :class="{checked:sctname.isChecked}"></label>
                            <span>{{sctname.Value}}</span>
                        </div>
                    </div>
                    <div class="caes"></div>
                </div>
                <div class="buttophight"></div>
            </div>
        </popup>
    </div>
</template>
<script>
import qs from 'qs'
import TrainHeader from '../common/Dateselection'
import XHeader from '../common/header'
import Popup from '../common/popup/index'
import Loading from '../common/loading'
import { mapGetters, mapActions, mapState  } from 'vuex'

export default {
    components: {
        XHeader,
        TrainHeader,
        Popup,
        Loading
    },
    data(){
        return {
            Headertitle:"",
            showSearchPopup:false,
            data:[],
            saveTrainListData: [],
            Screeninglist:[
                {
                    text:"早→晚",
                    src: require("../../assets/images/date@2x.png"),
                    aivtion: true
                },
                {
                    text:"耗时",
                    src:require("../../assets/images/date@2x.png"),
                    aivtion: false
                },
                {
                    text:"价格",
                    src:require("../../assets/images/price@2x.png"),
                    aivtion: false
                },
            ],
            screenbox: {},
            isBusiness: this.$route.query.isBusiness,
            trainParams: {
                ArriveStation: this.$route.query.ArriveStation,
                DepartureDate: this.$route.query.originDepartureDate,
                FromStation: this.$route.query.FromStation,
                UserId: this.$storage.getSession('userMess').UserId,
                Token: this.$storage.getSession('userMess').Token
            },
            endLocal: this.$route.query.endLocal,
            startLocal: this.$route.query.startLocal
        }
    },
    computed: {
        ...mapState([
            'trainListInfo'
        ]),
    },
    created(){

        if(parseInt(this.isBusiness)) {
            this.trainParams.EnterpriseID = this.$storage.getSession('userMess').EnterpriseUserId
            this.trainParams.EmpId = this.$storage.getSession('userMess').EmpId
        }
        this.Headertitle = this.trainParams.FromStation + " — " + this.trainParams.ArriveStation
        this.tranas()
    },
    methods:{
        tranas(){
            let url = parseInt(this.isBusiness) ? '/Train/PublicSearchTrainList' : '/Train/SearchTrainList'

            let trainListParams = {
                url: url,
                params: this.trainParams
            }

            this.$store.dispatch('getTrainList', trainListParams)
        },
        ckengeed(i,j){
            this.trainListInfo.queryConditionDetail[i].queryConditionAppDetail[j].isChecked =! this.trainListInfo.queryConditionDetail[i].queryConditionAppDetail[j].isChecked
        },
        fixdeboxshow(){
            this.showSearchPopup =true;
        },

        Reset(){
            this.trainListInfo.queryConditionDetail.map((item, index) => {
                item.queryConditionAppDetail.map((val, i) => {
                    val.isChecked = false
                })
            })
            this.trainListInfo.appTrainInfo = this.trainListInfo.saveTrainList
            this.showSearchPopup = false
        },
        goBack() {
            this.$router.go(-1);
        },
        Determine(){       //排序确定按钮
            let screenbox = this.trainListInfo.queryConditionDetail;
            let obj = {
                queryConditionDetail: []
            }
            screenbox = screenbox.map((item, index) => {
                let arr = []
                arr = item.queryConditionAppDetail.filter((val) => {
                    return val.isChecked
                })
                if(arr.length > 0){
                    obj.queryConditionDetail.push({ key: item.Key, queryConditionDetail: arr })
                }
            })
            this.filterTrainList(obj.queryConditionDetail)
        },
        filterTrainList(search) {
            this.trainListInfo.appTrainInfo = this.trainListInfo.saveTrainList
            this.showSearchPopup = false
            if(search.length == 0) return

            let tmpTrain = []
            search.map((item, index) => {
                if(item.key === '出发') {
                    item.queryConditionDetail.map((val, i) => {
                        tmpTrain = tmpTrain.concat(this.trainListInfo.saveTrainList.filter((v, k) => {
                            return val.Value === v.StartStation
                        }))
                    })

                } else if(item.key === '到达') {
                    item.queryConditionDetail.map((val, i) => {
                         tmpTrain = tmpTrain.concat(this.trainListInfo.saveTrainList.filter((v, k) => {
                            return val.Value === v.EndStation
                        }))
                    })
                } else if(item.key === '车型') {
                    item.queryConditionDetail.map((val, i) => {
                         tmpTrain = tmpTrain.concat(this.trainListInfo.saveTrainList.filter((v, k) => {
                            return val.Value === v.TrainTypeStr
                        }))
                    })
                } else if(item.key === '出发时间') {
                    let date = this.trainParams.DepartureDate

                    let startTime = date + ' ' + item.queryConditionDetail[0].Value.split('-')[0]
                    let endTime = date + ' ' + item.queryConditionDetail[item.queryConditionDetail.length - 1].Value.split('-')[1]
                    item.queryConditionDetail.map((val, i) => {
                        tmpTrain = this.trainListInfo.saveTrainList.filter((v, k) => {
                            return Date.parse(v.FromTime) >= Date.parse(startTime) && Date.parse(v.FromTime) <= Date.parse(endTime)
                        })
                    })
                }

                this.trainListInfo.appTrainInfo = tmpTrain
            })
        },
        sortTrainList(type, mode) {          //列表排序
            if(type === 0) {         //时间早晚排序
                if(mode === 'asc') {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return a.StartTime.split(':')[0] - b.StartTime.split(':')[0];//时间正序
                    })
                } else {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return b.StartTime.split(':')[0] - a.StartTime.split(':')[0]//时间倒叙
                    })
                }
            } else if(type === 1) {                 //时长排序
                if(mode === 'asc') {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return a.CostTime - b.CostTime     //时长正序
                    })
                } else {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return b.CostTime - a.CostTime       //时长倒叙
                    })
                }
            } else if(type === 2) {                 //价格排序
                if(mode === 'asc') {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return a.TicketFee - b.TicketFee      //价格正序
                    })
                } else {
                    this.trainListInfo.appTrainInfo.sort(function(a,b){
                        return b.TicketFee - a.TicketFee    //价格倒叙
                    })
                }
            }
        },
        Screeninglist1(i){
                let eningd = document.querySelectorAll(".ening")
                for(let j=0;j<eningd.length ; j++) {
                    this. Screeninglist[j].aivtion =false;
                }
                this.Screeninglist[i].aivtion =true;

                if(i==0){
                    if(this.Screeninglist[i].text=="早→晚") {    //降序
                    this.Screeninglist[i].text = "晚→早"
                    this.sortTrainList(0, 'desc')
                    } else if(this.Screeninglist[i].text=="晚→早"){         //升序
                    this.Screeninglist[i].text = "早→晚"
                    this.sortTrainList(0, 'asc')
                    } else {
                    this.Screeninglist[0].text ="早→晚";
                    this.sortTrainList(0, 'asc')
                    this.Screeninglist[1].text ="耗时";
                    this.Screeninglist[2].text ="价格"
                    }
                } else if(i==1){
                    if(this.Screeninglist[i].text=="短→长") {        //降序
                    this.Screeninglist[i].text ="长→短"
                    this.sortTrainList(1, 'desc')
                    } else if(this.Screeninglist[i].text=="长→短" ) {             //升序
                    this.Screeninglist[i].text = "短→长"
                    this.sortTrainList(1, 'asc')
                    } else {
                        this.Screeninglist[1].text ="短→长";
                        this.sortTrainList(1, 'asc')
                        this.Screeninglist[0].text ="时间";
                        this.Screeninglist[2].text ="价格";
                    }
                } else if(i==2){
                    if(this.Screeninglist[i].text=="低→高") {            //降序
                        this.Screeninglist[i].text ="高→低";
                        this.sortTrainList(2, 'desc')
                    } else if(this.Screeninglist[i].text=="高→低" ) {            //升序
                        this.Screeninglist[i].text ="低→高";
                        this.sortTrainList(2, 'asc')
                    } else {
                        this.Screeninglist[2].text ="低→高";
                        this.sortTrainList(2, 'asc')
                        this.Screeninglist[0].text ="时间";
                        this.Screeninglist[1].text ="耗时";
                    }
                }

        },
        toTrainDetail(train){
            this.$storage.setSession('trainData', train);   //存入选中的火车数据
            this.$router.push({
                path:'/traindetail',
                query:{
                    ArriveStation: train.ArriveStation,
                    DepartureDate: this.trainParams.DepartureDate,
                    FromStation: train.FromStation,
                    TrainCode: train.TrainCode,
                    isBusiness: this.isBusiness,
                    endLocal: this.endLocal,
                    startLocal: this.startLocal
                }
            });
        },
        DatePickertypr(date){
            this.trainParams.DepartureDate = date
            this.tranas()
        },
        nextDaytypr(date){
            this.trainParams.DepartureDate = date
            this.tranas();
        },
        prevDaytypr(date){
            this.trainParams.DepartureDate = date
            this.tranas()
        }
    }
}
</script>

<style scoped>
@import '../../assets/css/test.css';
.bgGray{
   width: 100%;
}
.ddicon{
      width: .15rem;
      height: .15rem;
}
.trainTabMain {
    width: 100%;
    margin-top: .75rem;
}

.trainTabMain .oneTrainInfo {
	background: #ffffff;
	height: auto;
	border-radius: 0.04rem;
	margin-top: 0.04rem;
}

.trainTabMain .oneTrainInfo .contentTop {
	height: 1rem;
	/* border-bottom: 1px dashed #e2e2e2; */
    padding-top: .23rem;
    border: 1px dashed #e2e2e2;
}
.trainTabMain .oneTrainInfo .contentTop .time {
	font-size: .18rem;
	line-height: .1rem;
    padding-top: .05rem;
	font-weight: 600;
}
.trainTabMain .oneTrainInfo .contentTop .citys {
	font-size: .13rem;
	line-height: .4rem;
}
.trainTabMain .oneTrainInfo .contentTop .goTime {
    text-align: center;
}
.trainTabMain .oneTrainInfo .contentTop .arrvTime {
    text-align: center;
}

.trainTabMain .oneTrainInfo .contentTop .totTime {
	width: 1rem;
	text-align: center;
    font-size: 0.096rem;
}

.trainTabMain .oneTrainInfo .contentTop .totTime .trainNum {
	line-height: .2rem;
	border-bottom: 1px solid #e2e2e2;
}

.trainTabMain .oneTrainInfo .contentTop .totTime .allTime {
	line-height: .25rem;
    width:100%;

}

.trainTabMain .oneTrainInfo .contentTop .totTime .icon {
	width: .128rem;
	height: .128rem;
	margin-top: -0.016rem;
}

.trainTabMain .oneTrainInfo .contentTop .price {
	width: .616rem;
    line-height: .3rem;
}

.trainTabMain .oneTrainInfo .contentTop .price .orgStateFont {
	font-weight: 600;
}

.trainTabMain .oneTrainInfo .contentBtm{
	font-size: 0.096rem;
	width:100%;
    height: .3rem;
	padding-left: 0.08rem;
	line-height: .3rem;
}
.contentBtm span{
    text-align: center;
    flex: 1;
}
.bgbottmbox{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    background-color:#595959;
    color:#FFF;
    display: flex;
}
.bgbottmbox li{

    height: 100%;
    flex: 1;
    text-align: center;
    border-right: .01rem solid #ffffff;
}
.bgbottmbox .aivtion{
     color: #2475DD;
}
.bgbottmbox li img{
    vertical-align: middle;
    width: .12rem;
    margin-top: -.02rem;
     /* position: absolute;
     top:.8rem;
     left:1rem; */
}
.bgbottmbox li span{
      /* position: absolute;
      left:2.5rem; */
      display: inline-block;
      height: 100%;
}
#fixedBox{
     position: fixed;
     width: 100%;
     z-index: 22;
     top: 0;
     bottom: 0;
     background-color: rgba(127,127,127,0.3);
     overflow: hidden;
}
.fideboxdiv{
    bottom:0;
    width: 100%;
    height:auto;
}
.fidutt{
   width: 100%;
   height: .4rem;
   text-align: center;
   line-height:.4rem;
   border-bottom: .01rem solid #e4e4e4;
}
.fidutt div{
    float: left;
    width: 50%;
    border: 0;
    color: #2577e3;
    background-color: #ffffff;
    height: 100%;
}
.fidutt .fidu{
    color: #ffffff;
    background-color: #2577e3;
}
.sfsf{
    width: 100%;
    height: 5.0rem;
    border: 1px solid;
}
.dictrainDL{
    width: 100%;
    margin-top: .1rem;
    color:#000;
}
.dictrainDL > span{
   margin-left: .08rem;
   line-height: .2rem;
}
.dictrainDL > img{
   margin-left: .1rem;
   height: .15rem;
   width: .025rem;
   vertical-align: middle;
   /* top: -1.8rem;
   position: relative; */
}
.caes{
    clear:both
}
.buttophight{
    height: .2rem;
    width: 100%;
}
/* 111 */
.forckeck{
     width: 100%;
     height: auto;
}
.forckeck >div{
    float: left;
}
.dictrainDM{
    width: 45%;
    height: .2rem;
}
.dictrainDM span{
    color: #777777;
    padding-left: .2rem;
    line-height: .31rem;
}
    .check{
        display: inline-block;
        width: .12rem;
        height: .12rem;
        position: relative;
        top: 0.02rem;
        margin: auto;
        background-color: #D8D8D8;
        border-radius: .02rem;
        left: .1rem;
    }
    .checked{
        text-align: center;
        background-color: #2475DD;
    }
    .checked:after{
        content: '';
        display: inline-block;
        border: .02rem solid #ffffff;
        border-top-width: 0;
        border-right-width: 0;
        width: .07rem;
        height: .05rem;

        transform: rotate(-50deg);
        margin-bottom: .04rem;
    }
</style>
