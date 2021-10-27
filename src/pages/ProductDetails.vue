<template>
	<div class="max-w-2xl mx-auto mt-6 bg-white sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="pt-20">
			<div class="mb-5">
			<router-link class="text-blue-500" to="/">Home</router-link>
			</div>
			<h2 class="mb-20 text-2xl font-extrabold tracking-tight text-gray-900">
				Products Details
			</h2>
			<div class="lg:grid lg:grid-cols-2 lg:gap-x-16">
				<div>
					<img :src="product.image" :alt="product.title" class="w-2/3" />
				</div>
				<div class="space-y-10">
					<h3 class="text-xl font-bold text-gray-900">
						{{ product.title }}
					</h3>
					<div class="flex items-center justify-between">
						<div class="">
							<h3 class="mb-4 font-medium text-gray-900">Price</h3>

							<h3 class="mb-4 text-3xl font-bold text-yellow-500">
								{{ product.price }}
							</h3>
						</div>
					</div>
					<div>
						<h3 class="mb-4 font-medium text-gray-900">Description</h3>
						<p class="text-base text-gray-600">
							{{ product.description }}
						</p>
					</div>

					<div class="flex items-center justify-between">
						<div class="">
							<h3 class="mb-4 font-medium text-gray-900">Category</h3>
							<p class="text-base text-gray-600">
								{{ product.category }}
							</p>
						</div>

						<div class="flex items-center justify-between">

						<star-rating
							:star-size="20"
							:read-only="true"
							v-model:rating="product.rating.rate"
						></star-rating>

						<p class="ml-10 text-base text-purple-500">
							{{ product.rating.count }} Reviews
						</p>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import StarRating from 'vue-star-rating'
	import { defineComponent, reactive, ref, toRefs } from 'vue'
	import { useRoute } from 'vue-router'
	import { getProduct } from '../apis/product'
	import { ProductType } from '../types/ProductTypes'

	export default defineComponent({
		name: 'ProductDetails',
		props: {
			productId: {
				type: Number,
				default: 0,
			},
		},
		components: {
			StarRating,
		},
		setup(props) {
			const isLoading = ref(false)

			const route = useRoute()

			let data = reactive<{ product: ProductType }>({
				product: {
					id: 0,
					title: '',
					price: 0,
					description: '',
					category: '',
					image: '',
					rating: {
						rate: 0,
						count: 0,
					},
				},
			})

			const productBlock = async (): Promise<void> => {
				isLoading.value = true

				const productId = route.params.id

				data.product = await getProduct(productId)
			}

			productBlock()
			return { isLoading, productBlock, ...toRefs(data) }
		},
	})
</script>

<style scoped></style>
