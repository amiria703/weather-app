<script setup lang="ts">

// VueJS import:
import { ref, onMounted } from 'vue'

// Importing Pinia and intializing it:
import { useStore } from '@/stores/main.ts'
const store = useStore()

// Initializing input and declaring its done method:
const placeName = ref()
function storeName() {
  store.placeName = placeName.value.value
  store.state=4
}

// Initializing searchBox:
const searchBox = ref()
onMounted(()=>{
  setTimeout(()=>{
    placeName.value.focus()
  },1000)
})

</script>

<template>
  <div class="main">
    <button class="btn" @click="store.state=2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
    <h4 class="margin-top">What is the name of that place?</h4>
    <span class="input margin-top">
    <input type="text" ref="placeName" :placeholder="store.placeName" :value="store.placeName" spellcheck="false">
    </span>
    <button class="btn margin-top" @click="storeName">Finish <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
  </div>
</template>

<style scoped>
.input {
  border: white 2px solid;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 7px;
  min-height: 3rem;
  box-sizing: border-box;
    width: 30rem;
    border-radius: 10px;
    max-width: -webkit-fill-available;
}
.input > input {
  outline: none;
  border: none;
  background: #712ACF;
  height: 100%;
  margin-left: 5px;
  color: white;
  font-family: 'Quicksand', sans-serif;
  width: -webkit-fill-available;
  font-size: 30px;
  z-index: 3;
  font-weight: bold;
}
.input > svg {
  margin-right: 5px;
  margin-left: 5px;
  height: 100%;
  width: auto;
}
.input > svg:hover {
  cursor: pointer;
}
.main {
background: #712ACF;
color: white;
}
.btn {
border: white 2px solid;
background: #712ACF;
color: white;
}
.btn:hover {
background: white;
color: #712ACF;
}
</style>
