<template>
    <div id="FILES">
        <div id="filebox">
            <div class="select" v-show="title">{{title}}</div>
            <input @change="getFile(this)" type="file" value="" ref="file" id="file">
        </div>
        <div v-show="files" @click="masktoggle">
            <img :src="files" alt="">
        </div>
        <div class="img-mask" v-if='imgMask' @click="masktoggle">
            <img :src="files" alt="">
        </div>
    </div>
</template>
<script>
    import './uploadfile.less';
    export default{
        props:['title'],
        data(){
            return{
                files:'',
                imgMask:false,
            }
        },
        methods:{
            getFile(source){
                let v=this;
                let file=this.$refs.file.files[0];
                if(window.FileReader){
                    var fr=new FileReader();
                    fr.onloadend = function(e) {
                        v.files=e.target.result;
                        console.log(v.files)
                    };
                    fr.readAsDataURL(file);
                }
            },
            masktoggle(){
                let vm=this;
                vm.imgMask=!vm.imgMask;
            }
        }
    }
</script>
