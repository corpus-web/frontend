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
    mode: "history",
    routes: [
        { path: '/', redirect: '/Main' },
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
            meta: {
                title: "语料库主页",
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../view/HomeView.vue')
        },
        {
            path: '/Search',
            name: 'Search',
            meta: {
                needValid: true, //需要登录
                title: "语料库搜索界面",
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../view/MySearch.vue')
        },
        // {
        //     path: '/Frequency',
        //     name: 'Frequency',
        //     meta: {
        //         title: "Frequency",
        //     },
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ '../view/MyFrequency.vue')
        // },
        // {
        //     path: '/Context',
        //     name: 'Context',
        //     meta: {
        //         title: "Context",
        //     },
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ '@/view/MyContext.vue')
        // },
    ]
})

router.beforeEach((to, from, next) => {

    if (to.meta.needLogin) { // 判断该路由是否需要登录权限
        let token = localStorage.getItem('token')
        if (token) { // 判断是否已经登录
            next()
        }
        else {
            next({ path: '/Login' }) //跳转到登录页
        }
    }
    if (to.meta.needValid) {
        let ticket = localStorage.getItem('ticket')
        if (!ticket) {
            ticket = to.query.ticket
        }
        // ticket = to.query.ticket
        if (ticket) {
            console.log(ticket)
            window.localStorage.setItem("ticket", ticket);
            // console.log("spokxpsokpoakxpaoksxpaoksoapsopa");
            next()
        }
        else {
            // console.log("jjkjjkol");
            window.location.href = 'https://cas.hrbeu.edu.cn/cas/login?service=http://corpus.hrbeu.edu.cn/Search'
            // next({ path: 'https://cas.hrbeu.edu.cn/cas/login?service=http://corpus.hrbeu.edu.cn/Search' }) 
            //跳转网页
            //https://cas.hrbeu.edu.cn/cas/login?service=http://corpus.hrbeu.edu.cn/#/Search

            //认证成功后跳转回http://corpus.hrbeu.edu.cn/#/Search?ticket=xxxx
            //在MySearch那边保存ticket(不写在这)

            //MySearch页面向后端发送ticket能请求到用户名(不写在这)
            //后端api地址 http://corpus.hrbeu.edu.cn/api/user/cas
            //请求方式：post
            //请求参数：ticket: "xxx"
        }
    }
    else {
        next()
    }
})
// 全局后置钩子
router.afterEach(to => {
    // 设置title
    document.title = to.meta.title;
})
export default router
