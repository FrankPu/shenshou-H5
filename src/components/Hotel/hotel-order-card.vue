<template>
    <div class="trainOrderCard">
        <span class="hotelPlace"><img src="../../assets/images/hotel/hotel@1x.png" />{{roomData.hotelName}}</span>
        <div class="stayMess">
            <span class="goTime">入住：{{roomData.checkInTime}}</span>
            <span class="leaveTime">离店：{{roomData.checkOutTime}}</span>
            <span class="checkInDaysNum">{{getDaysNum}}</span>
        </div>
        <div class="roomDesc">{{roomData.roomName}}-{{roomData.breakfastStr}}-{{roomData.roomBedType}}</div>
        <div class="checkInDesc">入住说明：{{roomData.isConfirm}} | 退订规则：{{roomData.policyTypeString}}</div>
    </div>
</template>

<script>
export default {
    name: 'hotel-order-card',
    data: function() {
        return {
            isOneWay: false
        }
    },
    props: {
        roomData: Object,
        daysNum: Number
    },
    computed: {
        getDaysNum() {
            return '共' + this.daysNum + '晚'
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
        font-size: .14rem;
        .hotelPlace {
            vertical-align: middle;
            img {
                height: .1rem;
                margin-right: .04rem;
                margin-top: -.02rem;
                vertical-align: middle;
            }
        }
        .stayMess {
            margin-top: .06rem;
            .leaveTime {
                margin-left: .12rem;
            }
        }
        .roomDesc {
            margin-top: .04rem;
        }
    }
</style>
