<script setup lang="ts">

// VueJS imports:
import { ref } from 'vue'

// Importing Pinia and initializing it:
import { useStore } from '@/stores/main.ts'
const store = useStore()

</script>

<template>
  <div class="main">
    <h4>Hello!</h4>
    <p class="margin-top">This is a simple weather app made using web technologies including: VueJS, ElectronJS, OpenStreetMap, leaflet, Nominatim and fcc-weather-api.</p>
    <button class="btn margin-top" @click="store.state=2">Start <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="arrow-right" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
  </div>
</template>

<style scoped>
</style>
