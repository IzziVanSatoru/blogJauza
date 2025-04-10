import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../services/firebase'  // Pastikan Firebase auth terimport
import Home from '../pages/Home.vue'
import CreatePostPage from '../pages/CreatePostPage.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import PostDetail from '../pages/PostDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreatePostPage',
    component: CreatePostPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to protect routes that need authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!auth.currentUser  // Cek apakah ada user yang login di Firebase

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')  // Kalau belum login, redirect ke login
  } else {
    next()  // Kalau sudah login, lanjutkan ke rute tujuan
  }
})

export default router
