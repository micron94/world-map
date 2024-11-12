<script setup lang="ts">
import { ref } from "vue";
import Carousel from "./ImageCarousel/Carousel.vue";
import Slide from "./ImageCarousel/Slide.vue";
const props = defineProps(["showModal", "countryData"]);
const open = ref(true);
</script>

<template>
  <div v-if="props.showModal" class="modal">
    <p>
      {{ props.countryData ? props.countryData.data.name.common : "no data" }}
    </p>
    <!-- <img class="flag" :src="props.countryData ? props.countryData.images[0].urls.raw : 'no data'"/>  -->

    <div v-if="props.countryData" class="image-wrapper" >

      <Carousel
      :navigation="true" 
      :pagination="true"
      :startAutoPlay="false"
      :timeout="5000" 
      class="carousel" 
      v-slot="{ currentSlide }"
    >
      <Slide v-for="(slide, index) in props.countryData.images " :key="index">
        <div v-show="currentSlide === index + 1" class="slide-info">
          <img :src="slide.urls.raw" alt="" />
        </div> 
      </Slide>
    </Carousel>


    </div>
    <div v-else>Loading images..</div>
    <button @click="$emit('modalClosed')">Close</button>
  </div> 
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 999;
  top: 0%;
  left: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: black;
  width: 50%;


  .image-wrapper {
    overflow: hidden;
    display: flex;
    height: 500px;
    width: 90%;
    justify-content: center;
    margin-bottom: 10px ; 
  } 
  .flag {
    padding: 10px;
    width: 90%;
    height: 500px;
    object-fit: cover; 
  }

  .carousel {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    height: 600px;
  }
}

@media (max-width: 800px) {
  .modal {
    left: 0;
    width: 100%;
  }
}
</style>
