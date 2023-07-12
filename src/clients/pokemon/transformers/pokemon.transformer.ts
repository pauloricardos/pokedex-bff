import { Injectable } from '@nestjs/common';

import { IPokemon } from '@domains/pokemon/pokemon';
import { IPokemonService } from '@infra/pokemon/pokemon';
import {
  PokemonSpeciesTypesService,
  PokemonTypesService,
} from '@infra/pokemon/types/pokemon.types';
import { PokemonType } from '@domains/enums/PokemonType.enum';

@Injectable()
export class PokemonTransformer {
  transformPokemonData(
    pokemonService: Array<IPokemonService>,
  ): Array<IPokemon> {
    return pokemonService.map((pokemon: IPokemonService): IPokemon => {
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
