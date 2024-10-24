<script setup lang="ts">
import { ref } from 'vue';
import { useTitle } from '../useTitle';

const title = ref<string | null>('Child');

useTitle(title, 10)
</script>

<template>
  <div>Child</div>
  <button @click="title === 'Child' ? title = null : title = 'Child'">
    {{ title === 'Child' ? 'Remove' : 'Add' }} title
  </button>
</template>

<style scoped>
</style>
