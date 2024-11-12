<template>
  <div class="carousel-view">
    <transition-group class="carousel" tag="div">
      
    <div v-for="slide in slides" class="slide" :key="slide.id">
        <h4>{{ slide.title }}</h4>
      </div>
       
       <!--
       <div v-for="image in props.images" class="slide" :key="image.id">
        <img :src="image.urls.full"/> 
      </div>   
      -->
    </transition-group>
    <div class="carousel-controls">
      <button class="carousel-controls__button" @click="previous">prev</button>
      <button class="carousel-controls__button" @click="next">next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(["images"]);

const slides = ref([
  { title: 'I am Slide A', id: 1 },
  { title: 'I am Slide B', id: 2 },
  { title: 'I am Slide C', id: 3 },
  { title: 'I am Slide D', id: 4 },
  { title: 'I am Slide E', id: 5 }
]);

function next() {
  const first = slides.value.shift();
  if (first) {
    slides.value.push(first);
  }
}

function previous() {
  const last = slides.value.pop();
  if (last) {
    slides.value.unshift(last);
  }
}
</script>

<style scoped>
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 24em;
  min-height: 25em;
}

.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}

.slide:first-of-type {
  opacity: 0;
}

.slide:last-of-type {
  opacity: 0;
}
</style>
 