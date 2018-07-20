<template>
    <div class="loading">
        <div class="loadingBox">
            <img src="../../assets/images/loading/loadinglogo@2x.png" class="titleIcon" />
            <div class="loadingText">
                <span>加</span><span>载</span><span>中</span><span>.</span><span>.</span><span>.</span>
            </div>
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
    .loading {
        .loadingBox {
            background-color: #2577e3;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            width: 1rem;
            height: 1rem;
            margin: auto;
            text-align: center;
            padding: .12rem;
            border-radius: .1rem;
            .loadingText {
                color: #fff;
                text-align: center;
            }
            .loadingText span{
                display: inline-block;
                animation-duration: .3s;
                animation-name: loadingAnimate;
                animation-iteration-count: infinite;
                animation-direction: alternate
            }
            .loadingText :nth-child(n+0){animation-delay:-.6s}
            .loadingText :nth-child(n+1){animation-delay:-.576s}
            .loadingText :nth-child(n+2){animation-delay:-.552s}
            .loadingText :nth-child(n+3){animation-delay:-.528s}
            .loadingText :nth-child(n+4){animation-delay:-.504s}
            .loadingText :nth-child(n+5){animation-delay:-.48s}
            .loadingText :nth-child(n+6){animation-delay:-.456s}
        }
    }
@keyframes loadingAnimate {
	from{
		transform:translateY(0)
	}
	to{
		transform:translateY(-5px)
    }
}


</style>