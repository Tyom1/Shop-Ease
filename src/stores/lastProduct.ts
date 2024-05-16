import { defineStore } from 'pinia'

export const useLastProductStore = defineStore({
  id: 'lastProduct',
  state: () => ({
    lastProduct: localStorage.getItem('lastProduct') || ''
  }),
  actions: {
    setLastProduct(newProduct: string) {
      this.lastProduct = newProduct
      localStorage.setItem('lastProduct', newProduct)
    }
  }
})
