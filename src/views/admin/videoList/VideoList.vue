<template>
  <div id="video-list">
      <!-- 查询 -->
      <div class="check-div">
        <el-input class="check-input" type="primary" v-model="videoName" placeholder="请输入视频名字...."></el-input>
        <el-select class="check-select" v-model="cateName" placeholder="选择类别">
          <el-option v-for="item in categorys" :key="item.id" :label="item.name" 
                                         :value="item.name"></el-option>
        </el-select>
        <el-button  class="check-btn" type="primary" @click="checkVideos(1)">查询</el-button>
      </div>
      <!-- 展示 -->
      <div class="show-div">
        <el-table :data="videos" style="width: 100%">
          <el-table-column  prop="title"  label="标题"  width="100"></el-table-column>
          <el-table-column  prop="categoryName"  label="类别"  width="100"></el-table-column>
          <el-table-column  prop="userName" label="用户名" width="100"></el-table-column>
          <el-table-column  prop="viewNum" label="播放量" width="100"></el-table-column>
          <el-table-column  prop="subTime" label="发布时间" width="200"></el-table-column>
          <el-table-column  prop="praiseNum" label="点赞数" width="100"></el-table-column>
          <el-table-column  prop="status" label="状态" width="100"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page-div">
          <el-pagination background layout="prev, pager, next" 
                         :current-page="page.cur" :page-size="page.sze" :page-count="page.count"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         @prev-click="handlePreClick"
                         @next-click="handleClick">
         </el-pagination>
        </div>
      </div>
  </div>       
</template>    

<script>
import axios from 'axios'

  export default {
    name: "VideoList",  
    data() {    
        return {
            videoName: '',
            cateName: '',
            categorys: [],
            page: {
              cur: 1,
              Size: 6,
              count: 1
            },
            videos: []
        }       
    },
    created() {
      // 初始化页面
      this.checkVideos(this.page.cur)
      this.getAllCategorys()
    },
    methods: {
      // 获取所有类别
      getAllCategorys() {
        axios({
          method: 'get',
          url: '/showAllCateName'
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.categorys = res.categorys
            // this.categorys.unshift({id:0 , name: '--无--'})
            this.categorys.splice(1 , 0 , {id:0 , name: '无'})
            // this.categorys.push({id:1111 , name: '--无--'})
            console.log('categorys: ' + this.categorys)
          }
        })
      },
      // handleCheck() {
      //   this.checkVideos(1)
      // },
      // 条件查询---分发处
      checkVideos(curPage) {
        // 去除空白
        let videoName = this.videoName.trim()
        if(this.cateName == '无'){
          this.cateName = ''
        }
        
        console.log('cateName: ' + this.cateName)
        // 查询所有
        if(videoName == '' && this.cateName == ''){
          this.checkAll(curPage)
        }
        // 按视频名查询
        if(videoName != '' && this.cateName == ''){
          this.checkByVName(curPage)
        }
        // 按类别名查询
        if(videoName == '' && this.cateName != ''){
          this.checkByCName(curPage)
        }
        // 按视频和类别名查询
        if(videoName != '' && this.cateName != ''){
          this.checkByVCName(curPage)
        }
      },
      // 1、查询所有
      checkAll(curPage){
        console.log('查询所有---curPage ' + curPage)
        axios({
          method: 'get',
          url: '/checkAllVideos',
          params: {
            page: curPage
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.videos = res.videos
            this.page.count = res.pageCount
            console.log(this.videos)
          }else{
            this.videos = []
          }
        })
      },
      // 2、按视频名查询
      checkByVName(curPage){
        console.log('按视频名查询---curPage ' + curPage)
        axios({
          method: 'get',
          url: '/checkVideosByVideoName',
          params: {
            videoName: this.videoName,
            page: curPage
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.videos = res.videos
            this.page.count = res.pageCount
            console.log(this.videos)
          }else{
            this.videos = []
          }
        })
      },
      // 3、按类别名查询
      checkByCName(curPage){
        console.log('按视频名查询---curPage ' + curPage)
        axios({
          method: 'get',
          url: '/checkVideosByCateName',
          params: {
            cateName: this.cateName,
            page: curPage
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.videos = res.videos
            this.page.count = res.pageCount
            console.log(this.videos)
          }else{
            this.videos = []
          }
        })
      },
      // 4、按视频和类别名查询
      checkByVCName(curPage){
        console.log('按视频和类别名查询---curPage ' + curPage)
        axios({
          method: 'get',
          url: '/checkVideosByVCName',
          params: {
            videoName: this.videoName,
            cateName: this.cateName,
            page: curPage
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.videos = res.videos
            this.page.count = res.pageCount
            console.log(this.videos)
          }else{
            this.videos = []
          }
        })
      },

      // -------------------------- 下面为分页绑定的事件
      handleSizeChange(size) {

      },
      handleCurrentChange(current) {
        this.page.cur = current
        console.log(current)
        this.checkVideos(current)
      },
      handlePreClick() {
        console.log(this.page.cur)
      },
      handleClick() {
        console.log(this.page.cur)
      }
    },
}

</script>
               
<style scoped>
.page-div{
  margin-top: 10px;
}
.check-div{
  width: 500px;
  margin-bottom: 10px;

}
.check-input{
  width: 150px;
  
}
.check-select{
  width: 110px;
  margin-left: 15px;
}
.check-btn{
  margin-left: 25px;
  background-color: #d4237a;
  border: #d4237a;
}
.show-div{
  width: 800px;
}
</style>