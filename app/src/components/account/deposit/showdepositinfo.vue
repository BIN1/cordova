<template>
    <div id="showdeposit" class='page-container kz-background-gray kz-padding-bottom-sm'>
        <x-header :left-options="{backText:''}">查看免押金资料</x-header>
        <div class="createdTime kz-vertica-horizontal-center">
            <i class="icon-duihao iconfont"></i>&nbsp;
            提交时间：{{createdTime}}
        </div>
        <group title="公司信息">
            <div class="kz-padding-horizontal">
            <cell title="公司名称：" :value='data.company_name'></cell>
            <cell title="办公地址：" :value='address'></cell>
            <cell title="办公详细地址：" :value="data.office_address"></cell>
            <cell title="营业执照：" @click.native="_checkImg">
                <span class="underline">点击查看</span>
            </cell>
            </div>
        </group>
        <group title="法人或股东个人信息">
            <div class="kz-padding-horizontal">
                <cell title="姓名：" :value='data.real_name'></cell>
                <cell title="手机号码：" :value='data.legal_mobile'></cell>
                <cell title="身份证号码：" :value='data.id_card_number'></cell>
                <cell title="紧急联系人关系：" :value='relationship'></cell>
                <cell title="紧急联系人姓名：" :value='data.emergency_name'></cell>
                <cell title="紧急联系号码：" :value='data.emergency_phone'></cell>
                
                <cell title="身份证照片：" @click.native="idImg=!idImg">
                    <span class="underline">点击查看</span>
                </cell>
            </div>
        </group>
        <!-- 营业执照照片 -->
        <popup v-model="businessLicenseImg" height='100%' bottom='25%' >
            <div class="businessPopup kz-vertica-horizontal-center">
                <img :src="root+data.img_path+data.business_license_mini_img"/>
                <div class="_close" @click="_checkImg">
                    <div class="iconfont icon-cha"></div>
                </div>
            </div>
        </popup>
        <!-- 身份证照片 -->
        <popup v-model="idImg" height='100%' bottom='25%'>
            <div class="businessPopup kz-vertica-horizontal-center">
                <!-- <img :src="root+data.img_path+data.business_license_mini_img"/> -->
                <img :src='root+data.img_path+data.id_card_mini_img1'/>
                <img :src='root+data.img_path+data.id_card_mini_img2'/>
                <div class="_close" @click="idImg=!idImg">
                    <div class="iconfont icon-cha"></div>
                </div>
            </div>
        </popup>
    </div>
</template>
<style lang="less">
#showdeposit{
    .createdTime{
        height: 40px;background: #cce0a7;color: #fff;
    }
    .underline{
        text-decoration: underline;color:#8fc31f;
    }
    .businessPopup{
        width: 100%;height: 100%;background:#fff;overflow-y: auto; position: relative;
        flex-flow: column;
        ._close{
            position: absolute; height: 40px; width: 40px; top: 0; right: 0;
            text-align: center; line-height: 40px;
        }
    }
    img{
        width: 100%;padding:4px 0;
    }
}
</style>
<script>
    import Vue from 'vue';
    import moment from 'moment';
    import { XHeader, Group, Cell,Previewer, TransferDom,Popup,CellBox} from 'vux';
    import './freedeposit.less';
    export default{
        directives: {TransferDom},
        components:{XHeader,Group, Cell,Previewer,Popup,CellBox},
        data() {
            return {
                root:ROOT,
                data:"",
                address:'',
                relationship:'',
                text:'',
                createdTime:'',
                businessLicenseImg:false,//执照弹窗
                idImg:false,//身份证弹窗
            }
        },
        methods:{
            _checkImg(){
                let vm=this;
                vm.businessLicenseImg=!vm.businessLicenseImg;
            }
        },
        created() {
            let vm = this;
            vm.$api.post(vm,'showdepositdata',{},function(res){
                let response=JSON.parse(res.bodyText);
                if(response.status){
                    this.$store.dispatch('isLoading',false);
                    if(response.relationship=='1'){
                        vm.relationship='同事'
                    }else if(response.relationship=='2'){
                        vm.relationship='亲戚';
                    }else{
                        vm.relationship='朋友';
                    };
                    vm.data=response;
                    vm.address=`${response.address.province} ${response.address.city} ${response.address.region}`;
                    vm.createdTime=moment(response.created_time*1000).format('Y-M-D h:mm:ss')
                }else{
                    // 不能开通芝麻信用，返回上一步
                    this.$vux.toast.text(response.msg, 'top');
                    this.$router.push('freedeposit');
                }
            })
        },
    }
</script>
