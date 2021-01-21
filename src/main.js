import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementUI from 'element-ui'
import { Message } from 'element-ui';
Vue.prototype.$message = Message;
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI);

// axios.defaults.baseURL='http://localhost:8080'
axios.defaults.baseURL='http://121.196.145.152:8080'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin)){  // 判断该路由是否需要登录权限
      let user = store.getters.getUser
      if (user != null) {  // 判断当前用户的登录信息user是否存在
        // 已登录，放行
        // console.log('role: ' + user.role)
        // console.log('to.path: ' + to.path)
        // 非角色权限之内
        if((user.role == 'USER' && to.path.indexOf('/admin/') != -1) || 
           (user.role == 'ADMIN' && to.path.indexOf('/user/') != -1)) {
            Vue.prototype.$message({
              type: "error",
              message: "权限不足！无法访问"
            });
          next({path: from.path})
        }else {
          // 角色权限之内
          next();
        }
        
      } else {
        Vue.prototype.$message({
          type: "error",
          message: "未登录！"
        });
        next({path: '/'})
      }
  }else {
    // 不需要检验，放行
    next();
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
