import { Injectable } from '@nestjs/common';

import { PokemonClient } from '@clients/pokemon/pokemon.client';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonClient: PokemonClient) {}

  async findAll() {
    return await this.pokemonClient.findAll();
  }
}
