<template>
  <div class="bottomBtn">
     <button-item v-for="(item, k) in btnData" :key="k" :btnItem="item" :index="k" @btnItemClick="btnItemClick">
       {{item}}
       <img slot="icon" class="icon" :src="item.src">
       <span slot="label">{{item.label}}</span>
     </button-item>
  </div>
</template>

<script>
import ButtonItem from './button-item'
export default {
  name: 'BottomBtn',
  components: {
    ButtonItem
  },
  props: {
    btnData: [Array, Object]
  },
  methods: {
    btnItemClick(data, index) {
      this.$emit('btnItemClick', data, index)
    }
  }
}
</script>

<style scoped lang="less">
  .bottomBtn {
    display: flex;
    position: fixed;
    height: .45rem;
    line-height: .45rem;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
