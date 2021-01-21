<template>
  <div class="login">
    <div class="back-img">
          <img src="~assets/img/main/back-img.png" width="100%" height="100%" alt="">
    </div>
    <el-form class="login-container">
      <h1 class="title" style="color:#d4237a;">登录页面</h1>
      <el-form-item>
        <el-input type="text" v-model="username" placeholder="请输入用户名..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="请输入密码..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;background-color:#d4237a;border: 1px solid #d4237a;" 
        @click="toSubmit()">登录</el-button>
      </el-form-item>
      <el-row style="text-align:center;margin-top: -10px;">
        <el-link type="primary"  style="color:#d4237a;">忘记密码|</el-link>
        <router-link to="/register"><el-link type="primary" class="_color" style="color:#d4237a;">用户注册</el-link></router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    
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
    toRegister() {
      this.$router.push('/register')
    },
    toSubmit() {
      console.log(this.username)
      console.log(this.password)
      if(this.username.trim() == ''){
        this.openFail('账号不能为空！')
        return
      }
      if(this.password.trim() == ''){
        this.openFail('密码不能为空！')
        return
      }
      axios({
          method: 'post',
          url: '/login',
          data: 'username=' + this.username + '&password=' + this.password
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            console.log(res)
            let user ={
              username: this.username , 
              role: res.role , 
              userId: res.userId,
              photoUrl: res.photoUrl
            }
            this.$store.commit('setUser' , user)
            this.openSucess('登陆成功！')
            if(res.role == 'USER'){
              this.$router.replace('/sheet/main')
            }else{
              this.$router.replace('/admin/videoCategory')
            }
          }else{
            this.openFail('密码错误！')
          }  
        })
      
    }
  }
}
</script>

<style>
.login{
  text-align: center;
}
.login-container{
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;  
  margin-top: -200px;
  margin-left: -200px;
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
