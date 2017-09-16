<template>
  <div id="accountindex" class="page-container kz-background-gray">
    <tabbar>
      <tabbar-item link="/">
        <div slot="icon" class="iconfont icon-zhuye"></div>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link='bill'>
        <div slot="icon" class="iconfont icon-fcstubiao20"></div>
        <span slot="label">账单</span>
      </tabbar-item>
      <tabbar-item :badge="cartNum>0?cartNum:''" link='/cartlist'>
        <div slot="icon" class="iconfont icon-gouwuche"></div>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item selected link="/accountindex">
        <div slot="icon" class="iconfont icon-wode-fuben_fuzhi"></div>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
    <div class="head">
      <div class="head-title kz-padding-top-xl">{{userInfo.user_name}}</div>
      <div class="head-bottom kz-padding-top-xs">
        信用等级：
        <i v-for="(star,index) in starList" :key="index" :class="starList[index]" class="icon iconfont"></i>
      </div>
    </div>
    <div class="accountindex-nav">
      <div class="accountindex-nav-block">
        <p>¥{{balance}}</p>
        <p class="kz-text-default">余额</p>
      </div>
      <div class="accountindex-nav-block">
        <p>{{v_money_count}}</p>
        <p class="kz-text-default">优惠券</p>
      </div>
      <div class="accountindex-nav-block">
        <p>{{devices_count}}</p>
        <p class="kz-text-default">在租设备</p>
      </div>
      <div class="accountindex-nav-block">
        <p>¥{{credit_price}}</p>
        <p class="kz-text-default">免押金额度</p>
      </div>
    </div>
    <group>
      <cell is-link title="免押金申请" link='/freedeposit'></cell>
      <cell is-link title="账户充值" link=''></cell>
      <cell is-link title="设置" link='/set'></cell>
      <cell is-link title="加载测试" link='/scroll'></cell>
      <cell is-link title="分享" link='/share'></cell>
      <cell is-link title="通讯录" link='/contacts'></cell>
      <cell is-link title="设备信息" link='/device'></cell>
    </group>
    <p>
      <router-link to="/index">测试页</router-link>
    </p>
  </div>
</template>

<script>
  import './accountindex.less';
  import {
    XHeader,
    XButton,
    Cell,
    Group,
    Tabbar,
    TabbarItem
  } from 'vux';
  import Vue from 'vue';
  import {
    ToastPlugin
  } from 'vux';
  Vue.use(ToastPlugin);
  export default {
    components: {
      XHeader,
      XButton,
      Group,
      Cell,
      Tabbar,
      TabbarItem
    },
    data() {
      return {
        title: 'title',
        index: 0,
        starList: [],
        userInfo: '',
        balance: Number(0).toFixed(2), //账户余额
        star: 5, //信用等级
        credit_price: Number(0).toFixed(2), //可用免押金额度
        devices_count: 0, //在租设备
        v_money_count: 0, //优惠券条数
      }
    },
    created() {
      let vm = this;
      vm.cartNum = this.$store.state.cartNum;
      console.log(vm.cartNum)
      vm.userInfo = vm.$store.state.userInfo;
      console.log(vm.userInfo)
      vm.$api.post(vm, 'accountIndex', {}, function(res) {
        let response = JSON.parse(res.bodyText);
        if (response.status) {
          vm.star = Number(response.data.star) / 2;
          vm.starClass(vm.star);
          vm.balance = Number(response.data.account_data.balance).toFixed(2);
          vm.credit_price = vm.$tools._formattingMoney(response.data.account_data.credit_price);
          vm.devices_count = response.data.account_data.devices_count;
          vm.v_money_count = response.data.account_data.v_money_count;
        } else {
          if (response.code == 10001) {
            vm.$router.push('/login');
          } else {
            vm.$vux.toast.text(response.msg, 'top');
          }
        }
        this.$store.dispatch('isLoading', false);
      })
    },
    methods: {
      // 信用等级
      starClass(score) {
        let vm = this;
        const clsList = Array(5);
        let Sc = Math.floor(score) * 2 / 2;
        let point = score % 1;
        if (score < 3) {
          for (let i = 0; i < Sc; i++) {
            vm.starList.push('starLight');
          }
          vm.starList.push('starHalf');
        } else {
          for (let i = 0; i < Sc; i++) {
            vm.starList.push('starLight');
          }
        }
        while (vm.starList.length < 5) {
          vm.starList.push('starDark');
        }
      }
    }
  }
</script>
