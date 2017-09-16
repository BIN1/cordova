<!--确认开通芝麻信用信息页-->
<template>
  <div id="openzm" class="page-container kz-background-white">
     <x-header :left-options="{backText: ''}">授权芝麻信用</x-header>
     <div class="kz-padding-horizontal">
      <div class="zm-logo kz-vertica-horizontal-center">
          <img src="static/img/zm_logo.png" class="kz-padding-horizontal-xs"/>
      </div>
      <div class="zm-describe">
          尊敬的客户您好，请您授权快租365查看你的芝麻信用分，我们会根据您的芝麻信用分给您授予免押金额度，谢谢您的配合
      </div>
      <group>
        <x-input readonly placeholder="姓名" v-model="real_name"></x-input>
        <x-input readonly placeholder="身份证号" v-model="id_card_number"></x-input>
      </group>
      <x-button @click.native="getZmUrl" type="primary" class='kz-margin-top-lg kz-radius-0'>授权我的芝麻信用分</x-button>
     </div>
  </div>
</template>
<style lang="less">
  #openzm{
      .weui-cells:before{display: none;}
      .weui-cell:before{left:0!important;}
      .vux-header{
        background: #8fc31f!important;
        .left-arrow:before{
          border:1px solid #fff;
          border-width: 1px 0 0 1px;
        }
        .vux-header-title,.vux-header-right{
          color:#fff!important;
        }
      }
      .zm-logo{
        img{ width: 36%; padding: 30px 0 35px;}
      }
      .zm-describe{ font-size: 14px; color: #999;}
  }
</style>
<script>
    import {XHeader, XButton, Cell, Group, XInput,Popup} from 'vux';
    export default{
        components: {
            XHeader, XButton, Group, Cell, XInput,Popup
        },
        data(){
            return {
                id_card_number: '',
                real_name: '',
                full_pop: false
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
                    this.$store.dispatch('isLoading',false);
                } else {
                    // 不能开通芝麻信用，返回上一步
                    this.$vux.toast.text(response.msg, 'top');
                    this.$router.push('freedeposit');
                }
            })
        },
        methods: {
            // 获取开通芝麻地址
            getZmUrl(){
                //this.$router.push('/zmtoopen');
                let vm = this;
                let params = {
                    card_name: vm.real_name,
                    card_identity: vm.id_card_number
                };
                vm.$api.post(vm, 'zmtoopen', params, function (data) {
                    let response = JSON.parse(data.bodyText);
                    if (response.status) {
                        this.$store.dispatch('isLoading',false);
                        let zm_url = response.msg;

                        document.addEventListener("deviceready",onDeviceReady,false);
                        function onDeviceReady() {
                            cordova.InAppBrowser.open(zm_url, '_blank', 'location=yes');
                        }
                    } else {
                        this.$vux.toast.text(response.msg, 'top');
                        this.$router.push('freedeposit');
                    }
                })

            }
        }
    }
</script>
