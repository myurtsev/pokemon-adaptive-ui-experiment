<template>
  <div class="space-y-1">
    <div v-if="pokemon.types" class="flex flex-wrap gap-1">
      <span
        v-for="type in pokemon.types"
        :key="type.slot"
        :class="getTypeColor(type.type.name)"
        class="px-2 py-1 text-xs rounded-xl text-white font-medium"
      >
        {{ type.type.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '~/types';
import { PokemonTypeColor } from '~/types';

defineProps<{
  pokemon: Pokemon;
}>();

const getTypeColor = (typeName: string): string => {
  const colorKey = typeName.toUpperCase() as keyof typeof PokemonTypeColor;
  return PokemonTypeColor[colorKey] || PokemonTypeColor.NORMAL;
};
</script>
