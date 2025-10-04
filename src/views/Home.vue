<template>
  <div class="min-h-screen bg-white rounded-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900  mb-4">
          Muro's Pokemon Showcase
        </h1>
 
      </div>

      <PokemonSearch />

      <PokemonGrid
        :pokemon="pokemon"
        :loading="loading"
        :title="title"
      />

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg text-gray-600">Loading Pokemon...</span>
        </div>
      </div>

      <div v-if="!pokemonStore.searchQuery && !loading && hasMore" class="text-center mt-8">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <svg v-if="loadingMore" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loadingMore ? 'Loading...' : 'Load More Pokemon' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { usePokemon } from '~/composables/usePokemon';
import { usePokemonStore } from '~/stores/pokemon';
import PokemonSearch from '~/components/PokemonSearch.vue';
import PokemonGrid from '~/components/PokemonGrid.vue';

const { pokemon, loading, loadingMore, pokemonCount, hasMore, fetchPokemonList, loadMorePokemon, searchPokemon, debouncedQuery } = usePokemon();
const pokemonStore = usePokemonStore();
const title = ref<string>(pokemonStore.searchQuery ? `Search Results (${pokemonCount})` : 'Pokemon');

const loadMore = async () => {
  await loadMorePokemon(8);
};

watch(debouncedQuery, async (newQuery) => {
  if (newQuery.trim()) {
    await searchPokemon(newQuery);
  } else {
    await searchPokemon('');
  }
});

onMounted(async () => {
  await fetchPokemonList(8, 0);
});
</script>
