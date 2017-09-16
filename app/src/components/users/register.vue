<template>
    <div id="register" class="page-container kz-background-gray">
        <x-header style="border-bottom: none" :left-options="{backText: ''}">注册</x-header>
        <div class="kz-padding-horizontal kz-background-white">
            <group>
                <!--公司名，个人时个人姓名-->
                <x-input :placeholder="userNameText" v-model="userName"></x-input>
                <!--手机号-->
                <x-input :max="11" v-model="phone" keyboard=number placeholder="请输入你的手机号"></x-input>
                <!--图形验证码-->
                <x-input v-model="img_code" keyboard=number placeholder="请输入验证码" class="weui-cell_vcode" :max="4">
                    <img slot="right" @click='flipCode' style="height: 26px;" class="weui-vcode-img" :src="imgCodePath">
                </x-input>
                <!--手机短信验证码-->
                <x-input class="weui-vcode" keyboard=number :max="6" placeholder="请输入手机验证码" v-model="verification">
                    <x-button :disabled='disable' @click.native='_code'
                              style=";text-decoration: underline;background: #fff;color: #333333" slot="right" mini>
                        {{codeText}}
                    </x-button>
                </x-input>
                <!--密码-->
                <div class="password">
                    <x-input :show-clear="false" :max="16" :type="passwordtype" placeholder="请输入密码" v-model="pwd">
                        <div slot="right" v-show="seePwd" class="show-hide-password" @click='seePassword'><span
                                class='iconfont icon-yanjing1'></span></div>
                        <div slot="right" v-show="!seePwd" class="show-hide-password" @click='hidePassword'><span
                                class='iconfont icon-yanjing'></span></div>
                    </x-input>
                </div>
                <!--请输入确认码-->
                <x-input placeholder="请输入确认码" v-model="code"></x-input>
                <!--确认密码-->
                <x-input placeholder="请输入您的注册邀请码（选填）" v-model="code"></x-input>
            </group>
        </div>
        <div class="kz-padding">
            <x-button class="kz-radius-0" @click.native="register" type="primary">注册</x-button>
        </div>
        <div class="kz-text-center kz-text-default">
            <span>点击注册，即表示您同意</span>
            <router-link to='/agreement' class="kz-text-default">快租365用户协议</router-link>
            <br>
            <div class="kz-bottom">
                <a class="dis-padding">
                    <router-link class="kz-text-default" to="/login">登录</router-link>
                </a> |
                <span class="dis-padding kz-decoration"><router-link to='/'
                                                                     class="kz-text-default">逛逛先</router-link></span>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {ToastPlugin} from 'vux';
    import './user.less';
    Vue.use(ToastPlugin);
    import {XHeader, XInput, Group, Cell, XButton} from 'vux';

    export default {
        components: {XHeader, XInput, Group, Cell, XButton},
        data() {
            return {
                userName: '', //公司名称
                userNameText: '请输入您的公司名称',
                phone: '',  // 手机号
                img_code: '', // 图形验证码
                pwd: '',
                // 当前时间戳
                get_time: new Date().getTime().toString(),
                seePwd: true,  // seePwd --  密码等显隐
                // @param code -- 邀请码
                code: '',
                disable: false, // 获取邀请码按钮是否可用
                codeText: '获取验证码',
                verification: '',
                passwordtype: 'password', // 密码框属性
            }
        },
        created() {
            let vm = this;
            this.$store.dispatch('isLoading', false);
        },
        watch: {
            // 手机号格式
            phone(val){
                let vm = this;
                let reg = /^1/;
                if (!reg.test(val)) {
                    vm.phone = '';
                }
            }
        },
        computed: {
            // 图形验证码计算
            imgCodePath() {
                return `${ROOT}/app/account/verifyCode?${this.get_time}`;
            },
            msg(){
                return this.$store.state.tokens;
            }
        },
        methods: {
            seePassword(){
                let vm = this;
                vm.seePwd = !vm.seePwd;
                vm.passwordtype = 'text';
            },
            hidePassword(){
                let vm = this;
                vm.seePwd = !vm.seePwd;
                vm.passwordtype = 'password';
            },
            register() {
                let vm = this;
                let params = {
                    user_type: 0,
                    username: vm.userName,
                    phone: vm.$tools._trim(vm.phone),
                    password: vm.pwd,
                    friendCode: vm.code,
                    verification: vm.verification,
                };
                if (vm.userName == '') {
                    if (vm.type == 2) {
                        this.$vux.toast.text('请填写你的姓名', 'top');
                    } else {
                        this.$vux.toast.text('请填写你的公司名称', 'top');
                    }
                    return false;
                } else if (!vm.$regexp._regPhone(vm.$tools._trim(vm.phone))) {
                    this.$vux.toast.text('手机格式有误', 'top');
                    return false;
                } else if (!vm.$regexp._regSixNumber(params.verification)) {
                    this.$vux.toast.text('请填写正确手机验证码', 'top');
                    return false;
                } else if (!vm.$regexp._regPassword(params.password)) {
                    this.$vux.toast.text('请填写6-16位密码', 'top');
                    return false;
                }
                // 注册调用接口
                vm.$api.post(vm, 'register', params, function (res) {
                    let response = JSON.parse(res.bodyText);
                    if (response.status) {
                        this.$vux.toast.text(response.msg, 'top');
                        localStorage.setItem('token', response.token);
                        vm.$router.push('/freedeposit');
                    } else {
                        this.$vux.toast.text(response.msg, 'top');
                    }
                    ;
                })
            },
            // 获取验证码函数
            _code(obj) {
                let vm = this;
                let _tel = vm.$tools._trim(vm.phone);
                let params = {
                    action: 'register',
                    phone: _tel,
                    vcode: vm.img_code
                };
                let wait = 60;
                if (!vm.$regexp._regPhone(vm.$tools._trim(vm.phone))) {
                    this.$vux.toast.text('手机号码错误', 'top');
                    return false;
                } else if (!vm.$regexp._regFourNumber(vm.img_code)) {
                    this.$vux.toast.text('图片验证码错误', 'top');
                    return false;
                }

                vm.$api.post(vm, 'getVerifyCode', params, function (res) {
                    let response = JSON.parse(res.bodyText);
                    if (response.status) {
                        let interval = setInterval(() => {
                            wait--;
                            if (wait == 0) {
                                vm.codeText = '获取验证码';
                                vm.disable = false;
                                clearInterval(interval);
                            } else {
                                vm.disable = true;
                                vm.codeText = `${wait}秒后重发`;
                            }
                        }, 1000);
                    } else {
                        this.$vux.toast.text(response.msg, 'top');
                    }
                });

            },
            // 点击更新验证码
            flipCode() {
                let vm = this;
                vm.get_time = new Date().getTime().toString();
            },
            // 再试试
            _try(){
                let vm = this;
                vm.mask = false;
            },
        },
    };
</script>