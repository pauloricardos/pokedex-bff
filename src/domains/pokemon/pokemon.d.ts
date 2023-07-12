import { PokemonType } from '@domains/enums/PokemonType.enum';

export interface IPokemon {
  id: number;
  pokedexEntry: number;
  name: string;
  spriteUrl: string;
  types: Array<PokemonType>;
}
