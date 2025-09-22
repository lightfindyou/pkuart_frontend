import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/about/about.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('../views/gallery/gallery.vue')
  },
  {
    path: '/rankingList',
    name: 'rankingList',
    component: () => import('../views/rankingList/rankingList.vue')
  },
  {
    path: '/reviewTeam',
    name: 'reviewTeam',
    component: () => import('../views/reviewTeam/reviewTeam.vue')
  },
  { 
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../views/gallery/evaluate.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/user.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: () => import('../views/login/userLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/login/forget.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
