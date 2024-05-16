<template>
  <div v-if="isLoading" class="loading">
    <div class="loading__spinner">
      <div class="loading__bounceOne"></div>
      <div class="loading__bounceTwo"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  isLoading: Boolean
});

</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 90%);
  z-index: 9999;

  &__spinner {
    width: 100px;
    height: 100px;
    position: relative;
    text-align: center;
    animation: rotate 2s linear infinite;
  }

  &__bounceOne,
  &__bounceTwo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #09f;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: double-bounce 2s infinite ease-in-out;
  }

  &__bounceTwo {
    animation-delay: -1s;
  }
}


@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes double-bounce {
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}
</style>
