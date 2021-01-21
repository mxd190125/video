<template>
  <div id="admin">
      <div class="back-img">
          <img src="~assets/img/main/back-img5.png" width="100%" height="100%" alt="">
      </div>
      <el-container style="margin-top: 60px;"> 
        <el-header class="header">
            <div class="video-name">软萌龙窝小视频</div>
            <div class="head-info">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img class="head-img" v-if="isOnline" :src="photoUrl" alt="">
                        <img class="head-img" v-if="!isOnline" src="~assets/img/main/login_null.png" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                        <el-dropdown-item disabled class="dropdown-item" style="color: #d4237a;">{{username}}</el-dropdown-item>
                        <router-link to="/sheet/main" style="text-decoration: none;">
                            <el-dropdown-item  class="dropdown-item">首页</el-dropdown-item>
                        </router-link>
                        <span @click="logOut"><el-dropdown-item  class="dropdown-item">注销</el-dropdown-item></span>
                        <router-link v-if="!isOnline" to="/login" style="text-decoration: none;">
                            <el-dropdown-item class="dropdown-item">登录</el-dropdown-item>
                        </router-link>
                        
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container style="height:100%;">
            <el-aside width="200px" class="aside" >
                <el-menu :default-active="'1'" mode="vertical" class="menu" >
                    <el-menu-item  class="menu-item" :class="{activeItemClass: index==5}">
                        <router-link class="link" to="/admin/videoCategory">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/category.png" alt=""></div>
                            <div class="menu-name">视频类别</div></div></router-link></el-menu-item>
                    <el-menu-item  class="menu-item">
                        <router-link class="link" to="/admin/videoList">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/myVideo.png" alt=""></div>
                            <div class="menu-name">视频列表</div></div></router-link></el-menu-item>
                    <el-menu-item  class="menu-item">
                        <router-link class="link" to="/admin/userList">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/user_list.png" alt=""></div>
                            <div class="menu-name">用户列表</div></div></router-link></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>       
</template>    

<script>
  export default {
    name: "AdminMain",  
    data() {    
        return {
            photoUrl:'',
            username: ''
        }
    },
    computed: {
        isOnline() {
            return this.username != '' ? true : false
        }
    },
    created() {
        this.username = this.$store.getters.getUser.username
        this.photoUrl = this.$store.getters.getUser.photoUrl
        console.log('username: ' + this.$store.getters.getUser.username)
    },
    methods: {
        openFail(str) {
          this.$message.error(str);
        },
        openSucess(str) {
          this.$message({
          message: str,
          type: 'success'
        })
       },
        logOut() {
            console.log('开始注销。。。。。')
            this.$store.commit('removeUser')
            this.$router.push('/login')
            this.openSucess('成功退出！')
        }   
    }
}

</script>
               
<style scoped>
@import '~assets/css/adminMain.css';
.dropdown-item{
    color: #d4237a;
}
.aside ul{
    height: 100%;
}
.back-img{
    z-index: -1;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
</style>