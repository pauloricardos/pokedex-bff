import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { PokemonController } from '@api/v1/pokemon.controller';
import { PokemonService } from '@domains/pokemon/use-cases/pokemon.service';
import {
  generateFindAllParams,
  generatePaginatedPokemonsResult,
} from '@helpers/generators';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonStandardizer } from '@clients/pokemon/standardizers/pokemon.standardizer';

const mockResponse = {
  ...jest.requireActual('express'),
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      controllers: [PokemonController],
      providers: [
        PokemonService,
        PokemonClient,
        PokemonRepository,
        PokemonStandardizer,
      ],
    }).compile();

    pokemonController = moduleRef.get<PokemonController>(PokemonController);
    pokemonService = moduleRef.get<PokemonService>(PokemonService);
  });

  describe('/pokemons', () => {
    describe('findAll', () => {
      const params = generateFindAllParams();

      it('then returns all the pokemons', async () => {
        const pokemons = generatePaginatedPokemonsResult();
        jest.spyOn(pokemonService, 'findAll').mockResolvedValueOnce(pokemons);

        await pokemonController.findAll(mockResponse, params);

        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(mockResponse.json).toHaveBeenCalledWith(pokemons);
      });
    });
  });
});
