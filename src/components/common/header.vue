<template>
    <div class="shenshou-header">
        <div class="shenshou-header-left" @click="$emit('go-back')">
            <slot name="overwrite-left">
                <img class="left-arrow" src="~@/assets/images/back.png" v-show="showBack" />
                <span class="shenshou-header-back" v-show="showBack && leftText">{{leftText}}</span>               
            </slot>
            <slot name="left"></slot>
        </div>
        <div class="shenshou-header-title" v-if="!shouldOverWriteTitle">
            <slot><span v-show="title">{{title}}</span></slot>
            <slot name="title"></slot>
        </div>
        <div class="shenshou-header-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: 'x-header',
    props: {
        showBack: Boolean,
        leftText: String,
        title: String,
        showRight: Boolean
    },
    data () {
        return {
            shouldOverWriteTitle: false
        }
    }
}
</script>

<style lang="less">

    .shenshou-header {
        position: fixed;
        box-sizing: border-box;
        background: #2577e3;
        color: #fff;
        height: .54rem;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 1;
        top: 0;
        .shenshou-header-left, .shenshou-header-right {
            position: absolute;
            font-size: .14rem;
            flex: 1;
        }
        .shenshou-header-left {
            .left-arrow {
                position: absolute;
                left: .12rem;
                top: 0;
                bottom: 0;
                margin: auto;
            }
            .shenshou-header-back {
                margin-left: .32rem;
            }
        }
        .shenshou-header-title {
            line-height: .54rem;
            text-align: center;
            font-size: .18rem;
            flex: 1;
            .titleIcon {
                vertical-align: middle;
            }
        }
        .shenshou-header-right {
            right: .12rem;
            .right-arrow {
                top: 0;
                margin: auto;
                bottom: 0;
            }
        }
    }
</style>