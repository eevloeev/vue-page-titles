<script setup lang="ts">
import Container from './components/Container.vue'
import { ref } from 'vue'
import { useTitle } from './useTitle';

useTitle('App')

const isContainerShown = ref(false)
</script>

<template>
  <div>
    App
    <button @click="isContainerShown = !isContainerShown">
      Toggle Container
    </button>
    <Container v-if="isContainerShown" />
  </div>
</template>

<style scoped>
</style>
