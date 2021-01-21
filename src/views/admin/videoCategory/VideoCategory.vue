<template>
  <div id="category">
      <div id="center">
        <div class="add-div">
          <el-input class="input-el" type="primary" v-model="categoryName" placeholder="请输入类别名"></el-input>
          <el-button class="sub-btn" type="primary" @click="addCategory">添加类别</el-button>
        </div>
        <div class="show-div">
          <el-tag class="label-bnt" 
                  v-for="item in categorys" 
                  :key="item.id" type="danger">
                  {{item.name}}
          </el-tag>
        </div>
      </div>
  </div>       
</template>    

<script>
import axios from 'axios'

  export default {
    name: "VideoCategory",  
    data() {    
        return {
            categoryName: '',
            categorys: []
        }       
    },
    created() {
      this.getAllCategorys()
    },
    methods: {
      getAllCategorys() {
        axios({
          method: 'get',
          url: '/showAllCateName'
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            this.categorys = res.categorys
            console.log('categorys: ' + this.categorys)
          }
        })
      },
      open1() {
        this.$message('类别名不能为空！')
      },
      open2() {
        this.$message({
          message: '该类别名已存在！',
          type: 'warning'
        })
      },
      open3() {
        this.$message({
          message: '添加成功！',
          type: 'success'
        })
        this.categoryName = ''
      },
      open4() {
        this.$message.error('添加失败！');
      },
      
      addCategory() {
        if(this.categoryName == '') {
          this.open1()
          return
        }
        // 是否存在
        axios({
          method: 'get',
          url: '/isExist',
          params: {
            name: this.categoryName
          }
        }).then(res => {
          res = res.data
          if(res.status == '1'){
            console.log(false)
            // 添加类名
            axios({
              method: 'get',
              url: '/addCateName',
              params: {
                name: this.categoryName
              }
            }).then(res => {
               res = res.data
               if(res.status == '1'){
                 // 添加成功
                 this.categorys.push({id: 0 , name:this.categoryName})
                  this.open3()
               }else{
                  this.open4()
               }
            })
          }else{
            // 存在
             this.open2()
             console.log(true)
          }
        })
        
      }
      
    }
}

</script>
               
<style scoped>
#center{
  position: absolute;
  width: 400px;
  left: 50%;
  top: 15%;
  margin-left: -111px;

}
.input-el{
  width: 200px;
}
.sub-btn{
  width: 100px;
  margin-left: 20px;
  background-color: #d4237a;
  border: 1px solid #d4237a;
  font-weight: 600;
}
.label-bnt{
  margin-right:5px ;
  margin-top: 5px;
}
.show-div{
  margin-top: 10px;
  width: 300px;
}
</style>