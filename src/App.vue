<template>
  <Header />
  <router-view />
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 80px 0 0;
}
</style>
