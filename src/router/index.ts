import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductOverview from '../pages/ProductOverview.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'ProductOverview',
		component: ProductOverview,
	},
	{
		path: '/product/:id',
		name: 'ProductDetails',
		component: () =>
			import(/* webpackChunkName: "about" */ '../pages/ProductDetails.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
