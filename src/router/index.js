import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import CreateRoom from '../components/CreateRoom.vue'
import Room from '../components/Room.vue'
import Invite from '../components/Invite.vue'
import AddRoom from '../components/Room/AddRoom.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
              name: 'Home',
              component: Home,
          },
          {
              path: '/login',
              name: 'Login',
              component: Login
          },
          {
            path: '/createroom',
            name: 'createroom',
            component: CreateRoom
          },
          {
            path: '/room/:id',
            name: 'Room',
            component: Room,
            props: true,

            children: [
                {
                    path: 'invite', component: Invite
                }
            ]
          },
          {
            path: '/room/:id/invite',
            name: 'Invite',
            component: Invite,
            props: true,
          },
          {
            path: '/n/:token',
            name: 'AddRoom',
            component: AddRoom,
            // beforeEnter: AuthGuard
          },
      
    ]
})