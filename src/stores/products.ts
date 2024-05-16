import axios from 'axios'
import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  hdThumbnailUrl: string
  priceInProductList: number
  borderInfo: object
  description: string
  defaultDisplayedPriceFormatted: string
  categoryIds: object
  autogeneratedSlug: string
  options: object
}

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    products: [] as Product[],
    product: [] as Product[],
  }),
  actions: {
    async getProducts() {
      const STOREID = import.meta.env.VITE_STOREID
      const TOKEN = import.meta.env.VITE_TOKEN

      const requestURL = `https://app.ecwid.com/api/v3/${STOREID}/products?&limit=10`

      try {
        const response = await axios.get(requestURL, {
          headers: {
            Authorization: TOKEN
          }
        })
        this.products = response.data.items
      } catch (error) {
        console.error('Error:', error)
      }
    },
    async getProduct(id: number) {
      const STOREID = import.meta.env.VITE_STOREID
      const TOKEN = import.meta.env.VITE_TOKEN

      const requestURL = `https://app.ecwid.com/api/v3/${STOREID}/products/${id}`

      try {
        const response = await axios.get(requestURL, {
          headers: {
            Authorization: TOKEN
          }
        })
        this.product = response.data
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
})
