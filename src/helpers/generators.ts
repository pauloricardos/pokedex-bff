import type {
  IPokemonListService,
  IPokemonService,
} from '@infra/pokemon/interfaces/pokemon.d';
import { PokemonType } from '@domains/enums/PokemonType.enum';
import type {
  FindAllPokemonsParams,
  Pokemon,
  FindAllPokemonParamsResult,
  PaginatedPokemonsResult,
} from '@domains/pokemon/interfaces/pokemon.d';
import type {
  PokemonServiceData,
  PokemonSpeciesTypesService,
} from '@infra/pokemon/interfaces/pokemon.types';

export const generatePokemon = (values: Partial<Pokemon> = {}): Pokemon => {
  const baseValues: Pokemon = {
    id: 1,
    pokedexEntry: 1,
    name: 'bulbasaur',
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: [PokemonType.Grass, PokemonType.Poison],
  };

  return { ...baseValues, ...values };
};

export const generateFindAllParams = (
  values: Partial<FindAllPokemonsParams> = {},
): FindAllPokemonsParams => {
  const baseValues: FindAllPokemonsParams = {
    pageSize: 151,
    offset: 0,
  };

  return { ...baseValues, ...values };
};

export const generateFindAllPokemonParamsResult = (
  values: Partial<FindAllPokemonParamsResult> = {},
): FindAllPokemonParamsResult => {
  const baseValues: FindAllPokemonParamsResult = {
    pageSize: 151,
    hasNext: false,
    offset: 0,
  };

  return { ...baseValues, ...values };
};

export const generatePaginatedPokemonsResult = (
  values: Partial<PaginatedPokemonsResult> = {},
): PaginatedPokemonsResult => {
  const baseValues: PaginatedPokemonsResult = {
    pokemons: [generatePokemon()],
    pagination: generateFindAllPokemonParamsResult(),
  };

  return { ...baseValues, ...values };
};

export const generatePokemonListService = (
  values: Partial<IPokemonListService> = {},
): IPokemonListService => {
  const baseValues: IPokemonListService = {
    count: 1281,
    next: '/pokemons?offset=20&limit=20',
    previous: null,
    results: [],
  };

  return { ...baseValues, ...values };
};

export const generatePokemonSpeciesTypesService = (
  values: Partial<PokemonSpeciesTypesService> = {},
): PokemonSpeciesTypesService => {
  const baseValues: PokemonSpeciesTypesService = {
    slot: 1,
    type: { name: PokemonType.Grass, url: '/pokemon-types/grass' },
  };

  return { ...baseValues, ...values };
};

export const generatePokemonService = (
  values: Partial<IPokemonService> = {},
): IPokemonService => {
  const baseValues: IPokemonService = {
    id: 1,
    order: 1,
    name: 'bulbasaur',
    types: [generatePokemonSpeciesTypesService()],
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        home: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        },
      },
    },
  };

  return { ...baseValues, ...values };
};

export const generatePokemonServiceData = (
  values: Partial<PokemonServiceData> = {},
): PokemonServiceData => {
  const baseValues: PokemonServiceData = {
    name: 'bulbasaur',
    url: '/pokemon/1/',
  };

  return { ...baseValues, ...values };
};
