import { createRouter, createWebHistory } from 'vue-router'
import login from "../views/Login.vue"
import test from "../views/test.vue"



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: '注册',
      hidden: true,
      component: () => import('../views/register.vue')
    },
    {
      path: '/home',
      name: '新闻管理',
      iconClass: 'location',
      redirect: '/home/newsList',
      component: () => import('../components/adminHome.vue'),
      children: [
        {
          path: '/home/newsRelease',
          name: '发布新闻',
          iconClass: 'Plus',
          component: () => import('../components/news/newsRelease.vue'),
        },
        {
          path: '/home/newsList',
          name: '新闻列表',
          iconClass: 'Memo',
          component: () => import('../components/news/newsList.vue'),
        }
      ]
    },
    {
      path: '/users',
      name: '个人中心',
      iconClass: 'UserFilled',
      redirect: '/users/user',
      component: () => import('../components/adminHome.vue'),
      children: [
        {
          path: '/home/userInfo',
          name: '个人信息',
          iconClass: 'fa fa-list',
          component: () => import('../components/users/userInfo.vue'),
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      hidden: true,
      component: () => import('../views/admin/index.vue')
    },
    {
      path: '/test',
      name: '测试',
      hidden: true,
      component: () => import('../views/test.vue')
    },
    {
      path: '/user',
      name: 'user',
      hidden: true,
      component: () => import('../components/userHome.vue')
    },
  ]
})

export default router;
