<template>
  <div class="selectedProduct">
    <div class="selectedProduct__wrapper">
      <div class="selectedProduct__imgWrapper">
        <img class="selectedProduct__img" loading="lazy" :src="product.hdThumbnailUrl" alt="img" />
      </div>
      <div class="selectedProduct__info">
        <h2 class="selectedProduct__name">{{ product.name }}</h2>
        <p class="selectedProduct__price">{{ product?.defaultDisplayedPriceFormatted }}</p>
        <h4 class="selectedProduct__descriptionTitle">Info about product</h4>
        <p class="selectedProduct__description" v-html="product?.description"></p>
        <div v-if="product.options && product.options.length" class="selectedProduct__optionsWrapper">
          <h3 class="selectedProduct__optionsTitle">{{ product.options[0].name }}</h3>
          <div class="selectedProduct__optionsContainer" ref="optionsContainer">
            <div v-for="(size, idx) in product.options[0].choices" :key="idx" class="selectedProduct__option"
              :class="{ selected: selectedSize === idx }" @click="selectSize(idx)">
              <label :for="`size-${idx}`">{{ size.text }}</label>
              <input type="radio" :id="`size-${idx}`" :value="idx" v-model="selectedSize" />
            </div>
          </div>
        </div>
        <button class="selectedProduct__btn" @click="addToCart">{{ btnAddToCart }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { onMounted, ref } from 'vue';

interface Product {
  id: number
  hdThumbnailUrl: string
  name: string
  defaultDisplayedPriceFormatted: string
  description: string
  sizeName: string
  size: object
  options: { choices: { text: string }[]; name: string }[]
  price: number
  count: number
}

interface CartItem {
  id: number
  name: string
  hdThumbnailUrl: string
  price: number
  defaultDisplayedPriceFormatted: string
  sizeName?: string
  size?: string
  count: number
}

const props = defineProps<{
  product: Product
}>()
const selectedSize = ref<number | null>(0)
const btnAddToCart = ref('В корзину')
const selectSize = (idx: number) => {
  selectedSize.value = idx
}

const cartStore = useCartStore()
const addToCart = () => {
  let size: number | null = null

  if (selectedSize.value !== null && props.product.options) {
    size = selectedSize.value
  }

  const selectedItem: CartItem = {
    id: props.product.id,
    name: props.product.name,
    hdThumbnailUrl: props.product.hdThumbnailUrl,
    price: props.product.price,
    defaultDisplayedPriceFormatted: props.product.defaultDisplayedPriceFormatted,
    count: 0
  }

  if ((size || size === 0) && props.product.options[0]) {
    selectedItem.sizeName = props.product.options[0].name
    selectedItem.size = props.product.options[0].choices[size].text
  }

  cartStore.addToCart(selectedItem)
  checkItemsFromCart()
}

const checkItemsFromCart = async () => {
  const productExists = await cartStore.items.some((product) => product.id === props.product.id)
  if (productExists) btnAddToCart.value = '+'
}
onMounted(() => {
  checkItemsFromCart()
})
</script>

<style scoped lang="scss">
.selectedProduct {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  &__wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    border-radius: 15px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0 10px 10px;
    max-width: 300px;
  }

  &__name {
    font-size: 16px;
    height: 30px;
  }

  &__imgWrapper {
    width: 100%;
    max-height: 500px;
    max-width: 500px;
    overflow: hidden;
    border-radius: 15px;

    @media (max-width <=768px) {
      max-height: 100%;
    }
  }

  &__img {
    width: 100%;
    height: fit-content;
    object-fit: cover;
    max-width: 100%;
    border-radius: 15px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__descriptionTitle,
  &__description {
    text-align: left;
  }

  &__description {
    &> :first-child {
      margin: 0 0 10px;
    }
  }

  &__optionsContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__option {
    display: flex;
    gap: 5px;
    margin: 5px;
    padding: 10px;
    border: 2px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fade-in-up 0.5s ease forwards;
    animation-delay: calc(0.1s * var(--idx));

    &:hover {
      border-color: #007bff;
    }

    &.selected {
      border-color: #007bff;
    }

    input,
    label {
      cursor: pointer;
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__price {
    font-weight: 800;
  }

  &__btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
      animation: pulse 0.5s ease infinite alternate;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05);
  }
}
</style>
