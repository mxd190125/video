<template>
  <div class="video">
      <!-- <h2>我是组件</h2> -->
      <div><slot name="video-img"></slot></div>
      <div class="info"><slot name="video-info"></slot></div>
  </div>
</template>    

<script>
  export default {
    name: "VideoItem",  
    data() {    
        return {
            
        }       
    }
}

</script>
               
<style scoped>
.video{
  /* flex: 1; */
  width: 100px;
  height: 90px;
  text-align: center;
}
.info{
  font-size: 12px;
}
</style>