<template>
  <div v-if="pokemon.animatedGif" class="relative">
    <img
      :src="pokemon.animatedGif"
      :alt="pokemon.name"
      class="p-5 object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      @load="onImageLoad"
      @error="onImageError"
    />
  </div>
  <div v-else-if="pokemon.cover" class="relative">
    <img
      :src="pokemon.cover"
      :alt="pokemon.name"
      class="p-5 object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
      @load="onImageLoad"
      @error="onImageError"
    />
  </div>
  <div 
    v-else 
    class="w-full h-64 p-3 text-2xl uppercase font-bold flex justify-center items-center text-center rounded-lg bg-gray-100"
  >
    {{ pokemon.name }}
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '~/types';

defineProps<{
  pokemon: Pokemon;
}>();

const emit = defineEmits<{
  'image-loaded': [];
  'image-error': [];
}>();

const onImageLoad = () => {
  emit('image-loaded');
};

const onImageError = () => {
  emit('image-error');
};
</script>
