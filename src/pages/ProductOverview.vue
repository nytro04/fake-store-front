<template>
  <div class="bg-white">
    <div class="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="mb-20 text-2xl font-extrabold tracking-tight text-gray-900">Products Overview</h2>

			<!-- {{products}} -->

      <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
				<div class="" v-for="product in products" :key="product.id">
        <!-- <router-link :to="`/products/${product.id}`"   class="group"> -->
        <router-link :to="{name: 'ProductDetails', params: {id: product.id}}"   class="group">
          <div class="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
            <img :src="product.image" :alt="product.title" class="object-cover object-center w-full h-full group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ product.title }}
          </h3>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ product.price }}
          </p>
        </router-link>
				</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
	import { defineComponent, reactive, ref, toRefs } from 'vue'
	import { ProductType } from '../types/ProductTypes';
	import { getProducts } from '../apis/product'

	export default defineComponent({
    name: 'ProductOverview',

		setup() {
			const isLoading = ref(false)

			let data = reactive<{products: ProductType[]}>({products: []})

      const productList = async (): Promise<void> => {
        try {
          isLoading.value = true

         data.products = await getProducts()




        } catch (err) {
          console.log(err)
        //  error.value = err
        } finally {
          isLoading.value = false
        }
      }

      productList()


			return { isLoading, productList, ...toRefs(data)   }
		},
	})
</script>

<style scoped></style>
