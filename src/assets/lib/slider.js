

//酒店列表页面
var zh={
	x:0,
	offsetL:parseInt($(".zh-slider-l").css("left")),
	bind:function(){
		//星级价格筛选（区间选取事件）
		var start_x;
		var start_x_r;
		let as = $(".zh-slider-l,.zh-slider-r")
		$(".zh-slider-l,.zh-slider-r").on("touchstart",function(evt){
			var e=event||evt,
				touch = e.targetTouches[0];
				
				zh.x=touch.pageX;
				e.preventDefault();
				start_x=parseInt($(this).css("left"));
				start_x_r=parseInt($(this).css("right"));
		}).on("touchmove",function(evt){
			var e=event||evt;
			e.preventDefault();
			var touch = e.targetTouches[0],  
				$txtl=$(".js-con-left"),
				$txtr=$(".js-con-right"),
				$bg=$(".zh-slider-bg"),
				x_l=parseInt(touch.pageX - zh.x),
				x_r=parseInt(zh.x-touch.pageX),
				x_l_=x_l*5,
				x_r_=x_r*5;
			if(e.targetTouches.length == 1&&e.target.className=="zh-slider-l"){
				
				var slider_width=start_x+x_l;
                if(slider_width>=zh.offsetL){
					if(slider_width>parseInt($(".zh-slider-r").css("left")))
					{
                      slider_width=parseInt($(".zh-slider-r").css("left"));
					}

					$(this).css("left",slider_width + 'px');
                	$bg.css("left",slider_width + 'px');  
                	$txtl.text("￥"+Math.abs(slider_width*5));
					if(parseInt($(".zh-slider-r").css("right"))==0){
						
//						$txtl.text("￥不限");
					}
                	
                }
                else if(slider_width<zh.offsetL){
                	$(this).css("left",zh.offsetL+ 'px');
                	$bg.css("left",zh.offsetL + 'px');  
                	$txtl.text("￥"+0);
                }
				
			}
			if(e.targetTouches.length == 1&&e.target.className=="zh-slider-r"){
				var slider_width=start_x_r+x_r;
                if(parseInt(slider_width)>=0){
					if(slider_width>parseInt($(".zh-slider-l").css("right")))
					{
                      slider_width=parseInt($(".zh-slider-l").css("right"));
					}

                	$(this).css("right",slider_width + 'px');
                	$bg.css("right",slider_width+ 'px');  
                	$txtr.text("￥"+ parseInt($(this).css("left"))*5);
                }
				else{
					$(this).css("right",0 + 'px');
                	$bg.css("right",0+ 'px');  
                	$txtr.text("￥不限");
				}

			}
		});
		
		
		//点击完成和重置
		$(".hotel-layer-star-btn").on("click",".blueBg",function(){
			//重置方法
			
		});
		
		/*========================酒店位置筛选弹窗事件  ======================*/
	}
}
zh.bind();
export default zh