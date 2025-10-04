<template>
  <div class="min-h-screen bg-white rounded-2xl">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-lg text-gray-600">Loading Pokemon...</span>
      </div>
    </div>

    <div v-else-if="pokemon" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        @click="$router.push('/')"
        class="mb-8 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Pokemon
      </button>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          class="md:col-span-2 md:row-span-2 rounded-3xl p-8 relative overflow-hidden"
          :class="getTextColor(colorPalette[0] || '#3B82F6')"
          :style="{ backgroundColor: colorPalette[0] || '#3B82F6' }"
        >
            <div class="relative z-10">
              <!-- <PokemonImage :pokemon="pokemon" class="h-64" /> -->
              <img :src="pokemon.cover" alt="pokemon cover" class="h-64"></img>
              <h1 class="text-4xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
            
            <div class="flex items-center space-x-4 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold">{{ pokemon.height ? pokemon.height / 10 : 'N/A' }}m</div>
                <div class="text-sm opacity-75">Height</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">{{ pokemon.weight ? pokemon.weight / 10 : 'N/A' }}kg</div>
                <div class="text-sm opacity-75">Weight</div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span 
                v-for="type in pokemon.types" 
                :key="type.slot"
                class="px-3 py-1 rounded-full text-sm font-medium bg-slate-700 bg-opacity-10"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>
          
          <div class="absolute top-2 right-2 h-32">
            <PokemonAnimatedImage :pokemon="pokemon" class="w-full h-full" />
          </div>
        </div>

        <!-- Stats Card -->
        <div 
          class="rounded-3xl p-6"
          :class="getTextColor(colorPalette[1] || '#10B981')"
          :style="{ backgroundColor: colorPalette[1] || '#10B981' }"
        >
          <h3 class="text-xl font-bold mb-4">Base Stats</h3>
          <div class="space-y-3">
            <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="flex justify-between items-center">
              <span class="text-sm capitalize">{{ stat.stat.name.replace('-', ' ') }}</span>
              <div class="flex items-center">
                <div class="w-16 bg-white bg-opacity-20 rounded-full h-2 mr-2">
                  <div 
                    class="bg-white h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${Math.min((stat.base_stat / 100) * 100, 100)}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium">{{ stat.base_stat }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Abilities Card -->
        <div 
          class="rounded-3xl p-6"
          :class="getTextColor(colorPalette[2] || '#8B5CF6')"
          :style="{ backgroundColor: colorPalette[2] || '#8B5CF6' }"
        >
          <h3 class="text-xl font-bold mb-4">Abilities</h3>
          <div class="space-y-2">
            <div 
              v-for="ability in pokemon.abilities" 
              :key="ability.ability.name"
              class="flex items-center justify-between p-2 bg-white bg-opacity-10 rounded-lg"
            >
              <span class="capitalize">{{ ability.ability.name.replace('-', ' ') }}</span>
              <span v-if="ability.is_hidden" class="text-xs opacity-75">Hidden</span>
            </div>
          </div>
        </div>

        <!-- Type Effectiveness Card -->
        <!-- <div 
          class="rounded-3xl p-6 text-white"
          :style="{ backgroundColor: colorPalette[3] || '#F59E0B' }"
        >
          <h3 class="text-xl font-bold mb-4">Type Info</h3>
          <div class="space-y-3">
            <div v-for="type in pokemon.types" :key="type.slot" class="text-center">
              <div class="text-2xl font-bold mb-1">{{ type.type.name.toUpperCase() }}</div>
              <div class="text-sm opacity-75">Type {{ type.slot }}</div>
            </div>
          </div>
        </div> -->

        <!-- Pokemon Sprite Gallery Card -->
        <div 
          class="md:col-span-3 rounded-3xl p-6 relative overflow-hidden"
          :class="getTextColor(colorPalette[3] || '#EF4444')"
          :style="{ backgroundColor: colorPalette[3] || '#EF4444' }"
        >
          <div>
            <h3 class="text-2xl font-bold mb-4 text-center">Sprite Gallery</h3>
            <PokemonSpriteGallery 
              v-if="pokemon.sprites" 
              :pokemon="pokemon" 
              :sprites="pokemon.sprites"
              :text-color="getTextColor(colorPalette[3] || '#EF4444')"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Pokemon not found</h2>
        <p class="text-gray-600 mb-6">The Pokemon you're looking for doesn't exist.</p>
        <button 
          @click="$router.push('/')"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Pokemon
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemon } from '~/composables/usePokemon';
import { useColorThief } from '~/composables/useColorThief';
import { getTextColor } from '~/utils/colorUtils';
import PokemonAnimatedImage from '~/components/PokemonAnimatedImage.vue';
import PokemonSpriteGallery from '~/components/PokemonSpriteGallery.vue';
import type { Pokemon } from '~/types';

const route = useRoute();
const { getPokemon } = usePokemon();
const { getColorPaletteHex } = useColorThief();

const pokemon = ref<Pokemon | null>(null);
const loading = ref(true);
const colorPalette = ref<string[]>([]);

const loadPokemonData = async () => {
  try {
    loading.value = true;
    const pokemonId = route.params.id as string;
    const pokemonData = await getPokemon(pokemonId);
    
    if (pokemonData) {
      pokemon.value = pokemonData;
      
      if (pokemonData.cover) {
        try {
          const colors = await getColorPaletteHex(pokemonData.cover, { colorCount: 6 });
          colorPalette.value = colors;
        } catch (error) {
          console.warn('Failed to extract color palette:', error);
          colorPalette.value = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
        }
      }
    }
  } catch (error) {
    console.error('Error loading Pokemon:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPokemonData();
});
</script>
