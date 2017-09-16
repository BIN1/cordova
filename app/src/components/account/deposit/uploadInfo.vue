<template>
  <div id="uploadInfo" class="page-container">
    <x-header title="上传营业执照" :left-options="{backText: '关闭' }">
    </x-header>
    <!-- <div class="core-image-box kz-h-v-center">
        <div class="display-img kz-h-v-center" @click="_imgBig">
            <span v-show="!src">营业执照</span>
            <img :src="src" v-show="src"/>
        </div> 
        <vue-core-image-upload
            class="btn btn-primary core-img"
            :text='text'
            :core='false'
            compress="50"  
            :data="data"
            @imageuploaded='imageuploaded'
            :max-file-size='5242880'
            :url='url'
            :headers='header'
        >
        </vue-core-image-upload>
    </div> -->
    <div class="kz-h-v-center" style="line-height:45px;font-size:12px;">请填写真实营业执照，支持格式jpg,png，不超过8m</div>
    <button class="foot-confirm-btn am-btn width100" @click="_confirm">完成</button>

    <dropzone id="myVueDropzone1"  data-id="myVueDropzone1"  :url="url" @vdropzone-success="showSuccess">
        <input type="hidden" name="token" value="xxx">
    </dropzone>
    <div class="bin-img kz-h-v-center" v-show="bigimgtoggle" @click="_imgBig">
        <img :src="src"/>
    </div>
  </div>
</template>
<style lang="less">
    .foot-confirm-btn{
        position: fixed;bottom: 0;left:0;background: #8fc31f;color: #fff;
    }
    #uploadInfo{
        .core-image-box{
            margin-top:10px;
            width: 100%;
            height: 180px;
            padding:8px 0;
            .display-img{
                flex: 0 0 140px;
                width: 140px;
                height: 100%;
                border:1px dotted #999;
                background: #fff;
                margin-right: 8px;
                img{width:100%;height: 100%;box-shadow: 0 0 10px #4d4d4d;}
            }
            .core-img{
                flex: 0 0 120px!important;
                width: 120px!important;
                padding:70px 12px;
                text-decoration: underline;
                form{
                    height: 100%!important;
                }
            }
        }
        .bin-img{
            width: 100%;
            height: 100%;
            position:fixed;
            top:0;
            left: 0;
            background: rgba(0,0,0,0.8);
            img{
                width: 99%;
                
            }
        }
    }
    
</style>
<script>
    import Vue from 'vue'
    import {ToastPlugin} from 'vux';
    Vue.use(ToastPlugin);
    import {XHeader} from 'vux';
    import VueCoreImageUpload from 'vue-core-image-upload';
    import Dropzone from 'vue2-dropzone';
    export default{
        components:{
            XHeader,VueCoreImageUpload,Dropzone
        },
        data(){
            return {
                src:localStorage.getItem('licenseImg'),
                data:{},
                bigimgtoggle:false,
                url:`${ROOT}app/account/upload`,
            }
        },
        created(){
            this.$store.dispatch('isLoading',false);
        },
        computed:{
            text(){
                if(this.src){
                    return '修改营业执照'
                }else{
                    return '上传营业执照'
                }
            },
        },
        methods:{
            /**
             * imageuploaded 上传营业执照
             */
            imageuploaded(res){
                let vm=this;
                console.log(res);
                if(res.status){
                    let files=res.files;
                    let SRC=`${ROOT}${files.path}${file.filename}`;
                    this.src=SRC;
                    localStorage.setItem('licenseImg',SRC)
                    vm.text='修改营业执照'
                }
                vm._toast(res.msg);
            },
            /**
             * _confirm 点击完成时的函数
             */
            _confirm(){
                let vm=this;
                if(!vm.src){
                    vm._toast('请上传营业执照')
                }
            },
            /**
             * _toast  弹窗
             */
            _toast(text){
                this.$vux.toast.show({
                    text: text,
                    type:'text',
                    time:'1000',
                    width:'300px',
                    position:'middle'
                })
            },
            /**
             * _imgBig 点击图片变大
             */
            _imgBig(){
                let vm=this;
                if(vm.src){
                    vm.bigimgtoggle=!vm.bigimgtoggle;
                }else{
                    vm._toast('请先上传营业执照')
                }
            },
            // 执照上传成功时的回掉函数
            showSuccess(file){
                let response=JSON.parse(file.xhr.responseText);
                this.src=`${ROOT}${response.files.path}${response.files.filename}`;
                let imgsrc=`${response.files.full_path}`;
                let params={
                    company_license_img_name:response.files.srcName,
                    company_license_img:imgsrc,
                    company_license_img_local:`${ROOT}${response.files.path}${response.files.filename}`
                };
                params=JSON.stringify(params);
                localStorage.setItem('companyLicenseInfo',params);
                localStorage.setItem('company_license_img_name',response.files.srcName)
                localStorage.setItem('company_license_img',imgsrc);
            }
        }
    }
</script>
