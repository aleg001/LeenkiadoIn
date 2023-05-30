import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../pages/Feed.vue'
import Signup from '../pages/Signup.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Home from '../pages/Home.vue'
import Friends from '../pages/Friends.vue'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/feed',
    name: 'feed-page',
    component: Feed,
  },
  {
    path: '/agregar-mara',
  },
  { path: '/friends', name: 'friends', component: Friends },
  { path: '/profile', name: 'profile', component: Profile },

  { path: '/home', name: 'home', component: Home },
  { path: '/signup', component: Signup },
  {
    path: '/login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
