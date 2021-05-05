import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/profile'
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        name: 'profile',
        component: () => import('@/views/profile'),
        meta: { title: '个人中心', icon: 'table' }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'message',
        component: () => import('@/views/message'),
        meta: { title: '消息中心', icon: 'table' }
      },
      {
        path: 'detail',
        hidden: true,
        name: 'MessageDetail',
        component: () => import('@/views/message/detail'),
        meta: { title: '消息详情', icon: 'table' },
        props: {}
      }
    ]
  },
  {
    path: '/my-works',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'my-works',
        component: () => import('@/views/my-works'),
        meta: { title: '我的作品', icon: 'table' }
      }
    ]
  },

  {
    path: '/register',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'register',
        component: () => import('@/views/register'),
        meta: { title: '作品登记', icon: 'form' }
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'audit',
        component: () => import('@/views/audit'),
        meta: { title: '作品审核', icon: 'form' }
      }
    ]
  },
  {
    path: '/history',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'history',
        component: () => import('@/views/history'),
        meta: { title: '提交历史', icon: 'form' }
      }
    ]
  },

  {
    path: '/user-management',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user-management',
        component: () => import('@/views/user-management'),
        meta: { title: '用户管理', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
