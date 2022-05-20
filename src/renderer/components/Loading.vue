<script setup lang="ts">

// VueJS imports:
import { ref } from 'vue'

// Importing Pinia and initializing it:
import { useStore } from '@/stores/main.ts'
const store = useStore()

</script>

<template>
  <div class="main main-dark">
    <h4>Loading…</h4>
  </div>
</template>

<style scoped>
</style>
