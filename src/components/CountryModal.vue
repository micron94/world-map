<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['showModal', 'countryData'])
const open = ref(true)
</script>
 
<template>
  <div v-if="props.showModal" class="modal">
    <p>{{ props.countryData ? props.countryData.name.common : 'no data'}}</p>
    <img class="flag" :src="props.countryData ? props.countryData.flags.png : 'no data'"/>  
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
  .flag {
  padding: 10px;

  }


}

</style>
