import { computed } from 'vue';
import { debouncedRef } from '@vueuse/core';
import { pokemonService } from '~/services/pokemonService';
import { safeApiCall } from '~/services/apiHelper';
import { usePokemonStore } from '~/stores/pokemon';

export function usePokemon() {
  const store = usePokemonStore();

  const fetchPokemonList = async (limit = 20, offset = 0) => {
    const result = await safeApiCall(
      () => pokemonService.getPokemonList(limit, offset),
      'Failed to fetch Pokemon'
    );
    if (result) {
      store.setPokemon(result);
      store.setCurrentOffset(offset + result.length);
      store.setHasMore(result.length === limit);
    }
  };

  const loadMorePokemon = async (limit = 8) => {
    store.setLoadingMore(true);
    const result = await safeApiCall(
      () => pokemonService.getPokemonList(limit, store.currentOffset),
      'Failed to load more Pokemon',
      { setLoading: false }
    );
    if (result) {
      store.addPokemon(result);
      store.setCurrentOffset(store.currentOffset + result.length);
      store.setHasMore(result.length === limit);
    }
    store.setLoadingMore(false);
  };

  const searchPokemon = async (query: string) => {
    if (!query.trim()) {
      if (store.pokemon.length === 0) {
        await fetchPokemonList(8, 0);
      }
      return;
    }

    const result = await safeApiCall(
      () => pokemonService.searchPokemon(query),
      'Failed to search Pokemon'
    );
    if (result) {
      store.setPokemon(result);
      store.setCurrentOffset(0);
      store.setHasMore(false);
    }
  };

  const getPokemon = async (name: string) => {
    return await safeApiCall(
      () => pokemonService.getPokemon(name),
      'Failed to fetch Pokemon'
    );
  };


  const searchQuery = computed({
    get: () => store.searchQuery,
    set: (value: string) => {
      store.setSearchQuery(value);
    }
  });

  const debouncedQuery = debouncedRef(searchQuery, 500);

  const clearSearch = () => {
    store.resetSearch();
  };

  return {
    pokemon: computed(() => store.pokemon),
    loading: computed(() => store.loading),
    loadingMore: computed(() => store.loadingMore),
    error: computed(() => store.error),
    pokemonCount: computed(() => store.pokemonCount),
    hasMore: computed(() => store.hasMore),
    searchQuery,
    debouncedQuery,
    fetchPokemonList,
    loadMorePokemon,
    searchPokemon,
    getPokemon,
    clearSearch,
  };
}
