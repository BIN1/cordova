<template>
  <label id="phone">
      <span v-if="title" class="title">{{title}}</span>
    <input ref='phone' @change="telChange" v-model="phone" maxlength="13" placeholder="请输入您的号码"/>
  </label>
</template>
<style lang="less">
    #phone{
        display: flex;
        margin: 0;
        font-weight: normal;
        input{
            flex: 1;
            line-height: 45px;
        }
        .title{
            flex: 0 0 100px;
            width: 100px;
            font-size: 14px;
        }
    }
</style>
<script>
    export default{
        props:['title'],
        data(){
            return{
                phone:''
            }
        },
        methods:{
            telChange(){
                let vm=this;
                vm.$emit('phoneSay',vm.phone);
            }
        },
        watch:{
            phone(val,oldval){
                let vm=this;
                let newLen=val.length,oldLen=oldval.length;
                let reg=/^[1]/;
                if(!reg.test(vm.phone)){
                    vm.phone='';
                }
                if(newLen>oldLen){
                    if(this.phone.length==3||this.phone.length==8){
                        this.phone=this.phone+' ';
                    }
                }
                
            }
        }
    }
</script>
