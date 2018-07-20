<template>
<popup v-model="showMap" width="100%" height="100%" :position="'right'">
    <div class="Hotelmap">
                <x-header :showBack="true" :title="'周围设施'" @go-back="$emit('off-map')"></x-header>
        <div class="Mapbox">
                <!--地图容器-->
                <div id="XSDFXPage" class="XSDFXPage"></div>           
        </div>
        <ul class="mapoption">
                    <li @click="changeWord(mapoption,index)" v-for="(mapoption,index) in mapoptionbox" :key="index" :class="{optiontype:currentIndex === index}">
                        {{mapoption.type}}
                    </li>
                    <div class="cuto"></div>
        </ul>
    <div id="r-result"></div>
        
        <!-- <ul class="optionlist">
                    <li v-for="(maplist,listitem) in optionlistBox" :key="listitem">
                        <p class="listtitle">{{maplist.title}}</p>
                        <p class="listtype">{{maplist.type}}</p>
                        <div>出发</div>
                    </li>
                    <div class="cuto"></div>
        </ul> -->
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
    data () {
        return {
            // latitude: this.$route.query.Latitude,
            // longitude: this.$route.query.Longitude,
            currentIndex: 0,
            mapoptionbox:[
                    {type:"交通"},
                    {type:"景点"},
                    {type:"餐饮"},
                    {type:"购物"},
            ],
            optionlistBox:[
                    {title:"万安",type:"(在建)6号线3期"},
                    {title:"三利.蘼山城停车场",type:"万安路305号附近"},
                    {title:"缤纷广场",type:"缤纷街69号"},
                    {title:"万安",type:"(在建)6号线3期"},
                    {title:"万安",type:"(在建)6号线3期"},
                    {title:"万安",type:"(在建)6号线3期"},
            ],
            keyword:'景点'
        }
    },
    watch:{

    },
    props:['showMap','latitude','longitude'],
    methods: {
        //关键字切换
        changeWord(mapoption,index){
            this.currentIndex = index; 
            this.keyword = mapoption.type;

            //待改
            var map = new BMap.Map("XSDFXPage");
            var point = new BMap.Point(this.longitude,this.latitude);
            map.centerAndZoom(point,15);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {map: map, panel: "r-result"}
            });
            local.search(this.keyword);
        }
    },
    mounted() {
        //创建Map实例
        var map = new BMap.Map("XSDFXPage");
        // 初始化地图,设置中心点坐标
        var point = new BMap.Point(this.longitude,this.latitude);// 创建点坐标
        map.centerAndZoom(point,15);
        //周边POI
        var local = new BMap.LocalSearch(map, {
            renderOptions: {map: map, panel: "r-result"}
        });
        local.search(this.keyword);
        //添加鼠标滚动缩放
        map.enableScrollWheelZoom();
        //添加缩略图控件
        map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
        //添加缩放平移控件
        map.addControl(new BMap.NavigationControl());
        //添加比例尺控件
        map.addControl(new BMap.ScaleControl());
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl());
        //设置标注的图标
        var icon = new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,20));
        //设置标注的经纬度
        var marker = new BMap.Marker(new BMap.Point(this.longitude,this.latitude),{icon:icon});
        //把标注添加到地图上
        map.addOverlay(marker);
        var content = "<table>";
        content = `<table>
        <tr><td> 星级：${this.hotelDetail.HotelStarRate}星级</td></tr>
        <tr><td> 名称：${this.hotelDetail.HotelName}</td></tr>
        <tr><td> 地址：${this.hotelDetail.AddressLine}</td></tr>
        </table>`
        var infowindow = new BMap.InfoWindow(content);
        marker.addEventListener("click",function(){
            this.openInfoWindow(infowindow);
        });
    }
}
</script>
<style scoped lang="less">
.XSDFXPage{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px auto;
    font-family: "微软雅黑";
}

.Hotelmap{
    position: absolute;
    width: 100%;
    top: 0;
    bottom:0;
    padding-top: .4rem;
    overflow-y: auto; 
    overflow-x: hidden;
    background-color:#ffffff;
    .cuto{
        clear:both
    }
    .Mapbox{
        width: 100%;
        height: 2.0rem;
        background-color: #f5f5f5;
    }
    
    .mapoption{
        width: 100%;
        height: .35rem;
        line-height: .35rem;
        margin: 0;
        padding: 0;
        li{
            list-style: none;
            width: 25%;
            float: left;
            height: 100%;
            color: #999;
            font-size: .15rem;
            text-align: center;
            border-bottom: .02rem solid #ffffff;
        }
        .optiontype{
            color: #000000;
            border-bottom: .02rem solid #2474DE;
        }
    }
    .optionlist{
        width: 100%;
        height: auto;
        li{
            list-style: none;
            width: 100%;
            height: .35rem;
            border-bottom: .01rem solid #e4e4e4;
            position: relative;
             p{  
                text-align: left;
                line-height: .16rem;
                padding-left: .1rem;
            }
            .listtitle{
                margin-top: .04rem;
                font-size: .15rem;
            }
            .listtype{
                font-size: .12rem;
                color: #A8A8A8;
            }
           
            div{
                position:absolute;
                right: .15rem;
                top: .08rem;
                font-size: .15rem;
                color: #2474DE;
            }
        }
    }
}
</style>