<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['showModal', 'countryData'])
const open = ref(true)
</script>
 
<template>
  <div v-if="props.showModal" class="modal">
    <p>{{ props.countryData ? props.countryData.name.common : 'no data'}}</p>
    <img :src="props.countryData ? props.countryData.flags.png : 'no data'"/>  
    <button @click="$emit('modalClosed')">Close</button>
  </div>   
</template> 
 
<style scoped>
.modal {
  position: fixed;
  z-index: 999; 
  top: 20%; 
  left: 50%; 
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: black;
  height: 400px;
  border-radius: 10%;
  width: 400px;
  margin-left: -150px;
}
</style>
