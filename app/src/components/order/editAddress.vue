<template>
    <div id='editAddress'>
        <x-header :left-options="{backText:''}">地址编辑
            <div slot='right' @click='_delete'>删除</div>
        </x-header>
        <div>
            <x-input title='姓名：' v-model='name'></x-input>
            <x-input title='联系方式：' v-model='tel'></x-input>
            <x-input title='详细地址：' v-model='detaildAddress'></x-input>
        </div>
        <button class="editbtn">保存并使用</button>
    </div>
</template>
<style lang="less">
    #editAddress{
        .editbtn{
            position:fixed;bottom:0;left:0;width:100%;height:50px;background:#8fc31f;
            color:#fff;font-size:16px;
        }
    }
</style>
<script>
    import {XHeader,XInput} from 'vux';
    export default{
        components:{
            XHeader,XInput
        },
        data(){
            return{
                id:'',
                name:'',
                tel:'',
                detaildAddress:'',
            }
        },
        created(){
            let params=this.$route.params;
            let vm=this;
            vm.id=params.id;
            vm.$api.post(vm,'addressmodify',params,function(res){
                let response=JSON.parse(res.bodyText);
                this.$store.dispatch('isLoading',false);
                console.log(response);
                if(response.status){
                    let data=response.data;
                    vm.name=data.name;
                    vm.tel=data.tel;
                    vm.detaildAddress=data.detailed_address;
                }else{
                    vm.$router.go(-1);
                }
            })
        },
        methods:{
            _delete(){
                let vm=this;
                vm.$api.post(vm,'addressdelete',{id:vm.id},function(res){
                    let response=JSON.parse(res.bodyText);
                    console.log(response);
                    if(response.status){
                        setTimeout(() => {
                            vm.$router.go(-1);
                        }, 1000);
                    };
                    vm.$vux.toast.text(response.msg,'top');
                })
            }
        }
    }
</script>