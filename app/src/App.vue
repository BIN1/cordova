<template>
    <div id="app" :style="style">
        <loading v-model="isLoading"></loading>
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </div>
</template>
<script>
    import {Loading} from 'vux';
    export default {
        name: 'app',
        components:{
            Loading
        },
        data(){
            return{
                style:{
                    
                }
            }
        },
        computed:{
            isLoading(){
                return this.$store.state.isLoading;
            }
        },
        created(){
            let vm=this;
            let token=localStorage.getItem('token');
            vm.$api.post(vm,'checkUser',{token:token},function(res){
                let response=JSON.parse(res.bodyText);
                if(!response.status){
                    this.$store.dispatch('cartNum','')
                    this.$store.dispatch('userInfo','');
                    localStorage.setItem('token','');
                    localStorage.setItem('userAccounts','');
                }else{
                    let userAccounts=response.user_accounts;
                    userAccounts['user_name']=JSON.parse(localStorage.getItem('userAccounts')).user_name;
                    this.$store.dispatch('userInfo',userAccounts);
                    this.$store.dispatch('cartNum',userAccounts.cart_nums)
                }
            });
            let u=navigator.userAgent;
            if(u.indexOf('Android')>-1 || u.indexOf('Linux')>-1){
                vm.style={}
            }else if(u.indexOf('iPhone')>-1){
                vm.style={
                    // borderTop:'15px solid #fff'
                };
            }else if(u.indexOf('Windows Phone')>-1){
                console.log('winphone手机')
            }
        },
        watch:{
            $route(newVal,oldVal){
                if(newVal.path != oldVal.path){
                    this.$store.dispatch('isLoading',true);
                }
            }
        }
    }
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '../static/font/iconfont.css';
@import './assets/css/common.css';
</style>
