<script setup>
import Map from "./components/Map.vue";
import { ModalsContainer } from "vue-final-modal";
</script>

<template>
  <div>
    <ModalsContainer />
    <Map />
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
  max-width: 100%;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
