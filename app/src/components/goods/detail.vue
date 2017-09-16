<template>
<div id="detail" class="page-container kz-background-white">
    <!--头部tab-->
    <div class="kzDetailHead kz-border-bottom kz-background-white">
        <div @click="_back" class="head-icon kz-vertica-horizontal-center">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="head-tab">
            <tab v-model="tabIndex" :line-width="1" custom-bar-width="66px">
                <tab-item class="vux-center" v-for="(item, index) in heads" :key="index">
                    {{item}}
                </tab-item>
            </tab>
        </div>
        <div class="head-icon"></div>
    </div>
    <!-- 商品介绍 -->
    <div class="detailItem kz-background-gray" v-show="tabIndex==0">
        <!--滚动的图-->
        <div class="kz-detail-banner kz-background-white">
            <swiper v-model="imgIndex" :aspect-ratio="640/800" :auto='auto' :loop='auto' :show-dots='false'>
                <swiper-item class="swiper-demo-img" v-for="(item,index) in imgInfo" :key="index">
                    <img class='previewer-img' :src="item.src" width="100%" @click="_imgIndex(index)" />
                </swiper-item>
                <div class="img-position kz-vertica-horizontal-center">
                    <span class="kz-font-lg">{{imgIndex+1}}</span>/{{imgLen}}
                </div>
            </swiper>
            <!--点击出来大图-->
            <div v-transfer-dom>
                <previewer :list='imgInfo' ref="previewer" :options='options'></previewer>
            </div>
        </div>

        <div class="kz-background-white kz-margin-top-xs kz-padding-vertical-sm kz-padding-horizontal">
            <h1 class="kz-font-sm kz-padding-bottom-xs">{{baseInfo.goods_name}}</h1>
            <p class="kz-text-light kz-padding-bottom-xs">{{baseInfo.description}}</p>
            <h4 class="kz-text-success">
                ¥<span class="kz-font">{{baseInfo.base_price}}</span>/月
                <span class="kz-padding-left"><span class="kz-font">{{baseInfo.periods}}</span>期</span>
            </h4>
        </div>
        <!--配置价格信息-->
        <div class="configPrice">
            <group>
                <cell-box v-if='configurationText' @click.native="_peizhi()" is-link>
                    <span>已选：{{configurationText}}</span>
                </cell-box>

                <cell-box @click.native="_peizhi()" is-link>
                    <span>租赁方式：<span v-html="rentText"></span></span>
                </cell-box>
                <!--配件-->
                <cell-box v-for="(v,index) in fittingsData" :key="index">
                    <div>
                        <span>{{v.name}}：</span>
                        <span @click="_fitt(index,fitt.id,fitt.increase_price,fitt.value)" class="config"
                              :class="{configActive:fitt.id==configArr[index]}" v-for="(fitt,key) in v.data" :key="key">{{fitt.value}}</span>
                        <span v-show="v.name=='保修'" class="rent-quesition" @click="baoxiuPopup=!baoxiuPopup">?</span>
                    </div>
                </cell-box>
                <cell-box>
                    <span>数量：</span>
                    <div class="goodsNumSelect clearfix">
                        <button class="numBtn" @click="reduceNum">-</button>
                        <input class="numInput" v-model="num">
                        <button class="numBtn" @click="addNum">+</button>
                    </div>
                </cell-box>
            </group>
        </div>
        <div class="configPrice">
            <group>
                <cell-box is-link>
                    选择配件：
                   所有配件均为售卖商品，非租赁商品
                </cell-box>
            </group>
        </div>
        <div class="goods_detail">
            <span v-html="goods_detail"></span>
        </div>
        <!--下面是商品详情-->
        <!-- 配置选择 -->
        <popup class="detail_pop" v-model="configuration" max-height='100%'>
            <div class="configurationTitle clearfix kz-border-bottom">
                <div class="img kz-vertica-horizontal-center"><img :src="displayImgPath"></div>
                <div class="text">
                    <p class="kz-text-success">
                        ¥<span class="kz-font-lg">{{baseInfo.base_price}}</span>/月
                        <span class="kz-padding-left"><span class="kz-font-lg">{{baseInfo.periods}}</span> 期</span></p>
                    <p class="kz-text-light">商品编号：{{goods_id}}</p>
                </div>
                <div class="close kz-text-light">
                    <span @click="configuration=false" class="iconfont icon-cha"></span>
                </div>
            </div>
            <div class="configuration kz-padding-sm">
                <h4 class="" v-if='configurationDatas.goods_type'>配置：</h4>
                <ul v-if='configurationDatas.goods_type'>
                    <li :key="index" v-for="(config,index) in configurationDatas.goods_type" @click="_configurationId(config.id,config.detail_name)">
                        <div class="discrible" :class="{liActive:config.id==configurationId}">
                            <span>{{config.detail_name}}</span>
                        </div>
                    </li>
                </ul>
                <h4 class="kz-padding-top-sm">租赁方式：</h4>
                <ul v-if='rentDatas' class="clearfix">
                    <li :key="index" v-for="(rentData,index) in rentDatas" @click="_rentId(rentData.id,rentData.price,rentData.m,rentData.instruction)" class="pull-left kz-margin-right-sm">
                        <div class="discrible" :class="{liActive:rentData.id==rentId}">
                            <span class="rent_price">¥{{rentData.price}} ×</span>
                            <span class="rent_mon">{{rentData.m}}期</span><br>
                            <span class="rent_inst">{{rentData.instruction.substring(0,4)}}</span>
                            <span class="rent-quesition"  style="transform:scale(0.9,0.9)" @click="_zuliPopup(rentData.instruction.substring(0,4))">?</span>
                        </div>
                    </li>
                </ul>
                <group>
                    <!--配件-->
                    <cell-box v-for="(v,index) in fittingsData" :key="index">
                        <span class="">{{v.name}}：</span>
                        <div style="margin-right: 8px;" @click="_fitt(index,fitt.id,fitt.increase_price)" class="discrible" :class="{liActive:fitt.id==configArr[index]}" v-for="(fitt,key) in v.data" :key="key">
                            {{fitt.value}}
                        </div>
                        <span v-show="v.name=='保修'" class="rent-quesition" @click="baoxiuPopup=!baoxiuPopup">?</span>
                    </cell-box>
                    <cell-box class="kz-padding-bottom">
                        <span>数量：</span>
                        <div class="goodsNumSelect">
                            <button class="numBtn" @click="reduceNum">-</button>
                            <input class="numInput" v-model="num">
                            <button class="numBtn" @click="addNum">+</button>
                        </div>
                    </cell-box>
                </group>
            </div>

            <flexbox :gutter="0" class="detail_btn" v-show="isStop==0">
                <div class="detail-cart kz-vertica-horizontal-center kz-border-right kz-background-white">

                    <div class="cart-num kz-vertica-horizontal-center" v-show="cart_num>0">{{cart_num}}</div>
                    <span class="iconfont icon-gouwuche" style="font-size: 20px;"></span>

                </div>
                <flexbox-item class="kz-border-top">
                    <x-button @click.native="_buy">立即购买</x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type='primary' @click.native="_addCart">加入购物车</x-button>
                </flexbox-item>
            </flexbox>
            <flexbox :gutter="0" class="detail_btn" v-show="isStop==1">
                <flexbox-item>
                    <x-button class="wuhuo">无货</x-button>
                </flexbox-item>
            </flexbox>

        </popup>
    </div>
    <!-- 规格参数 -->
    <div v-show="tabIndex==1" class="detailItem">
        <img :src='guigeImg' width="100%" class="kz-padding-top-xs">
    </div>
    <!-- 咨询 -->
    <div v-show="tabIndex==2" class="detailItem">
        <div class='goods-zixu kz-padding-sm kz-background-white' style="height: auto;">
            <p>
                <span class="kz-text-dark">温馨提示：</span>因厂家更改产品包装、产地或者更换随机附件等没有任何提前通知，且每位咨询者购买情况、提问时间等不同，为此以下回复仅对提问者3天内有效，其他网友仅供参考！若由此给您带来不便请多多谅解，谢谢
            </p>
            <x-textarea v-model="consulting"></x-textarea>
            <div class="public-consulting">
                <x-button @click.native="publicConsulting" class='kz-margin-vertical'>发表咨询</x-button>
            </div>
        </div>
    </div>

    <div class="detailFoot kz-background-white kz-border-top" v-show="isStop==0">
        <div class="cart kz-vertica-horizontal-center kz-border-right" @click="_toCart">
            <div class="cart-num kz-vertica-horizontal-center" v-show="cart_num>0">{{cart_num}}</div>
            <span class="iconfont icon-gouwuche" style="font-size: 20px;"></span>
        </div>
        <div class="foot-left" @click="_total">
            <span class="total-discrible kz-text-danger">月租金+押金：¥{{total}}</span>
            <!-- <span class="total-discrible">月租金+押金：¥{{monTotal}}+{{deposit}}</span> -->
            <span class="total-ico iconfont icon-shangjiantou" v-if="totalUp"></span>
            <span class="total-ico iconfont icon-fanhui-copy" v-else></span>
        </div>
        <div class="foot-right kz-vertica-horizontal-center" @click="_addCart">
            加入购物车
        </div>
    </div>
    <div class="kz-vertica-horizontal-center detailFoot kz-border-top wuhuo" v-show="isStop==1">无货</div>
    <!--价格信息弹出框-->
    <popup class="total-detail" v-model="totalUp">
        <div class="popup clearfix">
            <div class="popupline clearfix">
                <span class="pull-left">月租金：</span>
                <span class="pull-right">¥{{monPrice}}</span>
            </div>
            <!-- <div class="popupline clearfix" v-show="configPriceTotal>0">
                <span class="pull-left">配件：</span>
                <span class="pull-right">¥{{configPriceTotal}}</span>
            </div> -->
            <div class="popupline clearfix" v-for="(fitt,index) in fittArr" :key="index" v-show="fitt.price>0">
                <span class="pull-left">{{fitt.name}}：</span>
                <span class="pull-right">¥{{fitt.price}}</span>
            </div>
            <div class="popupline clearfix">
                <span class="pull-left">需支付押金：</span>
                <span class="pull-right">¥{{deposit}}</span>
            </div>
            <div class="popupline">
                （<span>押金总额：</span>{{depositPrice}}<span>&nbsp;&nbsp;免押金额度：{{creditTotal}}</span>）
            </div>
            <div class="popupline clearfix">
                <span class="pull-left">首月需支付金额：</span>
                <span class="kz-text-danger pull-right">{{total}}</span>
            </div>
        </div>
    </popup>
    <!-- 保修弹窗 -->
    <popup height='100%' v-model="baoxiuPopup" style="z-index:9999;" class="kz-background-white">
        <warrantydescription @baoxiuPopup = 'baoxiuPopup=!baoxiuPopup'></warrantydescription>
    </popup>
    <!-- 租赁说明弹窗 -->
    <popup height='100%' class="zulipopup" :hide-on-blur=true v-model="zuliPopup" style="z-index:999;" @click.native="zuliPopup=!zuliPopup">
         <rentmode @rentnode="zuliPopup=!zuliPopup" :zulipopupHead ='zulipopupHead'></rentmode>
    </popup>
</div>
</template>
<script>
import './detail.less';
import moment from 'moment';
// 保修说明组件
import warrantydescription from '../about/warrantydescription.vue';
// 租赁类型说明
import rentmode from '../about/rentmode.vue';
import { XHeader,Swiper, Group, Cell, Popup,XButton, Tab, TabItem, SwiperItem, XTextarea,
    Previewer, TransferDom, CellBox, XNumber, Flexbox, FlexboxItem} from 'vux';
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader, Swiper, Group, Cell, Popup, XButton, SwiperItem,Tab,TabItem, XTextarea,
        Previewer, CellBox, XNumber, Flexbox, FlexboxItem,warrantydescription,rentmode,
    },
    data() {
        return {
            heads: ['商品介绍', '规格参数', '咨询'],
            tabIndex: 0,
            height: '',
            // 商品详情，富文本编辑器添加的详情
            goods_detail: '',
            displayImgPath: '', // 展示图路径

            root: ROOT,
            auto: true,
            imgInfo: [],
            imgIndex: 0,
            imgLen: '',
            options: {
                getThumbBoundsFn(index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll('.previewer-img')[index]
                    // get window scroll Y
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect()
                    // w = width
                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    }
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                }
            },

            baseInfo: '',
            monPrice: '', //月租金
            depositPrice: '', //产品押金
            totalUp: false,
            configuration: false, //配置页面弹出
            configurationText: '', //配置名称
            configurationDatas: '', //配置数据
            configurationId: '', //配置选择的id即商品id

            rentDatas: '', //租赁方式数据
            rentText: '2', //选择的租赁方式
            rentId: '', //租赁方式id

            fittingsData: '', //配件数据
            fittArr: [], //配件数组

            configArr: [], //配件ID数组
            configPriceArr: [], //配件价格数组
            configPriceTotal: (0).toFixed(2), //单价配件价格综合
            num: 1, //数量

            goods_id: '', //商品ID
            cart_num: '',
            guigeImg: '', //规格图片
            consulting: '',
            baoxiuPopup:false,//保修弹窗
            zuliPopup:false,//租赁说明弹窗
            zulipopupHead:'',
            isStop:'',//判断是否有货
        }
    },
    computed: {
        // 需支付押金
        deposit() {
            let vm = this;
            if (vm.creditTotal >= vm.depositPrice * vm.num) {
                return Number(0).toFixed(2);
            } else {
                return (vm.depositPrice * vm.num - vm.creditTotal).toFixed(2);
            };
        },
        creditTotal(){
            // 获取免押金额度
            return localStorage.getItem('userAccounts') ? Number(JSON.parse(localStorage.getItem('userAccounts')).credit_price).toFixed(2) : 0;
        },
        // 需支付总金额
        total() {
            let vm = this;
            let tol = vm.$tools._formattingMoney(Number(vm.monPrice * vm.num) + Number(vm.deposit) + Number(vm.configPriceTotal * vm.num));
            return tol;
        },
        monTotal() {
            let vm = this;
            return vm.$tools._formattingMoney(Number(vm.monPrice * vm.num) + Number(vm.configPriceTotal * vm.num));
        },
    },
    created() {
        let vm = this;
        let params = vm.$route.params;
        vm._getDatas(params);
        let H = document.body.offsetHeight;
        vm.height = H - 45 + 'px';
        vm.cart_num = vm.$store.state.cartNum;
    },
    methods: {
        // 返回上一页面
        _back() {
            this.$router.go(-1);
        },
        // img
        _imgIndex(index) {
            this.$refs.previewer.show(index);
        },
        // 获取数据
        _getDatas(params) {
            let vm = this;
            vm.imgInfo = [];
            vm.$api.post(vm, 'goodsdetail', params, function(res) {
                let response = JSON.parse(res.bodyText);
                let configImg = response.config_img;
                vm.guigeImg = `${ROOT}${configImg.path}${configImg.file_name}`;
                vm.baseInfo = response.base_info;
                vm.isStop=response.base_info.is_stop;
                vm.goods_id = response.base_info.id;
                vm.monPrice = vm.baseInfo.base_price;
                vm.depositPrice = vm.baseInfo.deposit_price;

                // 商品详情图
                vm.goods_detail = response.base_info.detail.replace(/\/Public/, vm.root + '/Public');
                vm.displayImgPath = `${ROOT}${response.img['0'].path}${response.img['0'].file_name}`;

                vm.configurationDatas = response.hitherto_list; //获取配置数据
                if (vm.configurationDatas) {
                    vm.configurationId = response.hitherto_list.current_goods.id; //配置id
                    vm.configurationText = response.hitherto_list.current_goods.current_configure;
                }
                // 默认动态价格
                vm.rentText = `<span>¥${response.default_price.price}/期</span>&nbsp;&nbsp;<span class="rent_mon">${response.default_price.m}期</span>&nbsp;&nbsp;<span>${response.default_price.instruction.substring(0,4)}</span>`;

                vm.rentId = response.default_price.id; // 默认动态价格ID

                vm.rentDatas = response.price_info; //租赁数据

                vm.fittingsData = response.config; //配件数据
                if (vm.fittingsData) {
                    for (let i = 0; i < vm.fittingsData.length; i++) {
                        vm.configArr[i] = vm.fittingsData[i].data[0].id;
                        vm.fittArr[i]={
                            id: vm.fittingsData[i].data[0].id,
                            price: vm.fittingsData[i].data[0].increase_price,
                            name:vm.fittingsData[i].data[0].value
                        }
                    }
                }
                vm.imgLen = response.img.length;
                for (let i = 0; i < response.img.length; i++) {
                    vm.imgInfo.push({
                        'src': `${ROOT}${response.img[i].path}${response.img[i].file_name}`
                    });
                };
                this.$store.dispatch('isLoading', false);
            })
        },
        // 点击弹出配置
        _peizhi() {
            let vm = this;
            vm.configuration = !vm.configuration;
        },
        // 获取配置的id与配置名称
        _configurationId(id, name) {
            let vm = this;
            vm.configurationId = id;
            vm.configurationText = name;
            let params = {
                id: id
            };
            vm._getDatas(params);
        },
        // 租赁方式选择
        _rentId(id, price, m, intrusion) {
            let vm = this;
            vm.rentId = id;
            vm.rentText = `<span>¥${price}/期</span>&nbsp;<span class="rent_mon">${m}期</span>&nbsp;<span>${intrusion.substring(0,4)}</span>`;
        },
        // 配件选择函数
        _fitt(index, id, price,name) {
            let vm = this;
            let str = {
                id: id,
                price: price,
                name:name
            };
            vm.fittArr[index] = str;
            let configPriceTotal=0;
            for (let i = 0; i < vm.fittArr.length; i++) {
                vm.configArr[i] = Number(vm.fittArr[i].id);
                vm.configPriceArr[i] = Number(vm.fittArr[i].price);
                configPriceTotal+=Number(vm.fittArr[i].price);
            };
            vm.configPriceTotal=(configPriceTotal).toFixed(2);
            // vm.configPriceTotal = 0;
            // for (let i = 0; i < vm.configPriceArr.length; i++) {
            //     vm.configPriceTotal += vm.configPriceArr[i];
            // };
            // vm.configPriceTotal=Number(vm.configPriceTotal).toFixed(2);
        },

        // 发表咨询
        publicConsulting() {
            let vm = this;
            let params = {
                goods_id: vm.goods_id,
                consulting: vm.consulting,
            };
            vm.$api.post(vm, 'goodsconsulting', params, function(res) {
                let response = JSON.parse(res.bodyText);
                if (response.status) {
                    vm.$vux.toast.text(response.msg, 'top');
                } else {
                    vm.$vux.toast.text(response.msg, 'top');
                }
            })
        },

        // 添加到购物车
        _addCart() {
            let vm = this;
            let newDt = new Date().getTime();
            let times = 3 * 24 * 60 * 60 * 1000;
            let rentBegin = moment(newDt + times).format('Y-M-D');
            vm.configArr = vm.$tools.remove_array_space(vm.configArr);
            let params = {
                rent_begin: rentBegin,
                goods_id: vm.goods_id,
                dynamic_price_id: vm.rentId,
                quantity: vm.num,
                config: vm.configArr
            };
            vm.$api.post(vm, 'goodsaddcart', params, function(res) {
                vm.configuration=false;
                let response = JSON.parse(res.bodyText);
                if(response.status){
                    let cartNums = response.cart_nums;
                    vm.cart_num = cartNums;
                    vm.$vux.toast.text(response.msg,'top');
                    this.$store.dispatch('cartNum', cartNums);
                    let userAccounts = JSON.parse(localStorage.getItem('userAccounts'));
                    userAccounts.cart_nums = cartNums;
                    userAccounts = JSON.stringify(userAccounts);
                    localStorage.setItem('userAccounts', userAccounts);
                }else{
                    vm.$vux.toast.text(response.msg,'top');
                }
            })
        },
        // 查看支付金额详情
        _total() {
            let vm = this;
            vm.totalUp = !vm.totalUp;
        },
        // 立即购买
        _buy() {
            let vm = this;
            let newDt = new Date().getTime();
            let times = 3 * 24 * 60 * 60 * 1000;
            let rentBegin = moment(newDt + times).format('Y-M-D');
            vm.configArr = vm.$tools.remove_array_space(vm.configArr);
            let params = {
                type: 1,
                goods_id: vm.configurationId,
                dynamic_price_id: vm.rentId,
                quantity: vm.num,
                config: vm.configArr
            };
            params = JSON.stringify(params);
            this.$router.push('/orderConfirm' + params);
            // vm.$api.post(vm,'directconfirm',params,function(res){
            //     let response = JSON.parse(res.bodyText);
            //     if(response.status){
            //         //localStorage
            //     }
            // })
        },
        // 租赁方式说明
        _zuliPopup(head){
            let vm=this;
            vm.zuliPopup=!vm.zuliPopup;
            vm.zulipopupHead=head;
        },
        _toCart(){
            this.$router.push('/cartlist');
        },


        // 商品数量选择，
        reduceNum(){
            let vm = this;
            if (vm.num > 1) {
                vm.num--;
            }
        },
        addNum(){
            let vm = this;
            if (vm.num <= 300) {
                vm.num++;
            }
        },
    },
    watch: {
        // 监听租赁数量的变化，给与正确的赋值
        num(newVal, oldVal){
            let vm = this;
            let newnum = parseInt(newVal);
            console.log(newnum);
            if (newnum <= 1 || isNaN(newnum)) {
                vm.num = 1;
            } else if (newnum > 300) {
                vm.num = 300;
            } else {
                vm.num = newnum;
            }
        }
    }
}
</script>