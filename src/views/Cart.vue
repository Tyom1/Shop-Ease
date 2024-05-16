<template>
  <div>
    <h2 class="title">Корзина</h2>
    <ShoppingCart />
  </div>
</template>

<script setup lang="ts">
import ShoppingCart from '@/components/ShoppingCart.vue';
</script>

<style scoped lang="scss">
.title {
  margin: 15px 0;
}
</style>
