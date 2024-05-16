import { defineStore } from 'pinia'

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

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[]
  }),
  actions: {
    addToCart(item: CartItem) {
      const existingItem: any = this.items.find(
        (element) => element.id === item.id && element.size === item.size
      )
      existingItem ? existingItem.count++ : this.items.push({ ...item, count: 1 })
      this.saveCartToLocalStorage()
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    },
    removeCartFromLocalStorage() {
      localStorage.removeItem('cartItems')
      this.items = []
    }
  }
})
