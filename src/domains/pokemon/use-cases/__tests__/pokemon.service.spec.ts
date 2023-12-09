import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '@domains/pokemon/use-cases/pokemon.service';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import {
  generateFindAllParams,
  generatePaginatedPokemonsResult,
} from '@helpers/generators';
import { PokemonStandardizer } from '@clients/pokemon/standardizers/pokemon.standardizer';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { CacheModule } from '@nestjs/cache-manager';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonClient: PokemonClient;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      providers: [
        PokemonService,
        PokemonClient,
        PokemonRepository,
        PokemonStandardizer,
      ],
    }).compile();

    pokemonService = moduleRef.get<PokemonService>(PokemonService);
    pokemonClient = moduleRef.get<PokemonClient>(PokemonClient);
  });

  describe('findAll', () => {
    const params = generateFindAllParams();
    const paginatedPokemons = generatePaginatedPokemonsResult();

    describe('when is called', () => {
      it('then calls pokemon client', async () => {
        jest
          .spyOn(pokemonClient, 'findAll')
          .mockResolvedValue(paginatedPokemons);

        await pokemonService.findAll(params);

        expect(pokemonClient.findAll).toHaveBeenCalled();
      });

      it('then returns pokemon data', async () => {
        jest
          .spyOn(pokemonClient, 'findAll')
          .mockResolvedValue(paginatedPokemons);

        const result = await pokemonService.findAll(params);

        expect(result).toEqual(paginatedPokemons);
      });
    });
  });
});
