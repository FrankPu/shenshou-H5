<template>
    <div class="trainOrderCard">
        <div class="trainTime">2018-11-10 04:31 星期五</div>
        <div class="trainMess">
            <div class="startMess">
               <div class="startPlace">成都东</div>
               <div class="startTime">08:00</div>
            </div>
            <div class="centerMess">
               <div class="trainId">K7909</div>
               <div class="icon">时刻表<img class="toIcon" src="../../assets/images/train/icon20@1x.png" /></div>
               <div class="allTime">15分钟</div>
            </div>
            <div class="endMess">
                <div class="endPlace">上海虹桥</div>
                <div class="endTime">10:15</div>
            </div>
        </div>
        <ul class="trainType">
            <li class="trainTypeItem" v-for="(item, index) in trainTypeData" :key="index">
                <div class="type">{{item.type}}</div>
                <div class="price">￥{{item.price}}</div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'order-card',
  data: function() {
    return {
       isOneWay: false,
       trainTypeData: [{
           type: '软卧(无)',
           price: '737.9'
       }, {
           type: '软卧(无)',
           price: '737.9'
       }, {
           type: '软卧(有)',
           price: '737.9'
       }, {
           type: '软卧(无)',
           price: '737.9'
       }]
    }
  }
}
</script>

<style scoped lang="less">  
    .trainOrderCard {
        color: #fff;
        background: url('../../assets/images/img1@2x.png');
        padding: .12rem;
        margin-top: .4rem;
        .trainTime {
            font-size: .16rem;
            text-align: center;
        }
        .trainMess {
            display: flex;
            margin-top: .08rem;
            align-items: center;
            .startMess, .centerMess, .endMess {
                flex: 1;
                text-align: center;
            }
            .startTime, .endTime {
                font-size: .16rem;
            }
            .centerMess {
                position: relative;
                .icon {
                    background: #fff;
                    border-radius: .5rem;
                    color: #4A8CE3;
                    width: .5rem;
                    text-align: center;
                    display: inline-block;
                }
                .toIcon {
                    position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
            }           
        }
        .trainType {
            list-style: none;
            display: flex;
            margin-top: .08rem;
            text-align: center;
            .trainTypeItem {
                flex: 1;
                font-size: .14rem;
                border: solid 1px #fff;
                border-radius: 0.2rem;
                margin-left: .04rem;
                padding: .04rem;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
</style>
