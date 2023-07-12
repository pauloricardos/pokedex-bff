import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { PokemonController } from '@domains/pokemon/pokemon.controller';
import { PokemonService } from '../../pokemon/pokemon.service';
import { generatePokemon } from '../../../helpers/generators';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { PokemonTransformer } from '@clients/pokemon/transformers/pokemon.transformer';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';

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
        PokemonTransformer,
      ],
    }).compile();

    pokemonController = moduleRef.get<PokemonController>(PokemonController);
    pokemonService = moduleRef.get<PokemonService>(PokemonService);
  });

  describe('/pokemons', () => {
    describe('findAll', () => {
      it('then returns all the pokemons', async () => {
        const pokemons = [generatePokemon()];
        jest.spyOn(pokemonService, 'findAll').mockResolvedValueOnce(pokemons);

        await pokemonController.findAll(mockResponse);

        expect(mockResponse.status).toBeCalledWith(HttpStatus.OK);
        expect(mockResponse.json).toBeCalledWith(pokemons);
      });
    });
  });
});
