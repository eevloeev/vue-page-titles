<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'
import { useTitle } from '../useTitle';

useTitle('Container')

const isChildShown = ref(false)
</script>

<template>
  <div>
    Container
    <button @click="isChildShown = !isChildShown">
      Toggle Child
    </button>
    <Child v-if="isChildShown" />
  </div>
</template>

<style scoped>
</style>
