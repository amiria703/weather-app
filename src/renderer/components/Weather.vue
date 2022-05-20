<script setup lang="ts">
// Importing Pinia and intializing it:
import {useStore} from '@/stores/main.ts'
const store = useStore()

// Get weather info from fcc-weather-api:
import axios from 'axios'
const res = await axios.get('https://fcc-weather-api.glitch.me/api/current', {
  params: {
    lat: store.langtitude,
    lon: store.longtitude
  }
})

</script>

<template>
  <div class="main">
    <button class="btn margin-bottom" @click="store.placeName='';store.langtitude=0;store.longtitude=0;store.state=1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-left"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Home</button>
    <svg v-if="res.data.weather[0].id==800" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    <svg v-if="res.data.weather[0].id>800 || res.data.weather[0].id.toString().substr(0,1)=='7'" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cloud"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
    <svg v-if="res.data.weather[0].id.toString().substr(0,1)=='5' || res.data.weather[0].id.toString().substr(0,1)=='3'" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cloud-rain"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>
    <svg v-if="res.data.weather[0].id.toString().substr(0,1)=='2'" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cloud-lightning"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline></svg>
    <svg v-if="res.data.weather[0].id.toString().substr(0,1)=='6'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-snow"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line></svg>
    <p class="medium-text">{{ res.data.weather[0].main }}</p>
    <p class="medium-text grey">{{ Math.round(res.data.main.temp)+" °C" }}</p>
    <p class="small-text grey">{{ "Feels like "+Math.round(res.data.main.feels_like)+" °C" }}</p>
    <h4 class="margin-top">{{ store.placeName }}</h4>
    <p class="small-text grey">{{ store.longtitude + " " + store.langtitude }}</p>
    <svg class="margin-top" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
    <p class="medium-text grey">{{ res.data.wind.speed + " m/s" }}</p>
    <svg class="margin-top" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
    <p class="medium-text grey">{{ res.data.wind.deg + "°" }}</p>
  </div>
</template>

<style scoped>
</style>
