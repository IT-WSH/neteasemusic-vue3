import { createRouter, createWebHistory } from 'vue-router'
const files = require.context('./modules', false, /\.js$/)
const allRouter = []
files.keys().forEach(file => {
  allRouter.push(...files(file).default)
})
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Index.vue'),
    meta: {
      title: '首页',
      requireAuth: false,
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: '/hot',
        name: 'Hot',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/hot/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/mine/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes, ...allRouter]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  const isLogin = true
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (isLogin) {
      // 判断是否已经登录
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
