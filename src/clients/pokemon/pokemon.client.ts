import { Injectable } from '@nestjs/common';

import { IPokemon } from '@domains/pokemon/pokemon';
import { IPokemonListService, IPokemonService } from '@infra/pokemon/pokemon';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonTransformer } from '@clients/pokemon/transformers/pokemon.transformer';

@Injectable()
export class PokemonClient {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly pokemonTransformer: PokemonTransformer,
  ) {}
  async findAll(): Promise<Array<IPokemon>> {
    const pokemonListService: IPokemonListService =
      await this.pokemonRepository.findAllPokemonSpecies({
        page: this.PAGE,
        totalPokemonCount: this.ALL_CURRENT_POKEMONS,
      });

    if (this.hasMorePokemonToFetch(pokemonListService)) {
      const morePokemonsService = await this.fetchMorePokemonRecursive(
        pokemonListService,
      );

      const pokemons = await this.retrievePokemonsAndTransformData(
        morePokemonsService,
      );

      return pokemons;
    }

    const pokemons = await this.retrievePokemonsAndTransformData(
      pokemonListService,
    );

    return pokemons;
  }

  private async fetchMorePokemonRecursive(
    pokemonListService: IPokemonListService,
  ): Promise<IPokemonListService> {
    if (this.hasMorePokemonToFetch(pokemonListService)) {
      const morePokemons = await this.pokemonRepository.findAllPokemonSpecies({
        page: this.PAGE,
        totalPokemon: String(pokemonListService.count + 1),
      });

      const updatedResults = pokemonListService.results.concat(
        morePokemons.results,
      );

      pokemonListService.results = updatedResults;
      pokemonListService.next = morePokemons.next;

      return this.fetchMorePokemonRecursive(pokemonListService);
    }

    return pokemonListService;
  }

  private hasMorePokemonToFetch(
    pokemonListService: IPokemonListService,
  ): boolean {
    return pokemonListService.next !== null;
  }

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
  ): Promise<Array<IPokemon>> {
    const pokemonsService: Array<IPokemonService> =
      await this.retrievePokemonsByName(pokemonListService);

    const pokemons: Array<IPokemon> =
      this.pokemonTransformer.transformPokemonData(pokemonsService);

    return pokemons;
  }

  private ALL_CURRENT_POKEMONS = '1010';
  private PAGE = '0';
}
