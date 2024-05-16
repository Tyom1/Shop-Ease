<template>
  <div class="productDetail">
    <SelectedProduct :product="product" v-if="!loading" />
  </div>
  <Loading :isLoading="loading" />
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import SelectedProduct from '@/components/SelectedProduct.vue'
import { useProductsStore } from '@/stores/products'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const productsStore = useProductsStore()
const getProducts = productsStore.getProducts
const getProduct = productsStore.getProduct
const products = ref<any[]>([])
const route = useRoute()
const product = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  if (products.value.length === 0) {
    await getProducts()
  }
  products.value = productsStore.products

  let regex = /-p(\d+)\//
  let match = route.fullPath.match(regex)

  let productID: number
  if (match) {
    productID = +match[1]
    await getProduct(productID)
  }
  if (productsStore.product) {
    product.value = productsStore.product
    product.value.count = 0
    loading.value = false
  }
})
</script>
