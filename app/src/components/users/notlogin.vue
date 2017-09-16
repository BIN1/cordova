<template>
    <div id="notlogin" class="page-container kz-background-white">
        <flexbox>
            <flexbox-item>
                <x-button @click.native="gologin" plain>登录</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button @click.native="goregister" plain type="primary">注册</x-button>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
    import {XButton,Group,Flexbox,FlexboxItem} from 'vux';
    export default{
        components:{
            XButton,Group,Flexbox,FlexboxItem
        },
        methods: {
            // 隐藏密码
            goregister(){
                let vm = this;
                vm.$router.push("/register?url="+vm.url);
            },
            gologin(){
                let vm = this;
                vm.$router.push("/login?url="+vm.url);
            }
        },
        computed:{
            url:function () {
                let url = (this.$route.query.url)?(this.$route.query.url):'';
                return url;
            }
        },
        created(){
            this.$store.dispatch('isLoading',false);
        }
    }
</script>