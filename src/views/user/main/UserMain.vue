<template>
  <div id="main">
      <div class="back-img">
          <img src="~assets/img/main/back-img5.png" width="100%" height="100%" alt="">
      </div>
    <el-container style="margin-top: 60px;">
        <el-header class="header">
            <div class="video-name">软萌龙窝小视频</div>
            <div class="head-info">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img v-if = "!isOnline" class="head-img" src="~assets/img/main/login_null.png" alt="">
                        <img v-else class="head-img" :src="photoUrl" alt="">
                    </span>
                    <!-- <span v-if = "isOnline" @click="logOut">注销</span> -->
                    <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                        <el-dropdown-item disabled class="dropdown-item" style="color: #d4237a;">{{username}}</el-dropdown-item>
                        <router-link v-if="isOnline" to="/sheet/main" style="text-decoration: none;">
                           <el-dropdown-item v-if = "isOnline" class="dropdown-item">去首页</el-dropdown-item>
                        </router-link>
                        <span @click="logOut"><el-dropdown-item v-if = "isOnline" class="dropdown-item" >注销</el-dropdown-item></span>
                        <router-link v-if="!isOnline" to="/login" style="text-decoration: none;">
                          <el-dropdown-item class="dropdown-item">登录</el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu :default-active="'1'" mode="vertical" class="menu" >
                    <el-menu-item index="1" class="menu-item" :class="{activeItemClass: index==curIndex}">
                        <router-link class="link" to="/user/subVideo">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/sub.png" alt=""></div>
                            <div class="menu-name">发视频</div></div></router-link></el-menu-item>
                    <el-menu-item index="2" class="menu-item">
                        <router-link class="link" to="/user/myVideo">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/myVideo.png" alt=""></div>
                            <div class="menu-name">我的视频</div></div></router-link></el-menu-item>
                    <el-menu-item index="3" class="menu-item">
                        <router-link class="link" to="/user/collect">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/collect_active.png" alt=""></div>
                            <div class="menu-name">收藏</div></div></router-link></el-menu-item>
                    <el-menu-item index="4" class="menu-item">
                        <router-link class="link" to="/user/doGood">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/good_active.png" alt=""></div>
                            <div class="menu-name">点赞视频</div></div></router-link></el-menu-item>
                    <el-menu-item index="5" class="menu-item">
                        <router-link class="link" to="/user/history">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/history.png" alt=""></div>
                            <div class="menu-name">历史记录</div></div></router-link></el-menu-item>
                    <el-menu-item index="6" class="menu-item">
                        <router-link class="link" to="/user/discussVideo">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/discuss.png" alt=""></div>
                            <div class="menu-name">评论视频</div></div></router-link></el-menu-item>
                     <el-menu-item index="7" class="menu-item">
                        <router-link class="link" to="/user/userProfile">
                        <div class="item">
                            <div class="item-img"><img class="item-icon" src="~assets/img/main/profile.png" alt=""></div>
                            <div class="menu-name">个人信息</div></div></router-link></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>       
</template>    

<script>

  export default {
    name: "UserMain",  
    data() {    
        return {
            username: '',
            curIndex: 1,
            photoUrl: ''
            // activeItemClass: {}
        }       
    },
    computed: {
        isOnline() {
            return this.username != '' ? true : false
        }
    },
    created() {
        // this.username = 'mxd190125'
        this.username = this.$store.getters.getUser.username
        this.photoUrl = this.$store.getters.getUser.photoUrl
        console.log('photoUrl: ' + this.photoUrl)
    },
    methods: {
        openSucess(str) {
            this.$message({
               message: str,
               type: 'success'
            })
        },
        openFail(str) {
            this.$message.error(str);
        },
        logOut() {
            console.log('开始注销。。。。。')
            this.$store.commit('removeUser')
            this.$router.push('/login')
            this.openSucess('成功退出！')
        }
    },
}

</script>

<style scoped>
@import '~assets/css/userMain.css';
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