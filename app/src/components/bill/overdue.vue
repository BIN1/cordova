<template>
    <div id="overdue">
        <div class="bill-head">
            <x-header :left-options="{backText:''}">
                逾期未还账单
            </x-header>
            <div class="bill-head-cont kz-vertica-horizontal-center">
                逾期金额
            </div>
            <div class="bill-head-cont kz-vertica-horizontal-center">
                ¥4000.00
            </div>
            <div class="bill-head-cont kz-vertica-horizontal-center">
                逾期滞纳金￥4000.00
            </div>
        </div>
    </div>
</template>

<script>
    import './bill.less';
    import {
        XHeader
    } from 'vux';
    export default {
        components: {
            XHeader
        },
        created() {
            this.$store.dispatch('isLoading', false);
        }
    }
</script>
