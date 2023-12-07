import { Injectable } from '@nestjs/common';

import { PokemonClient } from '@clients/pokemon/pokemon.client';
import type {
  FindAllPokemonsParams,
  IPokemon,
} from '@domains/pokemon/interfaces/pokemon.d';

@Injectable()
export class PokemonService implements IPokemon {
  constructor(private readonly pokemonClient: PokemonClient) {}

  async findAll(params: FindAllPokemonsParams) {
    return await this.pokemonClient.findAll(params);
  }
}
