<template>
    <div id="warrantydescription">
        <x-header :left-options="{backText:''}">
            保修服务说明
            <!--<div slot="overwrite-left" @click="baoxiuPopup=!baoxiuPopup">-->
            <div slot="overwrite-left" @click="setMsg">
                <span class="iconfont icon-fanhui"></span>
            </div>
        </x-header>
        <div class="baoxiu-popup-div">
            <div>
                针对由快租365提供保修服务的，客户有着“标准保修”与“全程保修”两种服务选择：
            </div>
            <div>
                标准保修：正常使用中出现的合理的硬件问题，快租365给予免费更换或维修；
            </div>
            <div>
                全程保修：除标准保修外，还包括了进液、摔碎、磕碰、雷击等人为或外力因素产生的计算机外壳、屏幕及电子部件的故障；
            </div>
            <div>
                保修范围排除：
            </div>
            <div>
                1）因自然灾害等不可抗力（地震、洪水、暴雨、台风）而导致的损坏；
            </div>
            <div>
                2）因战争、恐怖活动、核事故而导致的损坏；
            </div>
            <div>
                3）因火灾而导致的损坏；
            </div>
            <div>
                4）因人为原因或主观故意（包括但不限于有明显钝器打砸痕迹）、未成年人不正当使用而导致的损坏；
            </div>
            <div>
                5）被盗、被抢或遗失；
            </div>
            <div>
                6）因软件原因导致的设备工作不能或设备工作故障；
            </div>
            <div>
                7）产品经客户或非官方授权服务站擅自维修、改装过；
            </div>
        </div>
    </div>
</template>
<style lang="less">
    #warrantydescription {
    .baoxiu-popup-div {
        padding: 4px 10px;
        font-size: 12px;
            div { margin-top: 14px;}
        }
    }
</style>
<script>
    import { XHeader} from 'vux';
    export default {
        components: {
            XHeader
        },
        methods: {
            setMsg() {
                this.$emit('baoxiuPopup',0)
            }
        }
    }
</script>