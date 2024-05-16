<template>
  <header class="header">
    <img :src="homeImg" alt="Home" @click="goToHome" class="header__button" />
    <div :class="{ 'header__cartContainer': true, 'header__cartContainer--added': isCartAdded }"
      @click="goToShoppingCart">
      <img :src="shopping_cart" alt="Shopping Cart" class="header__button" />
      <span v-if="cartItemCount > 0" class="header__itemCount">{{ cartItemCount }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import homeImg from '@/public/img/home.png'
import shopping_cart from '@/public/img/shopping_cart.png'
const cartStore = useCartStore();
const cartItems = cartStore.items;
const cartItemCount = ref(cartItems.length)
const router = useRouter()
const isCartAdded = ref(false)

const goToHome = () => {
  router.push('/')
}

const goToShoppingCart = () => {
  router.push('/cart')
}
watch(
  () => cartStore.items.length,
  () => {
    cartItemCount.value = cartStore.items.length;
  }
)
watch(
  () => cartStore.items,
  () => {
    isCartAdded.value = true;
    setTimeout(() => {
      isCartAdded.value = false;
    }, 200);
  },
  { deep: true }
);

</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &__cartContainer {
    position: relative;
    transform: scale(1);
    transition: all 0.3s ease;

    &--added {
      transform: scale(1.2);
    }
  }

  &__itemCount {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    border-radius: 50%;
    padding: 4px;
    font-size: 15px;
    cursor: pointer;
  }

  &__button {
    max-width: 50px;
    cursor: pointer;
    margin-right: 10px;
    transition: all ease-in 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
