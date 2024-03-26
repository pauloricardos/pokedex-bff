import { Injectable } from '@nestjs/common';

import type {
  FindAllPokemonParamsResult,
  FindAllPokemonsParams,
  IPokemon,
  PaginatedPokemonsResult,
  Pokemons,
} from '@domains/pokemon/interfaces/pokemon';
import type {
  IPokemonListService,
  IPokemonService,
} from '@infra/pokemon/interfaces/pokemon';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonStandardizer } from '@clients/pokemon/standardizers/pokemon.standardizer';

@Injectable()
export class PokemonClient implements IPokemon {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly pokemonStandardizer: PokemonStandardizer,
  ) {}
  async findAll(
    params: FindAllPokemonsParams,
  ): Promise<PaginatedPokemonsResult> {
    const pokemonListService: IPokemonListService =
      await this.pokemonRepository.findAllPokemonSpecies({
        offset: String(params.offset),
        limit: String(params.pageSize),
      });

    const pokemons = await this.retrievePokemonsAndTransformData(
      pokemonListService,
    );

    const pagination = this.buildPaginationResult(
      params,
      pokemonListService.next,
    );

    return {
      pokemons,
      pagination,
    };
  }

  private buildPaginationResult = (
    pagination: FindAllPokemonsParams,
    hasNext: string | null,
  ): FindAllPokemonParamsResult => {
    return {
      pageSize: pagination.pageSize,
      offset: pagination.offset,
      hasNext: Boolean(hasNext),
    };
  };

  private async retrievePokemonsByName(
    pokemonListService: IPokemonListService,
  ): Promise<Array<IPokemonService>> {
    const pokemonPromises = pokemonListService.results.map((pokemon) =>
      this.pokemonRepository.findPokemonByName(pokemon.name),
    );

    const pokemonResults = await Promise.allSettled(pokemonPromises);

    const getFulfilledPokemonResults = pokemonResults
      .filter(
        (result): result is PromiseFulfilledResult<IPokemonService> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);

    return getFulfilledPokemonResults;
  }

  private async retrievePokemonsAndTransformData(
    pokemonListService: IPokemonListService,
  ): Promise<Pokemons> {
    const pokemonsService: Array<IPokemonService> =
      await this.retrievePokemonsByName(pokemonListService);

    const pokemons: Pokemons =
      this.pokemonStandardizer.transformPokemonData(pokemonsService);

    return pokemons;
  }
}
