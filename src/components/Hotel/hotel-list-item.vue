<template>
    <div class="hotelListItem">
        <img class="gotoIcon" src="../../assets/images/test.jpg">
        <div class="itemDetail">
            <p class="hotelName">锦江大酒店(成都锦江区三圣)</p>
            <div class="evaluate">
                <span class="score">4.9 <span>分</span> 超棒</span>
                <span class="commentsNum">208条评论 | 四星级</span>
            </div>
            <div class="distance">
                <span class="distanceNum">距您{{hotelListItem.distanceNum}}米</span>
                <span class="place"></span>
            </div>
            <div class="label">
                <span class="bestSellers">热卖</span>
                <span class="vacation">休闲度假</span>
            </div>
            <div class="prompt">
                <span class="promptText">3分钟前有人预定</span>
                <div class="price">
                    <div class="priceNum">￥<span>580</span><span>起</span></div>
                    <div class="pricePrompt">低价即将售完</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'hotel-list-item',
    data: function() {
        return {
            hotelListItem: {
                name: '锦江大酒店(成都锦江区三圣)',
                score: 4.9,
                commentsNum: 208,
                distanceNum: 100,
                place: '春熙路、大慈四商业街',
                price: 580
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .hotelListItem {
        display: flex;
        padding: .08rem;
        .itemDetail {
            margin-left: .06rem;
            width: auto;
            .hotelName {
                font-size: .16rem;
                width: 100%;
                overflow: hidden;  /*溢出隐藏*/
                text-overflow: ellipsis; /*以省略号...显示*/
                white-space: nowrap;  /*强制不换行*/
            }
            .evaluate {
                margin-top: .06rem;
                .score {
                    color: #FF9540;
                    font-size: .14rem;
                    font-weight: 500;
                    span {
                        font-size: .12rem;
                        font-weight: 300;
                    }
                }
                .commentsNum {
                    color: #A1A1A1;
                }
            }
        }
    }
</style>
