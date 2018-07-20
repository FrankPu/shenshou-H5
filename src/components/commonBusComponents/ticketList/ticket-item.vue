<template>
  <div class="ticketItem" @click="toFlightDetail(ticketItemData)">
    <div class="itemLeft">
      <div class="flightTime">
        <span class="startTime">{{ticketItemData.DepartTime}}</span>
        <img class="gotoIcon" src="../../../assets/images/goto@2x.png">
        <span class="endTime">{{ticketItemData.ArriveTime}}</span>
      </div>
      <div class="flightPlace">
        <span class="startPlace">{{ticketItemData.DepartAirport}} {{ticketItemData.DepartTerminal}}</span>
        <span class="endPlace">{{ticketItemData.ArriveAirport}} {{ticketItemData.ArriveTerminal}}</span>
      </div>
      <div class="flightMess">
        <img class="flightIcon" :src="ticketItemData.AirlineImg">
        <span class="flightText">{{ticketItemData.AirlineName}} {{ticketItemData.FlightNo}}</span>
        <span v-if="ticketItemData.IsCarrier" class="isShare">共享</span>
      </div>
    </div>
    
    <div class="itemRighe">
      <div class="priceMess">
        <span class="moneyIcon">￥<span class="ticketPrice">{{ticketItemData.TicketPrice}}</span></span>        
      </div>
      <div class="discountMess">{{isReturn ? '往返总价' : '折扣' + ticketItemData.Discount + '折'}}</div>
      <!-- <div class="prompt" v-if="isBusiness && ticketItemData.TicketPrice == minPrice">最后60分钟内<br>最低航班</div> -->
      <div class="other">
        <span v-if="ticketItemData.IsIllegal && isBusiness == 1" class="illegal">违</span>
        <span v-if="ticketItemData.CabinAmount<=5" class="few">少</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tickect-item',
  props: {
    ticketItemData: [Array, Object],
    isBusiness: Number
  },
  data: function() {
    return {
      isReturn: false
    }
  },
  methods :{
    toFlightDetail(ticketItemData) {
      this.$emit('to-flight-detail', ticketItemData)
    }
  }
}
</script>

<style scoped lang="less">
  .ticketItem {
    padding: .12rem;
    display: flex;
    background: #fff;
    border-radius: 5px;
    margin: .04rem .08rem 0 .08rem;
    .itemLeft {
      flex: 2;
      .flightTime {
        font-size: .18rem;
        color: #262626;
        .gotoIcon {
          margin: 0 .12rem;
          width: .4rem;
        }
      }
      .flightPlace {
        color: #9F9F9F;
      }
      .flightMess {
        color: #9F9F9F;
        margin-top: .12rem;
        .flightIcon {
          vertical-align: middle;
          width: .1rem;
          height: .1rem;
        }
        .flightText {
          vertical-align: middle;
        }
        .isShare {
          color: #2574DD;
          margin-left: .04rem;
          vertical-align: middle;
        }
      }
      .flightPlace .endPlace {
        margin-left: .1rem;
      }
      
    }
    .itemRighe {
      .priceMess {
        color: #FD6E0A;
        font-weight: 500;
        .ticketPrice {
          font-size: .2rem;
        }
      }
      .discountMess {
        color: #9F9F9F;
        text-align: center;
      }
      .discountMess, .filghtPrompt {
        margin-top: .06rem;
      }
      .other {
        margin-top: .06rem;
        .illegal {
          color: #FE0202;
          border: solid 1px #FE0202;
        }
        .few {
          color: #FD6E0A;         
          border: solid 1px #FD6E0A;         
        }
        .illegal, .few {
          display: inline-block;
          width: .16rem;
          height: .16rem;
          text-align: center;
          line-height: .16rem;
          border-radius: 50%;
        }
      }
    }
  }
</style>
