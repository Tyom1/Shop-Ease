<template>
  <div class="home">
    <Loading :isLoading="loading" />
    <CategoryList />
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/CategoryList.vue';
import Loading from '@/components/Loading.vue';
import ProductList from '@/components/ProductList.vue';
import { useProductsStore } from '@/stores/products';
import { onMounted, ref } from 'vue';

const loading = ref(true);
const productsStore = useProductsStore()

const getProducts = productsStore.getProducts
const products = ref<any[]>([])
const filteredProducts = ref<any[]>([])

onMounted(async () => {
  localStorage.removeItem('firstCategory')
  localStorage.removeItem('lastCategory')
  await getProducts()
  products.value = await productsStore.products
  filteredProducts.value = products.value
  loading.value = false
})
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
