import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import management from './components/management.js'
import test from './components/test.js'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	      {
	    path: '/login',
	    name: 'login',
		eta:{requireAuth:true},
	    // route level code-splitting
	    // this generates a separate chunk (about.[hash].js) for this route
	    // which is lazy-loaded when the route is visited.
	    component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
	  },
    {
      path: '/',
      name: 'home',
	  meta:{requireAuth:true},
      component: Home,
			children: [
				...management,
				...test
			]
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
       
	if (to.meta.requireAuth) { //是否需要跳转 
			if (sessionStorage.getItem("uid")) { //判断是否登录
				next();
			} else {
				next({name: "login",query: {redirect:to.name }})
			}
	} else { //不需要跳转，直接往下走
		next();
	}
});

export default router;

