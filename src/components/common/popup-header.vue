<template>
  <div class="popup-header" :class="showBottomBorder ? 'header-1px-b' : ''">
    <div class="popup-header-left" @click="$emit('on-click-left')">
      <slot name="left-text">{{ leftText }}</slot>
    </div>
    <div class="popup-header-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="popup-header-right" @click="$emit('on-click-right')">
      <slot name="right-text">{{ rightText }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup-header',
  props: {
    leftText: String,
    rightText: String,
    title: String,
    showBottomBorder: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.popup-header {
  display: flex;
  height: .44rem;
  line-height: .44rem;
  background: #555555;
}
.popup-header-title {
  flex: 1;
  text-align: center;
}
.popup-header-left {
  padding-left: .12rem;
  color: #fff;
}
.popup-header-right {
  padding-right: .12rem;
  color: #fff;
}
.popup-header.header-1px-b:after {
  border-color: #D9D9D9;
}
</style>
