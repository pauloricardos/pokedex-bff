import type {
  PokemonServiceData,
  PokemonSpeciesService,
  PokemonSpritesService,
  PokemonTypesService,
} from '@infra/pokemon/types/pokemon.types';

export interface IPokemonListService {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokemonServiceData>;
}

export interface IPokemonService {
  id: number;
  name: string;
  order: number;
  species?: PokemonSpeciesService;
  types: PokemonTypesService;
  sprites: PokemonSpritesService;
}
