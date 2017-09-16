import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import index from '@/components/index'
// 用户模块
import register from '@/components/users/register'
import login from '@/components/users/login'
import notlogin from '@/components/users/notlogin'
import agreement from '@/components/users/agreement'
// 产品模块
import goodslist from '@/components/goods/goodslist';
import detail from '@/components/goods/detail';
import addparts from '@/components/goods/addparts';
import addorder from '@/components/goods/addorder';
// 下单模块
import cartlist from '@/components/order/cartlist';
import orderConfirm from '@/components/order/orderConfirm';
import editAddress from '@/components/order/editAddress';
import payType from '@/components/order/payType';
// 个人中心
import accountindex from '@/components/account/accountindex';
import set from '@/components/account/set';
// 个人中心 ----- 免押金
import deposit from '@/components/account/deposit/deposit';
import uploadInfo from '@/components/account/deposit/uploadInfo';
import idCardInfo from '@/components/account/deposit/idCardInfo';
import freedeposit from '@/components/account/deposit/freedeposit';
import showdepositinfo from '@/components/account/deposit/showdepositinfo';
import openzm from '@/components/account/deposit/openzm';
import zmtoopen from '@/components/account/deposit/zmtoopen';
import updeposit from '@/components/account/deposit/updeposit';  // 提升额度
import updepositrecord from '@/components/account/deposit/updepositrecord';  
// 账单
import bill from '@/components/bill/bill';
import overdue from '@/components/bill/overdue';

// 测试
import scroll from '@/components/scroller';
import share from '@/components/share';
import contacts from '@/components/contacts';
import device from '@/components/device';
// 提升额度记录
// 共用组件
import phone from '@/commons/telInput/phone';
// 关于我们，帮助中心专题等相关辅助页面
//import warrantydescription from '@/components/about/warrantydescription';

export default new Router({
  routes: [
    {path:'/scroll',component:scroll},
    {path:'/share',component:share},
    {path:'/contacts',component:contacts},
    {path:'/device',component:device},
    {path: '/', component: goodslist},
    {path: '/index', component: index},
    // 用户模块
    {path: '/register', component: register},
    {path: '/login', component: login},
    {path: '/notlogin', component: notlogin},
    // 产品模块
    {path: '/goodslist', component: goodslist},
    {path: '/addorder', component: addorder},
    {path: '/addparts', component: addparts},
    {path: '/detail:id', component: detail},
    // 下单购物车模块
    {path: '/cartlist', component: cartlist},
    {path: '/orderConfirm:id', component: orderConfirm},
    {path: '/editAddress:id', component: editAddress},
    {path: '/payType:id', component: payType},
    // 个人中心
    {path: '/accountindex', component: accountindex},
    {path: '/phone', component: phone},
    {path: '/agreement', component: agreement},
    {path: '/set', component: set},
    // 个人中心  --->免押金
    {path: '/deposit', component: deposit},
    {path: '/uploadInfo', component: uploadInfo},
    {path: '/idCardInfo', component: idCardInfo},
    {path: '/freedeposit', component: freedeposit},
    {path: '/showdepositinfo', component: showdepositinfo},
    {path: '/openzm', component: openzm},
    {path: '/zmtoopen', component: zmtoopen},
    {path: '/updeposit', component: updeposit},
    {path: '/updepositrecord', component: updepositrecord},
    // 账单
    {path: '/bill', component: bill},
    {path: '/overdue', component: overdue},
    //{path:'/warrantyDescription',component: warrantydescription}
  ]
});
