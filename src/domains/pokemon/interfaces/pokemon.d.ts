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
  pageSize: number;
  offset: number;
};

export type FindAllPokemonParamsResult = FindAllPokemonsParams & {
  hasNext: boolean;
};

export type PaginatedPokemonsResult = {
  pokemons: Pokemons;
  pagination: FindAllPokemonParamsResult;
};

export interface IPokemon {
  findAll(params: FindAllPokemonsParams): Promise<PaginatedPokemonsResult>;
}
