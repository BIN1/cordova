// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import FastClick from 'fastclick'
import router from './router';
import Vuex from 'vuex';
import App from './App';
import vconsole from './assets/js/vconsole';
// ajax 方法
import api from './assets/js/api';
Vue.prototype.$api=api;
// 正则
import regexp from './assets/js/regexp';
Vue.prototype.$regexp=regexp;

// 工具方法
import tools from './assets/js/tools';
Vue.prototype.$tools=tools;

Vue.use(Vuex);
import vueg from 'vueg';
import 'vueg/css/transition-min.css';

// 转场动画配置
const options={
    duration: '0.1',              //转场动画时长，默认为0.3，单位秒
    firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
    firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
    forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
    backAnim: 'fadeInLeft',       //后退动画，默认为fedeInLeft
    sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
    tabs: [{
        name:'cartlist'
    },{
        name:'login'
    },{
        name:'accountindex'
    },{
        name:'login'
    }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
    tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
    disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
};
Vue.use(vueg, router,options);
// FastClick.attach(document.body);
Vue.config.productionTip = false;
//vuex使用
import store from './store/index';
import VueCordova from 'vue-cordova';
Vue.use(VueCordova);
console.log(Vue.cordova);
Vue.config.productionTip=false;
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box');
