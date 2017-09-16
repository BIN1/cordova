<template>
<div id="cart" class="page-container kz-background-gray">
    <x-header :left-options="{backText:''}">
        购物车
        <!-- <div slot="right" @click='_confirm(rightText)'>{{rightText}}</div> -->
    </x-header>
    <!-- 主内容栏 -->
    <div class="main-cont">
        <ul class="cart-item">
            <swipeout>
                <li style="" v-for="(cartData,index) in cartDatas" :key="index" class="kz-border-bottom">
                    <swipeout-item>
                        <div slot='right-menu'>
                            <swipeout-button style="width: 80px;" type="primary" @click.native='_delete(cartData.id,index)'>删除
                            </swipeout-button>
                        </div>
                        <div slot='content' class="item-content">
                            <div class="li-top">
                                <label class="check-box kz-vertica-horizontal-center">
                                    <checker class="icon iconfont" v-model="checkCart" type="checkbox"
                                             default-item-class="check-item" selected-item-class="check-item-selected">
                                        <checker-item
                                                :value="{id:cartData.id,price:cartData.goods_price_show,quantity:cartDatas[index].quantity}"></checker-item>
                                    </checker>
                                </label>
                                <div class="img-box kz-vertica-horizontal-center">
                                    <div>
                                    <img class="kz-img" :src="root+cartData.img_url" style="display: block"/>
                                    <p>{{cartData.price_info.instruction.substring(0,4)}}</p>
                                    <!-- <p>
                                        <span v-for="(config,configkey) in cartData.configure" :key="configkey">{{config.name}}</span>
                                    </p> -->
                                    </div>
                                </div>
                            </div>
                            <div class="li-bottom kz-padding-horizontal-xs" >
                                <p style="overflow: hidden!important;text-overflow: ellipsis!important;white-space: nowrap;color: #333333" class="kz-padding-top-sm" @click="_toDetail(cartData.goods_id)">
                                    {{cartData.goods_name}}
                                </p>
                                <p v-for="(type,index) in cartData.type" class="huise" :key="index">
                                    {{type.detail_name}}
                                </p>
                                <div class="listFooter clearfix kz-padding-vertical-sm">
                                    <div class="kz-text-success pull-left">
                                        <span>¥{{cartData.goods_price_show}}/月</span>
                                        <span>{{cartData.price_info.m}}/期</span>
                                    </div>
                                    <div class="li-bottom-right pull-right kz-pull">
                                        <button class="btn1" v-bind:class="{ act: cartDatas[index].quantity==1 }" @click="_quantitySub(index,cartDatas[index].id)">-
                                    </button>
                                        <input type="text" v-model="cartDatas[index].quantity" max="300">
                                        <button class="btn2" @click="_quantityAdd(index,cartDatas[index].id)">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </li>
            </swipeout>
        </ul>
    </div>
    <!-- 去结算栏 -->
    <div class="foot-top">
        <div class="font-top-cont kz-padding-left-sm">
        <label>
            <input @click.stop="_checkAll" ref="checkAll" type="checkbox"
                   class="checkAll icon iconfont" name="all"/>
            <span class="kz-select">全选</span>
        </label>
            <span class="kz-total">合计：¥ {{Total}}</span>
        </div>
        <div @click='_clearing' class="foot-top-btn kz-vertica-horizontal-center">
            去结算({{checkLen}})
        </div>
    </div>
    <!--底部工具栏-->
    <tabbar>
        <tabbar-item link="/">
            <div slot="icon" class="iconfont icon-zhuye"></div>
            <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item show-dot link='bill'>
            <div slot="icon" class="iconfont icon-fcstubiao20"></div>
            <span slot="label">账单</span>
        </tabbar-item>
        <tabbar-item selected :badge="cartNume>0?cartNume:''" link='/cartlist'>
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
    import './cartlist.less';
    import {XHeader, Tabbar, TabbarItem, Checker, Swipeout, SwipeoutItem, SwipeoutButton, CheckerItem} from 'vux';
    export default {
        components: {
            XHeader,
            Tabbar,
            TabbarItem,
            Checker,
            Swipeout,
            SwipeoutItem,
            SwipeoutButton,
            CheckerItem
        },
        data() {
            return {
                root: ROOT,
                cartDatas: '', //购物车数据
                rightText: '编辑',
                checkCart: [], //选择的
                settlement: true, //结算按钮是否显示
                Total: (0).toFixed(2),
                cartNume: '',
            }
        },
        created() {
            const token = localStorage.getItem('token');
            let vm = this;
            vm.cartNume = this.$store.state.cartNum;
            vm.$api.post(vm, 'cartlist', {}, function (res) {
                let response = JSON.parse(res.bodyText);
                this.$store.dispatch('isLoading', false);
                if (response.status) {
                    vm.cartDatas = response.data.data;
                    let userAccounts = JSON.parse(localStorage.getItem('userAccounts'));
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
        computed: {
            //计算选中的长度
            checkLen() {
                return this.checkCart.length;
            }
        },
        methods: {
            // 数量减
            _quantitySub(index, id) {
                let vm = this;
                if (vm.cartDatas[index].quantity > 1) {
                    vm.cartDatas[index].quantity--;
                }else{
                    vm.$vux.toast.text('不能再变少了', 'top');
                    return;
                }
                let num = Number(vm.cartDatas[index].quantity);
                id = Number(id);
                let params = {
                    quantity: num,
                    id: id
                };
                for (let i = 0; i < vm.checkCart.length; i++) {
                    if (vm.checkCart[i].id == id) {
                        vm.checkCart[i].quantity = num;
                    }
                };
                vm._cartUpdateNum(params);
            },
            // 数量加
            _quantityAdd(index, id) {
                let vm = this;
                if(vm.cartDatas[index].quantity<300){
                    vm.cartDatas[index].quantity++;
                }else{
                    vm.$vux.toast.text('数量不能超过300', 'top');
                    return;
                }
                let num = Number(vm.cartDatas[index].quantity);
                id = Number(id);
                let params = {
                    quantity: num,
                    id: id
                };
                for (let i = 0; i < vm.checkCart.length; i++) {
                    if (vm.checkCart[i].id == id) {
                        vm.checkCart[i].quantity = num;
                    }
                }
                vm._cartUpdateNum(params);
            },
            // 更新数量
            _cartUpdateNum(params){
                let vm=this;
                vm.$api.post(vm, 'cartUpdateNum', params, function (res) {
                    let response = JSON.parse(res.bodyText);
                    if(response.status){
                        console.log(response.msg);
                    }else{
                        vm.$vux.toast.text(response.msg, 'top');
                    }
                })
            },
            // 全选
            _checkAll() {
                let vm = this;
                if (!vm.$refs.checkAll.checked) {
                    vm.checkCart = [];
                } else {
                    vm.checkCart = [];
                    for (let i = 0; i < vm.cartDatas.length; i++) {
                        vm.checkCart[i] = {
                            'id': vm.cartDatas[i].id,
                            'price': vm.cartDatas[i].goods_price_show,
                            'quantity': vm.cartDatas[i].quantity
                        };
                    }
                }
            },
            // 编辑或完成按钮
            _confirm(text) {
                let vm = this;
                if (text == '编辑') {
                    vm.rightText = '完成';
                    vm.checkCart = [];
                    vm.settlement = false;
                } else {
                    vm.rightText = '编辑';
                    vm.checkCart = [];
                    vm.settlement = true;
                }
            },
            // 删除
            _delete(id, index) {
                let vm = this;
                vm.$api.post(vm, 'delcart', {
                    'id': id
                }, function (res) {
                    console.log(res);
                    let response = JSON.parse(res.bodyText);
                    if (response.status) {
                        vm.cartDatas.splice(index, 1);
                        let cart_nums = response.cart_nums;
                        this.$store.dispatch('cartNum', cart_nums); //更改state中的购物车数量数据
                        vm.cartNume = this.$store.state.cartNum; //获取state中的购物车数量数据

                        let userAccounts = JSON.parse(localStorage.getItem('userAccounts'));
                        userAccounts.cart_nums = cart_nums;
                        userAccounts = JSON.stringify(userAccounts);
                        localStorage.setItem('userAccounts', userAccounts);
                    } else {
                        vm.$vux.toast.text(response.msg, 'top');
                    }
                })
            },
            // 计算总额函数
            _total() {
                let vm = this;
                let total = 0;
                for (let i = 0; i < vm.checkCart.length; i++) {
                    total += vm.checkCart[i].price * vm.checkCart[i].quantity;
                }
                ;
                this.Total = Number(total).toFixed(2);
            },
            // 结算
            _clearing() {
                let vm = this;
                let arr = [];
                for (let i = 0; i < vm.checkCart.length; i++) {
                    arr.push(vm.checkCart[i].id);
                }
                let params = {
                    type: 2,
                    ids: arr
                };
                if (vm.checkCart.length > 0) {
                    params = JSON.stringify(params);
                    this.$router.push('/orderConfirm' + params);
                } else {
                    vm.$vux.toast.text('请先选择商品', 'top');
                }
            },
            // 跳到该商品详情页
            _toDetail(id){
                this.$router.push('/detail'+id);
            }
        },
        watch: {
            // 深度监控
            checkCart: {
                handler() {
                    if (this.checkCart.length === this.cartDatas.length) {
                        this.$refs.checkAll.checked = true;
                    } else {
                        this.$refs.checkAll.checked = false;
                    };
                    this._total();
                },
                deep: true
            },
            cartDatas: {
                handler(val, oldval) {
                    let vm=this;
                    for(let i=0;i<val.length;i++){
                        if(vm.cartDatas[i].quantity>300){
                            let id=vm.cartDatas[i].id;
                            vm.cartDatas[i].quantity=300;
                            vm.$vux.toast.text('数量不能超过300', 'top');
                            let params = {
                                quantity: 300,
                                id: id
                            };
                            vm._cartUpdateNum(params);
                        };
                    };
                    this._total();
                },
                deep: true
            }
        }
    }
</script>
