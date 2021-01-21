import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: {
            role: '',
            username: '',
            userId: '',
            photoUrl: ''
        },
        curVideo: {
            videoId: '' , 
            videoUrl: '',
            viewNum: '',
            praiseNum: '',
            userId: ''
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getCurVideo(state) {
            return state.curVideo
        }
    },
    actions: {

    },
    mutations: {
        setUser(state , user) {
            state.user = user
        },
        removeUser(state) {
            state.user = null
        },
        setCurVideo(state , video) {
            state.curVideo = video
        },
        addVideoNum(state) {
            state.curVideo.viewNum ++ 
        },
        addPraiseNum(state) {
            state.curVideo.praiseNum ++
        },
        subPraiseNum(state) {
            state.curVideo.praiseNum --
        },
        updatePhotoUrl(state , photoUrl) {
            state.user.photoUrl = photoUrl
        }
    }
})

export default store