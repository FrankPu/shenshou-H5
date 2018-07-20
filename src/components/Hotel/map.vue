<template>
<popup v-model="showMap" width="100%" height="100%" :position="'right'">
    <div class="Hotelmap">
        <x-header :showBack="true" :title="'周围设施'" @go-back="$emit('off-map')"></x-header>
        <iframe ref="mainiframe" id="mainiframe" width="280" height="400" :src="getUrl" frameborder="0" scrolling="auto"></iframe>
    </div>
</popup>

</template>
<script>
import XHeader from '../common/header'
import Popup from '../common/popup/index'
export default {
    components: {
        XHeader,
        Popup
    },    
    data(){
        return {
            
        }
    },
    mounted(){
        this.$refs.mainiframe.height=window.document.body.offsetHeight;
        this.$refs.mainiframe.width=window.document.body.offsetWidth;
    },
    methods:{
        message(){
            
        }
    },
    computed:{
        getUrl(){
            return `https://m.amap.com/picker/?keywords=交通,景点,餐饮&zoom=15&center=${this.longitude},${this.latitude}&radius=1000&total=20&key=30a0be00768574f1cdce29c00dab11e3`
        }
    },
    props:['showMap','latitude','longitude']
}
</script>
<style scoped lang="less">

</style>
