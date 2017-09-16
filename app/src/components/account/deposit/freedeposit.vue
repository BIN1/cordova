<template>
    <div id="freedeposit" class="page-container kz-background-gray">
        <x-header title="免押金状态" :left-options="{backText:'' }">
        </x-header>

        <div class="kz-background-white kz-padding-vertical-lg">
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flex-demo kz-text-center kz-deposit-price kz-border-right">
                        <h4 class="kz-text-success"><span style="font-size:12px;">¥</span><span>{{credit_total}}</span></h4>
                        <p class="kz-padding-top-sm kz-text-default">免押金额度</p>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo kz-text-center kz-deposit-price">
                        <h4 class="kz-text-success"><span style="font-size:12px;">¥</span><span>{{deposit_balance}}</span></h4>
                        <p class="kz-padding-top-sm kz-text-default">可用免押金额度</p>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <!--芝麻信用-->
        <div v-show="depositStatus ==0 ||depositStatus ==1" class="kz-background-white kz-border-top kz-font">
            <cell :link="{path:'/openzm'}" v-show="!zm_status" title="芝麻信用：0" value="立即绑定" is-link></cell>
            <cell v-show="zm_status" :title="zm_score"></cell>
        </div>

        <group>
            <cell @click.native="operationPathgo" :title="btnName" :value="operationName" is-link></cell>
            <cell v-show="depositStatus ==1" :link="{path:'/updeposit'}" title="提升额度"  is-link></cell>
            <cell v-show="depositStatus ==1" :link="{path:'/updepositrecord'}" title="提升额度记录"  is-link></cell>
        </group>
    </div>
</template>

<script>
    import Vue from 'vue';
    import './freedeposit.less';
    import {XHeader, ToastPlugin, Flexbox, FlexboxItem, Group, Cell, CellBox} from 'vux';
    Vue.use(ToastPlugin);
    export default{
        components: {
            XHeader, Flexbox, FlexboxItem, Group, Cell, CellBox
        },
        data(){
            return {
                // 全部免押金额度
                credit_total: Number(0).toFixed(2),
                // 可用免押金额度
                deposit_balance: Number(0).toFixed(2),
                // 判断押金额度字体大小
                creditFontsize:0,
                // 芝麻信用信息
                zm_status: false,
                zm_score: 0,

                depositStatus: '10',
                operationName: '',
                btnName: '',
            }
        },
        created(){
            let vm = this;
            vm.$api.post(vm, 'freedeposit', {}, function (res) {
                let response = JSON.parse(res.bodyText);
                if (response.status) {
                    vm.$store.dispatch('isLoading',false);
                    // 获取免押金状态
                    vm.depositStatus = response.data.account_data.freedeposit_status;
                    // 芝麻信用状态
                    vm.zm_status = response.data.zm_data.status;
                    if(vm.zm_status){
                        vm.zm_score = '芝麻信用：'+response.data.zm_data.score;
                    }
                    if (vm.depositStatus == 10) {
                        vm.operationName = '';
                        vm.btnName = '申请免押金';
                    } else if (vm.depositStatus == 0) {
                        vm.operationName = '查看详情';
                        vm.btnName = '申请状态：审核中';
                    } else if (vm.depositStatus == 1) {
                        vm.operationName = '';
                        vm.btnName = '查看免押金详情';
                        // 免押金总额
                        vm.credit_total =vm.$tools._formattingMoney(response.data.account_data.credit_total);
                        // 可用额度
                        vm.deposit_balance = vm.$tools._formattingMoney(response.data.account_data.credit_price);
                    } else if (vm.depositStatus == 2) {
                        vm.operationName = '重新申请';
                        vm.btnName = '审核未通过';
                    } else if (vm.depositStatus == 3) {
                        vm.operationName = '提交资料';
                        vm.btnName = '临时保存';
                    } else if (vm.depositStatus == 4) {
                        vm.operationName = '去编辑';
                        vm.btnName = '重新编辑';
                    } else if (vm.depositStatus == 5) {
                        vm.operationName = '提交资料';
                        vm.btnName = '已取消';
                    }
                }else{
                    if (response.code == 10001) {
                        vm.$vux.toast.text(response.msg, 'top');
                        this.$router.push('/login');
                    } else {
                        vm.$vux.toast.text(response.msg, 'top');
                    }
                }
            });
            vm.$nextTick(() => {
                console.log(this.$store.state)
            });
        },
        methods:{
            // 免押金按钮点击跳转
            operationPathgo(){
                if (this.depositStatus == 0 || this.depositStatus == 1) {
                    this.$router.push('/showdepositinfo');
                }else{
                    this.$router.push('/deposit');
                }
            }
        }
    }
</script>
