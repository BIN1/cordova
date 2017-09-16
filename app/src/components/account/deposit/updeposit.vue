<template>
    <div id="updeposit" class="page-container kz-background-white">
        <x-header :left-options="{backText: ''}">提升额度</x-header>
        <div class="kz-padding">
            <p>申请押金额度，需要您提供以下资料中的任意一项：</p>
            <p>人民银行征信报告（最近一周内的信息）</p>
            <p>公司的社保缴纳记录（过往3个月）</p>
            <p>公司的对公流水（过往3-6个月）</p>
        </div>
        <!--上传附件-->
        <div class="kz-padding-horizontal">
            <h3>上传附件</h3>
            <div class="fujian-box">
                <vue-core-image-upload class="btn btn-primary btn-primary-img  kz-vertica-horizontal-center" 
                            :max-file-size="5242880" 
                            @imageuploaded="_fujian"
                            :url="url">
                    <i class="iconfont icon-fcstubiao20" style="font-size:26px;"></i>
                </vue-core-image-upload>
                <div class="imgurl-box">
                    <img :src="imgUrl" v-show="imgUrl"/>
                </div>
            </div>
        </div>




        <group title="申请理由：">
            <div class="kz-padding-xs">
                <x-textarea v-model="reson" class="kz-border"></x-textarea>
            </div>
        </group>

        <x-button @click.native="_apply">立即申请</x-button>
    </div>
</template>
<style lang="less">
    #updeposit{
        .fujian-box{
            display: flex;
            width: 100%;height: 150px;border:1px solid lightblue;
            .btn-primary-img{
                flex: 0 0 80px;
                width: 80px!important;
                form,input{height: 100%!important;width:80px!important;}
            }
            .imgurl-box{
                flex: 1;
                border: 1px solid lightcoral;
            }
        }
        
    }
</style>

<script>
    import './freedeposit.less';
    import {XHeader, XButton, Cell, Group, XTextarea} from 'vux';
    import VueCoreImageUpload from 'vue-core-image-upload';
    export default{
        components: {
            XHeader, XButton, Group, Cell, XTextarea, VueCoreImageUpload
        },
        data(){
            return {
                maxM: 8,//上传文件最大兆数
                url: `${ROOT}app/account/upload`,
                reson: '',
                file: '',
                fileName: '',
                imgUrl:''
            }
        },
        created(){
            this.$store.dispatch('isLoading', false);
        },
        methods: {
            _fujian(file){
                let vm = this;
                let response = JSON.parse(file.xhr.responseText);
                console.log(response);
                if (response.status) {
                    // console.log(response.files.full_path.split('|'));
                    let fileurl = `${response.files.path}*|*${response.files.filename}`;
                    vm.file = fileurl;
                    vm.imgUrl = response.files.full_path;
                } else {
                    this.$vux.toast.text(response.msg, 'top');
                }
            },
            // 申请
            _apply(){
                let vm = this;
                let params = {
                    liyou: vm.reson,
                    file: vm.file
                };
                vm.$api.post(vm, 'updeposit', params, function (res) {
                    console.log(res);
                })
            },
        }
    }
</script>
