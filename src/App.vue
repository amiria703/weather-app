<script setup>
// Importing CSS of leaflet:
import 'leaflet/dist/leaflet.css'

// Importing components:
import Hello from './components/Hello.vue'
import Location from './components/Location.vue'
import Place from './components/Place.vue'
import Weather from './components/Weather.vue'

// Importing Pinia and initializing it:
import { useStore } from './stores/main.js'
const store = useStore()

// VueJS imports:
import { ref } from 'vue'

</script>

<template>
  <div id="app">
    <Transition name="switch">
      <Hello v-if="store.state==1"/>
    </Transition>
    <Transition name="switch">
      <Location v-if="store.state==2"/>
    </Transition>
    <Transition name="switch">
      <Place v-if="store.state==3"/>
    </Transition>
    <Transition name="switch">
      <Suspense>
        <Weather v-if="store.state==4"/>
      </Suspense>
    </Transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap');

* {
  margin: 0;
}
.margin-top {
  margin-top: 20px;
}
.margin-bottom {
  margin-bottom: 20px;
}
.small-text {
  font-size: 15px;
}
.medium-text {
  font-size: 25px;
}
.grey {
  color: #aaa;
}
.arrow-left{
  margin-right: 10px;
}
.arrow-right{
  margin-left: 10px;
}
.switch-enter-active {
  animation: comeFromRight 0.6s;
}
.switch-leave-active {
  animation: goToLeft 0.6s;
}
@keyframes goToLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes comeFromRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.main {
  font-family: 'Quicksand', sans-serif;
  color: #712ACF;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: large;
  align-items: flex-start;
  font-size: 36px;
  padding: 70px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 13rem;
  font-family: 'Quicksand', sans-serif;
  background: white;
  border: #712ACF 2px solid;
  color: #712ACF;
  border-radius: 50rem;
  font-size: 30px;
  padding: 7px;
  font-weight: 600;
}
.btn:hover {
  cursor: pointer;
  background: #712ACF;
  color: white;
}
.btn > svg {
  height: 100%;
  width: auto;
}
.main-dark {
  background: #712ACF;
  color: white;
}
.btn-dark {
  border: white 2px solid;
  background: #712ACF;
  color: white;
}
.btn-dark:hover {
  background: white;
  color: #712ACF;
}
</style>
