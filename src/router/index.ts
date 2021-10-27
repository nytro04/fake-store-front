import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ProductOverview from '../pages/ProductOverview.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'ProductOverview',
		component: ProductOverview,
	},
	{
		path: '/products/:id',
		name: 'ProductDetails',
		props: (route) => {
			id: route.params.id
		},
		component: ProductDetails,
	},
	// 	component: () =>
	// 		import(/* webpackChunkName: "details" */ '../pages/ProductDetails.vue'),
	// },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
