<template>
  <div id="scroller">
      <x-header title="上拉下拉加载"></x-header>
      <div class="foot">
          foot
      </div>
      <div class="content" ref="content">
          <ul>
              <li @click="_click(key)" v-for="(x,key) in 20" :key="key">{{x}}</li>
          </ul>
      </div>
  </div>
</template>
<style lang="less">
    #scroller{
        .foot{
            position: fixed;
            bottom: 0;left: 0;
            width: 100%;height: 45px;
            background: lightblue;color:#fff;
            line-height: 45px;text-align: center;
        }
        .content{
            position: absolute;
            top:47px;bottom: 45px;
            width: 100%;z-index:99999999;
            overflow: hidden;
            ul{
                li{
                    line-height: 40px;color:#666;font-size: 18px;
                    text-align: center;
                    border-bottom: 1px solid #ededed;
                }
            }
        }
    }
</style>

<<script>
import {XHeader} from 'vux';
import BScroll from 'better-scroll';
export default {
  components:{
      XHeader
  },
  data(){
      return {

      }
  },
  mounted(){
      this.$store.dispatch('isLoading',false);
      this.$nextTick( () => {
          this.scroll=new BScroll(this.$refs.content,{
              click:true
          });
      })
  },
  methods:{
      _click(idx){
          console.log(idx);
      }
  }
}
</script>

