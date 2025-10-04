import { defineStore } from 'pinia'
import type { Pokemon } from '~/types'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemon: [] as Pokemon[],
    loading: false,
    loadingMore: false,
    error: null as string | null,
    searchQuery: '',
    currentOffset: 0,
    hasMore: true,
  }),

  getters: {
    pokemonCount: (state) => state.pokemon.length,
  },

  actions: {
    setPokemon(pokemon: Pokemon[]) {
      this.pokemon = pokemon
    },

    addPokemon(pokemon: Pokemon[]) {
      this.pokemon.push(...pokemon)
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setLoadingMore(loadingMore: boolean) {
      this.loadingMore = loadingMore
    },

    setError(error: string | null) {
      this.error = error
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setCurrentOffset(offset: number) {
      this.currentOffset = offset
    },

    setHasMore(hasMore: boolean) {
      this.hasMore = hasMore
    },

    resetPagination() {
      this.currentOffset = 0
      this.hasMore = true
    },

    clearPokemon() {
      this.pokemon = []
      this.resetPagination()
    },

    resetSearch() {
      this.searchQuery = ''
      this.clearPokemon()
    }
  }
})
