<template>
  <div class="ticketList centerContent">
    <ticket-item v-for="(item, index) in ticketData" :isBusiness="isBusiness" :minPrice="minPrice" :key="index" :ticketItemData="item" @to-flight-detail="toFlightDetail"></ticket-item>
  </div>
</template>

<script>
import TicketItem from './ticket-item'

export default {
  props: {      //父组件传值给子组件
    ticketData: [Array, Object],
    isBusiness: Number,
    minPrice: Number
  },
  components: {
    TicketItem
  },
  methods: {
    toFlightDetail(item) {
      this.$emit('to-flight-detail', item)
    }
  }
}
</script>

<style scoped lang="less">
    
</style>
