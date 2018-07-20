<template>
    <div class="flightSearchPopUp">
        <bottom-btn :btnData="btnData" @btnItemClick="btnItemClick"></bottom-btn>
        <popup v-model="showSearchPopup" position="bottom" height="3.2rem">
            <div class="topBtn">
                <span class="cancle" @click="$emit('close-search-popup')">取消</span>
                <span class="empty" @click="empty">清空筛选</span>
                <span class="sure" @click="sure">确定</span>
            </div>
            <div class="flightSearchBody">
                <ul class="filghtSearchBodyL">
                    <li v-for="(item, index) in searchBodyLData" :key="index" @click="searchBodyLItemClick(index)" 
                         :class="[{'isActive': currentIndex === index}, 'filghtSearchBodyLItem']">{{item.label}}</li>
                </ul>
                <ul class="filghtSearchBodyR">
                    <li class="secrchBodyRItem" @click="chosedUnlimited(type)">
                        不限
                       <label :class="[{'checked': unlimited}, 'check']"></label>
                    </li>
                    <li class="secrchBodyRItem" v-for="(val, index) in searchBodyRData[type]" :key="index" @click="filterClick(val, index)">
                        <div v-for="(item, k) in val" :key="k" v-if="k !== 'isChecked'">                            
                           {{item}}
                           <label :class="[{'checked': val.isChecked}, 'check']"></label>
                       </div>                                                       
                    </li>
                </ul>
            </div>
        </popup>       
    </div>
</template>

<script>
import BottomBtn from './bottom-btn'
import Popup from '../common/popup/index'

export default {
    name: 'SearchPopup',
    props: {
        searchData: [Object, Array],
        fetching: Boolean
    },
    data: function() {
        return {
            type: 'searchAirline',
            currentIndex: 0,
            unlimited: false,
            searchBodyRData: this.searchData,
            btnData: {
                popup: {
                    label: '筛选',
                    src: require('../../assets/images/match@2x.png'),
                    mode: ''
                }, 
                sortTime: {
                    label: '时间 晚→早',
                    src: require('../../assets/images/icon/timeIcon@1x.png'),
                    mode: 'asc'
                },
                sortPrice: {
                    label: '价格排序',
                    src: require('../../assets/images/icon/price@2x.png'),
                    mode: 'asc'
                }
            },
            searchBodyLData: [{ 
                label: '航空公司', type: 'searchAirline'      //AirlineName
            }, {  
                label: '起飞时间', type: 'searchTime'         //DepartTime
            }, { 
                label: '舱位', type: 'searchCabinDescribe'    //CabinDescribe
            }, { 
                label: '起飞机场', type: 'searchDepartAirport'   //DepartAirport
            }, { 
                label: '降落机场', type: 'searchArriveAirport'    //ArriveAirport
            }],
            showSearchPopup: false
        }
    },
    methods: {
        btnItemClick(data, key) {
            if(key == 'popup') {
                this.showSearchPopup = true
            } else if(key == 'sortTime') {
                if(this.btnData.sortTime.label == '时间排序') {
                    this.btnData.sortTime.label = '时间 晚→早'
                    this.btnData.sortTime.mode = 'desc'
                }
                this.btnData.sortTime.label = this.btnData.sortTime.label == '时间 晚→早' ? '时间 早→晚' : '时间 晚→早'
                this.btnData.sortTime.mode = this.btnData.sortTime.label == '时间 晚→早' ? 'desc' : 'asc'

                this.btnData.sortPrice.label = '价格排序'
                this.$emit('sort-flight-list', key, data.mode)
            } else if(key == 'sortPrice') {
                if(this.btnData.sortPrice.label == '价格排序') {
                    this.btnData.sortPrice.label = '价格 高→低'
                    this.btnData.sortPrice.mode = 'desc'
                }
                this.btnData.sortPrice.label = this.btnData.sortPrice.label == '价格 高→低' ? '价格 低→高' : '价格 高→低'
                this.btnData.sortPrice.mode = this.btnData.sortPrice.label == '价格 高→低' ? 'desc' : 'asc'
                this.btnData.sortTime.label = '时间排序'
                this.$emit('sort-flight-list', key, data.mode)
            }
            
        },
        searchBodyLItemClick(index) {
            this.currentIndex = index
            this.type = this.searchBodyLData[index].type
        },
        empty() {
            for(let key in this.searchBodyRData) {
                this.searchBodyRData[key].map((item, index) => {
                    item.isChecked = false
                })
            }
            this.searchBodyRData = {...this.searchBodyRData}
            this.showSearchPopup = false
        },
        sure() {
            this.showSearchPopup = false
            let search = {}
            for(let val in this.searchData) {
                search[val] = this.searchData[val].filter((item, index) => {
                    return item.isChecked
                })                
            }
            for(let k in search) {
                if(!k) return
                else {
                    if(search[k].length === 0) {
                        delete search[k]
                    }
                }
            }
            this.$emit('filter-flight-list', search)
        },
        filterClick(item, index) {
            item.isChecked = !item.isChecked
            this.unlimited = false
            this.searchBodyRData[this.type][index] = item
            this.searchBodyRData = {...this.searchBodyRData}
            let obj = {}
            obj.AirlineName = []
        },
        chosedUnlimited() {
            this.unlimited = !this.unlimited
            if(this.unlimited) {
                this.searchBodyRData[this.type].map((item, index) => {
                    item.isChecked = false
                })
                this.searchBodyRData = {...this.searchBodyRData}
            }            
        }
    },
    watch: {
        searchData: function (val) {
            this.searchBodyRData = val
        },
        fetching(val) {
            if(!val) {
                this.btnData.sortTime.label = '时间 晚→早'
                this.btnData.sortPrice.label = '价格排序'
            }            
        }
    },
    components: {
        BottomBtn,
        Popup
    }
}
</script>

<style scope lang="less">
    .flightSearchPopUp {
        font-size: .14rem;
        .vux-popup-dialog {
            overflow-y: hidden;
        }
        .topBtn {
            display: flex;
            height: .4rem;
            line-height: .4rem;
            background: #555555;
            .cancle {
                padding-left: .12rem;
                text-align: left;
            }
            .empty {
                text-align: center;
            }
            .sure {
                padding-right: .12rem;
                text-align: right;
            }
            span {
                flex: 1;
                
                color: #fff;
            }
        }
        .flightSearchBody {
            display: flex;
            color: #2F2F2F;
            background: #fff;
            // height: 100%;
            height: 28rem;
            .filghtSearchBodyL {
                flex: 1;
                list-style: none;
                background: #eee;
                .filghtSearchBodyLItem {
                    padding: .12rem 0 .12rem .15rem;                    
                    position: relative;
                    border-bottom: solid 1px #E2E2E2;
                }  
                .isActive {
                    background: #fff;
                }
            }
            .filghtSearchBodyR {
                flex: 2;
                padding-left: .11rem;
                list-style: none;
                overflow-y: auto;
                .secrchBodyRItem {
                    padding: .12rem 0 .12rem .15rem;
                    background: #fff;
                    position: relative;
                    border-bottom: solid 1px #E2E2E2;
                }          
            } 
                    
        }
        .check {
            display: inline-block;
            width: .2rem;
            height: .2rem;
            background: #E5E5E5;
            top: 0;
            bottom: 0;
            margin: auto;
            border-radius: .02rem;
            position: absolute;
            right: .12rem;
        }
        .checked {
            background: #2475DD;
            text-align: center;
        }
        .checked:after{
            content: '';
            display: inline-block;
            border: .02rem solid #fff;
            border-top-width: 0;
            border-right-width: 0; 
            width: .12rem;
            height: .06rem;
            transform: rotate(-50deg);
        }
    }
</style>
