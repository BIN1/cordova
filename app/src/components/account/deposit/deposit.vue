<!--免押金资料提交-->
<template>
    <div id="deposit" class='page-container kz-background-gray'>
        <x-header :left-options="{backText:''}">申请免押金额度</x-header>
        <!-- 企业免押金申请 -->
        <div v-show="true">
            <group title="公司信息">
                <div class="kz-padding-horizontal">
                    <x-input title="公司名称：" v-model="company_name" @on-blur='_company_name(company_name)'></x-input>
                    <x-input title="公司固话：" v-model="company_office_phone"></x-input>
                    <!--地址选择-->
                    <x-address value-text-align="left" title="办公地址：" v-model="addressvalue" raw-value :list='ChinaAddressV3Data' :value-sync='addressvalue'></x-address>

                    <x-input title="办公详细地址：" v-model="detailAddress"></x-input>
                    <!--公司营业执照-->
                    <x-input @click.native="license_pop_box=!license_pop_box" title="营业执照：" readonly :show-clear="false" placeholder="上传营业执照" v-model="company_license_img_name">
                        <div slot="right" style="width: 10px; height: 24px;">
                            <span class="right iconfont icon-return" style="font-size:13px;color:#999"></span>
                        </div>
                    </x-input>
                </div>
            </group>

            <group title="法人或股东个人信息">
                <div class="kz-padding-horizontal">
                    <x-input title="姓名：" v-model="legalName" placeholder="请输入法人或股东的姓名"></x-input>
                    <x-input title="手机号码：" v-model="legalTel" placeholder="请输入手机号"></x-input>
                    <x-input title="身份证号码：" v-model="legalId" placeholder="请输入身份证号码"></x-input>
                    <x-input readonly @click.native="emergency_pop_box=!emergency_pop_box" title="紧急联系人：" placeholder="请输入紧急联系人信息" v-model="emergency_placeholder">
                        <div slot="right" class="kz-right-icon">
                            <span class="iconfont icon-return"></span>
                        </div>
                    </x-input>

                    <x-input readonly @click.native="idcard_pop_box=!idcard_pop_box" title="身份证照片：" placeholder="请上传身份证照片" v-model="idcard_placeholder">
                        <div slot="right" class="kz-right-icon">
                            <span class="iconfont icon-return"></span>
                        </div>
                    </x-input>
                </div>
            </group>
            <div style="height: 60px;"></div>
        </div>
        <!-- 个人免押金申请 -->
        <div v-show="false">
            <div class="kz-padding-horizontal" style="background:#fff;">
                <x-input title="姓名：" v-model="company_name" @on-blur='_company_name(company_name)'></x-input>
                <x-input title="手机号码：" v-model="legalTel" placeholder="请输入手机号"></x-input>
                <x-input title="身份证号码：" v-model="legalId" placeholder="请输入身份证号码"></x-input>
                <x-input readonly @click.native="emergency_pop_box=!emergency_pop_box" title="紧急联系人：" placeholder="请输入紧急联系人信息" v-model="emergency_placeholder">
                        <div slot="right" class="kz-right-icon">
                            <span class="iconfont icon-return"></span>
                        </div>
                    </x-input>
                <x-input readonly @click.native="idcard_pop_box=!idcard_pop_box" title="身份证照片：" placeholder="请上传身份证照片" v-model="idcard_placeholder">
                    <div slot="right" class="kz-right-icon">
                        <span class="iconfont icon-return"></span>
                    </div>
                </x-input>
            </div>
        </div>
        <flexbox class="depositbtn kz-fixed-bottom" :gutter="0">
            <flexbox-item>
                <x-button @click.native="go_index" class="kz-radius-0">回到首页</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button class="kz-radius-0" type="primary" @click.native="submit">提交，下一步</x-button>
            </flexbox-item>
        </flexbox>
        <!--紧急联系人信息  -->
        <div v-transfer-dom>
            <popup v-model="emergency_pop_box" height="100%">
                <x-header :left-options="{backText:''}" title="紧急联系人">
                    <div slot="overwrite-left" @click='emergency_pop_box=!emergency_pop_box'>
                        <span class="iconfont icon-fanhui"></span>
                    </div>
                </x-header>
                <div class="kz-margin-top-xs kz-background-white relationship">
                    <div class="relationshipCheck">
                        <checker v-model="relationship" default-item-class="relationshipNotCheck"
                                 selected-item-class="relationshipChecked">
                            <checker-item value="1"><span></span>同事</checker-item>
                            <checker-item value="2"><span></span>亲戚</checker-item>
                            <checker-item value="3"><span></span>朋友</checker-item>
                        </checker>
                    </div>
                    <group class="kz-padding-horizontal">
                        <x-input :max="4" v-model="emergency_name" placeholder="请输入紧急联系人姓名"></x-input>
                        <x-input v-model="emergency_phone" placeholder="请输入紧急联系人手机号" :max="13"></x-input>
                    </group>
                </div>
                <x-button @click.native='emergency_pop_box=!emergency_pop_box' class="kz-radius-0 kz-fixed-bottom"
                          type="primary">完成
                </x-button>
            </popup>
        </div>

        <!--上传营业执照页面  -->
        <div v-transfer-dom>
            <popup v-model="license_pop_box" height="100%">
                <div class="popup1">
                    <x-header :left-options="{backText:''}" title="上传营业执照">
                        <div slot="overwrite-left" @click='license_pop_box=!license_pop_box'>
                            <span class="iconfont icon-fanhui"></span>
                        </div>
                    </x-header>
                    <div class="company_license_img_box">
                        <vue-core-image-upload
                            class="btn btn-primary btn-primary-img  kz-vertica-horizontal-center"
                            :max-file-size="5242880"
                            @imageuploaded="showSuccess"
                            :url="url">
                            <div class="company_license_img kz-vertica-horizontal-center">
                                <img v-if='company_license_img' :src="company_license_path_name"/>
                            </div>
                            <p>{{company_license_img_btn}}</p>
                        </vue-core-image-upload>
                    </div>
                    <p class="kz-padding kz-font-sm kz-text-light">
                        请上传真实营业执照，支持格式JPG,PNG,不超过8M
                    </p>
                    <x-button @click.native='license_pop_box=!license_pop_box' class="kz-radius-0 kz-fixed-bottom" type="primary">完成</x-button>
                </div>
            </popup>
        </div>

        <!--上传身份证页面  -->
        <div v-transfer-dom>
            <popup v-model="idcard_pop_box" height='100%'>
                <x-header :left-options="{backText:''}">
                    上传身份证
                    <div slot="overwrite-left" @click="idcard_pop_box=!idcard_pop_box">
                        <span class="iconfont icon-fanhui"></span>
                    </div>
                </x-header>
                <div class="id-img">
                    <div class="id-img-box" @click="_imgClick(basic_id_img1)">
                        <img v-if='basic_id_img1' :src="basic_id_img1_path_name"/>
                    </div>
                    <vue-core-image-upload class="btn btn-primary id-img-btn  kz-vertica-horizontal-center" 
                        :max-file-size="5242880" 
                        @imageuploaded="showDepositIdSuccess"
                        :url="url">
                        {{basic_id_img1_btn}}
                    </vue-core-image-upload>
                </div>
                <div class="id-img">
                    <div class="id-img-box"  @click="_imgClick(basic_id_img2)">
                        <img v-if='basic_id_img2' :src="basic_id_img2_path_name"/>
                    </div>
                    <vue-core-image-upload class="btn btn-primary id-img-btn  kz-vertica-horizontal-center" 
                        :max-file-size="5242880" 
                        @imageuploaded="showReverseIdSuccess"
                        :url="url">
                        {{basic_id_img2_btn}}
                    </vue-core-image-upload>
                </div>
                <x-button @click.native='idcard_pop_box=!idcard_pop_box' class="kz-radius-0 kz-fixed-bottom" type="primary">完成</x-button>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="bigImgShow" height='100%'>
                <div @click="_imgClick" class="bigImg kz-vertica-horizontal-center">
                    <img :src="bigImgUrl"/>
                </div>
            </popup>
        </div>
    </div>
</template>
<style lang='less'>
    /*紧急联系人关系选择*/
    .relationship{
        .weui-cell:before{left:0!important;}
        .weui-cells{ margin-top: 0.5em;}
        .relationshipCheck{
            padding: 10px 5%;
            span{ width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 5px;}
            .relationshipNotCheck{
                width: 30%; text-align: center;
                span{
                    border: 1px solid #999; background-color: #fff;
                }
            }
            .relationshipChecked{
                span{
                    background-color: #8fc31f; border: 1px solid #8fc31f;
                }
            }
        }
    }

    .company_license_img_box{
        height: 200px; margin-top:20px;
        form,input{ width: 100%; height: 200px!important;}

        .btn-primary-img{
            display:flex; flex-flow:row;
            .company_license_img{ flex: 1; margin-left: 16px;border: 1px dashed #ddd;}
            p{ width: 140px; text-align: center;}
        }
        .company_license_img{
           background:#fff; height:200px;
           img{ width: 100%;height: 100%;}
        }
    }
    .id-img{
        .id-img-box{
            width: 260px;height: 160px;margin:20px auto;background: #fff;
            box-shadow: 0 0 6px #999;
            img{width: 100%;height: 100%;}
        }
        .id-img-btn{
            background: #666;width:180px;margin: auto;height: 45px;
            border-radius: 4px;color: #fff;
        }
    }
    .bigImg{
        width: 100%;height: 100%;background: rgba(0,0,0,.8);
        img{width: 100%}
    }
</style>
<script>
    import Vue from 'vue'
    import {TransferDom,XHeader,XInput, Group, XAddress, ChinaAddressV3Data, ToastPlugin,Value2nameFilter as value2name, Popup ,Flexbox, FlexboxItem,XButton,Checker, CheckerItem} from 'vux';
    Vue.use(ToastPlugin);
    import './freedeposit.less';
    import Dropzone from 'vue2-dropzone';
    import VueCoreImageUpload from 'vue-core-image-upload';
    export default{
        directives: {
            TransferDom
        },
        components:{
            XHeader,
            XInput,
            Group,
            XAddress,
            Popup,
            Dropzone,Flexbox, FlexboxItem,XButton,VueCoreImageUpload,Checker, CheckerItem
        },
        data() {

            return {

                maxM:8,//上传最大文件
                // 上传资料的路径
                url: `${ROOT}app/account/upload`,
                radio001: [ 'China', 'Japan' ],
                addressvalue: [], //addressvalue
                ChinaAddressV3Data: ChinaAddressV3Data,     //全国地址数据
                // 以下是待上传的数据
                id: '',// 修改资料的ID
                company_name: this.$store.state.userInfo.user_name,
                company_office_phone: '',  // 公司固话
                detailAddress: '',  //办公详细地址
                legalName: '', //法人或股东姓名
                legalTel: '',  //法人或股东手机号
                legalId: '',   //法人或股东的身份证号
                upload_img_path: '', //图片在服务器的路径
                company_license_img_name: '',    //执照名称
                company_license_img: '',         //执照图片路径
                company_license_path_name:'',
                company_license_img_btn:'上传营业执照',//上传营业执照
                basic_id_img1_name: '',        //身份证正面名称
                basic_id_img1: '',               //身份证正面照
                basic_id_img1_path_name:'',
                basic_id_img1_btn:'上传身份证正面',
                basic_id_img2_btn:'上传身份证反面',
                basic_id_img2_path_name:'',
                basic_id_img2_name: '',          // 身份证反面名称
                basic_id_img2: '',               //身份证反面照
                relationship: '',                //紧急联系人关系
                emergency_name: '',              //紧急联系人名字
                emergency_phone: '',             //紧急联系人号码
                // 上传营业执照弹窗
                license_pop_box: false,
                emergency_pop_box:false,
                idcard_pop_box:false,
                bigImgShow:false,//查看图片
                bigImgUrl:'',
                showMask:true,
                root:ROOT, // 根地址
            }
        },
        computed: {
            // 紧急联系人显示
            emergency_placeholder:function () {
                return this.emergency_name + ' ' + this.emergency_phone
            },
            // 上传证件显示
            idcard_placeholder: function () {
                let text = '';
                if (this.basic_id_img1 != '' && this.basic_id_img2 != '') {
                    text = '已上传';
                }
                else if(this.basic_id_img1 == '' && this.basic_id_img2 != '')
                {
                    text = '正面：未上传，反面：已上传';
                }else if(this.basic_id_img1 != '' && this.basic_id_img2 == '')
                {
                    text = '正面：已上传，反面：未上传';
                }else{
                    text = '';
                }
                return text;
            }
        },
        methods: {
            // 资料提交
            submit() {
                let vm=this;
                let emergencyinfo=localStorage.getItem('emergencyinfo');
                emergencyinfo=JSON.parse(emergencyinfo);
                let companyLicenseInfo=JSON.parse(localStorage.getItem('companyLicenseInfo'));
                let params={
                    company_name:vm.company_name,
                    company_office_phone:vm.company_office_phone,
                    detailed_address:vm.detailAddress,
                    basic_name:vm.legalName,
                    legal_mobile:vm.legalTel,
                    basic_id:vm.legalId,
                    province:vm.addressvalue[0],
                    city:vm.addressvalue[1],
                    region:vm.addressvalue[2],
                    relationship:vm.relationship,
                    emergency_name:vm.emergency_name,
                    emergency_phone:vm.emergency_phone,
                    company_license_img:vm.company_license_img,
                    basic_id_img1:vm.basic_id_img1,
                    basic_id_img2:vm.basic_id_img2
                };

                if(vm.id != ''){
                    params['id']=vm.id;
                }

                if(!vm.$regexp._regPhone(vm.company_office_phone)&&!vm.$regexp._regFixedTelephone(vm.company_office_phone)){
                    this.$vux.toast.text('请输入正确的公司固话', 'top');
                    return false;
                }else if(!vm.addressvalue){
                    this.$vux.toast.text('请选择地址', 'top');
                    return false;
                }else if(!vm.detailAddress){
                    this.$vux.toast.text('请填写详细地址', 'top');
                    return false;
                }else if(vm.company_license_img_name=='上传营业执照'){
                    this.$vux.toast.text('请上传营业执照', 'top');
                    return false;
                }else if(!vm.legalName){
                    this.$vux.toast.text('请输入法人或股东的姓名', 'top');
                    return false;
                }else if(!vm.$regexp._regPhone(vm.legalTel)){
                    this.$vux.toast.text('请输入法人正确手机号', 'top');
                    return false;
                }else if(!vm.$regexp._regIcode(vm.legalId)){
                    this.$vux.toast.text('请输入法人或股东身份证号', 'top');
                    return false;
                }else if(!params.basic_id_img1){
                    this.$vux.toast.text('请上传身份证正面照', 'top');
                    return false;
                }else if(!params.basic_id_img2){
                    this.$vux.toast.text('请上传身份证反面照', 'top');
                    return false;
                }
                vm.$api.post(vm,'depositcommit',params,function(res){
                    let response=JSON.parse(res.bodyText);
                    if(response.status){
                        if(response.atypism){
                            this.$vux.toast.text(response.msg, 'top');
                            this.$router.push('freedeposit');
                        }else{
                            this.$vux.toast.text(response.msg, 'top');
                            this.$router.push('openzm');
                        }
                    }else{
                        this.$vux.toast.text(response.msg, 'top');
                        return false;
                    }
                })
            },
            // 验证公司名称是否可用
            _company_name(name){
                let vm=this;
                vm.$api.post(vm,'checkCompany',{company_name:name},function(res){
                    let response=JSON.parse(res.bodyText);
                    if(response.status){
                        console.log(response.msg);
                        return false;
                    }else{
                        this.$vux.toast.text(response.msg,'top');
                        vm.company_name = '';
                    }
                })
            },
            // 执照上传成功时的回掉函数
            showSuccess(file){
                let vm = this;
                let response = file;
                if (response.status) {
                    vm.company_license_path_name = vm.root + response.files.path + response.files.filename;
                    vm.company_license_img = response.files.full_path;
                    vm.company_license_img_name = '已上传';
                    vm.company_license_img_btn='修改营业执照';
                } else {
                    vm.$vux.toast.text(response.msg, 'top');
                }
            },
            // 身份证上传成功时的回掉函数
            showDepositIdSuccess(file){
                let vm=this;
                 let response=file;
                 if(response.status){
                     vm.basic_id_img1_path_name=vm.root + response.files.path + response.files.filename;
                     vm.basic_id_img1 = response.files.full_path;
                     vm.basic_id_img1_btn='重新上传身份证正面';
                 }else{
                     vm.$vux.toast.text(response.msg,'top');
                 }
            },
            // 身份证反面上传成功的回掉函数
            showReverseIdSuccess(file){
                let vm = this;
                let response = file;
                if (response.status) {
                    vm.basic_id_img2_path_name = vm.root + response.files.path + response.files.filename;
                    vm.basic_id_img2 = response.files.full_path;
                    vm.basic_id_img2_btn='重新上传身份证反面';
                } else {
                    vm.$vux.toast.text(response.msg, 'top');
                }
            },
            go_index(){
                return this.$router.push('/');
            },
            // 点击图片放大功能
            _imgClick(url){
                let vm=this;
                if(url){
                    vm.bigImgUrl=url;
                    vm.bigImgShow=!vm.bigImgShow;
                }
            }
        },
        created() {
            let vm = this;
            // 获取已有资料，将已有资料渲染到页面上
            vm.$api.post(vm, 'depositmodify', {}, function (res) {
                let response = JSON.parse(res.bodyText);
                let data = response.data;
                this.$store.dispatch('isLoading',false);
                if (response.status) {
                    vm.id = data.id;
                    vm.company_name = data.company_name;
                    vm.company_office_phone = data.office_phone;
                    vm.addressvalue = [data.address.province, data.address.city, data.address.region];
                    vm.detailAddress = data.address.detailed_address;
                    vm.upload_img_path = data.img_path;
                    // 营业执照图片
                    vm.company_license_img_name = '已上传';
                    vm.company_license_img = data.img_path + '*|*' + data.img_mini_path + '*|*' + data.business_license_img;
                    vm.company_license_path_name = vm.root + data.img_path + data.business_license_img;
                    // 身份证正面
                    vm.basic_id_img1_name = data.id_card_img1;
                    vm.basic_id_img1 = data.img_path + '*|*' + data.img_mini_path + '*|*' + data.id_card_img1;
                    vm.basic_id_img1_path_name = vm.root + data.img_path + data.id_card_img1;
                    // 身份证反面
                    vm.basic_id_img2_name = data.id_card_img2;
                    vm.basic_id_img2 = data.img_path + '*|*' + data.img_mini_path + '*|*' + data.id_card_img2;
                    vm.basic_id_img2_path_name = vm.root + data.img_path + data.id_card_img2;
                    vm.legalName = data.real_name;
                    vm.legalTel = data.legal_mobile;
                    vm.legalId = data.id_card_number;
                    vm.relationship = data.relationship;
                    vm.emergency_name = data.emergency_name;
                    vm.emergency_phone = data.emergency_phone;
                } else {
                    // 用户资料已提交状态，返回上一步
                    this.$vux.toast.text(response.msg, 'top');
                    this.$router.push('freedeposit');
                }
            })
        },
        watch:{
            // 公司固话变动监听
            company_office_phone(val, oldval){
                let newLen = val.length;
                let oldLen = oldval.length;
                let reg = /^[0][3-9]/;
                if (newLen > oldLen) {
                    if (reg.test(this.company_office_phone)) {
                        if (this.company_office_phone.length == 4) {
                            this.company_office_phone = this.company_office_phone + '-';
                        }
                    } else {
                        if (this.company_office_phone.length == 3) {
                            this.company_office_phone = this.company_office_phone + '-';
                        }
                    }
                }
            }
        }
    }
</script>
