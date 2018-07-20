<template>
<div class="bgGray">
   <x-header :showBack="true" :title="'查看图片'" @go-back="goBack"></x-header>
    <!--酒店图片列表-->
	<div class="hotelimge">
		<ul class="imgstitle">
			<li  class="donhim" :class="{aictiv:currentIndex === titindex}"  v-for="(titletype,titindex) in titlelist" :key="titindex" @click="title(titindex)">
				<p>{{titletype.TitleName}}</p>
				<p>{{titletype.ImgCount}}</p>
			</li>
		</ul>
		<div class="imglist" >
			<div class="imgsbox">
                <img class="previewer-demo-img" :src="ilistImageUrl" width="100" @click="show(0)">
			     <p>{{ilistImgCount}}</p>
			</div>    
		</div>
	</div>
    <previewer :list="list" ref="previewer"  @on-index-change="logIndexChange"></previewer>
	
</div>
</template>

<script>
import qs from 'qs'
import Previewer from 'vux/src/components/previewer/index'
import XHeader from '../common/header'
import { TransferDom } from 'vux'
import { fail } from 'assert';
import { ENGINE_METHOD_DIGESTS } from 'constants';
export default {
	components: {
		Previewer,
		XHeader
    },
  data(){
      return {
		  currentIndex: 0,
		  titlelist:[
			  
		  ],  
		  ilistImgCount:"全部",
		  ilistImageUrl:"http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg",
		 
		  list: [
			    // {src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',},
				// {src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',},
				// {src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'}
		  ],
      }
  },
   created(){
        let detailParams = {
            UserId: this.$storage.getSession('userMess').UserId,
            Token: this.$storage.getSession('userMess').Token,
            AgentId: this.$storage.getSession('userMess').AgentId,
            HotelId : this.$storage.getSession('hotelData').SourceHotelCode,
      }
		console.log(detailParams)
        
		this.$axios.post('/HotleInfo/GetHotelImgByHotelId', qs.stringify(detailParams))
		.then(res=>{
			this.titlelist = res.data.Result;
			//包含
			this.ilistImageUrl=this.titlelist[0].FirstImg
            this.ilistImgCount = this .titlelist[0].TitleName
            //图片
			let listImage = this.titlelist[0].listImage;
			listImage.map(item => {
                this.list.push({src: item.ImageUrl})
			})
		    console.log(this.list)
        })
    
       

    },
  methods:{
	goBack(){
			this.$router.go(-1);
	},
    logIndexChange (arg) {

    },
    show () {
      this.$refs.previewer.show(0)
	    
		 
    },
	title(titindex){
				this.ilistImageUrl=this.titlelist[titindex].FirstImg
				this.ilistImgCount = this .titlelist[titindex].TitleName
			  
			    this.currentIndex = titindex;
			 	let listImage = this.titlelist[titindex].listImage;
				this.list =[]
				listImage.map(item => {
					this.list.push({src: item.ImageUrl})
				})
				console.log(this.list)
	}
	
  }
}
</script>

<style scoped lang="less">
    
    .hotelimge{
		position: absolute;
		top: .9rem;
		bottom: 0;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #ffffff;
		 .imgstitle{
			position: fixed;
			top: .42rem;
			width: 100%;
			height: .35rem;
			background-color: #ffffff;
			border-bottom:.01rem solid #eeeeee; 
			li{
				line-height: .18rem;
				float: left;
				width: 20%;
				height: 100%;
				text-align: center;
				color: #888888;
				font-size: .14rem;
			}
			.aictiv{
				color: #2577E3;
				border-bottom:.02rem solid #2577E3; 
			}
		}
		.imglist{
			 height: auto;
			 width: 100%;
			 display: flex;
			 flex-wrap: wrap;
             justify-content: space-between;
			 .imgsbox{
				 width: 48%;
				 height:.8rem;
				 margin-bottom: .1rem;
				 position: relative;
				 img{
					 height: 100%;
					 width: 100%;
				 }
				 p{
					 color: #ffffff;
					 position: absolute;
					 bottom: .05rem;
					 left:.05rem;
					 width:.4rem;
					 height: .18rem;
					 line-height: .18rem;
					 font-size: .14rem;
					 text-align: center;
					 background-color: rgba(25, 25, 25, 0.5)
				 }
			 }
		}
  
    }
    

</style>
