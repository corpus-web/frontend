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
            meta: {
                title: "主页",
            }
        },
        {
            path: '/Course',
            component: Course,
            meta: {
                title: "课程建设",
            }
        },
        {
            path: '/Academic',
            component: Academic,
            meta: {
                title: "学术交流",
            }


        },
        {
            path: '/text',
            component: Text,
            meta: {
                title: "会议内容",
            }
        },
        {
            path: '/Group',
            component: Group,
            meta: {
                title: "团队风采",
            }
        },
        {
            path: '/Language',
            component: Language,
            meta: {
                title: "语料库",
            }
        },
        {
            path: '/detail',
            component: Detail,
            meta: {
                title: "更多内容",
            }
        },
        {
            path: '/news',
            component: News,
            meta: {
                title: "新闻",
            }
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
            component: Login,
            meta: {
                title: "登录",
            }
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
