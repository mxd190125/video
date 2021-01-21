<template>
  <div id="main">
      <div class="back-img">
          <img src="~assets/img/main/back-img.png" width="100%" height="100%" alt="">
      </div>
    <el-container style="margin-top: 60px;">
        <el-header class="header">
            <div class="video-name">软萌龙窝小视频</div>
            <div class="head-info">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img v-if="!isOnline" class="head-img" src="~assets/img/main/login_null.png" alt="">
                        <img v-else class="head-img" :src="photoUrl" alt="">
                    </span> 
                    <el-dropdown-menu slot="dropdown" class="dropdown-menu">
                        <el-dropdown-item disabled class="dropdown-item" style="color: #d4237a;">{{username}}</el-dropdown-item>
                        <!--管理员 -->
                        <span v-if="role == 'ADMIN'">
                            <router-link v-if="isOnline" to="/admin/videoCategory" style="text-decoration: none;">
                                <el-dropdown-item class="dropdown-item">个人中心</el-dropdown-item>
                            </router-link>
                        </span>
                        <span v-else>
                            <router-link v-if="isOnline" to="/user/myVideo" style="text-decoration: none;">
                                <el-dropdown-item class="dropdown-item">个人中心</el-dropdown-item>
                            </router-link>
                        </span>
                        <router-link v-if="!isOnline" to="/login" style="text-decoration: none;">
                           <el-dropdown-item class="dropdown-item">登录</el-dropdown-item>
                        </router-link>
                        <router-link v-if="!isOnline" to="/register" style="text-decoration: none;">
                           <el-dropdown-item v-if="!isOnline" class="dropdown-item">注册</el-dropdown-item>
                        </router-link>
                        <span @click="logOut"><el-dropdown-item v-if="isOnline" class="dropdown-item">注销</el-dropdown-item></span>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container class="main-container">
            <div  class="main-div">
                <div class="video" v-for="item in videos" :key="item.id">
                  <div class="author-div">
                     <img class="author-img" :src="item.photoUrl" alt="他的头像">
                  </div>
                  <div class="video-title">{{item.title}}</div>
                  <div class="video-div">
                     <img class="video-face" :src="item.faceUrl" alt="视频封面"
                     @click="playVideo(item.videoUrl , item.id , item.praiseNum , item.viewNum)">
                  </div>
                  <div class="video-info">
                     <span class="category">{{item.categoryName}}</span>
                     <span class="subTime">{{item.subTime}}</span>
                  </div>
                  <el-popover placement="right" title="观看记录" width="200" trigger="click">
                     <label slot="reference" @click="watchHistory(item.id)" class="watch-bnt">观看记录</label>
                     <div v-html="historys"></div>
                  </el-popover>
                </div>
            </div>
        </el-container>
    </el-container>
  </div>       
</template>    

<script>
import axios from 'axios'

  export default {
    name: "UserMain",  
    data() {    
        return {
            role: '',
            username: '',
            photoUrl: '',
            userId: '',
            curIndex: 1,
            historys: '无',
            videos: []
        }
    },
    created() {
        let user = this.$store.getters.getUser
        if(user != null){
            this.username = user.username
            this.userId = user.userId
            this.photoUrl = user.photoUrl
            this.role = user.role
        }
        this.showAllVideos()
    },
    computed: {
        isOnline() {
            return this.username != '' ? true : false
        }
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
        },
        showAllVideos() {
            // 刷新主页，展示所有视频
            axios({
               method: 'get',
               url: '/showAllVideos',
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                    this.videos = res.videos
                    console.log('videos: ' + JSON.stringify(res.videos))
                }
           })
        },
        // 查看某个视频的历史记录
        watchHistory(id) {
            if(this.userId == ''){
                this.openFail('您未登录！无法查看')
                return 
            }
            console.log('videoId: ' + id)
            axios({
              method: 'get',
              url: '/getHistoryByVideoId',
              params: {
                videoId: id
              }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                let historys = res.historys
                let htmlVar = ''
                for (const item of historys) {
                    htmlVar += '<p>['+item.userName+']&nbsp;'+item.watchTime+'</p>'
                }
                this.historys = htmlVar
                console.log('historys: ' + JSON.stringify(res.historys))
               }
            })
        },
        // 跳转到视频播放页面
        playVideo(videoUrl , videoId , praiseNum , viewNum) {
            if(this.userId == ''){
                this.openFail('您未登录！无法查看')
                return 
            }
            console.log('videoUrl: ' + videoUrl + ' videoId:' + videoId + ' praiseNum: ' + praiseNum + ' viewNum: ' + viewNum + ' userId: ' + this.userId) 
            this.$store.commit('setCurVideo' , {
                                videoId: videoId , 
                                videoUrl: videoUrl,
                                viewNum: viewNum,
                                praiseNum: praiseNum,
                                userId: this.userId
            })
            this.$router.push('/sheet/playVideo')
       }
    }
}

</script>

<style scoped>
@import '~assets/css/showVideoList.css';
@import '~assets/css/sheetMain.css';

.dropdown-item{
    color: #d4237a;
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