import { Cache } from 'cache-manager';

import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { httpClient } from '@infra/httpClient';
import {
  generatePokemonListService,
  generatePokemonService,
  generatePokemonServiceData,
} from '@helpers/generators';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

jest.mock('@infra/httpClient');
jest.mock('cache-manager');

describe('PokemonRepository', () => {
  const httpClientMocked = jest.mocked(httpClient);

  const pokemonServiceData = generatePokemonServiceData();
  const pokemonListService = generatePokemonListService({
    results: [pokemonServiceData],
  });
  const pokemonService = generatePokemonService();

  let cacheManagerMock: Partial<Cache>;
  let pokemonRepository: PokemonRepository;

  beforeEach(async () => {
    cacheManagerMock = {
      ...jest.requireActual('cache-manager'),
      get: jest.fn(),
      set: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        PokemonRepository,
        { provide: CACHE_MANAGER, useValue: cacheManagerMock },
      ],
    }).compile();

    pokemonRepository = moduleRef.get<PokemonRepository>(PokemonRepository);
  });

  describe('findAll', () => {
    describe('when the method is successfully called', () => {
      beforeEach(() => {
        httpClientMocked.get.mockResolvedValueOnce(pokemonListService);
      });

      it('then calls the http client', async () => {
        await pokemonRepository.findAllPokemonSpecies({
          offset: '0',
          limit: '1281',
        });

        expect(httpClientMocked.get).toHaveBeenCalledWith('/pokemon-species', {
          limit: '1281',
          offset: '0',
        });
      });

      it('then returns the pokemon data from service', async () => {
        const findAllSpy = jest.spyOn(
          pokemonRepository,
          'findAllPokemonSpecies',
        );
        findAllSpy.mockImplementationOnce(() => {
          return httpClientMocked.get('/pokemon-species');
        });

        const result = await pokemonRepository.findAllPokemonSpecies({
          offset: '0',
          limit: '1281',
        });

        expect(result).toStrictEqual(pokemonListService);
      });
    });
  });

  describe('findPokemonByName', () => {
    describe('when the method is successfully called', () => {
      describe('and has no cache saved yet', () => {
        beforeEach(() => {
          httpClientMocked.get.mockResolvedValueOnce(pokemonService);
          const findPokemonByNameSpy = jest.spyOn(
            pokemonRepository,
            'findPokemonByName',
          );
          findPokemonByNameSpy.mockResolvedValueOnce(
            httpClient.get('/pokemon/bulbasaur'),
          );
        });

        it('then calls the http client', async () => {
          await pokemonRepository.findPokemonByName('bulbasaur');

          expect(httpClientMocked.get).toBeCalledWith('/pokemon/bulbasaur');
        });

        it('then returns the pokemon data from service', async () => {
          const result = await pokemonRepository.findPokemonByName('bulbasaur');

          expect(result).toStrictEqual(pokemonService);
        });
      });

      describe('and has cache saved', () => {
        beforeEach(() => {
          httpClientMocked.get.mockReset();
          cacheManagerMock.get = jest
            .fn()
            .mockResolvedValueOnce(pokemonService);
        });

        it('then does not calls http client', async () => {
          await pokemonRepository.findPokemonByName('bulbasaur');

          expect(httpClientMocked.get).not.toBeCalledWith('/pokemon/bulbasaur');
          expect(cacheManagerMock.get).toBeCalledWith('bulbasaur');
        });

        it('then returns the pokemon data from cache', async () => {
          const result = await pokemonRepository.findPokemonByName('bulbasaur');

          expect(result).toStrictEqual(pokemonService);
        });
      });
    });
  });
});
