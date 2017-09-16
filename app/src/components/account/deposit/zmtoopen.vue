<!--确认开通芝麻信用信息页-->
<template>
  <div id="zmtoopen" class="page-container kz-background-white">
     <x-header :left-options="{showBack: false}">
         <a slot="right" @click="close" class="iconfont icon-cha"></a>
         授权芝麻信用
     </x-header>

      <iframe :src="zm_url" width="100%" height="100%"></iframe>

  </div>
</template>
<script>
    import {XHeader, XButton, Cell, Group,Popup,TransferDom} from 'vux';
    export default{
        directives: {
            TransferDom
        },
        components: {
            XHeader, XButton, Group, Cell,Popup
        },
        data(){
            return {
                id_card_number: '',
                real_name: '',
                zm_url: '',
            }
        },
        created(){
            let vm = this;
            vm.$api.post(vm, 'openzmdata', {}, function (res) {
                let response = JSON.parse(res.bodyText);
                let data = response.data;
                if (response.status) {
                    vm.id_card_number = data.id_card_number;
                    vm.real_name = data.real_name;

                    let params = {
                        card_name: vm.real_name,
                        card_identity: vm.id_card_number
                    };
                    vm.$api.post(vm, 'zmtoopen', params, function (data) {
                        let response = JSON.parse(data.bodyText);
                        if (response.status) {
                            this.$store.dispatch('isLoading',false);
                            vm.zm_url = response.msg;
                        } else {
                            this.$vux.toast.text(response.msg, 'top');
                            this.$router.push('freedeposit');
                        }
                    })
                } else {
                    // 不能开通芝麻信用，返回上一步
                    this.$vux.toast.text(response.msg, 'top');
                    this.$router.push('freedeposit');
                }
            })
        },
        methods: {
            // 获取开通芝麻地址
            close(){
                let vm = this;
                this.$router.push('/accountindex');
            }
        }
    }
</script>
