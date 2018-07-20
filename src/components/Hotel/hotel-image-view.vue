<template>
	<div class="bgGray">
		<div class="shenshou-layerCon" id="hotelAlbum">
			<p class="down-icon"><img src="~@/assets/images/hotel/loading@2x.png"/></p>
			<div class="swiper-pagination swiper-pagination-fraction hotel-album-page">
		    	<span class="swiper-pagination-current">1</span> / 
		    	<span class="swiper-pagination-total">0</span>
		    </div>
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide"><img src="~@/assets/images/index/Hotel-banner@2x.png"/></div>
			        <div class="swiper-slide"><img src="~@/assets/images/index/banner@2x.png"/></div>
			        <div class="swiper-slide"><img src="~@/assets/images/index/fly-banner@2x.png"/></div>
			    </div>
			</div>
			<div class="hotel-album-con"></div>
			<p class="close"><img src="~@/assets/images/hotel/close@2x.png"/></p>
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


.bgGray {
	background: rgba(0, 0, 0, 0.5);
}

.swiper-container {
	width: 100%;
	height: 100%;
}

#hotelAlbum {
	top: 0;
	font-size: .12rem;
	color: #fff;
	text-align: center;
}

.swiper-container {
	height: 2.0rem;
	vertical-align: middle;
}

.swiper-container img {
	width: 100%;
	height: 100%;
}

.hotel-album-page {
	position: relative;
	bottom: 0;
	margin-top: .4rem;
	height: .24rem;
	letter-spacing: 2px;
}

.hotel-album-con {
	padding-top: .24rem;
	padding-bottom: .24rem;
}

.close {
	position: absolute;
	display: flex;
	justify-content: center;
	width: 100%;
	bottom: .64rem;
}

.close img {
	width: .16rem;
	height: .16rem;
}

.down-icon {
	display: flex;
	justify-content: flex-end;
	padding: .12rem;
	padding-bottom: 0;
}

.down-icon img {
	width: .2rem;
	height: .2rem;
}
</style>
