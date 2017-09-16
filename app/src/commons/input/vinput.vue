<template>
  <div class="vinput">
    <span v-show="title" class="title">{{title}}</span>
    <input :placeholder="placeholder" :type="type"/>
  </div>
</template>
<style lang="less">
    .vinput{
        display: flex;
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ededed;
        input{
            flex: 1;
        }
        .title{
            flex: 0 0 100px;
            width: 100px;
            text-indent: 6px;
        }
    }
</style>
<script>
    export default{
        'name':'input',
        props:{
            title:[String,Number,Object],
            placeholder:[String,Number,Object],
            type:{default:'text'},
            value: [String, Number],
        },
    }
</script>
