<template>
  <div id="profile">
    <div>
      <div class="mod-photo">
        <div class="sub-photo-div">
        <!-- <span class="sub-photo-span"></span> -->
        <el-tag class="label-bnt" type="danger">上传头像</el-tag>
        <el-upload
        class="upload-demo sub-photo"
        action="http://121.196.145.152:8080/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList"
        list-type="picture">
        <el-button size="small" type="primary" class="sub-button">点我上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
        </el-upload>
        </div>
        <div class="mod-pass">
          <el-tag class="label-bnt" type="danger">修改密码</el-tag>
          <el-input class="mod-input" v-model="newPass" placeholder="请输入新密码..."></el-input>
          <el-button size="small" type="primary" class="sub-button" @click="modPass">修改</el-button>
        </div>
      </div>
    </div>
  </div>       
</template>    

<script>
import axios from 'axios';
  export default {
    name: "UserProfile",  
    data() {    
        return {
            userId: '',
            username: '',
            fileList: [],
            photourl: '',
            newPass: ''
        }       
    },
    created() {
      this.username = this.$store.getters.getUser.username
      this.userId = this.$store.getters.getUser.userId
      if(this.username.trim() == ''){
          this.openFail('未登录！')
      }
    },
    methods: {
      modPass() {
        if(this.newPass.trim() == ''){
          this.openFail('密码不能为空！')
          return
        }
        if(this.username.trim() == ''){
          this.openFail('未登录！')
          return
        }
        axios({
            method: 'get',
            url: '/modPass',
            params: {
              username: this.username,
              newPass: this.newPass
            }
        }).then(res => {
            res = res.data
            if(res.status == '1') {
              this.openSucess('密码修改成功！')
              this.newPass = ''
            }else {
              this.openFail('密码修改失败！')
            }
        })
      },
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
        console.log("response.status: " + response.status)
        let newPhotoUrl = response.url
        console.log(this.photourl)
        if(newPhotoUrl != null) {
          axios({
            method: 'get',
            url: '/updatePhotoUrl',
            params: {
              photoUrl: newPhotoUrl,
              userId: this.userId
            }
          }).then(res => {
            res = res.data
            if(res.status == '1') {
              this.photourl = newPhotoUrl
              this.$store.commit('updatePhotoUrl' , newPhotoUrl)
              this.openSucess('头像修改成功！')
            }else {
              this.openFail('头像修改失败！')
            }
          })
        }
        
      }
    },
}

</script>
               
<style scoped>
/* @import '~assets/css/userProfile.css'; */
.sub-photo-div {
    margin-top: 10px;
  }
  .sub-photo-span{
    color: #d4237a;
  }
  .sub-photo{
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
  .mod-pass{
    width: 200px;
    margin-top: 10px;
  }
  .mod-input{
    margin-top: 10px;
  }
  .el-upload__tip{
  color: white;
  }

</style>