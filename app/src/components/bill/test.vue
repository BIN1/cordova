<template>
    <div id="bill">
        <!--底部工具栏-->
        <img style="width: 100%; height: 100px;" :src="company_license_path_name"/>
        <!--:data="data"-->
        <vue-core-image-upload style="border: 1px solid #f00;"

                @imageuploaded="imageuploaded"
                :data="{src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'}"

                url="http://101.198.151.190/api/upload.php">
            按钮
        </vue-core-image-upload>
        <p>{{img}}</p>
        <input name="img_path" type="file" v-on:change="change">

        <button @click="show2 = !show2">anniu</button>

        <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>
    </div>
</template>

<script>
    import moment from 'moment';
    import VueCoreImageUpload from 'vue-core-image-upload';
    import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
    export default {
        components: {   VueCoreImageUpload,
            Actionsheet,
            Group,
            XSwitch,
            Toast
        },

        data() {
            return {
                cartNume: '',
                show2: false,
                company_license_path_name:'',
                img:'',
                menus2: {
                    menu1: '拍照',
                    menu2: '选择图片'
                },
                src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
            }
        },
        created() {

        },
        methods: {

            imageuploaded(res) {
                let vm = this;
                if (res.errcode == 0) {
                    vm.company_license_path_name=res.data.src;
                }
            },
            click (key) {
                console.log(key)
            },
            change(val){
                var url = null;

                console.log(window.webkitURL); return false;

                if (window.createObjcectURL != undefined) {
                    url = window.createOjcectURL(val.target.value);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(val.target.value);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(val.target.value);
                }
                console.log(url)
            }


        },
        watch:{

        }
    }
</script>

