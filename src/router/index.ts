import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Callback from '../pages/Callback.vue';
import TopItems from '../pages/TopItems.vue';
import SharePage from '../pages/SharePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/callback',
            component: Callback,
        },
        {
            path: '/top-items',
            component: TopItems,
        },
        {
            path: '/share',
            component: SharePage,
        },
    ],
});

export default router;
