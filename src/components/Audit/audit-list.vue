<template>
  <div>
  <div class="bgGray" style="margin-top: 4rem;">
        <!-- header -->
        <div class="topHeader disFlex clearFix">
        <router-link to='/' style="position: relative"><img src="~@/assets/images/icon/back.png" alt="goBack" class="goBack"></router-link>
        <div class="topInfo fontSize-8">
            <span class="goAddress">我发起的审核</span>
        </div>
        </div>
      <div class="audit">
          <!-- 往返的审核单 -->
          <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <router-link to="/auditflight">
                <div class="auditDetail">
                    <div class="address disFlex">
                        <!-- 往返审核单唯一的不同就是有无往返icon -->
                        <p class="flex1"><span class="disInlneBlk goIcon fillGoTag">去</span>成都 - 昆明</p>
                        <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                    </div>
                    <div class="time">
                        <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                    </div>
                    <div class="whichOne fontLight">
                        车次：K853
                    </div>
                    <div class="passenger">
                        <span class="name">
                            乘车人：和冬冬
                        </span>
                        <span class="outBtn outBtnWei">违</span>
                    </div>
                </div>
            </router-link>
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1"><span class="disInlneBlk goIcon fillBackTag">返</span>成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>

          <!-- 单程的审核单 -->
          <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1">成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>
                <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1">成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>
                <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1">成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>
                <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1">成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>
                <div class="auditInfo">
            <!-- 标题 -->
            <div class="auditTitle disFlex">
                <div class="goBy flex1">
                    <img src="~@/assets/images/myOrder/order-plane@2x.png" alt="" class="icon">
                    <span>机票</span>
                </div>
                <div class="progress flex1 text-right">
                    <p class="">已通过</p>
                </div>
            </div>
            <!-- 详情 -->
            <div class="auditDetail">
                <div class="address disFlex">
                    <p class="flex1">成都 - 昆明</p>
                    <div class="price flex1 text-right"><span class="fontSize-1">￥</span>146.5</div>
                </div>
                <div class="time">
                    <p>2018-01-25 08:54 至 2018-01-26 05:28</p>
                </div>
                <div class="whichOne fontLight">
                    车次：K853
                </div>
                <div class="passenger">
                    <span class="name">
                        乘车人：和冬冬
                    </span>
                    <span class="outBtn outBtnWei">违</span>
                </div>
            </div>
        </div>
      </div>

      <!-- 底部审核button -->
      <div class="auditBtn fontSize-8 disFlex">
          <div class="tobeAudit text-center flex1">
              <p class="tobe">待审核</p>
          </div>
          <div class="Audited text-center flex1">
              <p class="ed">已审核</p>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  data(){
      return {

      }
  }
}
</script>
<style scoped>
@import '../../assets/css/test.css';

.auditBtn{
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    background: #ffffff;
    color: #666666;
    position: fixed;
    left: 0;
    bottom: 0;
}

.auditBtn div {
    display: inline-block;
}

.auditInfo{
    background: #ffffff;
    margin-bottom: 0.2rem;
}
.auditTitle {
    padding: 1.2rem;
    border-bottom: 1px solid #F5F5F5;
}

.address {
    padding: 0.8rem;
}

.time, .whichOne, .passenger{
    padding: 0 0.8rem 0.2rem 0.8rem;
}

.time p{
    color: #707070;
}

.price {
    color :red
}

.passenger .name{
    color : #666666;
    margin-bottom: 1rem;
}
</style>
