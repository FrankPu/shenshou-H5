<template>
    <!-- 点击付款后，判断有没有违规 -->
    <div class="layer" v-show="confirm">
        <div class="fade" style="position:fixed;top:0;bottom:0;background:rgba(0, 0, 0, 0.5);height:100%;width:100%;z-index:3" @click="$emit('off-shade')"></div>
        <div style="width:80%;height:18%;background:#fff;border-radius: .05rem;text-align:center;z-index:4;position:fixed;top:41%;left:10%;">
            <p style="height: .15rem;padding: .05rem;">违规提示</p>
            <p style="padding: .1rem;">{{illegalReason}}</p>
            <div style="display:flex">
                <p style="flex:1;color:#2577e3;padding: .1rem;" @click="$emit('to-audit')" v-if="noAudit==false">{{btnLeft}}</p>
                <p style="flex:1;color:#2577e3;padding: .1rem;" @click="$emit('to-pay')" v-if="noPay==false">{{btnRight}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return {
          
      }
  },
  props:['confirm','btnLeft','btnRight','illegalReason','noPay','noAudit']
}
</script>
