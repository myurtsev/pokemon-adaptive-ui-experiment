import type { Pokemon } from '~/types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonService {
  private static instance: PokemonService;

  static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  private async fetch<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${POKEAPI_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Pokemon API error: ${response.status}`);
    }

    return response.json();
  }

  async getPokemon(name: string): Promise<Pokemon> {
    try {
      const data = await this.fetch<any>(`/pokemon/${name.toLowerCase()}`);
      
      const cover = data.sprites?.other?.['official-artwork']?.front_default || 
                   data.sprites?.other?.dream_world?.front_default || 
                   data.sprites?.other?.showdown?.front_default ||
                   data.sprites?.front_default;

      const animatedGif = data.sprites?.other?.showdown?.front_default;

      return {
        id: String(data.id),
        name: data.name,
        cover,
        animatedGif,
        sprites: data.sprites,
        height: data.height,
        weight: data.weight,
        types: data.types,
        stats: data.stats,
        abilities: data.abilities,
      };
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw error;
    }
  }

  async getPokemonList(limit = 4, offset = 0): Promise<Pokemon[]> {
    try {
      const data = await this.fetch<any>('/pokemon', { limit, offset });
      
      const pokemonPromises = data.results.map((result: any) => 
        this.getPokemon(result.name)
      );
      
      return Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      const data = await this.fetch<any>('/pokemon', { limit: 1000 });
      
      const filteredResults = data.results.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const pokemonPromises = filteredResults
        .slice(0, 20)
        .map((result: any) => this.getPokemon(result.name));
      
      return Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      throw error;
    }
  }
}

export const pokemonService = PokemonService.getInstance();
