<template>
  <div id="record" class="page-container">
     <x-header :left-options="{backText: ''}">提升额度记录</x-header>
     <!-- <iframe style="width: 100%;" src="https://vux.li/#/zh-CN/demos/x-address"></iframe> -->
     <ul class="record-list">
        <li v-for="record in datas">
          <p>申请时间：{{record.web_modify_time}}</p>
          <p>申请理由：{{record.reason}}</p>
          <p @click="_check(record.path,record.file)">
            上传资料：
            <span class="check">点击查看</span>
          </p>
          <p>提升额度：{{record.promote_deposit}}</p>
          <p>申请状态：{{record.status}}</p>
        </li>
     </ul>
     <popup width='100%' height='100%' top='true' position='left' :style="style">
            <x-header :left-options="{backText:''}" title="资料信息">
                <div slot="overwrite-left" @click='_hide'>
                    <span class="iconfont icon-fanhui"></span>
                </div>
            </x-header>
            <img :src='src'/>
        </popup>
  </div>
</template>
<style lang="less">
  #record{
    .record-list{
      li{
        border-bottom: 4px solid #4d4d4d;
        .check{color:blue;text-decoration: underline;}
      }
    }
    img{
      width: 100%;
    }
  }
</style>

<script>
  import {XHeader, XButton,Cell,Group,Popup} from 'vux';
  export default{
    components: {
      XHeader, XButton,Group,Cell,Popup
    },
    data(){
      return {
        datas:'',
        src:'',
        style:{
          display:'none'
        }
      }
    },
    created(){
        let vm=this;
        vm.$api.post(vm,'updepositrecord',{},function(res){
          this.$store.dispatch('isLoading',false);
          let data=res.data.data;
          vm.datas=data;
          console.log(data);
          for(let i=0;i<vm.datas.length;i++){
            if(vm.datas[i].status==0){
              vm.datas[i].status='已申请'
            }else if(vm.datas[i].status==1){
              vm.datas[i].status='已同意'
            }else if(vm.datas[i].status==2){
              vm.datas[i].status='已拒绝';
            }
          }
        })
    },
    methods:{
      // 获取点击的图片路径
      _check(path,name){
        let vm=this;
        let srcUrl=`${ROOT}${path}${name}`;
        console.log(srcUrl)
        vm.src=srcUrl;
        vm.style={
            display:'block'
        };
      },
      // 查看图片弹窗隐藏
      _hide(){
          this.style={
            display:'none'
        };
      }
    }
  }
</script>
