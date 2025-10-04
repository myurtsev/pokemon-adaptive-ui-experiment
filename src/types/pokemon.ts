export interface Pokemon {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  animatedGif?: string;
  sprites?: PokemonSprites;
  height?: number;
  weight?: number;
  types?: PokemonType[];
  stats?: PokemonStat[];
  abilities?: PokemonAbility[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
  other?: {
    dream_world?: {
      front_default?: string;
      front_female?: string;
    };
    home?: {
      front_default?: string;
      front_female?: string;
      front_shiny?: string;
      front_shiny_female?: string;
    };
    'official-artwork'?: {
      front_default?: string;
      front_shiny?: string;
    };
    showdown?: {
      back_default?: string;
      back_female?: string;
      back_shiny?: string;
      back_shiny_female?: string;
      front_default?: string;
      front_female?: string;
      front_shiny?: string;
      front_shiny_female?: string;
    };
  };
  versions?: {
    'generation-i'?: {
      'red-blue'?: {
        back_default?: string;
        back_gray?: string;
        back_transparent?: string;
        front_default?: string;
        front_gray?: string;
        front_transparent?: string;
      };
      yellow?: {
        back_default?: string;
        back_gray?: string;
        back_transparent?: string;
        front_default?: string;
        front_gray?: string;
        front_transparent?: string;
      };
    };
    'generation-ii'?: {
      crystal?: {
        back_default?: string;
        back_shiny?: string;
        back_shiny_transparent?: string;
        back_transparent?: string;
        front_default?: string;
        front_shiny?: string;
        front_shiny_transparent?: string;
        front_transparent?: string;
      };
      gold?: {
        back_default?: string;
        back_shiny?: string;
        front_default?: string;
        front_shiny?: string;
        front_transparent?: string;
      };
      silver?: {
        back_default?: string;
        back_shiny?: string;
        front_default?: string;
        front_shiny?: string;
        front_transparent?: string;
      };
    };
    'generation-v'?: {
      'black-white'?: {
        animated?: {
          back_default?: string;
          back_female?: string;
          back_shiny?: string;
          back_shiny_female?: string;
          front_default?: string;
          front_female?: string;
          front_shiny?: string;
          front_shiny_female?: string;
        };
        back_default?: string;
        back_female?: string;
        back_shiny?: string;
        back_shiny_female?: string;
        front_default?: string;
        front_female?: string;
        front_shiny?: string;
        front_shiny_female?: string;
      };
    };
    'generation-vii'?: {
      icons?: {
        front_default?: string;
        front_female?: string;
      };
    };
    'generation-viii'?: {
      icons?: {
        front_default?: string;
        front_female?: string;
      };
    };
  };
}

export interface PokemonApiResponse {
  data: Pokemon[];
  total: number;
  page: number;
  perPage: number;
}

export interface CacheEntry {
  data: Pokemon | null;
  timestamp: number;
}

export enum PokemonTypeColor {
  NORMAL = 'bg-gray-400',
  FIRE = 'bg-red-500',
  WATER = 'bg-blue-500',
  ELECTRIC = 'bg-yellow-400',
  GRASS = 'bg-green-500',
  ICE = 'bg-blue-200',
  FIGHTING = 'bg-red-700',
  POISON = 'bg-purple-500',
  GROUND = 'bg-yellow-600',
  FLYING = 'bg-indigo-400',
  PSYCHIC = 'bg-pink-500',
  BUG = 'bg-green-400',
  ROCK = 'bg-yellow-800',
  GHOST = 'bg-purple-700',
  DRAGON = 'bg-indigo-700',
  DARK = 'bg-gray-800',
  STEEL = 'bg-gray-500',
  FAIRY = 'bg-pink-300',
}
