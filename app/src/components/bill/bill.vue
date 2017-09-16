<template>
    <div id="bill" class='page-container kz-background-white'>
        <x-header :left-options="{showBack: false}">我的账单</x-header>
        <div class="kz-bill-header kz-padding-horizontal-sm">
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="pull-left kz-font-xs">本月账单</div>
                </flexbox-item>
                <flexbox-item>
                    <div class="pull-right kz-font-xs">还款日{{placeDay}}号</div>
                </flexbox-item>
            </flexbox>
            <div class="kz-text-center kz-font-xs">本月待还金额</div>
            <div class="bill-price kz-text-center kz-padding-top-xs"><span class="kz-font">¥</span>{{willPay}}</div>
            <flexbox>
                <flexbox-item>
                    <x-button class="all-pay kz-margin-top-xs" type="primary" @click.native="_allPay">一键还款</x-button>
                </flexbox-item>
            </flexbox>

            <flexbox :gutter="0" class="pay-detail kz-margin-top-sm">
                <flexbox-item>
                    <div class="kz-text-center border-right">
                        <p class="text">本月已还金额</p>
                        <p class="price">¥{{momentPay}}</p>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="kz-text-center">
                        <p class="text">逾期未还金额</p>
                        <p class="price">¥{{overdueList.overdue_money||'0.00'}}</p>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <!--逾期列表-->
        <group class="ifoverdue">
            <cell title="逾期未还账单" is-link @click.native="overduePopup=!overduePopup"></cell>
        </group>


        <x-header class="billListTitle">
            <div slot="overwrite-left">
                 {{yearMon}}账单
            </div>
            <div slot="right" @click="_datePopup">
                <i class="icon-fcstubiao20 iconfont"></i>
            </div>
        </x-header>

        <ul class="bill-items kz-padding-horizontal">
            <li v-for="(billData,index) in billDatas" :key="index">
                <div class="bill-item-div">
                    <div>订单号：{{billData.order_trade_no}}</div>
                    <div>
                        第
                        <span class="kz-text-success kz-font-lg">{{billData.sequence}}</span>
                        期
                    </div>
                </div>
                <div class="bill-item-div">
                    <div>
                        租金：
                        <span class="bill-item-color">¥{{billData.rent_price}}</span>
                        <span v-if="billData.breach">&nbsp;滞纳金：<span>¥{{billData.breach}}</span></span>
                    </div>
                    <div v-show="billData.status==1"
                         class="bill-item-btn-dark bill-item-color kz-vertica-horizontal-center">已还
                    </div>
                    <div v-show="billData.status==0" @click="_pay(billData.id)"
                         class="bill-item-btn bill-item-color kz-vertica-horizontal-center">还款
                    </div>
                </div>
            </li>
        </ul>

        <!-- 月份弹窗 -->
        <popup v-model="datePopup">
            <x-header>
                <div slot="overwrite-left" @click="_subYear">
                    <i class="icon-fanhui iconfont"></i>
                </div>
                {{year}}
                <div slot="right" @click="_addYear">
                    <i class="icon-return iconfont"></i>
                </div>
            </x-header>
            <div class="checkMouth">
                <button
                    @click="getCurrentMomth(year+-num)"
                    :value="year+-num"
                    v-for='(num,index) in 12'
                    :key="index"
                    :class="{overdue:overdueCheck(year+-num),accomplished:accomplishedCheck(year+-num),nobeginning:nobeginningCheck(year+-num)}">{{num}}</button>
            </div>
        </popup>

        <!-- 逾期账单列表 -->
        <popup v-model="overduePopup" height='100%' id="overdue">
            <div class="bill-head">
                <x-header :left-options="{backText:''}">
                    逾期未还账单
                    <div slot="overwrite-left" @click="overduePopup=!overduePopup">
                        <i style="color: #fff;" class="icon-fanhui iconfont"></i>
                    </div>
                </x-header>
                <div class="kz-bill-header">
                    <p>逾期金额</p>
                    <div class="bill-price kz-text-center kz-padding-top-xs"><span class="kz-font">¥</span>{{overdueList.overdue_money||'0.00'}}</div>
                    <div class="kz-padding-bottom">
                        逾期滞纳金￥{{overdueList.overdue_branch||'0.00'}}
                    </div>
                </div>
            </div>
            <div v-show="overdueList.overdue_money" class="bill-popup-bottom">
                <div class="bill-popup-bottom-money kz-vertica-horizontal-center">
                    逾期账单总额数：¥{{(Number(overdueList.overdue_money)+Number(overdueList.overdue_branch)).toFixed(2)||'0.00'}}
                </div>
                <div class="bill-popup-bottom-btn kz-vertica-horizontal-center">
                    一键还款
                </div>
            </div>
            <ul v-show="overdueList.overdue_money" class="bill-items kz-padding-horizontal bill-overdue-ul kz-background-white">
                <li v-for="(overdue,index) in overdueList.list" :key="index">
                    <div class="bill-item-div">
                        <div>订单号：{{overdue.order_trade_no}}</div>
                        <div>{{overdue.places_day}}</div>
                    </div>
                    <div class="bill-item-div">
                        <div>
                            租金：
                            <span class="kz-text-success">¥{{overdue.rent_price}}</span>
                        </div>
                        <div v-show="overdue.breach">
                            滞纳金<span class="kz-text-success">¥{{overdue.breach}}</span>
                        </div>
                        <div @click="_pay(overdue.id)" class="bill-item-btn bill-item-color kz-vertica-horizontal-center">还款</div>
                    </div>
                </li>
            </ul>
            <div v-show="!overdueList.overdue_money">
                <div class="kz-vertica-horizontal-center xinyong-img">
                    <img src="static/img/xinyong.png"/>
                </div>
                <div class="kz-vertica-horizontal-center">
                    当前没有逾期未还账单，您的信用良好！
                </div>
                <div class="kz-vertica-horizontal-center">
                    继续保持会提升免押金额度哦！
                </div>
            </div>
        </popup>

        <!--底部工具栏-->
        <tabbar>
            <tabbar-item link="/">
                <div slot="icon" class="iconfont icon-zhuye"></div>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item selected show-dot link='bill'>
                <div slot="icon" class="iconfont icon-fcstubiao20"></div>
                <span slot="label">账单</span>
            </tabbar-item>
            <tabbar-item :badge="cartNume>0?cartNume:''" link='/cartlist'>
                <div slot="icon" class="iconfont icon-gouwuche"></div>
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item link="/accountindex">
                <div slot="icon" class="iconfont icon-wode-fuben_fuzhi"></div>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import './bill.less';
    import moment from 'moment';
    import {
        Tabbar,Flexbox, FlexboxItem,
        TabbarItem,
        XHeader,
        XButton,
        Group,
        Cell,
        Popup,
        Checker,
        CheckerItem
    } from 'vux';
    export default {
        components: {
            Tabbar,Flexbox, FlexboxItem,
            TabbarItem,
            XHeader,XButton,
            Group,
            Cell,
            Popup,
            Checker,
            CheckerItem
        },
        data() {
            return {
                cartNume: '',
                year: moment(new Date().getTime()).format('Y'),
                month: '', //月份
                currentDate: moment(new Date().getTime()).format('Y-M'),
                placeDay: '', //还款日
                dateDatas: [], //账单月
                datePopup: false,
                billDatas: '', //账单列表
                willPay: (0).toFixed(2), //当月待还款金额
                momentPay:(0).toFixed(2),//当月已还金额
                overdueList:'',//逾期数据
                overduePopup:false,//逾期弹窗页面
                accomplished:'',//已经还清的账单月份
                nobeginning:'', // 未开始的账单月份
                overdue:'', //有逾期的账单月份
            }
        },
        created() {
            let vm = this;
                vm.cartNume = this.$store.state.cartNum;
                vm.currentDate = vm.currentDate;
                vm.$api.post(vm, 'billlist', {
                    date: vm.currentDate
                }, function(res) {
                    this.$store.dispatch('isLoading', false);
                    let response = JSON.parse(res.bodyText);
                    if (response.status) {
                        let billItems = response.data;
                        vm.dateDatas = billItems.date_data;
                        vm.billDatas = billItems.bill_data;
                        vm.willPay = Number(billItems.will_pay).toFixed(2);//当月待还金额
                        vm.placeDay = billItems.place_day;
                        vm.overdueList=billItems.overdueList;
                        vm.accomplished = billItems.billClassify.accomplished //已经还清的账单月份
                        vm.nobeginning = billItems.billClassify.nobeginning // 未开始的账单月份
                        vm.overdue = billItems.billClassify.overdue; //有逾期的账单月份
                        for(let i=0;i<vm.dateDatas.length;i++){
                            if(vm.dateDatas[i].date==vm.currentDate){
                                vm.momentPay=Number(vm.dateDatas[i].money_pay).toFixed(2);
                            }
                        };
                        for(let i=0;i<vm.overdueList.list.length;i++){
                            vm.overdueList.list[i].places_day=moment(vm.overdueList.list[i].places_day*1000).format('Y-M');
                        }
                    } else {
                        if (response.code == 10001) {
                            vm.$router.push('/login');
                        } else {
                            vm.$vux.toast.text(response.msg, 'top');
                        }
                    }
                })
        },
        computed:{
            yearMon(){
                let vm=this;
                let ym=`${vm.currentDate.split('-')[0]}年${vm.currentDate.split('-')[1]}月`;
                return ym;
            }
        },
        methods: {
            // 根据月份跳转账单
            getCurrentMomth(date){
                // console.log(date);
                this.datePopup=false;
                this._getDatas(date);
            },
            // 判断月份是不是已经逾期的月份
            overdueCheck(date){
                let vm = this;
                var i = vm.overdue.length;
                while (i--) {
                    if (this.overdue[i] === date) {
                        return true;
                    }
                }
                return false;
            },

            // 判断月份是不是已经还清的月份
            accomplishedCheck(date){
                let vm = this;
                var i = vm.accomplished.length;
                while (i--) {
                    if (this.accomplished[i] === date) {
                        return true;
                    }
                }
                return false;
            },

            // 判断月份是不是没有开始的月份
            nobeginningCheck(date){
                let vm = this;
                var i = vm.nobeginning.length;
                while (i--) {
                    if (this.nobeginning[i] === date) {
                        return true;
                    }
                }
                return false;
            },

            // 获取数据
            _getDatas(date) {
                let vm = this;
                vm.cartNume = this.$store.state.cartNum;
                vm.currentDate = date;
                vm.$api.post(vm, 'billlist', {
                    date: date
                }, function(res) {
                    this.$store.dispatch('isLoading', false);
                    let response = JSON.parse(res.bodyText);
                    if (response.status) {
                        let billItems = response.data;
                        vm.dateDatas = billItems.date_data;
                        vm.billDatas = billItems.bill_data;
                        // vm.willPay = Number(billItems.will_pay).toFixed(2);
                        vm.placeDay = billItems.place_day;
                        vm.overdueList=billItems.overdueList;
                        vm.accomplished = billItems.billClassify.accomplished //已经还清的账单月份
                        vm.nobeginning = billItems.billClassify.nobeginning // 未开始的账单月份
                        vm.overdue = billItems.billClassify.overdue; //有逾期的账单月份
                        // for(let i=0;i<vm.dateDatas.length;i++){
                        //     if(vm.dateDatas[i].date==vm.currentDate){
                        //         console.log(vm.dateDatas[i]);
                        //         vm.momentPay=Number(vm.dateDatas[i].money_pay).toFixed(2);
                        //     }
                        // };
                        for(let i=0;i<vm.overdueList.list.length;i++){
                            vm.overdueList.list[i].places_day=moment(vm.overdueList.list[i].places_day*1000).format('Y-M');
                        }
                    } else {
                        if (response.code == 10001) {
                            //vm.$vux.toast.text(response.msg, 'top');
                            vm.$router.push('/login');
                        } else {
                            vm.$vux.toast.text(response.msg, 'top');
                        }
                    }
                })
            },
            // 控制月份弹窗显示隐藏
            _datePopup() {
                let vm = this;
                vm.datePopup = !vm.datePopup;
            },
            //控制年份加
            _addYear() {
                let vm = this;
                vm.year = (vm.year - 0 + 1).toString();
            },
            // 控制年份减
            _subYear() {
                let vm = this;
                vm.year = (vm.year - 1).toString();
            },
            // 还款
            _pay(id){
                let vm=this;
                let params={
                    calculation_type:1,
                    data:id
                };
                vm.$api.post(vm,'billpay',params,function(res){
                    console.log(res);
                })
            },
            // 一键还款
            _allPay(){
                let vm=this;
                let params={
                    calculation_type:2,
                    data:vm.currentDate
                };
                console.log(params);
            }
        },
    }
</script>

