<template>
    <div id="search" class="page-container kz-background-white">
        <drawer :show.sync='drawShow' placement='right' class="" style="width: 100%; overflow: hidden;">
            <div class="kz-goods-top">
                <!--搜索组件-->
                <search @on-focus='_focus' placeholder="请输入你要搜索的产品" v-model="searchElement" @on-cancel='_cancel' @on-change='_submit'>
                </search>
                <!--综合排序不分-->
                <ul class="kz-goods-sort" :class="{marginTop:margin}">
                    <li :class="{kzTextSuccess:synthesise}" class="kz-vertica-horizontal-center" @click="_synthesise">
                        综合<span class="iconfont icon-sanjiao"></span>
                    </li>
                    <li class="kz-vertica-horizontal-center" @click="_pirceSelect">
                        <div :class="{kzTextSuccess:priceLight}">价格</div>
                        <div class="price-select">
                            <span class="iconfont icon-up" :class="{priceLight:priceType=='up'}"></span>
                            <span class="iconfont icon-sanjiao" :class="{priceLight:priceType=='down'}"></span>
                        </div>
                    </li>
                    <li class="kz-vertica-horizontal-center" :class="{kzTextSuccess:newProcut}" @click="_newProduct">
                        新品
                    </li>
                    <li class="kz-vertica-horizontal-center isHasFilter" @click="_drawShow" :class="{kzTextSuccess:isHasFilter}">
                        <div>
                        筛选
                        <span class="iconfont icon-androidmorevertical"></span>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="kz-goods-methods" :class="{ulActive:goodslistActive}">
                <li @click="_brands" :class="{active:brandId,filterActive:brandOnLiving}">
                    <div class="filter_item">{{brandsText}}</div>
                </li>
                <li class="" @click="_leases" :class="{active:leaseId,filterActive:leaseOnLiving}">
                    <div class="filter_item">{{leaseText}}</div>
                </li>
                <li @click="_usageScenarios" :class="{active:usageScenariosId,filterActive:usageOnLiving}">
                    <div class="filter_item">{{usageScenarioText}}</div>
                </li>
                <li @click="_properties" :class="{active:propertiesId,filterActive:propertiesOnLiving}">
                    <div class="filter_item">{{propertieText}}</div>
                </li>
            </ul>
            <!-- 品牌选项 -->
            <div v-show="brandsShow" :class="{toggleShowActive:goodslistActive}" class="toggle-show">
                <div class="kz-padding-vertical-sm filterListWarp">
                    <div v-for="(brand,index) in brands" class="span-list" :key="index">
                        <div class="filterItem clearfix" :class="{dark:brandId==brand.id}" @click="_brandsId(brand.id,brand.detail_name)">
                            <span class="pull-left">{{brand.detail_name}}</span>
                            <span v-show="brandId==brand.id" class="iconfont icon-duihao pull-right"></span>
                        </div>
                    </div>
                </div>
                <flexbox :gutter="0">
                    <flexbox-item @click.native="_resetBrandsId">
                        <x-button>重置</x-button>
                    </flexbox-item>
                    <flexbox-item @click.native="_brandsSure(brandId)">
                        <x-button type="primary">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            <!-- 租赁方式选项 -->
            <div v-show="leaseShow" :class="{toggleShowActive:goodslistActive}" class="toggle-show">
                <div class="kz-padding-vertical-sm filterListWarp">
                    <div v-for="(lea,index) in lease" class="span-list" :key="index">
                    <div class="filterItem clearfix" :class="{dark:leaseId==lea.id}" @click="_leasesId(lea.id,lea.detail_name)">
                        <span class="pull-left">{{lea.detail_name}}</span>
                        <span v-show="leaseId==lea.id" class="iconfont icon-duihao pull-right"></span>
                    </div>
                    </div>
                </div>
                <flexbox :gutter="0">
                    <flexbox-item @click.native="_resetLeasesId">
                        <x-button>重置</x-button>
                    </flexbox-item>
                    <flexbox-item @click.native="_leasesSure(leaseId)">
                        <x-button type="primary">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            <!-- 使用场景选项 -->
            <div v-show="usageScenariosShow" :class="{toggleShowActive:goodslistActive}" class="toggle-show">
                <div class="kz-padding-vertical-sm filterListWarp">
                    <div v-for="(usageScenario,index) in usageScenarios" class="span-list"  :key="index">
                        <div class="filterItem clearfix" :class="{dark:usageScenariosId==usageScenario.id}"
                             @click="_usageScenariosId(usageScenario.id,usageScenario.detail_name)">
                            <span class="pull-left">{{usageScenario.detail_name}}</span>
                            <span v-show="usageScenariosId==usageScenario.id"
                                  class="iconfont icon-duihao pull-right"></span>
                        </div>
                    </div>
                </div>
                <flexbox :gutter="0">
                    <flexbox-item @click.native="_resetusageScenariosId">
                        <x-button>重置</x-button>
                    </flexbox-item>
                    <flexbox-item @click.native="_usageScenariosSure(usageScenariosId)">
                        <x-button type="primary">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            <!-- 新旧属性选项 -->
            <div v-show="propertiesShow" :class="{toggleShowActive:goodslistActive}" class="toggle-show">
                <div class="kz-padding-vertical-sm filterListWarp">
                <div v-for="(propertie,index) in properties" class="span-list" :key="index">
                    <div class="filterItem clearfix" :class="{dark:propertiesId==propertie.id}"
                          @click="_propertieId(propertie.id,propertie.detail_name)">
                        <span class="pull-left">{{propertie.detail_name}}</span>
                        <span v-show="propertiesId==propertie.id"
                              class="iconfont icon-duihao pull-right"></span>
                    </div>
                </div>
                    </div>
                <flexbox :gutter="0">
                    <flexbox-item @click.native='_resetpropertieId'>
                        <x-button>重置</x-button>
                    </flexbox-item>
                    <flexbox-item @click.native="_propertieSure(propertiesId)">
                        <x-button type="primary">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
            <!-- 主要数据内容渲染 -->
            <div class="goodslist" ref="goodslist" :class="{goodslistActive:goodslistActive}">
                <ul :style="styleTans" class="goodlist-box" ref="goodsul">
                    <li v-for="(good,index) in goodsData" v-if='good' @click="_detail(good.id)" :key="index">
                        <div class="img-box kz-vertica-horizontal-center">
                            <img :src="root+good.path+good.file_name"/>
                        </div>
                        <div class="goods-describe kz-border-bottom">
                            <p class="goods-title">{{good.goods_name}}{{good.description}}</p>
                            <div class="goods-describe-price kz-text-success kz-padding-top">
                                ¥<span class="kz-font-lg">{{good.base_price}}</span>/月 <span class="kz-padding-left-lg">
                                    <span class="kz-font-lg">{{good.periods}}</span> 期</span>
                            </div>
                        </div>
                    </li>
                    <div class="kz-padding-top kz-text-center" v-if="goodsData.length == 0">暂无记录!</div>
                </ul>
                <load-more v-show="moreshow"></load-more>
            </div>
            <!--下方固定按钮-->
            <tabbar>
                <tabbar-item selected link="/">
                    <div slot="icon" class="iconfont icon-zhuye"></div>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item show-dot link='/bill'>
                    <div slot="icon" class="iconfont icon-fcstubiao20"></div>
                    <span slot="label">账单</span>
                </tabbar-item>
                <tabbar-item :badge="cartNum>0?cartNum:''" link='/cartlist'>
                    <div slot="icon" class="iconfont icon-gouwuche"></div>
                    <span slot="label">购物车</span>
                </tabbar-item>
                <tabbar-item link="/accountindex">
                    <div slot="icon" class="iconfont icon-wode-fuben_fuzhi"></div>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
            <div slot="drawer" class="drawer">
                <div class="drawer-padding">
                    <h6>价格区间（元）</h6>
                    <ul class='interval'>
                        <li v-for="(priceData,index) in priceDatas" :class="{activeSpan:priceData.id==priceId}" class="kz-vertica-horizontal-center" @click="_priceId(priceData.id)" :key="index">
                            <span v-show="priceData.id==priceId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{priceData.detail_name}}</span>
                        </li>
                    </ul>
                    <h6>品牌</h6>
                    <ul class='interval'>
                        <li v-for="(brand,index) in brands" :class="{activeSpan:brand.id==brandId}" class="kz-vertica-horizontal-center" @click="_brandsId(brand.id,brand.detail_name)" :key="index">
                            <span v-show="brand.id==brandId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{brand.detail_name}}</span>
                        </li>
                    </ul>
                    <h6>分类</h6>
                    <ul class='interval'>
                        <li :key='index' v-for="(classificationData,index) in classificationDatas" :class="{activeSpan:classificationData.id==classificationId}" class="kz-vertica-horizontal-center" @click="_classificationId(classificationData.id)">
                            <span v-show="classificationData.id==classificationId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{classificationData.detail_name}}</span>
                        </li>
                    </ul>
                    <h6>新旧属性</h6>
                    <ul class='interval'>
                        <li :key="index" v-for="(propertie,index) in properties" :class="{activeSpan:propertie.id==propertiesId}" class="kz-vertica-horizontal-center"  @click="_propertieId(propertie.id,propertie.detail_name)">
                            <span v-show="propertie.id==propertiesId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{propertie.detail_name}}</span>
                        </li>
                    </ul>
                    <h6>租赁方式</h6>
                    <ul class='interval'>
                        <li :key="index" v-for="(lea,index) in lease" :class="{activeSpan:lea.id==leaseId}" class="kz-vertica-horizontal-center" @click="_leasesId(lea.id,lea.detail_name)">
                            <span v-show="lea.id==leaseId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{lea.detail_name}}</span>
                        </li>
                    </ul>
                    <h6>办公场景</h6>
                    <ul class='interval'>
                        <li :key="index" v-for="(usageScenario,index) in usageScenarios" :class="{activeSpan:usageScenario.id==usageScenariosId}" class="kz-vertica-horizontal-center" @click="_usageScenariosId(usageScenario.id,usageScenario.detail_name)">
                            <span v-show="usageScenario.id==usageScenariosId" class="iconfont icon-duihao pull-right"></span>&nbsp;<span>{{usageScenario.detail_name}}</span>
                        </li>
                    </ul>
                </div>
                <div style="height:42px; "></div>
                <flexbox class="filter-fixed-bar" :gutter="0">
                    <flexbox-item @click.native="_drawReset">
                        <x-button>重置</x-button>
                    </flexbox-item>
                    <flexbox-item @click.native="_drawSure">
                        <x-button type="primary">确定</x-button>
                    </flexbox-item>
                </flexbox>
            </div>
        </drawer>
    </div>
</template>
<script>
    import './goodslist.less';
    // 导入组件
    import {XHeader, Tabbar, TabbarItem, Search, LoadMore, XButton, Flexbox, FlexboxItem, Drawer, Panel} from 'vux';
    // 导入插件
    export default {
        components: {
            XHeader,
            Tabbar,
            TabbarItem,
            Search,
            LoadMore,
            XButton,
            Flexbox,
            FlexboxItem,
            Drawer, Panel
        },
        data() {
            return {
                root: ROOT,
                searchElement:'',
                margin:false,
                num: '',
                item: 8,
                selectdata: '', //查询数据
                synthesise:false,   //综合是否高亮显示
                priceType: '', //价格选择类型up或者down
                priceLight:false,//价格选项是否高亮
                newProcut:false,//新品是否高亮
                drawShow: false,
                drawDatas:'',  //侧边栏循坏的数据
                goodsData: '', //产品数据
                continue: '', //判断是否还有更多数据
                moreshow: false, //判断加载更多是否显示
    
                brands: '', //品牌数据
                brandsText:'品牌',
                brandId: '',
                brandsShow: false,
                brandOnLiving :false, //是否筛选展开

                lease: '', //租赁方式数据
                leaseText:'租赁方式',
                leaseId: '',
                leaseShow: false,
                leaseOnLiving :false, //是否筛选展开
    
                usageScenarios: '', //使用场景数据
                usageScenarioText:'使用场景',
                usageScenariosId: '',
                usageScenariosShow: false,
                usageOnLiving :false, //是否筛选展开
    
                properties: '', //新旧属性数据
                propertieText:'新旧属性',
                propertiesId: '',
                propertiesShow: false,
                propertiesOnLiving :false, //是否筛选展开

                priceDatas:[ { "detail_name": "" } ],//价格数据
                priceId:'',

                classificationDatas:'',//分类数据
                classificationId:'',

                selectArr: [], //选择查询数组
                cartNum:'',
                scroll:'',//监听滚动条
                goodslistActive:false,
                startY:0,
                endY:0,
                moveY:40,
                styleTans:{
                    'transform':'translateY("+moveY+")px)'
                }
            }
        },
        created() {
            let vm = this;
            let default_filter = vm.$route.query.id;
            if(default_filter){
                vm.selectArr.push(default_filter);
            };
            // let userAccounts=JSON.parse(localStorage.getItem('userAccounts'))||'';
            let userAccounts=(localStorage.getItem('userAccounts'))?JSON.parse(localStorage.getItem('userAccounts')):'';
            // vm.cartNum=userAccounts.cart_nums;
            vm.cartNum=this.$store.state.cartNum;//获取购物车数量
            this.getSelect();
            this.getGoods();
            this.$nextTick(() => {
                this.$refs.goodslist.addEventListener('scroll', this._scroll)
            })
        },
        methods: {
            // 获取商品选择项
            getSelect() {
                let vm = this;
                vm.$api.post(vm, 'goodslist', {}, function(res) {
                    let response = JSON.parse(res.bodyText).data;
                    vm.drawDatas=response;
                    vm.brands = response[0].detail;     //品牌数据
                    vm.lease = response[5].detail;      //租赁方式数据
                    vm.usageScenarios = response[2].detail;//使用场景数据
                    vm.properties = response[4].detail;     //新旧属性数据

                    // 对租金数据进行处理，将元字出去，波浪换成-
                    let datas = response[3].detail;
                    for (let i in datas) {
                        datas[i]['detail_name'] = datas[i]['detail_name'].replace(/元/g, '')
                        datas[i]['detail_name'] = datas[i]['detail_name'].replace(/~/, '-');
                    }
                    vm.priceDatas = datas;       //租金数据
                    vm.classificationDatas=response[1].detail;//分类数据
                })
            },
            // 获取全部商品
            getGoods() {
                let vm = this;
                vm.num = 0;
                let params = {
                    category_filter: vm.selectArr,
                    p: vm.num,
                    item: vm.item,
                    sort:vm.priceType,
                    querystr:vm.searchElement,
                    newest:vm.newProcut
                };
                vm.$api.post(vm, 'goodslisting', params, function(res) {
                    let response = JSON.parse(res.bodyText);
                    vm.goodsData = response.filter_goods;
                    vm.continue = res.data.continue;
                    this.$store.dispatch('isLoading',false);
                    // 条件选择时滚回到顶部
                    vm.$nextTick(() => {
                        vm.$refs.goodslist.scrollTop = 0;
                    })
                });
            },
            //侧边栏显示与否
            _drawShow(){
                let vm=this;
                vm.drawShow=!vm.drawShow;
            },
            // 查询框聚焦时
            _focus(){
                let vm = this;
                vm.margin = true;
            },
            // 查询框取消时
            _cancel(){
                let vm=this;
                vm.margin=false;
            },
            // 查询框查询时
            _submit(){
                let vm=this;
                vm.getGoods();
            },
            // 上拉加载
            _scroll() {
                let vm = this;
                let H = document.body.offsetHeight; //视图窗口高度
                let goodslist = vm.$refs.goodslist.scrollTop; //goodslist的滚动高度
                let goodslistH=vm.$refs.goodslist.offsetHeight;
                let goodsulH = vm.$refs.goodsul.offsetHeight; //goodsul的高度
                vm.scroll=goodslist;
                vm.brandsShow=false;
                vm.leaseShow=false;
                vm.usageScenariosShow=false;
                vm.propertiesShow=false;
                let status = (goodslist == goodsulH-goodslistH) ? true : false; //判断是否滑倒底部
                if (vm.continue) {
                    if (status) {
                        vm.num++;
                        vm.moreshow = true;
                        let params = {
                            category_filter: vm.selectArr,
                            p: vm.num,
                            item: vm.item,
                            sort:vm.priceType,
                            querystr:vm.searchElement,
                            newest:vm.newProcut
                        };
                        vm.$api.post(vm, 'goodslisting', params, function(res) {
                            let response = JSON.parse(res.bodyText);
                            vm.continue = res.data.continue;
                            let datas = response.filter_goods;
                            vm.goodsData = vm.goodsData.concat(datas);
                            vm.$nextTick(() => {
                                vm.moreshow = false;
                            })
                        })
                    }
                } else if (!vm.continue && status) {
                    vm.$vux.toast.text('没有更多数据了', 'bottom');
                };
                if(goodslist==0){
                    this.$refs.goodslist.addEventListener('touchstart', this.touchStart);
                    this.$refs.goodslist.addEventListener('touchmove', this.touchMove)
                }
            },
            touchStart(evt){
                let touch=evt.touches[0];
                let y=Number(touch.pageY);
                this.startY=y;
            },
            touchMove(evt){
                let vm=this;
                let touch=evt.touches[0];
                let y=Number(touch.pageY);
                if(y-vm.startY>50){
                    //console.log('vm.startY:'+(y-vm.startY));
                }
            },
            // 综合选择
            _synthesise(){
                let vm=this;
                vm.synthesise=true;
                vm.priceLight=false;
                vm.newProcut=false;
                vm.priceType='';
                vm.getGoods();
                vm.drawShow=false;
            },
            // 价格的查询高低
            _pirceSelect() {
                let vm = this;
                vm.synthesise=false;
                vm.priceLight=true;
                vm.newProcut=false;
                if(vm.priceType==''){
                    vm.priceType='up';
                }else if(vm.priceType=='up'){
                    vm.priceType='down';
                }else if(vm.priceType=='down'){
                    vm.priceType='up';
                };
                vm.getGoods();
            },
            // 新品
            _newProduct(){
                let vm=this;
                vm.synthesise=false;
                vm.priceLight=false;
                vm.newProcut=true;
                vm.priceType='';
                vm.getGoods();
            },
            // 品牌选择项显示
            _brands() {
                let vm = this;
                vm.brandsShow = !vm.brandsShow;
                vm.leaseShow = false;
                vm.usageScenariosShow = false;
                vm.propertiesShow = false;
                vm.brandOnLiving = !vm.brandOnLiving; // 添加展开状态
                vm.leaseOnLiving = false;
                vm.usageOnLiving = false;
                vm.propertiesOnLiving = false;
            },
            // 获取id与名字
            _brandsId(id,name) {
                let vm = this;
                vm.brandId = id;
                vm.brandsText=name;
            },
            // 品牌重置
            _resetBrandsId() {
                let vm = this;
                vm.brandId = '';
                vm.brandsText='品牌';
                vm.brandsShow = !vm.brandsShow;
                vm.selectArr= ['',vm.leaseId,vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.brandOnLiving = false; // 去除展开状态
            },
            // 品牌选择确定
            _brandsSure(id) {
                let vm = this;
                vm.brandsShow = !vm.brandsShow;
                vm.selectArr= [id,vm.leaseId,vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.brandOnLiving = false; // 去除展开状态
            },
    
            // 租赁方式选项显示
            _leases() {
                let vm = this;
                vm.leaseShow = !vm.leaseShow;
                vm.brandsShow = false;
                vm.usageScenariosShow = false;
                vm.propertiesShow = false;

                vm.leaseOnLiving = !vm.leaseOnLiving; // 添加展开状态
                vm.brandOnLiving = false;
                vm.usageOnLiving = false;
                vm.propertiesOnLiving = false;
            },
            // 获取租赁方式id
            _leasesId(id,name) {
                let vm = this;
                vm.leaseId = id;
                vm.leaseText=name;
            },
            // 租赁方式重置
            _resetLeasesId() {
                let vm = this;
                vm.leaseId = '';
                vm.leaseText='租赁方式';
                vm.leaseShow = !vm.leaseShow;
                vm.selectArr= [vm.brandId,'',vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.leaseOnLiving = false; // 去除展开状态
            },
            // 租赁方式选择确定
            _leasesSure(id) {
                let vm = this;
                vm.leaseShow = !vm.leaseShow;
                vm.selectArr= [vm.brandId,id,vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.leaseOnLiving = false; // 去除展开状态
            },
    
            // 使用场景
            _usageScenarios() {
                let vm = this;
                vm.usageScenariosShow = !vm.usageScenariosShow;
                vm.leaseShow = false;
                vm.brandsShow = false;
                vm.propertiesShow = false;
                vm.usageOnLiving = !vm.usageOnLiving; // 添加展开状态
                vm.leaseOnLiving = false;
                vm.brandOnLiving = false;
                vm.propertiesOnLiving = false;
            },
            // 获取使用场景选项的id
            _usageScenariosId(id,name) {
                let vm = this;
                vm.usageScenariosId = id;
                vm.usageScenarioText=name;
            },
            // 使用场景重置
            _resetusageScenariosId() {
                let vm = this;
                vm.usageScenariosId = '';
                vm.usageScenarioText='使用场景';
                vm.usageScenariosShow = !vm.usageScenariosShow;
                vm.selectArr= [vm.brandId,vm.leaseId,'',vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.usageOnLiving = false; // 去除展开状态
            },
            // 使用场景选项确定
            _usageScenariosSure(id) {
                let vm = this;
                vm.usageScenariosShow = !vm.usageScenariosShow;
                vm.selectArr= [vm.brandId,vm.leaseId,id,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.usageOnLiving = false; // 去除展开状态
            },
    
            // 新旧属性显示隐藏
            _properties() {
                let vm = this;
                vm.propertiesShow = !vm.propertiesShow;
                vm.usageScenariosShow = false;
                vm.leaseShow = false;
                vm.brandsShow = false;
                vm.propertiesOnLiving = !vm.propertiesOnLiving; // 添加展开状态
                vm.leaseOnLiving = false;
                vm.brandOnLiving = false;
                vm.usageOnLiving = false;
            },
            // 新旧属性id获取
            _propertieId(id,name) {
                let vm = this;
                vm.propertiesId = id;
                vm.propertieText=name;
            },
            // 新旧属性重置
            _resetpropertieId() {
                let vm = this;
                vm.propertiesId = '';
                vm.propertieText='新旧属性';
                vm.propertiesShow = !vm.propertiesShow;
                vm.selectArr= [vm.brandId,vm.leaseId,vm.usageScenariosId,'',vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.propertiesOnLiving = false; // 去除展开状态
            },
            // 新旧属性确定
            _propertieSure(id) {
                let vm = this;
                vm.propertiesShow = !vm.propertiesShow;
                vm.selectArr= [vm.brandId,vm.leaseId,vm.usageScenariosId,id,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.propertiesOnLiving = false; // 去除展开状态
            },
            // 价格区间选择
            _priceId(id){
                let vm = this;
                this.priceId = id;
                vm.selectArr = [vm.brandId, vm.leaseId, vm.usageScenariosId, vm.propertiesId, id, vm.classificationId];
            },
            // 分类区间选择
            _classificationId(id){
                let vm=this;
                vm.classificationId=id;
                vm.selectArr= [vm.brandId,vm.leaseId,vm.usageScenariosId,vm.propertiesId,vm.priceId,id];
            },
            // 侧边栏重置
            _drawReset(){
                let vm=this;
                vm.brandId='';
                vm.leaseId='';
                vm.usageScenariosId='';
                vm.propertiesId='';
                vm.priceId='';
                vm.classificationId='';
                vm.brandsText='品牌';
                vm.leaseText='租赁方式';
                vm.usageScenarioText='使用场景';
                vm.propertieText='新旧属性';
                vm.selectArr= [vm.brandId,vm.leaseId,vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.drawShow=false;
            },
            // 侧边栏确定
            _drawSure(){
                let vm=this;
                vm.selectArr= [vm.brandId,vm.leaseId,vm.usageScenariosId,vm.propertiesId,vm.priceId,vm.classificationId];
                vm.$tools.remove_array_space(vm.selectArr);
                vm.getGoods();
                vm.drawShow=false;
            },
            // 跳转到详情页
            _detail(id){
                this.$router.push('/detail'+id);
            }
        },
        computed: {
            // 是否有分类属性被选择
            isHasFilter: function () {
                let vm = this;
                let selectArrnew = vm.$tools.remove_array_space(vm.selectArr);
                if (selectArrnew.length == 0) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        watch:{
            scroll:{
                handler(val,oldval){
                    let vm=this;
                    if(oldval>100&&oldval-val<0){
                        vm.goodslistActive=true;
                    }else if(oldval-val>0){
                        vm.goodslistActive=false;
                    }
                },
                deep:true
            }
        }
    }
</script>
