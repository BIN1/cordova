<template>
  <div id="search">
    <x-header :left-options="{backText: ''}" title="列表页"></x-header>
    <div class="content">
        <ul class="ul-nav">
            <li class="kz-vertica-horizontal-center">综合</li>
            <li class="kz-vertica-horizontal-center">价格</li>
            <li class="kz-vertica-horizontal-center">新品</li>
            <li class="kz-vertica-horizontal-center">刷选</li>
        </ul>
        <ul class="ul-nav">
            <li class="kz-vertica-horizontal-center">
                <span>品牌</span>
            </li>
            <li class="kz-vertica-horizontal-center">
                租赁方式
            </li>
            <li class="kz-vertica-horizontal-center">
                使用场景
            </li>
            <li class="kz-vertica-horizontal-center">
                新旧属性
            </li>
        </ul>
        <div class="goodslist" ref="goodslist">
            <ul class="goodlist-box">
                 <li v-for="good in goodsData">
                    <!-- <div class="img-box kz-vertica-horizontal-center">
                        <img :src="root+good.path+good.file_name"/>
                    </div>
                    <div class="goods-describe">
                        <p>{{good.goods_name}}</p>
                        <p>{{good.description}}</p>
                        <div>
                            <span>{{good.base_price}}元／月</span>
                            <span>{{good.long_periods}}期</span>
                        </div>
                    </div> -->
                </li> 
            </ul>
        </div>
    </div>
    <tabbar>
            <tabbar-item selected link="/">
                <div slot="icon" class="iconfont icon-zhuye"></div>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item show-dot>
                <div slot="icon" class="iconfont icon-fcstubiao20"></div>
                <span slot="label">账单</span>
            </tabbar-item>
            <tabbar-item badge="2">
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
<style lang="less">
    #search{
        .content{
            .goodslist{
                &::-webkit-scrollbar{width: 1px;}
                width: 100%;position:absolute;top:107px;bottom:53px;
                overflow-y: auto;
                .goodlist-box{
                    li{
                        overflow: hidden;
                        height: 99px;
                        border-bottom: 1px solid #999;
                        .img-box{
                            float: left;width: 35%;
                            border: 1px solid dotted;
                            img{width: 90%;}
                        }
                        .goods-describe{
                            float:right;width: 65%;
                            padding:0 4px;box-sizing: border-box;
                            p{
                                width: 100%;text-overflow: ellipsis;
                                white-space: nowrap;overflow: hidden;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
           .ul-nav{
                display: flex;
                li{
                    flex: 1;line-height: 30px;font-size: 14px;
                }
            } 
        }
    }
</style>
<script>
    // 导入组件
    import {XHeader,Tabbar,TabbarItem} from 'vux';

    // 导入插件
    export default{
        components:{
            XHeader,Tabbar,TabbarItem
        },
        data(){
            return{
                root:ROOT,
                num:0,
                item:10,
                goodsData:'',
            }
        },
        created(){
            let vm=this;
            this.getSelect();
            this.getGoods();
            this.$nextTick(() => {
                this.$refs.goodslist.addEventListener('scroll',this._scroll)
            })
        },
        methods:{
            // 获取商品选择项
            getSelect(){
                let vm=this;
                vm.$api.post(vm,'goodslist',{},function(res){
                    console.log(res);
                })
            },
            // 获取全部商品
            getGoods(){
                let vm=this;
                let params={category_filter:'',p:vm.num,item:vm.item};
                vm.$api.post(vm,'goodslisting',params,function(res){
                    let response=JSON.parse(res.bodyText);
                    console.log(response);
                    console.log(response.filter_goods);
                    vm.goodsData=response.filter_goods;
                });
            },
            // 上拉加载
            _scroll(){
                let vm=this;
                let H=document.body.offsetHeight;
                vm.scroll=document.body.scrollTop;
                let goodslist=vm.$refs.goodslist.scrollTop;
                let len=vm.goodsData.length;
                let status=(goodslist==len*100-H+160)?true:false;
                if(status){
                    this.$vux.toast.text('拼命加载中', 'bottom');
                    vm.num++;
                    let params={category_filter:'',p:vm.num,item:vm.item};
                    vm.$api.post(vm,'goodslisting',params,function(res){
                        console.log(response);
                        let response=JSON.parse(res.bodyText);
                        let datas=response.filter_goods;
                        vm.goodsData=vm.goodsData.concat(datas);
                        console.log(vm.goodsData);
                    })
                }
            }
        }
    }
</script>
