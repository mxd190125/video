<template>
  <div id="play-video">
      <div class="back-img">
          <img src="~assets/img/main/back-img5.png" width="100%" height="100%" alt="">
      </div>
      <div class="play-div">
            <video class="video" controls="controls" autoplay>
            <source :src="videoUrl" type="video/mp4">
           </video>
          </div>
          <div class="opt-div">
            <img v-if="isFavor" @click="favor" class="favor" src="~assets/img/main/collect_active.png" alt="">
            <img v-else class="favor" @click="favor" src="~assets/img/main/collect.png" alt="">
            <img v-if="isPraise" class="good" @click="praise"  src="~assets/img/main/good_active.png" alt="">
            <img v-else class="good" @click="praise" src="~assets/img/main/good.png" alt="">
            <label style="color:white;">{{praiseNum}}</label>
            <span class="view-num">{{viewNum}}&nbsp;次播放</span>
          </div>
          <div class="dis-div">
            <el-input class="dis-input" v-model="content" placeholder="发一条友善的评论...."></el-input>
            <el-button class="sub-dis-btn" type="primary" @click="subDiscuss">发布</el-button>
          </div>
          <div class="show-dis-div">
            <div class="dis-item" v-for="item in discusses" :key="item.id">
              <!--头像-->
              <img class="dis-photo" :src="item.photoUrl" alt="">
              <!--评论-->
              <span class="dis-text">
                  <label style="color: #d4237a;">{{item.userName}}：</label>
                  <label style="color:white;">{{item.content}}</label>&nbsp;
                  <label class="dis-time">{{item.disTime}}</label>
              </span>
          </div>
      </div>
  </div>       
</template>

<script>
import axios from 'axios'

  export default {
    name: "PlayVideo",  
    data() {    
        return {
            userId: '',
            videoUrl: '',
            videoId: '',
            viewNum: 0,
            praiseNum: 0,
            isFavor: false,
            isPraise: false,
            content: '',
            discusses: []
        }
    },
    created() {
        let curVideo = this.$store.getters.getCurVideo
        this.videoUrl = curVideo.videoUrl
        this.videoId = curVideo.videoId
        this.viewNum = curVideo.viewNum
        this.praiseNum = curVideo.praiseNum
        this.userId =  curVideo.userId
        // 是否收藏
        this.isFavorMethod()
        // 是否点赞
        this.isPraiseMethod()
        // 浏览量 + 1 ,添加访问历史记录
        this.addViewNum()
        // 获取该视频的所有评论
        this.checkDiscusses()
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
        checkDiscusses() {
            axios({
                method: 'get',
                url: '/checkVideoDiscusses',
                params: {
                  videoId: this.videoId,
                }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                   this.discusses = res.discusses
                   console.log('此视频的评论：' + this.discusses)
                } 
           })
        },
        subDiscuss() {
            if(this.content.trim() == ''){
                this.openFail('评论不能为空！')
                return
            }
            axios({
                method: 'get',
                url: '/subDiscuss',
                params: {
                  videoId: this.videoId,
                  userId: this.userId,
                  content: this.content
                }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                   this.openSucess('评论发表成功！')
                   console.log('发布的评论：' + this.discusses)
                   // 刷新该视频的所有评论
                   this.checkDiscusses()
                   this.content = ''
                } else{
                    this.openFail('评论发表失败！')
                }
           })
            
        },
        isFavorMethod() {
            // 是否收藏
             axios({
              method: 'get',
              url: '/isFavor',
              params: {
                videoId: this.videoId,
                userId: this.userId
            }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                   this.isFavor = true
                }else{
                    this.isFavor = false
                }
                console.log('是否收藏: ' + res.status)
            })
        },
        isPraiseMethod() {
            axios({
              method: 'get',
              url: '/isPraise',
              params: {
                videoId: this.videoId,
                userId: this.userId
            }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                   this.isPraise = true
                }else{
                    this.isPraise = false
                }
                console.log('是否点赞: ' + res.status)
                console.log('isPraise: ' + this.isPraise)
            })
        },
        addViewNum() {
            axios({
            method: 'get',
            url: '/addViewNum',
            params: {
                videoId: this.videoId,
                userId: this.userId
            }
            }).then(res => {
                res = res.data
                if(res.status == '1'){
                    // 当前页面的浏览量更新
                    this.viewNum ++
                    // store中的也要更新
                    this.$store.commit('addVideoNum')
                }
                console.log('浏览量是否加成功？: ' + res.status)
            }) 
        },
        favor() {
            if(this.isFavor == true){
                // 取消收藏
                this.isFavor = false
                axios({
                  method: 'get',
                  url: '/cancelFavor',
                  params: {
                    videoId: this.videoId,
                    userId: this.userId
                  }
                }).then(res => {
                    res = res.data
                    console.log('是否取消收藏成功？: ' + res.status)
                })
            }else{
                // 收藏
                this.isFavor = true;
                axios({
                  method: 'get',
                  url: '/favor',
                  params: {
                    videoId: this.videoId,
                    userId: this.userId
                  }
                }).then(res => {
                    res = res.data
                    console.log('是否收藏成功？: ' + res.status)
                })
            }
        },
        praise() {
            if(this.isPraise == true){
                // 取消点赞
                this.isPraise = false
                axios({
                  method: 'get',
                  url: '/cancelPraise',
                  params: {
                    videoId: this.videoId,
                    userId: this.userId
                  }
                }).then(res => {
                    res = res.data
                    if(res.status == '1'){
                        this.praiseNum -- 
                        this.$store.commit('subPraiseNum')
                    }
                    console.log('是否取消点赞成功？: ' + res.status)
                })
            }else{
                // 点赞
                this.isPraise = true;
                axios({
                  method: 'get',
                  url: '/praise',
                  params: {
                    videoId: this.videoId,
                    userId: this.userId
                  }
                }).then(res => {
                    res = res.data
                    if(res.status == '1'){
                        this.praiseNum ++
                        this.$store.commit('addPraiseNum')
                    }
                    console.log('是否点赞成功？: ' + res.status)
                })
            }
        }
    }

}
</script>
               
<style scoped>
/* @import '~assets/css/playVideo.css'; */
video{
    width: 500px;
    height: 300px;
}
.opt-div{
    width: 500px;
    border-bottom: 1px solid #707070;
}
.view-num{
    float: right;
    color: #d4237a;
    font-weight: bold
}
.favor , .good{
    margin-right: 10px;
}
.favor{
    width: 35px;
}
.good{
    width: 30px;
}
.dis-div{
    margin-top: 10px;
    width: 500px;
}
.sub-dis-btn{
    background-color: #d4237a;
    border: 1px solid #d4237a;
    margin-top: 9px;
    font-weight: 700;
}
.dis-item{
    margin-top: 8px;
}
.dis-photo{
    width: 35px;
    height: 35px;
    border-radius: 35px;
}
.dis-text{
    position: absolute;
    line-height: 35px;
}
.dis-time{
    font-size: 10px;
    /* color: #409EFF; */
    color: #d4237a;
    font-weight: bold;
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