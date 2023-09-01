import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '/src/pages/HomePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/cards',
            name: 'cards',
            component: () => import('../pages/CardsPage.vue')
        },
        {
            path: '/scan_card',
            name: 'scan_card',
            component: () => import('../pages/ScanCardPage.vue')
        },
    ]
})

export default router
