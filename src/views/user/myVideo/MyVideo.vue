<template>
  <div id="my-video">
      <div class="null-div" v-if="isNull" style="color: #d4237a;font-size: 25px;">
        你还没有发视频哦~~~~
      </div>
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
</template>    

<script>
import axios from 'axios'

  export default {
    name: "MyVideo",  
    data() {
        return {
            userId: '',
            visible: false,
            historys: '无',
            videos: []
        }
    },
    computed: {
      isNull() {
        return this.videos == undefined || this.videos.length <= 0
      }
    },
    created() {
        let userId = this.$store.getters.getUser.userId
        this.userId = userId
        console.log('userId:' + userId)
        console.log('userId--type:' + typeof(parseInt(userId)))
        if(userId != ''){
            axios({
            method: 'get',
            url: '/getMyVideos',
            params: {
                userId: this.userId
            }
            }).then(res => {
                  res = res.data
                  if(res.status == '1'){
                this.videos = res.videos
                  console.log('videos: ' + res.videos)
                }
           })
        }
        
    },
    methods: {
        watchHistory(id) {
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
        playVideo(videoUrl , videoId , praiseNum , viewNum) {
            console.log('videoUrl: ' + videoUrl + ' videoId:' + videoId + ' praiseNum: ' + praiseNum + ' viewNum: ' + viewNum + ' userId: ' + this.userId) 
            this.$store.commit('setCurVideo' , {
                                videoId: videoId , 
                                videoUrl: videoUrl,
                                viewNum: viewNum,
                                praiseNum: praiseNum,
                                userId: this.userId
            })
            this.$router.push('/user/playVideo')
        }
    }
    
}

</script>
               
<style scoped>
@import '~assets/css/showVideoList.css';

.my-video{
    width: 1000px;
    /* display: inline; */
}

</style>