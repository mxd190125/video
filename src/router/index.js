import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from 'views/register/Register'
import Login from 'views/login/Login'

import UserMain from 'views/user/main/UserMain'
import Collect from 'views/user/collect/Collect'
import DiscussVideo from 'views/user/discuss/DiscussVideo'
import DoGood from 'views/user/doGood/DoGood'
import History from 'views/user/history/History'
import MyVideo from 'views/user/myVideo/MyVideo'
import SubVideo from 'views/user/subVideo/SubVideo'
import UserProfile from 'views/user/profile/UserProfile'
import PlayVideo from 'views/user/myVideo/PlayVideo/PlayVideo'

import SheetMain from 'views/sheet/main/SheetMain'

import AdminMain from 'views/admin/main/AdminMain'
import VideoCategory from 'views/admin/videoCategory/VideoCategory'
import VideoList from 'views/admin/videoList/VideoList'
import UserList from 'views/admin/userList/UserList'
import UpdatePass from 'views/admin/updatePass/UpdatePass'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/register',
        component: Register
    },
    {
        path: '/user/main',
        component: UserMain,
        meta: {
            requireLogin:true
        },
        children: [
            {
                path: '/user/subVideo',
                component: SubVideo
            },
            {
                path: '/user/myVideo',
                component: MyVideo
            },
            {
                path: '/user/collect',
                component: Collect
            },
            {
                path: '/user/doGood',
                component: DoGood
            },
            {
                path: '/user/history',
                component: History
            },
            {
                path: '/user/discussVideo',
                component: DiscussVideo
            },
            {
                path: '/user/userProfile',
                component: UserProfile
            },
            {
                path: '/user/playVideo',
                name: 'userPlayVideo',
                component: PlayVideo
            }
        ]
    },
    {
        path: '/sheet/main',
        component: SheetMain
    },
    {
        path: '/sheet/playVideo',
        name: 'sheetPlayVideo',
        component: PlayVideo,
        meta: {
            requireLogin:true
        }
    },
    {
        path: '/admin/main',
        component: AdminMain,
        meta: {
            requireLogin:true
        },
        children: [
            {
                path: '/admin/videoCategory',
                component: VideoCategory
            },
            {
                path: '/admin/videoList',
                component: VideoList
            },
            {
                path: '/admin/userList',
                component: UserList
            },
            {
                path: '/admin/updatePass',
                component: UpdatePass
            }
        ]
    }
]
const router = new VueRouter({
    routes,
    mmode: 'history'
})
export default router