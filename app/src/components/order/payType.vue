<template>
<div id="payType" class="page-container kz-background-gray">
    <x-header>填写订单</x-header>
    <!--账户余额-->
    <group>
        <cell-box>
            <label>
                <input type="checkbox" v-model="balanceMoney">
                <span>账户余额</span>
                <span class="kz-margin-horizontal-sm">¥{{balance}}</span>
            </label>
        </cell-box>
    </group>

    <div class="kz-margin-top-sm kz-background-white kz-padding-horizontal">
        <!--计算后需要支付的金额-->
        <div class="needPay clearfix">
            <span class="pull-left">支付方式：</span>
            <span class="pull-right">还需支付<span class="kz-text-danger">￥{{needPay}}</span></span>
        </div>

        <checker v-model="payType" default-item-class="paytype-item" selected-item-class="paytype-item-selected">
            <checker-item value="3">
                <div class="item-cont">
                    <img src="../../assets/img/yinlian@2x.png"/>
                    <span>微信支付</span>
                    <div class="ring"></div>
                </div>
            </checker-item>
            <checker-item value="1">
                <div class="item-cont">
                    <img src="../../assets/img/yinlian@2x.png"/>
                    <span>支付宝支付</span>
                    <div class="ring"></div>
                </div>
            </checker-item>
            <checker-item value="5">
                <div class="item-cont">
                    <img src="../../assets/img/yinlian@2x.png"/>
                    <span>银联支付</span>
                    <div class="ring"></div>
                </div>
            </checker-item>
        </checker>
    </div>
    <!--底部去支付按钮-->
    <div class="foot kz-vertica-horizontal-center kz-font" @click="gotopay" :class="{noCheckPayType:!payType}">
        {{btnText}}&nbsp;<span v-if="payType">¥{{orderPrice}}</span>
    </div>
</div>
</template>

<script>
import './payType.less';
import {XHeader,Group, Checker, CheckerItem, Cell,CellBox, Checklist} from 'vux';
export default {
    components: { XHeader,Group, Checker, CheckerItem,
        Cell,CellBox,
        Checklist
    },
    data() {
        return {
            balanceMoney: 0, //账户余额选中与否
            balance: 0, //账户余额
            payType: 0,  // 支付方式
            orderPrice: 0,//订单金额
            root:ROOT,
        }
    },
    computed:{
        btnText(){
            let text='';
            let vm=this;
            if(vm.payType==1){
                text='支付宝支付';
            }else if(vm.payType==3){
                text='微信支付';
            }else if(vm.payType==3){
                text='余额支付';
            }else if(vm.payType==5){
                text='银联支付';
            }else{
                text='选择支付方式';
            };
            return text;
        },
        // 最终需支付金额
        needPay(){
            let vm=this;
            // 先判断余额支付是否选中
            if(vm.balanceMoney){
                //return (vm.orderPrice).toFixed(2);
                if(vm.balance>=vm.orderPrice){
                    return (0).toFixed(2);
                }else{
                    return (vm.orderPrice-vm.balance).toFixed(2);
                }
            }else{
                return vm.orderPrice;
            }
        }
    },
    watch:{
        needPay(newVal){
            if(newVal==0){
                this.payType=2;
            }
        }
    },
    created() {
        let vm = this;
        let orderId = JSON.parse(vm.$route.params.id);
        vm.balance = Number(vm.$store.state.balance);

        let params = {
            order_id: orderId.orderId,
            shopping_id: orderId.shoppingId,
            type: orderId.type,
            deal_id: orderId.deal_id
        };
        // 获取支付信息
        vm.$api.post(vm, 'orderpayonline', params, function (res) {
            this.$store.dispatch('isLoading', false);
            let response = JSON.parse(res.bodyText);
            if (response.status) {
                vm.orderPrice = response.data.pay_price.price;
                // 更新个人账户金额
                vm.balance = response.data.allBalance.allBalance;
            } else {
                vm.$vux.toast.text(response.msg, 'top');
            }
        })
    },
    methods: {
        // 去支付
        gotopay(){
            let vm = this;
            let params = JSON.parse(vm.$route.params.id);
            let token = localStorage.getItem('token');
            // 整理支付地址
            let pay_url = '';
            if(params.type == 1){
                pay_url = `${vm.root}/app/account/orderPayOnline/order_id/${params.orderId}/pay_method/${vm.payType}/pay_balance/${vm.balanceMoney}/type/1/token/${token}`;
            }else if (params.type == 2){
                pay_url = `${vm.root}/app/account/orderPayOnline/shopping_id/${params.shoppingId}/pay_method/${vm.payType}/pay_balance/${vm.balanceMoney}/type/2/token/${token}`;
            }
            document.addEventListener("deviceready",onDeviceReady,false);
            function onDeviceReady() {
                cordova.InAppBrowser.open(pay_url, '_blank', 'location=yes');
            }
        }
    }
}
</script>
