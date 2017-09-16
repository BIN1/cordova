<template>
    <div id="device">
        <x-header title="设备信息"></x-header>
        <div ref="deviceInfo">
            {{device}}
        </div>
    </div>
</template>

<<script>
    import {XHeader} from 'vux';
    export default {
        components:{
            XHeader
        },
        data(){
            return {
                device:''
            }
        },
        created(){
            this.$store.dispatch('isLoading',false);
            this.device=`
                Device model: ${device.model}\n
                Device platform: ${device.platform}\n
                Device UUID: ${device.uuid}\n
                Device version: ${device.version}
            `
        }
    }
</script>

