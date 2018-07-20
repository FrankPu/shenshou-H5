import Vue from 'vue'
import Router from 'vue-router'
/**=====================订单======================== */
import PublicOrder from '@/components/TicketOrder/public-order'
/**=====================订单======================== */

/**========================机票列表================ */
import TicketIndex from '@/components/planeTicketList/index'
/**========================机票列表================ */

/**================酒店订单===================== */
import HotelDetail from '@/components/Hotel/hotel-detail'
import HotelImage from '@/components/Hotel/hotel-image'
import HotelImageView from '@/components/Hotel/hotel-image-view'
import KeywordSearch from '@/components/Hotel/keyword-search'
/**================酒店订单===================== */

/**================火车票订单===================== */
import TrainPublicOrder from '@/components/train/train-public-order'
import TrainPrivateOrder from '@/components/train/train-private-order'
//车次详情  
import TrainDetail from '@/components/train/train-detail'
import TrainTimetable from '@/components/train/train-Timetable'
import trainBooktxt from '@/components/train/train-Booktxt'
/**================火车票订单===================== */


/**================因私机票订单填写===================== */
import PrivateOrder from '@/components/TicketOrder/private-order'
/**===============添加长旅客因私===== Company========== Searchcomponents====== */
import Entstaff from '@/components/TicketOrder/Entstaff'
import Company from '@/components/TicketOrder/Company'
import additionsEmployee from '@/components/TicketOrder/additionsEmployee'
import Searchcomponents from '@/components/TicketOrder/Searchcomponents'
/**================因私酒店订单填写===================== */
import PrivateHotelOrder from '@/components/Hotel/private-hotel-order'
/**===============因私酒店订单填写===================== */

/**================因公酒店订单填写===================== */
import PublicHotelOrder from '@/components/Hotel/public-hotel-order'
/**===============因公酒店订单填写===================== */


/**================酒店列表===================== */
/*import HotelListItem from '@/components/Hotel/hotel-list-item'*/
/**===============节点列表===================== */


/**===================改签详情================== */
import TicketChangesDetail from '@/components/TicketChanges/TicketChangesDetail/ticket-changes-detail'
/**===================改签详情================== */
/**===================申请改签================== */
import ApplayChanges from '@/components/TicketChanges/applay-changes'
// 申请退票
import ApplicationfoRrefund from '@/components/TicketChanges/Application-for-refund'
//费用明细
import DetailsofCharges from '@/components/TicketChanges/Details-of-Charges'
//改签支付
import Resigningpayment from '@/components/TicketChanges/Re-signing-payment'
//改签信息确认Submission
import Changeinformation from '@/components/TicketChanges/Change-information'
//改签提交后成功
import Submission from '@/components/TicketChanges/Submission'
/**===================li/TicketList================== */
import TicketList from '@/components/TicketChanges/TicketList'
/**===================li/TicketList================== */
/**===================登录================== */
import Login from '@/components/Login/login'
/**===================登录================== */

/**===================确认密码================== */
import ConfirmPassword from '@/components/Login/confirm-password'
/**===================确认密码================== */

/**===================注册并登录================== */
import Register from '@/components/Login/register'
/**===================注册并登录================== */

/**===================重置密码================== */
import ResetPassword from '@/components/Login/reset-password'
/**===================重置密码================== */


import FlightSearch from '@/components/Flight/flight-search'
import FlightDoubleGo from '@/components/Flight/flight-double-go'
import FlightDoubleBack from '@/components/Flight/flight-double-back'
import FlightDetail from '@/components/Flight/flight-detail'
import FlightPriceDetail from '@/components/Flight/flight-price-detail'

import PaySuccess from '@/components/common/Payment/pay-success'
import PayFail from '@/components/common/Payment/pay-fail'
import PayWait from '@/components/common/Payment/pay-wait'

import HotelSearch from '@/components/Hotel/hotel-search'
import HotelList from '@/components/Hotel/hotel-list'

import TrainSearch from '@/components/Train/train-search'
import TrainList from '@/components/Train/train-list'

import AuditList from '@/components/Audit/audit-list'
import AuditFlight from '@/components/Audit/audit-flight'

import MyOrder from  '@/components/HyMypage/MyOrder'
import MyData from  '@/components/HyMypage/MyData'
import Mydataname from  '@/components/HyMypage/Mydata-name'
import Mydataidentity from  '@/components/HyMypage/Mydata-identity'
import Mydatamodif from  '@/components/HyMypage/Mydata-modify'
import Mydatapassw from  '@/components/HyMypage/Mydata-passw'
import Mypolicy from  '@/components/HyMypage/Mypolicy'
import MyWallet from  '@/components/HyMypage/my-wallet'
import MyInformation from  '@/components/HyMypage/my-information'
import AddPsger from  '@/components/HyMypage/add-passenger'
import MyShareapp from  '@/components/HyMypage/MyShareapp'
import MySetup from  '@/components/HyMypage/MySetup'
import AddAddress from  '@/components/HyMypage/add-address'
import Myinvoice from  '@/components/HyMypage/Myinvoice'

import MyInmod from  '@/components/HyMypage/MyInmod'

/**======================各主页========================= */
import IndexPage from '@/pages/IndexPage'
import MyPage from '@/pages/MyPage'
import TripPage from '@/pages/TripPage'
import HomePage from '@/pages/HomePage'
/**======================各主页========================= */

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'indexpage',
      component: IndexPage,
      redirect: '/login',
      children: [{
        path: '/homepage',
        name: 'homepage',
        component: HomePage
      }, {
        path: '/trippage',
        name: 'trippage',
        component: TripPage
      }, {
        path: '/mypage',
        name: 'mypage',
        component: MyPage
      }]
    },

    {  //添加常旅客因私
      path: '/Entstaff',
      name: 'Entstaff',
      component: Entstaff
    },
    { 
      path: '/additionsEmployee',
      name: 'additionsEmployee',
      component: additionsEmployee
    },
    { 
      path: '/Searchcomponents',
      name: 'Searchcomponents',
      component: Searchcomponents
    },
    {  //添加常旅客因公
      path: '/Company',
      name: 'Company',
      component: Company
    },
    {  //我的订单
      path: '/TicketList',
      name: 'TicketList',
      component: TicketList
    },
    //
    
    {  //我的订单
      path: '/myorder',
      name: 'myorder',
      component: MyOrder
    },
    {//个人资料
      path: '/mydata',
      name: 'mydata',
      component: MyData
    },
    {//个人资料-修改名字
      path: '/Mydataname',
      name: 'Mydataname',
      component: Mydataname
    },
    {//个人资料-身份证
      path: '/Mydataidentity',
      name: 'Mydataidentity',
      component: Mydataidentity
    },
    {//个人资料-身份证2
      path: '/Mydatamodif',
      name: 'Mydatamodif',
      component: Mydatamodif
    },
    {//修改密码
      path: '/Mydatapassw',
      name: 'Mydatapassw',
      component: Mydatapassw
    },
    {//差旅政策
      path: '/Mypolicy',
      name: 'Mypolicy',
      component: Mypolicy
    }, {//我的钱包
      path: '/mywallet',
      name: 'mywallet',
      component: MyWallet
    }, {//分享APP
      path: '/MyShareapp',
      name: 'MyShareapp',
      component: MyShareapp
    },  {//设置
      path: '/MySetup',
      name: 'MySetup',
      component: MySetup
    } ,{//常用信息
      path: '/myinformation',
      name: 'myinformation',
      component: MyInformation
    }, {//修改旅客信息
      path: '/addpsger',
      name: 'addpsger',
      component: AddPsger
    }, {//添加地址
      path: '/addaddress',
      name: 'addaddress',
      component: AddAddress
    }, {//添加发票抬头
      path: '/Myinvoice',
      name: 'Myinvoice',
      component: Myinvoice
    }, {
        path: '/ticketindex',
        name: 'ticketindex',
        component: TicketIndex
    }, {
      path: '/flightsearch',
      name: 'flightsearch',
      component: FlightSearch
    }, {
      path: '/flightdoublego',
      name: 'flightdoublego',
      component: FlightDoubleGo
    }, {
      path: '/flightdoubleback',
      name: 'flightdoubleback',
      component: FlightDoubleBack
    }, {
      path: '/flightdetail',
      name: 'flightdetail',
      component: FlightDetail
    }, {
      path:'/flightpricedetail',
      name:'FlightPriceDetail',
      component:FlightPriceDetail
    }, {
      path: '/hotelsearch',
      name: 'HotelSearch',
      component: HotelSearch
    }, {
      path: '/trainsearch',
      name: 'TrainSearch',
      component: TrainSearch
    }, {
      path: '/trainlist',
      name: 'trainlist',
      component: TrainList
    }, {
      path: '/auditlist',
      name: 'AuditList',
      component: AuditList
    }, {
      path: '/auditflight',
      name: 'AuditFlight',
      component: AuditFlight
    }, {
      path: '/paysuccess',
      name: 'PaySuccess',
      component: PaySuccess
    }, {
      path: '/payfail',
      name: 'PayFail',
      component: PayFail
    }, {
      path: '/paywait',
      name: 'PayWait',
      component: PayWait
    }, {
      path: '/publicorder',
      name: 'publicorder',
      component: PublicOrder
    }, {//预订须知
      path: '/trainBooktxt',
      name: 'trainBooktxt',
      component: trainBooktxt
    },
    {//时刻表
      path: '/TrainTimetable',
      name: 'TrainTimetable',
      component: TrainTimetable
    },
    {//车次详情TrainTimetable
      path: '/traindetail',
      name: 'traindetail',
      component: TrainDetail
    }, 
    {
      path: '/applayChanges',
      name: 'applayChanges',
      component: ApplayChanges
    }, 
    //申请退票
    {
      path: '/ApplicationfoRrefund',
      name: 'ApplicationfoRrefund',
      component: ApplicationfoRrefund
    },
    //费用明细
    {
      path: '/DetailsofCharges',
      name: 'DetailsofCharges',
      component: DetailsofCharges
    },
    //改签支付
    {
      path: '/Resigningpayment',
      name: 'Resigningpayment',
      component: Resigningpayment
    },//改签信息确认
    {
      path: '/Changeinformation',
      name: 'Changeinformation',
      component: Changeinformation
    },//改签提交成功
    {
      path: '/Submission',
      name: 'Submission',
      component: Submission
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/confirmpassword',
      name: 'confirmpassword',
      component: ConfirmPassword
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/resetPasswod',
      name: 'resetPasswod',
      component: ResetPassword
    }, {
      path: '/ticketChangesDetail',
      name: 'ticketChangesDetail',
      component: TicketChangesDetail
    }, {
      path: '/keywordsearch',
      name: 'KeywordSearch',
      component: KeywordSearch
    }, 
    {
      path: '/hoteldetail',
      name: 'hoteldetail',
      component: HotelDetail,
    }, {
      path: '/hotelimage',
      name: 'HotelImage',
      component: HotelImage
    }, {
      path: '/hotelimageview',
      name: 'HotelImageView',
      component: HotelImageView
    },
    {
      path: '/hotellist',
      name: 'hotellist',
      component: HotelList
    }, {
      path: '/privateHotelOrder',
      name: 'privateHotelOrder',
      component: PrivateHotelOrder
    }, {
      path: '/publicHotelOrder',
      name: 'publicHotelOrder',
      component: PublicHotelOrder
    },
    {
      path: '/privateorder',
      name: 'privateorder',
      component: PrivateOrder
    }, {
      path:'/trainPublicOrder',
      name:'trainPublicOrder',
      component: TrainPublicOrder
    }, {
      path:'/trainPrivateOrder',
      name:'trainPrivateOrder',
      component: TrainPrivateOrder
    }, {
      path:'/myInmod',
      name:'myInmod',
      component: MyInmod
    }
  ]
})
