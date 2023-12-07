import { Injectable } from '@nestjs/common';

import type { Pokemon, Pokemons } from '@domains/pokemon/interfaces/pokemon';
import { IPokemonService } from '@infra/pokemon/interfaces/pokemon.d';
import type {
  PokemonSpeciesTypesService,
  PokemonTypesService,
} from '@infra/pokemon/interfaces/pokemon.types';
import { PokemonType } from '@domains/enums/PokemonType.enum';

@Injectable()
export class PokemonStandardizer {
  transformPokemonData(pokemonService: Array<IPokemonService>): Pokemons {
    return pokemonService.map((pokemon: IPokemonService): Pokemon => {
      return {
        id: pokemon.id,
        pokedexEntry: pokemon.order,
        name: pokemon.name,
        types: this.transformPokemonTypes(pokemon.types),
        spriteUrl: pokemon.sprites.front_default,
      };
    });
  }

  private transformPokemonTypes(
    pokemonTypes: PokemonTypesService,
  ): Array<PokemonType> {
    return pokemonTypes.map(
      (pokemonType: PokemonSpeciesTypesService): PokemonType =>
        pokemonType.type.name,
    );
  }
}
