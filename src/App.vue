<script setup>
import Map from "./components/Map.vue";
import { ModalsContainer } from "vue-final-modal";
import CountryModal from "./components/CountryModal.vue";
</script>

<template>
  <div>
    <CountryModal />
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
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
