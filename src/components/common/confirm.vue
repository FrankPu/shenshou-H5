<template>
    <transition :name="`confirm-popup-animate-center`">
        <div v-show="show && !initialShow" class="confirm-popup-dialog" :class="[show ? 'vux-popup-show' : '']">
            <div class="confirm-top">
                <div class="confirm-title" v-if="title">{{title}}</div>
                <div class="confirm-content" v-if="content">{{content}}</div>
            </div>
            <div class="confirm-btn">
                <span class="cancleBtn" @click="cancle">{{cancelText}}</span>
                <span class="confirmBtn" @click="$emit('confirm')">{{confirmText}}</span>
            </div>
        </div>
    </transition>
</template>

<script>
    import Popup from './popup/popup'
    export default {
        name: 'confirm',
        props: {
            value: Boolean,
            showMask: {
                type: Boolean,
                default: true
            },
            isTransparent: Boolean,
            hideOnBlur: {
                type: Boolean,
                default: true
            },
            maxHeight: String,
            popupStyle: Object,
            title: String,
            content: String,
            confirmText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            }
        },
        created () {
            // get global layout config
            if (this.$vux && this.$vux.config && this.$vux.config.$layout === 'VIEW_BOX') {
                this.layout = 'VIEW_BOX'
            }
        },
        mounted () {
            this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling')
            this.$nextTick(() => {
                const _this = this
                this.popup = new Popup({
                    showMask: _this.showMask,
                    container: _this.$el,
                    hideOnBlur: _this.hideOnBlur,
                    onOpen () {
                        _this.fixSafariOverflowScrolling('auto')
                        _this.show = true
                    },
                    onClose () {
                        _this.show = false
                        if (window.__$vuxPopups && Object.keys(window.__$vuxPopups).length > 1) return
                        if (document.querySelector('.confirm-popup-dialog.vux-popup-mask-disabled')) return
                        setTimeout(() => {
                            _this.fixSafariOverflowScrolling('touch')
                        }, 300)
                    }
                })
                if (this.value) {
                    this.popup.show()
                }
                this.initialShow = false
            })
        },
        deactivated () {
            this.removeModalClassName()
        },
        methods: {        
            fixSafariOverflowScrolling (type) {
                if (!this.$overflowScrollingList.length) return
                for (let i = 0; i < this.$overflowScrollingList.length; i++) {
                    this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
                }
            },
            cancle() {
               this.show = false
            },
            removeModalClassName () {
            // this.layout === 'VIEW_BOX' && dom.removeClass(document.body, 'vux-modal-open')
            }
        },
        data () {
            return {
                layout: '',
                initialShow: true,
                hasFirstShow: false,
                show: this.value
            }
        },
        watch: {
            value (val) {
                this.show = val
            },
            show (val) {
                this.$emit('input', val)
                if (val) {
                    this.popup && this.popup.show()
                    this.$emit('on-show')
                    this.fixSafariOverflowScrolling('auto')
                    // this.layout === 'VIEW_BOX' && dom.addClass(document.body, 'vux-modal-open')
                    if (!this.hasFirstShow) {
                        this.$emit('on-first-show')
                        this.hasFirstShow = true
                    }
                } else {
                    this.$emit('on-hide')
                    this.show = false
                    this.popup.hide(false)
                    setTimeout(() => {
                        if (!document.querySelector('.confirm-popup-dialog.vux-popup-show')) {
                            this.fixSafariOverflowScrolling('touch')
                        }
                        this.removeModalClassName()
                    }, 200)
                }
            }
        },
        beforeDestroy () {
            this.popup && this.popup.destroy()
            this.fixSafariOverflowScrolling('touch')
            this.removeModalClassName()
        }
    }
</script>

<style lang="less">
    .confirm-popup-dialog {
        z-index: 501;
        opacity: 1;
        height: 1rem;
        width: 2rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        transition: opacity .1s;
        border-radius: .04rem;        
    }
    .confirm-top {
        height: .64rem;
        border-bottom: #F6F6F6 solid 1px;
        position: relative;
    }
    .confirm-content {
        text-align: center;
        color: #020202;
        position: absolute;
        top: .32rem;
        width: 100%;
    }
    .confirm-btn {
        display: flex;
        color: #232323;
    }
    .cancleBtn, .confirmBtn {
        flex: 1;
        text-align: center;
        line-height: .36rem;
    }
    .confirmBtn {
        color: #4B82DE;
    }
    .confirm-popup-dialog.vux-popup-center {
        opacity: 0;
        transition: opacity .1s;
    }
    .vux-popup-mask {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        z-index: -1;
        transition: opacity 400ms;
    }
    .vux-popup-mask.vux-popup-show {
        opacity: 1;
    }
    .confirm-popup-animate-bottom-enter, .confirm-popup-animate-bottom-leave-active {
        transform: translate3d(0, 100%, 0);
    }
    .confirm-popup-animate-left-enter, .confirm-popup-animate-left-leave-active {
        transform: translate3d(-100%, 0, 0);
    }
    .confirm-popup-animate-right-enter, .confirm-popup-animate-right-leave-active {
        transform: translate3d(100%, 0, 0);
    }
    .confirm-popup-animate-top-enter, .confirm-popup-animate-top-leave-active {
        transform: translate3d(0, -100%, 0);
    }
</style>