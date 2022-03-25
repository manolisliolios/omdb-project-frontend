import Vue from "vue"
import VueRouter from "vue-router";
import Home from "./views/Home";
import About from "./views/About";
import Movie from "./views/Movie";
import Login from "./views/Login";
import Account from "./views/Account";

Vue.use(VueRouter);

const routes = [
    {path: '/',name: 'home', component: Home},
    {path: '/movies/:movieId', name: 'movie', component: Movie},
    {path:'/about', name: 'about', component: About},
    {path: '/login', name: 'login', component: Login,
        meta:{ authPage: true }
    },
    {path: '/account', name: 'account', component: Account,
        meta: { requiresAuth: true }
    },

];

const router = new VueRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    mode: 'history',
    routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {

    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    if(to.meta.authPage && isLoggedIn){
        next({name: 'account'});
        return;
    }

    if(to.meta.requiresAuth && !isLoggedIn){
        next({name: 'login'});
        return;
    }

    next();
})

export default router;