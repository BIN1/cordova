<!--对四种租赁类型的的说明-->
<template>
    <div id="rentmode">
        <div class="zulipopup-content">
            <h3 class="kz-vertica-horizontal-center kz-padding-top-sm">
                {{zulipopupHead}}说明
            </h3>
            <p class="kz-padding" v-if="modeType == 1">
                1． 租期为12个月，客户租赁满6个月后可随时退还。<br>
                2． 租期未满6个月退还，快租365将收取相应违约金，具体规则如下：<br>
                ① 租期未满3个月，快租365将收取3个月租金作为违约金。<br>
                ② 实际租期满3个月但未满6个月时，快租365将收取额外（6个月-实际租期）个月租金作为违约金。
            </p>

            <p class="kz-padding" v-if="modeType == 2">
                1. 租期分为12个月和24个月。<br>
                2. 租期满后方可退还。<br>
                3. 租期未满退换，快租365将收取未交纳租金的50%作为违约金。
            </p>
            <p class="kz-padding" v-if="modeType == 3">
                1. 租期为12个月和24个月。<br>
                2. 租期满后，设备归客户所有，不必退还。<br>
                3. 租期未满退还，也需按订单约定缴纳全部租金。
            </p>
            <p class="kz-padding" v-if="modeType == 4">
                1. 租期少于等于3个月。<br>
                2. 租赁期满后，设备归快租365所有。<br>
                3. 短期租赁租金需一次性付清。<br>
                4. 租赁期满未归还设备，将以不高于现订单价格计费。
            </p>
            <p class="kz-padding" v-if="modeType == 5">
                租赁类型待完善
            </p>
            <div @click.stop.prevent="setMsg" class="zulipopup-content-btn kz-vertica-horizontal-center">
                确定
            </div>
        </div>
    </div>
</template>
<style lang="less">
    #rentmode {
        .zulipopup-content{
            position: absolute;bottom: 0;left: 0;width: 100%;background: #fff;
            p{ font-size: 12px; line-height: 30px;  }
        }
        .zulipopup-content-btn{
            height: 40px;background: #8fc31f;color: #fff;
        }
    }
</style>
<script>
    export default {
        props:['zulipopupHead'],
        data(){
            return {
                //zulipopupHead2 : this.zulipopupHead
            }
        },
        methods: {
            setMsg() {
                this.$emit('rentnode',0)
            }
        },
        computed:{
            modeType(){
                let vm = this;
                let type = 0;
                if(vm.zulipopupHead == '随租随还'){
                    type = 1;
                }else if(vm.zulipopupHead == '固定租期'){
                    type = 2;
                }else if(vm.zulipopupHead == '租完即送'){
                    type = 3;
                }else if(vm.zulipopupHead == '短期租赁'){
                    type = 4;
                }else{
                    type = 5;
                }
                return type;
            }
        }
    }
</script>