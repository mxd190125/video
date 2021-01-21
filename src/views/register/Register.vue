<template>
  <div class="register">
      <div class="back-img">
          <img src="~assets/img/main/back-img.png" width="100%" height="100%" alt="">
      </div>
      <el-form class="register-container">
      <h1 class="title" style="color:#d4237a;">注册页面</h1>
      <el-form-item>
        <el-input type="text" v-model="username" placeholder="请输入用户名..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="password" placeholder="请输入密码..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="surepassword" placeholder="确认密码..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="email" v-model="email" placeholder="请输入邮箱..."></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;background-color:#d4237a;border: 1px solid #d4237a;"
         @click="toSubmit()">注册</el-button>
      </el-form-item>
      <el-row style="text-align:center;margin-top: -10px;">
        <router-link to="/login"><el-link type="primary" style="color:#d4237a;">去登录</el-link></router-link>
      </el-row>
    </el-form>
  </div>       
</template>    

<script>
import axios from 'axios'

  export default {
    name: "Register", 
    data() {
        return {
            username: '',
            password: '',
            surepassword: '',
            email: ''
        }
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
      openWarn(str){
        this.$message({
          message: str,
          type: 'warning'
        })
      },
      toSubmit() {
        if(this.username.trim() == ''){
          this.openFail('账号不能为空！')
          return
        }
        if(this.password.trim() == ''){
          this.openFail('密码不能为空！')
          return
        }
        if(this.surepassword.trim() == ''){
          this.openFail('请重复输入密码！')
          return
        }
        if(this.password != this.surepassword){
          this.openFail('两次密码不一致！')
          return
        }
        if(this.email.trim() == ''){
          this.openFail('邮箱不能为空！')
          return
        }
        if(this.email.indexOf('@') == -1){
          this.openFail('邮箱格式无效！')
          return
        }
        axios({
          method: 'post',
          url: '/register',
          data: 'username=' + this.username + '&password=' + this.password + '&email=' + this.email
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.openSucess('注册成功！请登录')
            this.$router.push('/login')
          }else if(res.status == '2'){
            this.openWarn('该账号已存在请换一个账号注册！')
          }else{
            this.openFail('注册失败！')
          }
        })
      }
    }
   
}

</script>
               
<style scoped>
.register{
  text-align: center;
}
.register-container{
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