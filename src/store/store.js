import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        sigId: null,
        invitationSigId: null,
        isInvitationTokenValid: false,
        sigName: '',

    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
        setSigId (state, payload) {
            state.sigId = payload
          },
          setInvitationSigId (state, payload) {
            state.invitationSigId = payload
          },
          setSigName (state, payload) {
            state.sigName = payload
          },
         
          setIsInvitationTokenValid (state, payload) {
            state.isInvitationTokenValid = payload
          }

    },
    actions: {
        signUserIn({ commit }, payload) {
            return axios.post(`${'http://localhost:8000'}/login`, {
                username: payload.username,
                password: payload.password
            }).then(res => {
                localStorage.setItem("username", res.data.username);
                const newUser = {
                    userId: res.data.id,
                    username: res.data.username,
                }
                commit('setUser', newUser)
                
            })
        },
        setSigAll({commit}) {
            return new Promise((resolve, reject) => {
            axios.get(`${'http://localhost:8000'}/room/${this.getters.sigId}`).then(res => {
                commit('setSigId', this.getters.sigId)
                // commit('setSigName', this)
                resolve(res);
            }).catch((e)=>{
                console.log('errrrr: ', e)
                reject(e);
            })
        })
        },
        setSigName ({commit}, payload) {
            commit('setSigName', payload)
          },
        
        generateInvitationToken ({commit}, payload) {
            axios.post(`${'http://localhost:8000'}/room/${this.getters.sigId}/invitation-token/`, {
              room: this.getters.sigId,
              token: payload
            }).then(res => {
              console.log('invitation token created: ', res.data)
            }).catch((ex)=>{
              console.log(ex)
              commit('setIsInvitationTokenValid', false)
            })
            console.log(this.getters.sigId);
          },
          validateInvitationToken ({commit}, payload) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                axios({
                    method: 'GET',
                    url: `${'http://localhost:8000'}/room/n/${payload}`
                  }).then((response) => {
                    console.log('validate token: ', response.data)
                    if(response.data.room){
                        // commit('setIsInvitationTokenValid', true)
                        commit('setInvitationSigId', response.data.id)
                        // commit('setSigName', response.data.roomname)
                    }
                    else{
                      commit('setIsInvitationTokenValid', false)
                    }
                    resolve(response);
                  }).catch((ex) => {
                    console.log(ex)
                    reject(ex);
                  })
            })
        },
        acceptInvitation ({commit},payload) {
            // return new Promise((resolve, reject) => {
                console.log('xxx: ', payload)
                axios.post(`${'http://localhost:8000'}/room/${payload.sigId}/invite/`, {
                user: localStorage.getItem("username"),
                band: payload.sigId,
                is_band_leader: payload.isLeader
            }).then(res => {
                console.log('invitation succeed')
                console.log(res);
                // resolve(res)
                commit('setSigId',payload.sigId)
            }).catch((ex)=>{
                console.log(ex)
                // reject(ex)
            })
        // })

        },
        
        
        

    },
    getters: {
        user (state) {
            return state.user
          },
        sigId (state) {
            return state.sigId
          },
          invitationSigId (state) {
            return state.invitationSigId
          },
          sigName (state) {
            return state.sigName
          },
          isInvitationTokenValid (state) {
            return state.isInvitationTokenValid
          }
    }
})