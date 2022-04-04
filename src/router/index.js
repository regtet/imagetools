import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView,
        children: [{
                path: '/roles',
                name: 'roles',
                component: () =>
                    import ('../views/roles.vue')
            },
            {
                path: '/users',
                name: 'users',
                component: () =>
                    import ('../views/users.vue')
            },
            {
                path: '/rights',
                name: 'rights',
                component: () =>
                    import ('../views/rights.vue')
            },
            {
                path: '/goods',
                name: 'goods',
                component: () =>
                    import ('../views/goods.vue')
            },
            {
                path: '/params',
                name: 'params',
                component: () =>
                    import ('../views/params.vue')
            },
            {
                path: '/categories',
                name: 'categories',
                component: () =>
                    import ('../views/categories.vue')
            },
            {
                path: '/orders',
                name: 'orders',
                component: () =>
                    import ('../views/orders.vue')
            },
            {
                path: '/reports',
                name: 'reports',
                component: () =>
                    import ('../views/reports.vue')
            },
        ]
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem("token")) {
        next()
    } else {
        if (to.path == "/login") {
            next()
        } else {
            next("/login")
        }
    }



})
export default router