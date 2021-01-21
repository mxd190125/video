<template>
  <div id="user">
      <div class="show-div">
        <el-table :data="userList" style="width: 100%">
          <el-table-column  prop="username"  label="用户名"  width="100"></el-table-column>
          <el-table-column  prop="password"  label="密码"  width="100"></el-table-column>
          <el-table-column  prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column  prop="regTime" label="注册时间" width="200"></el-table-column>
          <el-table-column  prop="videoNum" label="播放量" width="100"></el-table-column>
          <el-table-column  prop="status" label="状态" width="70"></el-table-column>
          <el-table-column  label="操作" width="200"> 
            <template slot-scope="scope">
              <el-button @click="handleDelUser(scope.row)" type="danger" size="small" plain>删除</el-button>
              <el-button @click="handleModPass(scope.row)" type="primary" size="small" plain>修改密码</el-button>

            </template>
          </el-table-column>
        </el-table>
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
    name: "UserList",  
    data() {    
        return {
          page: {
            cur: 1,
            Size: 6,
            count: 20
          },
          userList: []
      }
    },
    created() {
      // 初始化第一页
      console.log('初始化第一页')
      this.showUsersByPage(1)
      console.log('初始化结束')
    },
    methods: {
      showUsersByPage(curPage){
        console.log('进入初始化---curPage ' + curPage)
        axios({
          method: 'get',
          url: '/showUsersByPage',
          params: {
            page: curPage
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.userList = res.userList
            this.page.count = res.pageCount
            console.log(this.userList)
          }
        })
      },
      openSucess(Str) {
        this.$message({
          message: str,
          type: 'success'
        })
      },
      openFail(str) {
        this.$message.error(str);
      },
      openCancle(str) {
        this.$message({
            type: 'info',
            message: str
          }); 
      },
      handleDelUser(row) {
        let username = row.username
        console.log('username: '+ row.username)
        this.$confirm('是否继续删除用户：'+username+' ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确认删除
          this.delUser(username)
        }).catch(() => {
          this.openCancle('已取消删除')
        })
      },
      delUser(username){
        axios({
          method: 'get',
          url: '/delUser',
          params: {
            username: username,
            page: this.page.cur
          }
        }).then(res => {
          res = res.data
          // 删除成功，更新当前页面
          if(res.status == '1'){
            this.userList = res.userList
            this.page.count = res.pageCount
            this.openSucess('成功删除！')
            console.log(this.userList)
          }else{
            this.openFail('删除失败！')
          }
        })
      },
      handleModPass(row) {
        let that = this
        let username = row.username
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '密码不能为空！'
        }).then(({ value }) => {
           console.log('新密码：' + value)
           axios({
             method: 'get',
             url: '/modPass',
             params: {
               username: username,
               newPass: value
             }
           }).then(res => {
              res = res.data 
              // 修改成功
              if(res.status == '1'){
                // 提示
                this.$message({
                type: 'success',
                message: '密码修改成功！密码为： ' + value
                });
                // 刷新页面
                this.showUsersByPage(this.page.cur)
              }else{
                // 修改失败
                this.$message.error('密码修改失败！')
              }
           })
        }).catch(() => {
          // 取消修改
          this.$message({
            type: 'info',
            message: '已取消修改！'
          });       
        });
      },
      
      // 下面为分页绑定的事件
      handleSizeChange(size) {

      },
      handleCurrentChange(current) {
        this.page.cur = current
        console.log(current)
        this.showUsersByPage(current)
      },
      handlePreClick() {
        console.log(this.page.cur)
      },
      handleClick() {
        console.log(this.page.cur)
      }
      
    }
}

</script>
               
<style scoped>
.page-div{
  margin-top: 10px;
}
.del-btn{
  color: #d4237a;
}
.show-div{
  width: 1000px;
}
</style>
