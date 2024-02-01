<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
}>();
</script>

<template>
  <VueFinalModal
    class="modal-container"
    content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <div class="modal-content">
      <h1 v-if="title" class="text-2xl">
        {{ title }}
      </h1>
      <button class="ml-auto" @click="emit('update:modelValue', false)">
        <Icon icon="clarity:window-close-line" class="w-10 h-10" />
      </button>
    </div>
    <slot />
  </VueFinalModal>
</template>

<style>
.modal-container {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 300px;
  color: black;
}

.modal-content {
  background: white;
  width: 300px;
  height: 300px;
}
</style>
