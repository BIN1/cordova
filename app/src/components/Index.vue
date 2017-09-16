<template>
    <div class="page-container kz-background-gray">
        <x-header :left-options="{backText: 'hao'}">index</x-header>
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>



        <button @click="testAjax()">测试</button>

        <button @click="showQidong">显示启动页</button>

    </div>
</template>
<script>
    import {Tabbar, TabbarItem, Group, Cell, XHeader} from 'vux'

    export default {
        components: {
            Tabbar, TabbarItem, Group, Cell, XHeader
        },
        data () {
            return {
                msg: 'Hello World!'
            }
        },
        methods: {
            testAjax(){
                this.$api.post(this, 'openzmData', {}, function (res) {

                })
            },
            showQidong(){
                navigator.splashscreen.show();
            }

        },
        created(){
            this.$store.dispatch('isLoading',false);
        }
    }
</script>
