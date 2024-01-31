<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Map from "./components/Map.vue";
</script>

<template>
  <div>
  <Map/>
  </div>
</template>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

#app {
  margin: 0;
  padding: 0;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
