<template>
    <div id='orderConfirm' class="page-container kz-background-gray">
        <!-- 头部 -->
        <x-header :left-options="{backText:''}">填写订单</x-header>
        <!-- 主要内容 -->
        <div class="main-content">
            <!-- 地址 -->
            <div class="address-contacts" v-show="defaultAddress">
                <div class="address kz-padding-horizontal kz-padding-vertical-sm" @click='_addressPopup'>
                    <div>
                        <span class="address-contacts-span">{{defaultName}}</span>
                        <span class="kz-padding-left-sm">{{defaultTel}}</span>
                    </div>
                    <div class="kz-font-xs kz-padding-top-xs">
                        <i class="icon-dingwei iconfont"></i>
                        {{defaultProvince}}{{defaultCity}}{{defaultRegion}}{{defaultAddress}}
                    </div>
                    <div class="jiantou">
                        <i class="iconfont icon-return"></i>
                    </div>
                </div>
            </div>
            <!-- 没有任何收货地址时显示 -->
            <div class="address-contacts" v-show="!defaultAddress">
                <div class="address kz-padding" @click='_addressPopup'>
                    <div>
                        <span class="icon-dingwei iconfont"></span>
                        <span>请填写收货地址</span>
                    </div>
                    <div class="jiantou" style="top: 17px;">
                        <span class="iconfont icon-return"></span>
                    </div>
                </div>
            </div>
            <!-- 电脑信息 -->
            <ul class="kz-margin-top-sm">
                <li class="kz-Computer-list kz-background-white kz-border-bottom kz-padding-sm"
                    v-for='(goods_info,index) in goods_infos' :key='index'>
                    <div class="img-box kz-padding-right-sm kz-vertica-horizontal-center">
                        <div>
                            <img :src='root+goods_info.img_url'/>
                            <p class="kz-text-center">
                                <span v-for="(v,i) in goods_info.configure" :key="i">{{v.name}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="cont-box">
                        <h4>{{goods_info.goods_name}}</h4>
                        <div class="kz-padding-top-xs clearfix">
                            <span class="kz-text-success pull-left">￥{{goods_info.goods_price}}/月 {{goods_info.rent_periods}}/期</span>
                            <span class="pull-right" v-if="goods_info.price_info.instruction">
                                    {{goods_info.price_info.instruction.substring(0,4)}}
                                </span>
                        </div>
                        <div class="kz-font-xs kz-text-default" style="padding-top: 3px;">
                            订单数量：{{goods_info.quantity}}台
                        </div>
                    </div>
                </li>
            </ul>
            <!--付款日，起租日期-->
            <group class="order_data">
                <datetime v-model="calendarArr[0]" :start-date="startDate"
                          :end-date="endDate" title="使用日期：">
                </datetime>
                <!-- 还款日期 -->
                <cell v-if='placesDay' title='还款日期：' :value="placesDay" ></cell>
                <cell-box v-if='!placesDay'>
                    <p class="pull-left">还款日期：</p>
                    <checker class="pull-left place-items kz-padding-left-sm" v-model="selectDay" default-item-class="default-day" selected-item-class="selected-day">
                        <checker-item value='12'>每月12日</checker-item>
                        <checker-item value='23'>每月23日</checker-item>
                    </checker>
                    <span class="whatplaceday" @click="whatplaceday = !whatplaceday">?</span>
                    <!--付款日说明-->
                    <div v-transfer-dom>
                        <x-dialog v-model="whatplaceday" class="dialog-demo" hide-on-blur>
                            <div class="img-box kz-padding kz-font-sm" style="text-align: left;">还款日期只可选择一次，一旦选择不可修改，每个月的账单请按照选择的还款日期按时还款，逾期需缴纳相应的滞纳金</div>
                        </x-dialog>
                    </div>
                </cell-box>
            </group>
            <!--优惠券 备注 -->
            <group class="order_data">
                <div v-if="couponsLen!=0">
                    <cell title='优惠券' is-link @click.native='_couponsPopup'>{{couponsLen}}个优惠券可用</cell>
                </div>
                <x-textarea title="备注" v-model="beizhu" ><br></x-textarea>
            </group>
        </div>
        <!-- 地址选择弹窗 地址列表弹窗-->
        <popup height='100%' :value='addressPopup' class="kz-background-white">
            <x-header :left-options="{backText:''}">
                收货地址
                <div slot='overwrite-left' @click='_addressPopup'>
                    <i class="icon-fanhui iconfont"></i>
                </div>
            </x-header>
            <ul class="address-popup main-content">
                <li v-for='(add,index) in address'
                    class="kz-address-list kz-padding-horizontal kz-padding-vertical-sm"
                    :key='index'>
                    <div class="address-list-lefts"
                         @click='_selectAddress(add.province,add.city,add.region,add.id,add.name,add.tel,add.detailed_address)'>
                        <p :class="{kzTextSuccess:add.id==defaultAddressId}">{{add.name}}</p>
                        <span v-show='add.is_default==1' class="address-default"
                              :class="{addressLight:add.id==defaultAddressId}">默认</span>
                    </div>
                    <div class="detail-address"
                         @click='_selectAddress(add.province,add.city,add.region,add.id,add.name,add.tel,add.detailed_address)'>
                        <p :class="{kzTextSuccess:add.id==defaultAddressId}">{{add.tel}}</p>
                        <p class="detail-address-main">
                            {{add.province}}{{add.city}}{{add.region}}{{add.detailed_address}}
                        </p>
                    </div>
                    <div class="jiantou-action kz-vertica-horizontal-center" @click='_editAddressShow(add.id,index)'>
                        <span class="iconfont icon-bianji kz-text-default" style="font-size: 20px;"></span>
                    </div>
                </li>
            </ul>
            <x-button type="primary" class="kz-fixed-bottom kz-radius-0" @click.native='_addressPopupAdd'>+ 添加收获地址
            </x-button>
        </popup>
        <!-- 添加收货地址 -->
        <popup height='100%' :value='addressPopupAdd'>
            <x-header :left-options="{backText:''}">添加收货地址
                <div slot='overwrite-left' @click='_addressPopupAdd'>
                    <i class="icon-fanhui iconfont"></i>
                </div>
            </x-header>

            <group class="address-edit">
                <div class="group-text-retive">
                    <x-input title='收货人：' v-model='addAddressName'></x-input>
                    <x-input title='联系方式：' v-model='addAddressTel'></x-input>
                    <div class="group-text-ablute kz-padding-top-sm">
                        <i class="icon iconfont icon-yonghu kz-text-success" style="font-size: 22px;"></i>
                        <h6>选联系人</h6>
                    </div>
                </div>

                <x-address value-text-align="left" title="所在地区：" v-model="addressvalue" raw-value :list='ChinaAddressV3Data' :value-sync='addressvalue' :value="getName(addressvalue)"></x-address>
                <x-input title='详细地址：' v-model='addAddressDetail'></x-input>
                <x-switch title="设为默认地址" v-model="morenSwitch"></x-switch>
            </group>

            <x-button type="primary" class="kz-fixed-bottom kz-radius-0" @click.native='_addAddressBtn'>保存并使用</x-button>
        </popup>
        <!-- 编辑地址弹窗 -->
        <popup height='100%' :value='editAddressPopup'>
            <x-header :left-options="{backText:''}">编辑收货地址
                <div slot='overwrite-left' @click='_editAddressShow'>
                    <i class="icon-fanhui iconfont"></i>
                </div>
                <div slot="right" @click="_showDelete">
                    <input style=" background: none" type="button" w-model='showDelete' value="删除"/>
                </div>
                <actionsheet v-model="showDelete" :menus="menus3" @on-click-menu-delete="_editDelete" show-cancel></actionsheet>
            </x-header>

            <group class="address-edit">
                <div class="group-text-retive">
                    <x-input title='收货人：' v-model='editAddressName'></x-input>
                    <x-input title='联系人：' v-model='editAddressTel'></x-input>
                    <div class="group-text-ablute">
                        <i class="icon iconfont icon-yonghu kz-text-success" style="font-size: 22px;"></i>
                        <h6>选联系人</h6>
                    </div>
                </div>
                <x-address value-text-align="left" title="所在地区：" v-model="editAddressvalue" raw-value :list='ChinaAddressV3Data' :value-sync='editAddressvalue' :value="getEditName(editAddressvalue)"></x-address>
                <x-input title='详细地址：' v-model='editAddressDetail'></x-input>
                <x-switch title="设为默认地址" v-model="editmorenSwitch"></x-switch>
            </group>

            <x-button type="primary" class="kz-fixed-bottom kz-radius-0" @click.native='_editAddAddressBtn'>保存并使用</x-button>
        </popup>
        <!-- 优惠券弹窗 -->
        <popup height='100%' :value='couponsPopup'>
            <x-header :left-options="{backText:''}">优惠券
                <div slot='overwrite-left' @click='_couponsPopup'>
                    <i class="icon-fanhui iconfont"></i>
                </div>
                <span slot='right'>兑换码</span>
            </x-header>
            <div class="main-content coupon-container kz-padding-horizontal kz-padding-bottom-sm" style="bottom: 45px;">
                <!-- 复选框优惠券 -->
                <checker
                    v-if='checkoutCoupons'
                    type='checkbox'
                    v-model='checkoutCouponsChecked'
                    default-item-class="couponsUnChecked"
                    selected-item-class="couponsChecked">
                    <checker-item
                        :disabled='checkoutCoupon.disabled'
                        v-for='(checkoutCoupon,index) in checkoutCoupons'
                        class="coupons-li kz-margin-top-sm"
                        :key='index'
                        :class="{couponsDisabled:checkoutCoupon.disabled}"
                        :value='{id:checkoutCoupon.id,price:checkoutCoupon.price,discount:checkoutCoupon.discount/100,type:checkoutCoupon.type}'>
                        <p class="iconfont icon-duihao couponCheckedIcon"></p>
                        <div v-show='checkoutCoupon.type==2' class="coupons-left kz-vertica-horizontal-center">
                            <span class="kz-text-success">
                                ¥<span class="price_num">{{Math.round(checkoutCoupon.price)}}</span>
                            </span>
                        </div>
                        <div class="coupons-right">
                            <h3 v-show='checkoutCoupon.type==2'>现金券</h3>
                            <div class="kz-padding-top-sm kz-text-default">
                                有效期<br>
                                {{checkoutCoupon.valid_start_time}}-{{checkoutCoupon.valid_end_time}}
                            </div>
                        </div>
                    </checker-item>
                </checker>
                <!-- 单选框优惠券 -->
                <checker
                        v-if="coupons"
                        v-model='couponsChecked'
                        default-item-class="couponsUnChecked"
                        selected-item-class="couponsChecked">
                    <checker-item
                        :disabled='coupon.disabled'
                        v-for='(coupon,index) in coupons'
                        class="coupons-li kz-margin-top-sm"
                        :value="{id:coupon.id,price:coupon.price,discount:coupon.discount/100,type:coupon.type}"
                        :class="{couponsDisabled:coupon.disabled}"
                        :key='index'>
                        <!-- 1满减券 -->
                        <p class="iconfont icon-duihao couponCheckedIcon"></p>
                        <div class="coupons-left kz-vertica-horizontal-center" v-show='coupon.type==1'>
                            <p class="kz-text-success">
                            <span>¥<span class="price_num">{{coupon.price}}</span></span><br>
                            <span class="kz-font-xs">满{{coupon.reach_price}}可用</span>
                            </p>
                        </div>
                        <!-- 折扣券 -->
                        <div class="coupons-left kz-vertica-horizontal-center" v-show='coupon.type==3'>
                            <span class="kz-text-success"><span class="price_num">{{coupon.discount/10}}</span>折</span>
                        </div>
                        <div class="coupons-right">
                            <h3>{{coupon.name}}</h3>
                            <div class="kz-padding-top-sm kz-text-default">
                                有效期<br>
                                {{coupon.valid_start_time}}-{{coupon.valid_end_time}}
                            </div>
                        </div>
                    </checker-item>
                </checker>
            </div>
            <x-button class="kz-fixed-bottom kz-radius-0" type="primary" @click.native='_couponsPopup'>确定</x-button>
        </popup>
        <!-- 底部 -->
        <div :class="{zindexbig:totalDetail}" class="orderFoot kz-fixed-bottom kz-border-top">
            <div class="total-money">
                本次支付金额: <span class="kz-text-danger">¥ {{totalMoney}}</span>
                <div @click='_totalDetail' class="total-icon kz-vertica-horizontal-center">
                    <i class="icon-fanhui-copy iconfont" v-show='!totalDetail'></i>
                    <i class="icon-shangjiantou iconfont" v-show='totalDetail'></i>
                </div>
            </div>
            <div class="tijiao kz-vertica-horizontal-center" @click='_submit'>
                提交订单
            </div>
        </div>
        <!-- 金额明细弹窗-->
        <popup v-model='totalDetail' class="total-detail kz-padding-horizontal">
            <ul class="kz-money">
                <li class="kz-money-action clearfix">
                    <span class="pull-left">订单总额</span>
                    <span class="priceDetailRight kz-text-danger">¥ {{orderTotal}}</span>
                </li>
                <li class="clearfix">
                    <span class="pull-left">商品总押金</span>
                    <span class="priceDetailRight">¥{{totalDeposit}}</span>
                </li>
                <li class="clearfix">
                    <span class="pull-left">本次免押金</span>
                    <span class="priceDetailRight">-¥ {{mianDeposit}}</span>
                </li>
                <li class="clearfix">
                    <span class="pull-left">需支付押金</span>
                    <span class="priceDetailRight">¥ {{needDeposit}}</span>
                </li>
                <li class="clearfix">
                    <span class="pull-left">优惠券使用金额</span>
                    <span class="priceDetailRight">¥ {{couponMoney}}</span>
                </li>
                <li class="clearfix">
                    <span class="pull-left">首付租金</span>
                    <span class="priceDetailRight">¥ {{(firstPayMoney-couponMoney).toFixed(2)}}</span>
                </li>
            </ul>
        </popup>
    </div>
</template>
<script>
    import './orderConfirm.less';
    import {
            XHeader,XButton,
            Group,
            Cell,CellBox,Datetime,
            Checker,
            CheckerItem,
            XTextarea,
            Popup,
            XInput,
            XAddress,
            ChinaAddressV3Data,
            Value2nameFilter as value2name,TransferDomDirective as TransferDom,
            Actionsheet,
            XSwitch,XDialog
    } from 'vux';
    import moment from 'moment';
    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,XButton,
            Group,
            Cell,CellBox,Datetime,
            Checker,
            CheckerItem,
            XTextarea,
            Popup,
            XInput,
            XAddress,
            ChinaAddressV3Data,
            Actionsheet,
            XSwitch,XDialog
        },
        data(){
            return{
                menus3: {
                    'title.noop': '是否删除该地址？',
                    delete: '<span style="color:red">删除</span>'
                },
                root: ROOT,
                reqParams: '',
                orderType: '',//接受的参数type
                totalDetail: false,//金额明细
                orderDatas: '',
                goods_infos: '',
                address:'',//地址数据
                defaultProvince:'',
                defaultCity:'',
                defaultRegion:'',
                defaultAddress:'',//默认收获地址
                defaultName:'',//默认收货人
                defaultTel:'',//默认收货人联系方式
                defaultAddressId:'',//默认收货地址id
                calendar:'',//日期
                calendarArr:[],
                startDate:'',   // 可选起租日期开始
                endDate:'',     // 可选起租日期结束
                placesDay:'',//统一还款日
                selectDay:'12',//选择每月还款日
                coupons:'',//单选优惠券数据
                couponsChecked:'',//单选优惠券选择的
                checkoutCoupons:'',//复选优惠券
                checkoutCouponsChecked:[],//复选框优惠券选中的
                goodsIds:[],
                couponId:'',//优惠券的ID
                couponsLen:0,//优惠券张数
                beizhu:'',//备注
                whatplaceday:false, // 付款日期选择说明

                addressPopup:false,//地址弹窗是否显示
                addressPopupAdd:false,//添加收货地址是否显示
                editAddressPopup:false,//编辑地址弹窗是否显示
                couponsPopup:false,//优惠券弹窗是否显示

                should_price:'',//支付金额

                // 添加收货地址用到数据
                addressvalue: [], //addressvalue
                ChinaAddressV3Data: ChinaAddressV3Data,     //全国地址数据
                morenSwitch:false,//地址默认开关
                addAddressName:'',
                addAddressTel:'',
                addAddressProvince:'',
                addAddressCity:'',
                addAddressRegion:'',
                addAddressDetail:'',

                // 编辑地址使用到的数据
                showDelete:false,
                editIndex:'',
                editAddressId:'',
                editAddressvalue:[],
                editAddAddressProvince:'',
                editAddAddressCity:'',
                editAddAddressRegion:'',
                editAddressDetail:'',
                editmorenSwitch:false,
                editAddressName:'',
                editAddressTel:'',
                // 订单金额详细
                totalDeposit:Number(0).toFixed(2),//商品总押金
                mianDeposit:Number(0).toFixed(2),//本次免押金
                needDeposit:Number(0).toFixed(2),//需支付押金
                firstPayMoney:Number(0).toFixed(2),//首付租金
                orderTotal:Number(0).toFixed(2),//订单总额
                benefit_price:0,//可优惠金额
            }
        },
        computed:{
            couponMoney(){
                let vm=this;
                let money=0;
                let ids=[];
                if(vm.couponsChecked.type==1){
                    money=Number(vm.couponsChecked.price);
                }else if(vm.couponsChecked.type==3){
                    money=vm.should_price*(1-vm.couponsChecked.discount);
                };
                ids.push(vm.couponsChecked.id);
                for(let i=0;i<vm.checkoutCouponsChecked.length;i++){
                    money+=Number(vm.checkoutCouponsChecked[i].price);
                    ids.push(vm.checkoutCouponsChecked[i].id)
                }
                money=(Number(money)>=Number(vm.benefit_price))?vm.benefit_price:money||0;
                ids=vm.$tools.remove_array_space(ids);
                vm.couponId=ids.join('-');
                return money.toFixed(2);
            },
            totalMoney(){
                let vm=this;
                return (vm.should_price-vm.couponMoney).toFixed(2);
            }
        },
        created(){
            let params=JSON.parse(this.$route.params.id);
            let vm=this;
            vm.reqParams=params;
            vm.orderType=params.type;
            vm.$api.post(vm,'directconfirm',params,function(res){
                this.$store.dispatch('isLoading',false);
                let response=JSON.parse(res.bodyText);
                if(response.status){
                    vm.orderDatas=response.data;
                    vm.goods_infos=response.data.goods_info;
                    vm.placesDay=response.data.user_account.places_day;
                    vm.checkoutCoupons=response.data.coupons.coupon_cash;
                    vm.coupons=response.data.coupons.coupon_ordinary;
                    vm.benefit_price=response.data.pay_info.benefit_price;
                    vm.should_price=Number(response.data.pay_info.price).toFixed(2);//本次支付金额
                    vm.orderTotal=(Number(response.data.pay_info.price)+Number(response.data.pay_info.credit_price)).toFixed(2);//订单总额
                    vm.totalDeposit=(Number(response.data.pay_info.deposit_price)+Number(response.data.pay_info.credit_price)).toFixed(2);//商品总押金
                    vm.mianDeposit=Number(response.data.pay_info.credit_price).toFixed(2);//免押金
                    vm.needDeposit=Number(response.data.pay_info.deposit_price).toFixed(2);//需支付押金
                    vm.firstPayMoney=Number(response.data.pay_info.price-response.data.pay_info.deposit_price).toFixed(2);//首月支付金额
                    let checkoutCouponsLen,couponsLen;
                    if(vm.checkoutCoupons){
                        checkoutCouponsLen=vm.checkoutCoupons.length
                    }else{
                        checkoutCouponsLen=0;
                    };
                    if(vm.coupons){
                        couponsLen=vm.coupons.length;
                    }else{
                        couponsLen=0;
                    }
                    vm.couponsLen=checkoutCouponsLen+couponsLen;
                    // 默认的地址开始
                    vm.address=response.data.user_address.list;

                    if(vm.address[0]){
                        vm.defaultName=vm.address[0].name;
                        vm.defaultTel=vm.address[0].tel;
                        vm.defaultAddress=vm.address[0].detailed_address;
                        vm.defaultAddressId=vm.address[0].id;
                        vm.defaultProvince=vm.address[0].province;
                        vm.defaultCity=vm.address[0].city;
                        vm.defaultRegion=vm.address[0].region;
                    }else{
                        vm.defaultName='';
                        vm.defaultTel='';
                        vm.defaultAddress='';
                        vm.defaultAddressId='';
                        vm.defaultProvince='';
                        vm.defaultCity='';
                        vm.defaultRegion='';
                    }
                    // 默认的地址结束
                    if(vm.coupons){
                        for(let i=0;i<vm.coupons.length;i++){
                            vm.coupons[i].valid_start_time=moment(vm.coupons[i].valid_start_time*1000).format('Y.M.D');
                            vm.coupons[i].valid_end_time=moment(vm.coupons[i].valid_end_time*1000).format('Y.M.D');
                            if(Number(vm.coupons[i].reach_price)>Number(vm.benefit_price)){
                                vm.coupons[i]['disabled']=true;
                            }else{
                                vm.coupons[i]['disabled']=false;
                            };
                        };
                    }
                    if (vm.checkoutCoupons) {
                        for (let i = 0; i < vm.checkoutCoupons.length; i++) {
                            vm.checkoutCoupons[i].valid_start_time = moment(vm.checkoutCoupons[i].valid_start_time * 1000).format('Y.M.D');
                            vm.checkoutCoupons[i].valid_end_time = moment(vm.checkoutCoupons[i].valid_end_time * 1000).format('Y.M.D');
                        }
                    }
                    for(let j=0;j<vm.goods_infos.length;j++){
                        vm.calendarArr[j]=vm.goods_infos[j].startDate;
                        vm.goodsIds[j]=vm.goods_infos[j].id;
                    }
                    // 定义可选起租日期
                    vm.startDate = vm.goods_infos[0].startDate;
                    vm.endDate = vm.goods_infos[0].maxdate;
                }else{
                    this.$vux.toast.text(response.msg, 'top');
                    vm.$router.go('-1');
                }
            })
        },
        methods:{
            _showDelete(){
                let vm=this;
                vm.showDelete=!vm.showDelete;
            },
            // 金额明细
            _totalDetail(){
                let vm=this;
                vm.totalDetail=!vm.totalDetail;
            },
            // 地址弹窗显示隐藏
            _addressPopup(){
                let vm=this;
                vm.addressPopup=!vm.addressPopup;
            },
            // 判断单选优惠券是否可选
            _coupons(){
                let vm=this;
                if(vm.coupons){
                    for(let i=0;i<vm.coupons.length;i++){
                        if(Number(vm.coupons[i].reach_price)>Number(vm.benefit_price)){
                            vm.coupons[i]['disabled']=true;
                        }else{
                            vm.coupons[i]['disabled']=false;
                        };
                    };
                }
            },
            // 添加收货地址弹窗显示隐藏
            _addressPopupAdd(){
                let vm=this;
                vm.addressPopup=!vm.addressPopup;
                vm.addressPopupAdd=!vm.addressPopupAdd;
            },
            // 添加地址的添加并使用函数
            _addAddressBtn(){
                let vm=this;
                let params={
                    name:vm.addAddressName,
                    province:vm.addAddressProvince,
                    city:vm.addAddressCity,
                    region:vm.addAddressRegion,
                    detailed_address:vm.addAddressDetail,
                    tel:vm.addAddressTel,
                    is_default:(vm.morenSwitch)?1:0
                };
                vm.$api.post(vm,'addresssave',params,function(res){
                    let response=JSON.parse(res.bodyText);
                    if(response.status){
                        vm.defaultName=vm.addAddressName;
                        vm.defaultTel=vm.addAddressTel;
                        vm.defaultAddress=vm.addAddressDetail;
                        vm.defaultAddressId=response.id;
                        vm.defaultProvince=vm.addAddressProvince;
                        vm.defaultCity=vm.addAddressCity;
                        vm.defaultRegion=vm.addAddressRegion;
                        let addressPush={
                            province:vm.addAddressProvince,
                            city:vm.addAddressCity,
                            region:vm.addAddressRegion,
                            name:vm.addAddressName,
                            tel:vm.addAddressTel,
                            detailed_address:vm.addAddressDetail,
                            id:response.id
                        };
                        if(vm.morenSwitch){
                            vm.address.unshift(addressPush);
                        }else{
                            vm.address.push(addressPush);
                        }
                        vm.addressPopupAdd=!vm.addressPopupAdd;
                    }else{
                        vm.$vux.toast.text(response.msg,'top');
                    }
                });
            },
            // 地址编辑显示隐藏
            _editAddressShow(id,index){
                let vm=this;
                vm.editAddressPopup=!vm.editAddressPopup;
                vm.editAddressId=id;
                vm.editIndex=index;
                if(vm.editAddressPopup){
                    vm.$api.post(vm,'addressmodify',{id:id},function(res){
                        let response=JSON.parse(res.bodyText).data;
                        vm.editAddressvalue=[response.province,response.city,response.region];
                        vm.editAddressName=response.name;
                        vm.editAddressTel=response.tel;
                        vm.editAddressDetail=response.detailed_address;
                        if(response.is_default==1){
                            vm.editmorenSwitch=true;
                        }else{
                            vm.editmorenSwitch=false;
                        }
                    })
                }
            },
            // 编辑地址保存并使用函数
            _editAddAddressBtn(){
                let vm=this;
                let params={
                    id:vm.editAddressId,
                    name:vm.editAddressName,
                    province:vm.editAddAddressProvince,
                    city:vm.editAddAddressCity,
                    region:vm.editAddAddressRegion,
                    detailed_address:vm.editAddressDetail,
                    tel:vm.editAddressTel,
                    is_default:(vm.editmorenSwitch)?1:0
                };
                vm.$api.post(vm,'addresssave',params,function(res){
                    let response=JSON.parse(res.bodyText);
                    if(response.status){
                        vm.defaultName=vm.editAddressName;
                        vm.defaultTel=vm.editAddressTel;
                        vm.defaultAddress=vm.editAddressDetail;
                        vm.defaultAddressId=vm.editAddressId;
                        vm.editAddressPopup=!vm.editAddressPopup;
                        // 编辑成功之后手动修改前端数据
                        vm.address[vm.editIndex].name=vm.editAddressName;
                        vm.address[vm.editIndex].tel=vm.editAddressTel;
                        vm.address[vm.editIndex].detailed_address=vm.editAddressDetail;
                    }else{
                        vm.$vux.toast.text(response.msg,'top');
                    }
                });
            },
            // 地址编辑删除
            _editDelete(){
                let vm=this;
                vm.$api.post(vm,'addressdelete',{id:vm.editAddressId},function(res){
                    let response=JSON.parse(res.bodyText);
                    if(response.status){
                        vm.editAddressPopup=!vm.editAddressPopup;
                        vm.address.splice(vm.editIndex,1);
                    };
                    vm.$vux.toast.text(response.msg,'top');
                })
            },
            // 将地址id转换为文字
            getName (value) {
                let vm=this;
                let arr=value2name(value, ChinaAddressV3Data);
                arr=arr.split(' ')||'';
                vm.addAddressProvince=arr[0];
                vm.addAddressCity=arr[1];
                vm.addAddressRegion=arr[2];
            },
            getEditName(value){
                let vm=this;
                let arr=value2name(value, ChinaAddressV3Data);
                arr=arr.split(' ')||'';
                vm.editAddAddressProvince=arr[0];
                vm.editAddAddressCity=arr[1];
                vm.editAddAddressRegion=arr[2];
            },
            // 收货地址选择
            _selectAddress(province,city,region,id,name,tel,detail){
                let vm=this;
                vm.addressPopup=!vm.addressPopup;
                vm.defaultAddressId=id;
                vm.defaultName=name;
                vm.defaultTel=tel;
                vm.defaultAddress=detail;
                vm.defaultProvince=province;
                vm.defaultCity=city;
                vm.defaultRegion=region;
            },
            // 优惠券显示隐藏
            _couponsPopup(){
                this.couponsPopup = !this.couponsPopup;
            },
            // 提交订单
            _submit(){
                let vm=this;
                let params;
                // 购物车订单
                if (vm.orderType == 2) {
                    // 下单起租日期修改
                    for (let i = 0; i < vm.calendarArr.length; i++) {
                        vm.calendarArr[i] = vm.calendarArr[0];
                    }
                    params = {
                        type: vm.orderType,
                        address_id: vm.defaultAddressId,
                        pay_type: 1,
                        remark: vm.beizhu,
                        rent_begin: vm.calendarArr,
                        coupon: vm.couponId,
                        places_day: vm.placesDay || vm.selectDay,
                        ids: vm.goodsIds
                    };
                } else if (vm.orderType == 1) {
                    // 单个商品下单
                    params = {
                        type: vm.orderType,
                        address_id: vm.defaultAddressId,
                        pay_type: 1,
                        remark: vm.beizhu,
                        goods_id: vm.reqParams.goods_id,
                        rent_begin: vm.calendarArr,
                        quantity: vm.reqParams.quantity,
                        dynamic_price_id: vm.reqParams.dynamic_price_id,
                        coupon: vm.couponId,
                        places_day: vm.placesDay || vm.selectDay,
                        config: vm.reqParams.config
                    };
                };
                vm.$api.post(vm,'createorder',params,function(res){
                    let response = JSON.parse(res.bodyText);
                    let userAccounts=JSON.parse(localStorage.getItem('userAccounts'));
                    userAccounts['cart_nums']=response.cart_nums;
                    localStorage.setItem('userAccounts',JSON.stringify(userAccounts));
                    this.$store.dispatch('userInfo',userAccounts);
                    this.$store.dispatch('cartNum',response.cart_nums);
                    if (response.status) {
                        let params = {
                            orderId: response.order_id || '',
                            type: vm.orderType,
                            deal_id: response.deal_id || '',
                            shoppingId: response.shopping_id || ''
                        };
                        params = JSON.stringify(params);
                        vm.$router.push('/payType' + params);
                    } else {
                        vm.$vux.toast.text(response.msg, 'top');
                    }
                })
            }
        },
        watch:{
            // 监听优惠的金额
            couponMoney:{
                handler(val,oldval){
                    let vm=this;
                    val=Number(val);
                    vm.benefit_price=Number(vm.benefit_price);
                    let couponIds=vm.couponId.split('-');

                    if (val >= vm.benefit_price && vm.checkoutCoupons.length > 0) {
                        for (let i = 0; i < vm.checkoutCoupons.length; i++) {
                            if (couponIds.indexOf(vm.checkoutCoupons[i].id) != -1) {
                                vm.checkoutCoupons[i]['disabled'] = false;
                            } else {
                                vm.checkoutCoupons[i]['disabled'] = true;
                            }
                        }
                        if(vm.coupons){
                            for(let i=0;i<vm.coupons.length;i++){
                                if(couponIds.indexOf(vm.coupons[i].id)!=-1){
                                    vm.coupons[i]['disabled']=false;
                                }else{
                                    vm.coupons[i]['disabled']=true;
                                };
                            };
                        }
                    }else{
                        if (vm.checkoutCoupons) {
                            for (let i = 0; i < vm.checkoutCoupons.length; i++) {
                                vm.checkoutCoupons[i]['disabled'] = false;
                            }
                        }
                        vm._coupons()
                    }
                },
                deep:true
            }
        }
    }
</script>