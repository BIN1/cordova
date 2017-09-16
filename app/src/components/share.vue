<template>
  <div id="share">
      <x-header title="分享"></x-header>
      <textarea v-model="reason"></textarea>
      <button @click="_share">分享</button>
  </div>
</template>
<script>
    import {XHeader} from 'vux';
    export default{
        components:{
            XHeader
        },
        data(){
            return {
                reason:''
            }
        },
        created(){
            this.$store.dispatch('isLoading',false);
            Wechat.isInstalled((installed) => {
                alert('Wechat installed:'+(installed ? 'Yes':'No'));
            },(reason) =>{
                alert('Failed:'+reason);
            });
            let scope='snsapi_userinfo';
            Wechat.auth(scope,(response) => {
                console.log(JSON.stringify(response));
            },(reason) => {
                console.log('Failed:'+reason);
            });
        },
        methods:{
            _share(){
                console.log(Wechat.share);
                Wechat.share({
                    text:this.reason,
                    scene:Wechat.Scene.TIMELINE
                },() => {
                    console.log('success')
                },(reason) => {
                    console.log('Failed:'+reason)
                })
            }
        }
    }
</script>
