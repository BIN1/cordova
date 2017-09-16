<template>
    <div id="login" class="page-container kz-background-white">
        <x-header style="border-bottom: none" :left-options="{showBack: false}">
            <span slot="overwrite-left" @click="backprev" class="iconfont icon-cha"></span>
            登录
        </x-header>
        <div class="kz-padding-horizontal kz-padding-top">
            <group id="tel">
                <x-input ref='tel' :max="11" type="tel" keyboard="number" placeholder="请输入您的手机号" v-model="tel">
                    <span slot="label" class='iconfont icon-yonghu login-slot-icon'></span>
                </x-input>
                <div class="password">
                    <x-input :max="16" :type="passwordtype" :show-clear="false" placeholder="请输入您的密码" v-model="pwd">
                        <span slot="label" class='iconfont icon-mima login-slot-icon'></span>
                        <div v-show="seePwd" slot="right" class="show-hide-password" @click='seePassword'><span class='iconfont icon-yanjing1'></span></div>
                        <div v-show="!seePwd" slot="right" class="show-hide-password" @click='hidePassword'><span class='iconfont icon-yanjing'></span></div>
                    </x-input>
                </div>
            </group>

            <x-button class="kz-margin-top login-btn kz-radius-0 kz-tops" @click.native="login" type="primary" >登录</x-button>
            <p class="kz-text-center kz-text-default kz-padding-top">
                <span style="text-decoration: underline;" ><router-link class="kz-text-default" to="/register">注册</router-link></span>
                <span style="color: #999999;padding-left: 24px;padding-right: 24px;">|</span>
                <span class="dis-padding" @click="stroll">逛逛先</span>
            </p>
        </div>
    </div>
</template>
<script>
    import {XHeader, XInput, Cell, XButton, Group} from 'vux';
    import Vue from 'vue';
    import './user.less';
    import {ToastPlugin} from 'vux';
    Vue.use(ToastPlugin);
    export default{
        components: {
            XHeader, XInput, Cell, XButton, Group
        },
        data(){
            return{
                // 账号
                tel:'',
                // 密码
                pwd:'',
                // 密码框type
                passwordtype : 'password',
                seePwd:true,
            }
        },
        methods:{
            // 登入函数 
            login(){
                let vm=this;
                let params={
                    phone:vm.$tools._trim(vm.tel),
                    password:vm.pwd,
                    remember_me:true,
                    type:3
                };
                if(!vm.$regexp._regPhone(vm.$tools._trim(params.phone))){
                    this.$vux.toast.text('手机号码错误！','top');
                    return false;
                }else if(!vm.$regexp._regPassword(params.password)){
                    this.$vux.toast.text('请输入6-16位密码','top');
                    return false;
                }
                vm.$api.post(vm,'login',params,function(res){
                    let response=res.data;
                    if(response.status){
                        this.$store.dispatch('cartNum',response.user_accounts.cart_nums);//登入时获取购物车的数量
                        this.$store.dispatch('balance',response.user_accounts.balance);//用户余额
                        this.$store.dispatch('starCore',response.users.risk_score);//用户信用等级
                        localStorage.setItem('token',response.token);
                        let userAccounts=response.user_accounts;
                        userAccounts['user_name']=response.users.user_name;
                        userAccounts['risk_score']=response.users.risk_score;
                        localStorage.setItem('userAccounts',JSON.stringify(userAccounts));
                        this.$store.dispatch('userInfo',userAccounts);
                        let url = vm.$route.query.url;
                        if (url) {
                            vm.$router.push(url);
                        } else {
                            vm.$router.push("/")
                        }
                    }else{
                        vm.$vux.toast.text(response.msg,'top');
                    }
                })
            },
            /*点逛逛跳转首页*/
            stroll(){
                this.$router.push("/")
            },
            // 返回上一页
            backprev(){
                this.$router.go("-1");
            },
            // 查看密码
            seePassword(){
                let vm=this;
                vm.seePwd=!vm.seePwd;
                vm.passwordtype = 'text';
            },
            // 隐藏密码
            hidePassword(){
                let vm=this;
                vm.seePwd=!vm.seePwd;
                vm.passwordtype = 'password';
            },
        },
        watch: {
            tel(val, oldval){
//                let vm = this;
//                let newLen = val.length;
//                let oldLen = oldval.length;
//                if (newLen > oldLen) {
//                    if (newLen == 3 || newLen == 9) {
//                        vm.tel = vm.tel + ' ';
//                    }
//                }
            }
        },
        computed:{

        },
        created(){
            this.$store.dispatch('isLoading',false);
        }
    }
</script>