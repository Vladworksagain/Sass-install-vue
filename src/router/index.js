import VueRouter from "vue-router";

import Home from '../pages/Home'
import MetamaskTest from "../pages/MetamaskTest";

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/metamask',
            name: 'metamask',
            component: MetamaskTest
        }
    ],
    mode: 'history'
})