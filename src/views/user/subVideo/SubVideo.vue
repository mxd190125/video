<template>
  <div id="sub-video">
      <div>
        <el-input v-model="title" placeholder="请输入标题..." class="title-input"></el-input>
      </div>

      <div>
        <el-select v-model="value" placeholder="请选择视频类别">
          <el-option v-for="item in categorys" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="sub-face-div">
        <span class="sub-face-span">请上传视频封面</span>
        <el-upload
        class="upload-demo sub-face"
        action="http://121.196.145.152:8080/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary" class="sub-button">上传封面</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过50MB</div>
        </el-upload>
      </div>
      <div class="sub-video-div">
        <div class="sub-face-span">请选择视频</div>
        <input type="file" name="file" id="upload-video" @change="changeFile(this)">
      </div>
      <el-button type="primary" class="sub-button" @click="subVideo">发布</el-button>
  </div>       
</template>    

<script>
import axios from 'axios'

  export default {
    name: "SubVideo",  
    data() {    
        return {
          title: '',
          categorys: [],
          value: '',
          fileList: [],
          imgUrl: '',
          videoUrl: ''
        }       
    },
    created() {
      axios({
        method: 'get',
        url: '/getCategorys'
      }).then(res => {
        res = res.data
        if(res.status == '1'){
          this.categorys = res.categorys
          console.log(this.categorys)
        }
      })
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        this.imgUrl = response.url
        console.log(this.imgUrl)
      },
      changeFile(video) {
        let file = document.getElementById('upload-video').files[0]
        if(file != undefined){
          let format = new FormData()
          format.append('file' , file)
          axios({
            method: 'post',
            url: '/upload',
            data: format
          }).then(res => {
            res = res.data
            if(res.status == '1'){
              this.videoUrl = res.url
              console.log(this.videoUrl)
            }else{
              this.openFail('视频上传失败！')
            }
          })
        }
      },
      subVideo() {
        if(this.title.trim() == ''){
          this.openFail('标题不能为空！')
          return
        }
        if((this.value+'').trim() == ''){
          this.openFail('请选择视频类别！')
          return
        }
        if(this.imgUrl.trim() == ''){
          this.openFail('请先上传视频封面！')
          return
        }
        if(this.videoUrl.trim() == ''){
          this.openFail('请先上传视频！')
          return
        }
        let userId = this.$store.getters.getUser.userId
        const json = {
            userId: userId,
            title: this.title,
            categoryId: this.value,
            faceUrl: this.imgUrl,
            videoUrl: this.videoUrl
        }
        console.log(json)
        axios({
          method: 'post',
          url: '/subVideo',
          data: json,
          header:{
             'Content-Type':'application/json'  
          }
        }).then(res => {
          res = res.data
          console.log('发布视频结果：' + res.status)
          if(res.status == '1') {
            this.openSucess('发布成功！')
            this.$router.push('/user/myVideo')
          }
        })
      }
    }
}

</script>
               
<style scoped>
.title-input{
  width: 300px;
  margin-bottom: 10px;
}
.sub-face-div , .sub-video-div{
  margin-top: 10px;
}
.sub-face-span{
  color: #d4237a;
}
.sub-face{
  width: 300px;
}
.sub-button{
  margin-top: 10px;
  background-color: #d4237a;
  border-color: #d4237a;
}
#upload-video{
  margin-top: 10px;
}


</style>