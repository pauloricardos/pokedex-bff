import { PokemonType } from '@domains/enums/PokemonType.enum';

export type Pokemon = {
  id: number;
  pokedexEntry: number;
  name: string;
  spriteUrl: string;
  types: Array<PokemonType>;
};

export type Pokemons = Array<Pokemon>;

export type FindAllPokemonsParams = {
  page: string;
  pageSize: string;
};

export type FindAllPokemonParamsResult = FindAllPokemonsParams & {
  hasNext: boolean;
};

export type PaginatedResult = {
  pokemons: Pokemons;
  pagination: FindAllPokemonParamsResult;
};

export interface IPokemon {
  findAll(params: FindAllPokemonsParams): Promise<PaginatedResult>;
}
