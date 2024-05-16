<template>
  <div class="cart">
    <div v-if="cartItems.length > 0" class="cart__items">
      <div class="cart__itemsWrapper">
        <div v-for="(item, index) in cartItems" :key="index" class="cart__item">
          <img loading="lazy" :src="item.hdThumbnailUrl" alt="img" class="cart__item-image" />
          <div class="cart__item-details">
            <div class="cart__item-name">{{ item.name }}</div>
            <div class="cart__item-info" v-if="item.sizeName">
              <span class="cart__item-size-name">{{ item.sizeName }}:&nbsp;</span>
              <span class="cart__item-size">{{ item.size }}</span>
            </div>
            <div class="cart__item-footer">
              <div class="cart__item-calculate">
                <span class="cart__item-minus" @click="decrement(index)">-</span>
                <span class="cart__item-count">{{ item.count }}</span>
                <span class="cart__item-plus" @click="increment(index)">+</span>
              </div>
              <p class="cart__item-price">{{ item.count < 2 ? item.defaultDisplayedPriceFormatted : item.price *
                item.count + '.00₽' }}</p>
            </div>
          </div>
          <button class="cart__remove-btn" @click="removeFromCart(index)">X</button>
        </div>
      </div>
      <h4 class="cart__quantity">Общая сумма: {{ quantity }}.00₽</h4>
    </div>
    <div v-else class="cart__empty-message">
      Ой-ой-ой! Пока здесь тишина, как на пустынном острове! Давайте поработаем над этим — добавьте в корзину пару
      товаров, чтобы она стала шумной вечеринкой!
    </div>
    <button v-if="cartItems.length > 0" class="cart__place-order-btn" @click="showModal = true">Оформить заказ</button>
    <Teleport to="body">
      <ModalComponent :show="showModal" @close="hideModal()">
        <template #header>
          <h3 class="cart__modalTitle">&#129321;Спасибо что выбрали нас!&#129321;</h3>
        </template>
        <template #body>
          <p class="cart__modalInfo">Ваш заказ успешно оформлен</p>
        </template>
        <template #footer>
          <button class="cart__modalBtn" @click="hideModal()">Продолжить покупки</button>
        </template>
      </ModalComponent>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue';
import { useCartStore } from '@/stores/cart';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
interface CartItem {
  id: number
  name: string
  hdThumbnailUrl: string
  sizeName?: string
  price: number
  defaultDisplayedPriceFormatted: string
  size?: string
  count: number
}
const router = useRouter()
const cartStore = useCartStore();
const cartItems = ref(cartStore.items);

const removeFromCart = (index: number) => {
  cartStore.items.splice(index, 1);
  calculateQuantity()
  cartStore.saveCartToLocalStorage();
};
const showModal = ref()
const hideModal = () => {
  showModal.value = false
  router.push('/')
  cartStore.removeCartFromLocalStorage();
}
const quantity = ref(0);
const calculateQuantity = () => {
  quantity.value = 0
  cartStore.items.forEach((item: CartItem) => {
    if (item.count) {
      item.count > 1 ? quantity.value += item.count * item.price
        :
        quantity.value += item.price
    }

  })
}
const increment = (idx: number) => {
  if (cartStore.items[idx].count <= 24) {
    cartStore.addToCart(cartStore.items[idx]);
    calculateQuantity();
  }
};

const decrement = (idx: number) => {
  if (cartStore.items[idx].count > 1) {
    cartStore.items[idx].count--
    calculateQuantity()
  } else {
    removeFromCart(idx)
  }
}
onMounted(() => {
  calculateQuantity()
})
</script>

<style scoped lang="scss">
.cart {
  &__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  &__itemsWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #007bff transparent;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #007bff;
      border-radius: 4px;
    }
  }

  &__quantity {
    padding: 30px 30px 0;
    font-size: 25px;

  }

  &__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
  }

  &__item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
  }

  &__item-details {
    flex: 1;
  }

  &__item-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  &__item-info {
    display: flex;
    margin-top: 5px;
  }

  &__remove-btn {
    color: #000;
    border: none;
    padding: 5px 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
  }

  &__item-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  &__item-calculate {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__item-minus,
  &__item-plus {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20px;
    min-width: 20px;
    max-height: 20px;
    min-height: 20px;
    color: #fff;
    padding: 5px;
    background: green;
    cursor: pointer;
  }

  &__item-price {
    font-weight: 800;
  }

  &__empty-message {
    max-width: 350px;
    margin-top: 20px;
    font-size: 18px;
    color: #555;
  }

  &__place-order-btn {
    margin-top: 30px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  &__modalTitle,
  &__modalInfo {
    color: #0056b3;
    text-align: center;
    font-weight: 800;
  }

  &__modalBtn {
    display: flex;
    margin: 0 auto;
  }
}
</style>
