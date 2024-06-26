<template>
  <div class="categoryList">
    <ul class="categoryList__wrapper">
      <transition-group name="category-list">
        <li class="categoryList__item" v-for="item in categoryList" :key="item.id"
          :class="{ 'categoryList__item--active': item.activeItem }"
          @click="filterById(item.id, item.autogeneratedSlug)">
          <span class="categoryList__imgWrapper">
            <img :src="item.hdThumbnailUrl" alt="ctegoryImg" class="categoryList__img" />
          </span>
          <span class="categoryList__name">{{ item.name }}</span>
          <span class="categoryList__subCategory" v-if="subCategoryShow"> </span>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
interface Category {
  parentId: number
}

const router = useRouter()
const categoriesStore = useCategoriesStore()
const getCategories = categoriesStore.getCategories
const subCategoryShow = ref(false)
const categoryList = ref()
const filterById = (id: number, autogeneratedSlug: string) => {
  router.push({ name: 'Category', params: { name: autogeneratedSlug, id: id } })
}
const generalCategories = ref()
const route = useRoute()
const getCategoryList = async () => {
  await getCategories()

  let regex = /-c(\d+)\//
  let match = route.fullPath.match(regex)

  if (match) {
    generalCategories.value = categoriesStore.categories.filter((obj: {}) =>
      obj.hasOwnProperty('parentId')
    )
    generalCategories.value = generalCategories.value.filter(
      (obj: Category) => obj.parentId === +match[1]
    )
  } else {
    generalCategories.value = categoriesStore.categories.filter(
      (obj: {}) => !obj.hasOwnProperty('parentId')
    )
  }

  categoryList.value = generalCategories.value
}
onMounted(async () => {
  getCategoryList()
})
watch(
  () => route.fullPath,
  async () => {
    getCategoryList()
  }
)
</script>

<style scoped lang="scss">
.category-list-enter-active,
.category-list-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.category-list-enter,
.category-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.categoryList {
  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    list-style: none;
  }

  &__item {
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 15px;
    border: 2px solid #007bff;
  }

  &__imgWrapper {
    width: 100px;
    min-width: 100%;
    overflow: hidden;
    border-radius: 15px;
  }

  &__img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 15px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
