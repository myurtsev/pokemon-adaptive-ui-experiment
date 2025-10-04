<template>
  <div class="pokemon-sprite-gallery">
    <div class="grid grid-cols-2 gap-3">
      <!-- Main sprites -->
      <div class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Main Sprites</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites?.front_default" class="sprite-item">
            <img :src="sprites.front_default" :alt="`${pokemon.name} front`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Front</span>
          </div>
          <div v-if="sprites?.back_default" class="sprite-item">
            <img :src="sprites.back_default" :alt="`${pokemon.name} back`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Back</span>
          </div>
          <div v-if="sprites?.front_shiny" class="sprite-item">
            <img :src="sprites.front_shiny" :alt="`${pokemon.name} shiny front`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Shiny Front</span>
          </div>
          <div v-if="sprites?.back_shiny" class="sprite-item">
            <img :src="sprites.back_shiny" :alt="`${pokemon.name} shiny back`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Shiny Back</span>
          </div>
        </div>
      </div>

      <!-- Official artwork -->
      <div class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Official Artwork</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites?.other?.['official-artwork']?.front_default" class="sprite-item">
            <img :src="sprites.other['official-artwork'].front_default" :alt="`${pokemon.name} official artwork`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Official</span>
          </div>
          <div v-if="sprites?.other?.['official-artwork']?.front_shiny" class="sprite-item">
            <img :src="sprites.other['official-artwork'].front_shiny" :alt="`${pokemon.name} shiny official artwork`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Shiny Official</span>
          </div>
        </div>
      </div>

      <!-- Dream world -->
      <div v-if="sprites?.other?.dream_world?.front_default" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Dream World</h4>
        <div class="sprite-item">
          <img :src="sprites.other.dream_world.front_default" :alt="`${pokemon.name} dream world`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
          <span class="text-xs opacity-70" :class="textColor || 'text-white'">Dream World</span>
        </div>
      </div>

      <!-- Home sprites -->
      <div v-if="sprites?.other?.home?.front_default" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Home</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites.other.home.front_default" class="sprite-item">
            <img :src="sprites.other.home.front_default" :alt="`${pokemon.name} home front`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Home</span>
          </div>
          <div v-if="sprites.other.home.front_shiny" class="sprite-item">
            <img :src="sprites.other.home.front_shiny" :alt="`${pokemon.name} home shiny`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Home Shiny</span>
          </div>
        </div>
      </div>

      <!-- Generation I -->
      <div v-if="sprites?.versions?.['generation-i']" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Gen I</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites.versions['generation-i']['red-blue']?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-i']['red-blue'].front_default" :alt="`${pokemon.name} red-blue`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Red/Blue</span>
          </div>
          <div v-if="sprites.versions['generation-i'].yellow?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-i'].yellow.front_default" :alt="`${pokemon.name} yellow`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Yellow</span>
          </div>
        </div>
      </div>

      <!-- Generation II -->
      <div v-if="sprites?.versions?.['generation-ii']" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Gen II</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites.versions['generation-ii'].gold?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-ii'].gold.front_default" :alt="`${pokemon.name} gold`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Gold</span>
          </div>
          <div v-if="sprites.versions['generation-ii'].silver?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-ii'].silver.front_default" :alt="`${pokemon.name} silver`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Silver</span>
          </div>
        </div>
      </div>

      <!-- Generation V Animated -->
      <div v-if="sprites?.versions?.['generation-v']?.['black-white']?.animated" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Gen V Animated</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites.versions['generation-v']['black-white'].animated.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-v']['black-white'].animated.front_default" :alt="`${pokemon.name} black-white animated`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">B/W Animated</span>
          </div>
          <div v-if="sprites.versions['generation-v']['black-white'].animated.front_shiny" class="sprite-item">
            <img :src="sprites.versions['generation-v']['black-white'].animated.front_shiny" :alt="`${pokemon.name} black-white shiny animated`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">B/W Shiny</span>
          </div>
        </div>
      </div>

      <!-- Icons -->
      <div v-if="sprites?.versions?.['generation-vii']?.icons || sprites?.versions?.['generation-viii']?.icons" class="sprite-group">
        <h4 class="text-sm font-semibold mb-2 opacity-80" :class="textColor || 'text-white'">Icons</h4>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="sprites.versions['generation-vii']?.icons?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-vii'].icons.front_default" :alt="`${pokemon.name} gen vii icon`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Gen VII Icon</span>
          </div>
          <div v-if="sprites.versions['generation-viii']?.icons?.front_default" class="sprite-item">
            <img :src="sprites.versions['generation-viii'].icons.front_default" :alt="`${pokemon.name} gen viii icon`" class="w-full h-16 object-contain bg-white bg-opacity-10 rounded-lg p-2" />
            <span class="text-xs opacity-70" :class="textColor || 'text-white'">Gen VIII Icon</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon, PokemonSprites } from '~/types';

defineProps<{
  pokemon: Pokemon;
  sprites: PokemonSprites;
  textColor?: string;
}>();
</script>

<style scoped>
.sprite-item {
  @apply flex flex-col items-center space-y-1;
}

.sprite-item img {
  transition: transform 0.2s ease;
}

.sprite-item:hover img {
  transform: scale(1.1);
}
</style>