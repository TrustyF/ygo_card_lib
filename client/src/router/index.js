import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/all_cards'
        },
        {
            path: '/all_cards',
            name: 'all_cards',
            component: () => import('../pages/AllCardsPage.vue')
        },
        {
            path: '/storage_cards',
            name: 'storage_cards',
            component: () => import('../pages/StoragePage.vue')
        },
        {
            path: '/scan_card',
            name: 'scan_card',
            component: () => import('../pages/ScanCardPage.vue')
        },
        {
            path: '/add_cards',
            name: 'add_cards',
            component: () => import('../pages/AddCardPage.vue')
        },
        {
            path: '/trade_cards',
            name: 'trade_cards',
            component: () => import('../pages/TradeCardsPage.vue')
        },
    ]
})

export default router
