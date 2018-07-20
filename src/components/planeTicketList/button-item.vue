<template>
    <span class="btnItem" @click="btnItemClick(btnItem, index)">
        <slot name="icon"></slot>
        <slot name="label"></slot>
    </span>
</template>

<script>
export default {
    name: 'ButtonItem',
    props: {
        btnItem: Object,
        index: String
    },
    methods: {
        btnItemClick(item, index) {
            this.$emit('btnItemClick', item, index)
        }
    }
}
</script>

<style scope lang="less">
    .btnItem {
        flex: 1;
        text-align: center;
        color: #fff;
        border-right: 1px #fff solid;
        img {
            vertical-align: middle;
            width: .16rem;
            height: .16rem;
            margin-top: -.03rem;
        }
    }
</style>
