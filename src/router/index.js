import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/view/MyMain.vue'
import Course from '@/view/MyCourse.vue'
import Academic from '@/view/MyAcademic.vue'
import Group from '@/view/MyGroup.vue'
import Language from '@/view/MyLanguage.vue'
import Text from '@/view/MyText.vue'
import Detail from '@/view/MainDetail'
import News from '@/view/MyNews'
import Manage from '@/view/MyManage'
import Login from '@/view/MyLogin'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes: [
        { path: '*', redirect: '/Main' },
        {
            path: '/Main',
            component: Main,
        },
        {
            path: '/Course',
            component: Course,
        },
        {
            path: '/Academic',
            component: Academic,



        },
        {
            path: '/text',
            component: Text,
        },
        {
            path: '/Group',
            component: Group,
        },
        {
            path: '/Language',
            component: Language,
        },
        {
            path: '/detail',
            component: Detail,
        },
        {
            path: '/news',
            component: News
        },
        {
            path: '/manage',
            component: Manage,
            meta: {
                needLogin: true, //需要登录
                title: "后台管理",
            }
        },
        {
            path: '/login',
            component: Login
        },
        {

            path: '/home',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../view/HomeView.vue')
        },
        {
            path: '/Search',
            name: 'Search',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../view/MySearch.vue')
        },
        {
            path: '/Frequency',
            name: 'Frequency',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../view/MyFrequency.vue')
        },
        {
            path: '/Context',
            name: 'Context',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/view/MyContext.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.meta.needLogin) { // 判断该路由是否需要登录权限
        if (token) { // 判断是否已经登录
            next()
        }
        else {
            next({ path: '/Login' }) //跳转到登录页
        }
    } else {
        next()
    }
})
// 全局后置钩子
router.afterEach(to => {
    // 设置title
    document.title = to.meta.title;
})
export default router
