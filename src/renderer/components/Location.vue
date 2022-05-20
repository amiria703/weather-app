<script setup lang="ts">
// VueJS imports:
import { onMounted, ref } from 'vue'

// Importing Pinia and intializing it:
import { useStore } from '@/stores/main.ts'
const store = useStore()

// Initializing leaflet:
const map = ref()
const leaflet = ref()
const leafletMarker = ref()
leafletMarker.value = L.marker([],{draggable: true})
onMounted(()=>{
  leaflet.value = L.map(map.value).setView([41.308000, -71.855300], 4)
  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(leaflet.value)
  if(store.longtitude != 0 && store.langtitude != 0) {
    leafletMarker.value.setLatLng({lon: store.longtitude, lat: store.langtitude}).addTo(leaflet.value)
    leaflet.value.setView({lon: store.longtitude, lat: store.langtitude},11)
  }
  function onMapClick(e) {
    leafletMarker.value.setLatLng(e.latlng).addTo(leaflet.value)
  }
  leaflet.value.on('click', onMapClick)
})

// Initializing searchBox:
const searchBox = ref()
onMounted(()=>{
  setTimeout(()=>{
    searchBox.value.focus()
  },1000)
})

// Initializing Axios:
import axios from 'axios'
async function searchInNominatim(e){
  const res = await axios.get('https://nominatim.openstreetmap.org/search',
  {
  params: {
    q: searchBox.value.value, format: 'json'
  },
  headers: {
    'content-type': 'application/json',
    'accept-language': 'en-US'
  }
})
leafletMarker.value.setLatLng({lon: res.data[0].lon, lat: res.data[0].lat}).addTo(leaflet.value)
leaflet.value.setView({lon: res.data[0].lon, lat: res.data[0].lat},11)
store.placeName = searchBox.value.value
}

function saveLatLng(){
  store.longtitude = leafletMarker.value.getLatLng().lng
  store.langtitude = leafletMarker.value.getLatLng().lat
  if (searchBox.value.value!=""){
    store.state = 4
    store.placeName = searchBox.value.value
  }else{
    store.state = 3
  }
}
</script>

<template>
  <div class="main main-dark">
    <button class="btn btn-dark" @click="store.state=1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
    <h4 class="margin-top">Where are you?</h4>
    <span class="input margin-top">
    <input type="text" ref="searchBox" placeholder="I'm in …" :value="store.placeName" @keyup.enter="searchInNominatim" spellcheck="false">
<svg @click="searchInNominatim" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </span>
    <div id="map" ref="map"></div>
    <button class="btn btn-dark margin-top" v-if="leafletMarker.getLatLng()" @click="saveLatLng">Next <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
  </div>
</template>

<style scoped>
#map {
  height: 25rem;
  width: 30rem;
  font-size: 10px;
  border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    max-width: -webkit-fill-available;
}
.input {
  border: white 2px solid;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 7px;
  min-height: 3rem;
  box-sizing: border-box;
    width: 30rem;
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
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
</style>
