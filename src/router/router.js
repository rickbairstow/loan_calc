import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
    },
    {
        path: '/calculator',
        name: 'Calculator',
        component: () => import('../pages/Calculator.vue'),
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../pages/History.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;