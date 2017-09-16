<template>
    <div id="addorder" class="page-container kz-background-gray">
        <x-header :left-options="{backText:''}">
            我的订单
            <i class="weui-icon-search kz-icony"></i>
            <!-- <div slot="right" @click='_confirm(rightText)'>{{rightText}}</div> -->
        </x-header>
        <!--导航栏-->
        <ul class="kz-navs kz-text-success">
            <li><a href="javascript:;">全部</a></li>
            <li><a href="javascript:;">未支付</a></li>
            <li><a href="javascript:;">已支付</a></li>
            <li><a href="javascript:;">已完成</a></li>
            <li><a href="javascript:;">已取消</a></li>
        </ul>
        <!--商品-->
        <div class="kz-order">
            <div class="order-number">
                <p>订单号：14988123057328</p>
                <span>未支付</span>
            </div>
            <div class="order-commodity">
                <div class="order-img">
                    <div></div>
                </div>
                <div class="order-details">
                    <h5>全新苹果 Apple MacBook Pro 13英寸笔记本电脑 MPXT2CH/A</h5>
                    <p>订单数量： 10台</p>
                    <div>租金： ￥<span class="kz-bg">650.00</span>/月 <span class="kz-lefts">12期</span></div>
                </div>
            </div>
            <div class="order-determine">
                <span class="order-ative">去支付</span>
                <span>取消订单</span>

            </div>
        </div>
    </div>
</template>
<script>
    import './addorder.less';
    import {XHeader} from 'vux';
    export default {
        components:{
            XHeader
        }
    }
</script>