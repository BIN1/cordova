<template>
    <div id="set" class="page-container kz-background-gray">
        <x-header :left-options="{backText: ''}" title="设置"></x-header>
        <group>
            <cell title="一件反馈" is-link @click.native="_feedback"></cell>
            <cell title="检查更新" is-link link=''></cell>
        </group>
        <x-button style="margin-top: 10px;" type="warn" @click.native="logout">退出登录</x-button>
        <!-- 一件反馈 -->
        <popup v-model="feedback" height='100%' style="background:#fff;">
            <x-header :left-options="{backText:''}" title="意见反馈" style="border-bottom:1px solid #ededed;">
                <div slot="overwrite-left" @click="feedback=!feedback">
                    <span class="iconfont icon-fanhui"></span>
                </div>
            </x-header>
            <cell title="意见反馈："></cell>
            <textarea></textarea>
            <x-button style="position:fixed;bottom:0;left:0" type="primary">提交</x-button>
            <div class="photo">
                <div class="photo-img-box kz-vertica-horizontal-center">
                    <img src="../../assets/img/photo@2x.png"/>
                </div>
            </div>
        </popup>
    </div>
</template>
<style lang="less">
    #set{
        .weui-cell:before{
            border:none;
        }
        textarea{
            display: block!important;width: 96%;height: 100px;box-sizing: border-box;
            padding:6px 8px;margin:auto;border:1px solid #ededed;
        }
        .photo{
            margin-top: 10px;
            .photo-img-box{
                width: 64px;height: 64px;border: 1px solid #ededed;margin-left: 2%;
                img{
                    width: 50px;
                }
            }
        }
    }
</style>

<script>
    import {
        XHeader,
        Group,
        Cell,
        XButton,
        Popup,XTextarea
    } from 'vux';
    export default {
        components: {
            XHeader,
            Group,
            Cell,
            XButton,
            Popup,XTextarea
        },
        data() {
            return {
                feedback: false,
            }
        },
        created() {
            this.$store.dispatch('isLoading', false);
        },
        methods: {
            // 退出登录
            logout() {
                let vm = this;
                vm.$api.post(vm, 'logout', {}, function(res) {
                    let response = res.data;
                    if (response.status) {
                        localStorage.setItem('token', '');
                        this.$store.dispatch('alter', '');
                        this.$store.dispatch('fun');
                        this.$router.push('/');
                        this.$store.dispatch('cartNum', 0); //更改state中的购物车数量数据
                        localStorage.setItem('token','');
                        localStorage.setItem('userAccounts','');
                        this.$vux.toast.text(response.msg, 'top');
                    } else {
                        this.$vux.toast.text('退出失败', 'top');
                    }
                })
            },
            // 意见反馈页面显示隐藏
            _feedback() {
                let vm = this;
                vm.feedback = !vm.feedback;
            }
        }
    }
</script>
