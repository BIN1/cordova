<template>
  <div id="inputlist" @click="inputlistSay">
      <div v-if="title" class="title">{{title}}</div>
      <div class="placeholder kz-h-v-center">{{placeholder}}</div>
  </div>
</template>
<style lang="less">
    #inputlist{
        width: 100%;
        line-height: 44px;
        display: flex;
        border-bottom:1px solid #ededed;
        .title{
            flex: 0 0 100px;
            width: 100px;
            text-indent: 8px;
        }
        .placeholder{
            flex: 1;
        }
    }
</style>

<script>
    export default{
        props:['title','placeholder'],
        methods:{
            inputlistSay(){
                this.$emit('inputlistSay')
            }
        }
    }
</script>
