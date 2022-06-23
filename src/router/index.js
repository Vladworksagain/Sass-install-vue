import VueRouter from "vue-router";

import Home from '../pages/Home'

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
    ],
    mode: 'history'
})