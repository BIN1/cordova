<template>
    <div id="addparts" class="page-container kz-background-gray">
        <!--头部tab-->
        <x-header :left-options="{backText:''}">
            搭配推荐
        </x-header>


        <!-- 主内容栏 -->
        <div class="kz-min">
            <div class="img-boxs">
                <div></div>
             </div>
            <div class="kz-rights">
                <div class="kz-rights-ps">
                    Thinkpad T420 14.0英寸笔记本电脑43
                </div>
                <p class="icon kz-text-light">
                    i5-2520M 2.5G/4G内存
                </p>
                <div class="listFooter clearfix kz-padding-vertical-sm">
                    <div class="li-bottom-left kz-text-success pull-left">
                        <span class="kz-sm">¥<span class="kz-bg">355</span>/月</span>
                        <span style="padding-left: 26px;">12/期</span>
                    </div>
                </div>
            </div>
        </div>
        <!--第二个-->
        <div class="main-cont" style="background: #fff;border-bottom: 1px solid #ebebed">
            <ul class="cart-item">
                    <li class="kz-border-bottom">
                        <div slot='content' class="item-content" style="display: -webkit-box">
                            <div class="li-tops">
                                <label class="check-box kz-vertica-horizontal-center">
                                    <checker class="icon iconfont" type="checkbox" v-model="addId"
                                             default-item-class="check-item" selected-item-class="check-item-selected">
                                        <checker-item :value="1"></checker-item>
                                    </checker>
                                </label>
                                <div class="kz-vision">
                                    <div class="kz-vision-child">
                                        <img class="kz-img" style="display: block"/>
                                    </div>
                                </div>
                            </div>
                            <div class="li-bottom kz-padding-horizontal-xs kz-webkit-flex">
                               <div class="kz-theme">HP悬挂解决 显示器挂架显示器挂架 EM870AA</div>
                                <p class="kz-text-light icon">
                                    HP悬挂解决方案 主机挂架
                                </p>
                                <div class="listFooter clearfix kz-padding-vertical-sm">
                                    <div class="li-bottom-left kz-text-success pull-left">
                                        <span class="kz-sm">¥<span class="kz-bg">355</span>/月</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
            </ul>
        </div>

         <!--去结算栏-->
        <div class="foot-top">

            <label class="font-top-cont kz-padding-left-sm">
                <div class="weui-tabbar__icon">
                    <div class="iconfont icon-gouwuche" style="color: #333333;font-size: 22px;"></div>
                    <sup><span class="vux-badge vux-badge-single">1</span></sup>
                </div>
                <span class="kz-total">合计：￥355.00</span>
            </label>

            <div style="font-size: 14px;" class="foot-top-btn kz-vertica-horizontal-center">
                <div @click='_totalDetail' class="kz-icon">
                    <i class="icon-fanhui-copy iconfont" v-show='!totalDetail'></i>
                    <i class="icon-shangjiantou iconfont" v-show='totalDetail'></i>
                </div>
                加入购物车
            </div>
        </div>

        <popup style="width: 100%;background: #fff;bottom: 49px;" v-model='totalDetail' class="total-detail">
            <div>
                <ul class="kz-money">
                    <li class="kz-money-action">
                        <span class="total-detail-li-left total-detail-action">订单总额</span>
                        <span class="total-detail-li-right total-detail-li-red">¥ }</span>
                    </li>
                    <li>
                        <span class="total-detail-li-left">商品总押金</span>
                        <span class="total-detail-li-right">¥</span>
                    </li>
                    <li>
                        <span class="total-detail-li-left">本次免押金</span>
                        <span class="total-detail-li-right">¥ </span>
                    </li>
                    <li>
                        <span class="total-detail-li-left">需支付押金</span>
                        <span class="total-detail-li-right">¥ </span>
                    </li>
                    <li>
                        <span class="total-detail-li-left">优惠券使用金额</span>
                        <span class="total-detail-li-right">¥ </span>
                    </li>
                    <li>
                        <span class="total-detail-li-left">首付租金</span>
                        <span class="total-detail-li-right">¥ </span>
                    </li>
                </ul>
                <div class="foot">
                    <div class="total-money">
                        本次支付金额: <span class="money">¥</span>
                        <div @click='_totalDetail' class="total-icon kz-vertica-horizontal-center">
                            <i class="icon-fanhui-copy iconfont" v-show='!totalDetail'></i>
                            <i class="icon-shangjiantou iconfont" v-show='totalDetail'></i>
                        </div>
                    </div>
                    <div class="tijiao kz-vertica-horizontal-center">
                        提交订单
                    </div>
                </div>
            </div>

        </popup>
    </div>

</template>
<script>
    import './addparts.less';
    import {XHeader,Popup,Checker,CheckerItem, CheckIcon} from 'vux';
    export default{

        components:{
            XHeader,
            Checker,
            Popup,
            CheckerItem,
            CheckIcon
        },
        data(){
            return {
                demo1: false,
                totalDetail:false,
                addId:[],
                demo1Checkbox:[]
            }
        },
        created(){
            this.$store.dispatch('isLoading', false);

        },

        methods:{
            _totalDetail(){
                let vm=this;
                vm.totalDetail=!vm.totalDetail;
            },
        }
    }
</script>
