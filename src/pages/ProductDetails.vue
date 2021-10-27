<template>
	<div class="bg-white">
		<div class="pt-6">
			<div
				class="max-w-2xl mx-auto mt-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8"
			>
				<div
					class="hidden overflow-hidden rounded-lg aspect-w-3 aspect-h-4 lg:block"
				>
					<img
						:src="product.image"
						:alt="product.title"
						class="object-cover object-center w-full h-full"
					/>
				</div>
				<div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
					<div class="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
						<div
							class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
						>
							<!-- Description and details -->
							<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
								<h1
									class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
								>
									{{ product.title }}
								</h1>
							</div>
							<div>
								<h3 class="sr-only">Description</h3>

								<div class="space-y-6">
									<p class="text-base text-gray-900">
										{{ product.description }}
									</p>
								</div>
							</div>

							<div class="mt-10">
								<h2 class="text-sm font-medium text-gray-900">Details</h2>

								<div class="mt-4 space-y-6">
									<p class="text-sm text-gray-600">{{ product.details }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class=" aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4"
				>
					<div class="mt-4 lg:mt-0 lg:row-span-3">
						<h2 class="sr-only">Product information</h2>
						<p class="text-3xl text-gray-900">{{ product.price }}</p>

						<!-- Reviews -->
						<div class="mt-6">
							<h3 class="sr-only">Reviews</h3>
							<div class="flex items-center">
								<div class="flex items-center">
									<!-- stars  -->
									<!-- <StarIcon
										v-for="rating in [0, 1, 2, 3, 4]"
										:key="rating"
										:class="[
											reviews.average > rating
												? 'text-gray-900'
												: 'text-gray-200',
											'h-5 w-5 flex-shrink-0',
										]"
										aria-hidden="true"
									/> -->
								</div>
								<!-- <p class="sr-only">{{ reviews.average }} out of 5 stars</p> -->
								<!-- <a
									:href="reviews.href"
									class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
									>{{ reviews.totalCount }} reviews</a
								>
							</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref, toRefs } from 'vue'
	import { useRoute } from 'vue-router'
	import { getProduct } from '../apis/product'
	import { ProductType } from '../types/ProductTypes'

	export default defineComponent({
		name: 'ProductDetails',
		props: {
			productId: {
				type: Number,
				default: 0
			}
			// product: {
			// 	type: Object as PropType<ProductType>,
			// },
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
				console.log(productId, 'product id')

				data.product = await getProduct(productId)

			}

			productBlock()
			return { isLoading, productBlock, ...toRefs(data) }
		},
	})
</script>

<style scoped></style>
