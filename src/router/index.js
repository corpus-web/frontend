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
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
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
