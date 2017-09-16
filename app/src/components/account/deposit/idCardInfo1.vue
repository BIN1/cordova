<template>
  <div id="idCardInfo" class='page-container'>
    <x-header title="上传身份证信息" :left-options="{backText: '' }">
        <button @click="_confirm" slot="right" class="head-confirm-btn am-btn">完成</button>
    </x-header>
    <div style="line-height:44px;" class="kz-h-v-center">请上传身份证正反面照，请拍摄身份证原件</div>
    <div>
        <!--身份证正面  -->
        <div class="display-img kz-h-v-center" @click="bigImgclick(srcPositId)">
            <span v-show="!srcPositId">身份证正面</span>
            <img :src="srcPositId" v-show="srcPositId"/>
        </div> 
        <vue-core-image-upload
            class="btn btn-primary core-img"
            :text='posittext'
            :core='false'
            compress="50"  
            @imageuploaded='positiveIdImg'
            :max-file-size='5242880'
            :url='url'
        >
        </vue-core-image-upload>
        <!--身份证反面  -->
        <div class="display-img kz-h-v-center" @click="bigImgclick(srcReverseId)">
            <span v-show="!srcReverseId">身份证反面</span>
            <img :src="srcReverseId" v-show="srcReverseId"/>
        </div> 
        <vue-core-image-upload
            class="btn btn-primary core-img"
            :text='reversetext'
            :core='false'
            compress="50"  
            @imageuploaded='reverseIdImg'
            :max-file-size='5242880'
            :url='url'
        >
        </vue-core-image-upload>
    </div>
    <div class="mask kz-h-v-center" v-show="masktoggle" @click="maskhide">
        <img :src='maskImg'/>
    </div>
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
    export default{
        components:{
            XHeader,VueCoreImageUpload
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
             * 点击完成时的函数
             */
            _confirm(){
                let vm=this;
                if(!vm.srcPositId){
                    vm._toast('请上传身份证正面照')
                }else if(!vm.srcReverseId){
                    vm._toast('请上传身份证反面照')
                }
            },
            /**
             * positiveIdImg 上传身份证正面照
             */
            positiveIdImg(res){
                let vm=this;
                if(res.status){
                    // this.srcPositId=res.data.src;
                    let files=res.files;
                    let SRC=`${ROOT}${files.path}${file.filename}`;
                    this.srcPositId=SRC;
                    localStorage.setItem('positiveIdImg',SRC)
                };
                vm._toast(res.msg);
            },
            /**
             * reverseIdImg 上传身份证反面照
             */
            reverseIdImg(res){
                let vm=this;
                if(res.status){
                    // vm.srcReverseId=res.data.src;
                    let files=res.files;
                    let SRC=`${ROOT}${files.path}${file.filename}`;
                    this.srcReverseId=SRC;
                    localStorage.setItem('reverseIdImg',SRC);
                }
                vm._toast(res.msg);
            },
            // 点击图片放大查看
            bigImgclick(obj){
                let vm=this;
                console.log(obj);
                if(obj){
                    vm.masktoggle=true;
                    vm.maskImg=obj;
                }else{
                    vm._toast('请先上传照片')
                }
            },
            // 遮罩层隐藏
            maskhide(){
                this.masktoggle=false;
            }
        }
    }
</script>
