import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@Layout/Default.vue';

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@Pages/Home.vue'),
            },
            {
                path: '/calculator/:id?',
                name: 'Calculator',
                component: () => import('@Pages/Calculator.vue'),
            },
            {
                path: '/history',
                name: 'History',
                component: () => import('@Pages/History.vue'),
            },
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;