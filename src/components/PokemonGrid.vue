<template>
  <div>
    <div v-if="pokemon.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <PokemonCard
        v-for="(pokemon, index) in pokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
        class="pokemon-card"
        :style="{ animationDelay: `${index * 100}ms` }"
      />
    </div>
    
    <div v-else-if="!loading" class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Pokemon found</h3>
      <p class="text-gray-500">Try searching for a different Pokemon name.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '~/types';
import PokemonCard from './PokemonCard/PokemonCard.vue';

defineProps<{
  pokemon: Pokemon[];
  loading: boolean;
  title: string;
}>();
</script>

<style scoped>
.pokemon-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

