<template>
  <div id="menu-item">
      <div class="menu-img"><slot name="menu-icon"></slot></div>
      <div class="menu-name" :style="menuNameColor"><slot name="menu-name"></slot></div>
  </div>       
</template>    

<script>
  export default {
    name: "MenuItem",  
    props: {
        menuNameColor: {
            type: String,
            default: '#303133'
        }
    },
    data() {    
        return {
            
        }       
    }
}

</script>
               
<style scoped>
#menu-item{
    display: flex;
    height: 25px;
}
.menu-name{
    
}
</style>