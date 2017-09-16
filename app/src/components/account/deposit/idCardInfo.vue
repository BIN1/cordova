<template>
  <div id="idCardInfo" class='page-container'>
    <x-header title="上传身份证信息" :left-options="{backText: '' }">
        <button slot="right" class="head-confirm-btn am-btn">完成</button>
    </x-header>
    <dropzone id="myVueDropzone1"  data-id="myVueDropzone1"  :url="url" @vdropzone-success="showSuccess1">
        <input type="hidden" name="token" value="xxx">
    </dropzone>
    <dropzone id="myVueDropzone2"  data-id="myVueDropzone1"  :url="url" @vdropzone-success="showSuccess2">
        <input type="hidden" name="token" value="xxx">
    </dropzone>
  </div>
</template>
<style lang="less">
    #idCardInfo{
        font-size: 14px;
        .head-confirm-btn{background: #fff;margin:-10px;}
        .mask{
            width: 100%;height: 100%;position: fixed;top:0;left: 0;
            background: rgba(0,0,0,.9);
            img{
                width: 100%;
            }
        }
        .display-img{
            margin-left: 3%;
            width: 94%;
            height: 200px;
            background: #fff;
            border: 1px dotted #999;
            img{
                width: 90%;
            }
        }
        .core-img{
            margin:6px auto;
            width: 200px;
            background: #8fc31f;
            font-size: 14px;
            color:#fff;text-align: center;
            padding:8px 15px;
            border-radius: 6px;
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
            return{
                srcPositId:(localStorage.getItem('positiveIdImg')) ? localStorage.getItem('positiveIdImg') : '',    //正面照
                srcReverseId:(localStorage.getItem('reverseIdImg')) ? localStorage.getItem('reverseIdImg') : '',    //反面照
                maskImg:'',
                masktoggle:false,
                url:`${ROOT}app/account/upload`,
                header:{
                   
                }
            }
        },
        created(){
            this.$store.dispatch('isLoading',false);
        },
        computed:{
            posittext(){
                if(this.srcPositId){
                    return '重新上传身份证正面';
                }else{
                    return '上传身份证正面';
                }
            },
            reversetext(){
                if(this.srcReverseId){
                    return '重新上传身份证反面';
                }else{
                    return '上传身份证反面';
                }
            }
        },
        methods:{
            showSuccess1(file){
                let response=JSON.parse(file.xhr.responseText);
                console.log(response);
                let imgsrc=`${response.files.full_path}`;
                localStorage.setItem('basic_id_img1',imgsrc);
            },
            showSuccess2(file){
                let response=JSON.parse(file.xhr.responseText);
                console.log(response);
                let imgsrc=`${response.files.full_path}`;
                localStorage.setItem('basic_id_img2',imgsrc);
            }
        }
    }
</script>
