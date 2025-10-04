<template>
  <div 
    class="group rounded-2xl flex flex-col justify-start h-72 relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105"
    :style="{ backgroundColor: backgroundColor }"
    @click="navigateToDetail"
  >
    <div 
      class="transition-opacity duration-500 ease-in-out"
      :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
    >
      <PokemonImage 
        :pokemon="pokemon" 
        class="mx-auto"
        @image-loaded="onImageLoaded"
      />
    </div>
    <div 
      class="absolute bottom-0 left-0 w-full p-2.5 transition-opacity duration-500 ease-in-out delay-200"
      :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
    >
      <div class="p-2 w-full rounded-2xl bg-opacity-100" :style="{ backgroundColor: contentContainerColor }">
        <h2 class="mb-2 font-heading font-medium text-xs uppercase text-white tracking-px m-0">
          {{ pokemon.name }}
        </h2>
        <PokemonInfo :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Pokemon } from '~/types';
import { useColorThief } from '~/composables/useColorThief';
import PokemonInfo from '../PokemonInfo.vue';
import PokemonImage from '../PokemonImage.vue';

const props = defineProps<{
  pokemon: Pokemon;
}>();

const router = useRouter();
const { extractColorFromImage } = useColorThief();
const backgroundColor = ref('rgba(0, 0, 0, 0.1)');
const contentContainerColor = ref('rgba(0, 0, 0, 0.1)');
const imageLoaded = ref(false);

const navigateToDetail = () => {
  router.push(`/pokemon/${props.pokemon.id}`);
};

const onImageLoaded = async () => {
  if (props.pokemon.cover) {
    try {
      const color = await extractColorFromImage(props.pokemon.cover, 0.2, false);
      backgroundColor.value = color;
      contentContainerColor.value = await extractColorFromImage(props.pokemon.cover, 0.9, false);
    } catch (error) {
      console.warn('Failed to extract color from image:', error);
      backgroundColor.value = 'rgba(0, 0, 0, 0.1)';
      contentContainerColor.value = 'rgba(0, 0, 0, 0)';
    }
  }
  
  // Add a slight delay before showing the content
  setTimeout(() => {
    imageLoaded.value = true;
  }, 300);
};
</script>
