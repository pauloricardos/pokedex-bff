import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { httpClient } from '@infra/httpClient';
import type {
  FindAllPokemonParams,
  IPokemonListService,
  IPokemonService,
} from '@infra/pokemon/interfaces/pokemon';
import type {
  PokemonListServiceResponse,
  PokemonServiceResponse,
} from '@infra/pokemon/interfaces/pokemon.types';

@Injectable()
export class PokemonRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async findAllPokemonSpecies({
    limit,
    offset,
  }: FindAllPokemonParams): Promise<IPokemonListService> {
    const { data }: PokemonListServiceResponse = await httpClient.get(
      '/pokemon-species',
      {
        offset,
        limit,
      },
    );

    return data;
  }

  async findPokemonByName(name: string): Promise<IPokemonService> {
    try {
      const cachedPokemons: IPokemonService | undefined =
        await this.cacheManager.get<IPokemonService>(name);

      if (cachedPokemons) {
        return cachedPokemons;
      }

      const { data }: PokemonServiceResponse = await httpClient.get(
        `/pokemon/${name}`,
      );

      await this.cacheManager.set(name, data, this.cacheTTL);

      return data;
    } catch (err) {
      throw err;
    }
  }
  private cacheTTL = 10000;
}
