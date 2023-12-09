import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { CacheModule } from '@nestjs/cache-manager';

import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { PokemonType } from '@domains/enums/PokemonType.enum';
import {
  generateFindAllParams,
  generateFindAllPokemonParamsResult,
  generatePaginatedPokemonsResult,
  generatePokemon,
  generatePokemonListService,
  generatePokemonService,
  generatePokemonServiceData,
  generatePokemonSpeciesTypesService,
} from '@helpers/generators';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonStandardizer } from '@clients/pokemon/standardizers/pokemon.standardizer';

jest.mock('@infra/pokemon/pokemon.repository');

describe('PokemonClient', () => {
  let pokemonRepository: PokemonRepository;
  let pokemonStandardizer: PokemonStandardizer;
  let cacheManagerMock: Partial<Cache>;

  let pokemonRepositoryMocked: jest.MockedObjectDeep<PokemonRepository>;
  let pokemonStandardizerMocked: jest.MockedObjectDeep<PokemonStandardizer>;

  beforeEach(async () => {
    cacheManagerMock = {
      ...jest.requireActual('cache-manager'),
      get: jest.fn(),
      set: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonRepository,
        PokemonStandardizer,
        { provide: CacheModule, useValue: cacheManagerMock },
      ],
    }).compile();

    pokemonRepository = moduleRef.get<PokemonRepository>(PokemonRepository);
    pokemonStandardizer =
      moduleRef.get<PokemonStandardizer>(PokemonStandardizer);

    pokemonRepositoryMocked = jest.mocked(pokemonRepository);
    pokemonStandardizerMocked = jest.mocked(pokemonStandardizer);
  });

  const pokemonServiceWithoutNextProperty = generatePokemonListService({
    next: null,
    results: [
      generatePokemonServiceData({ name: 'bulbasaur', url: '/pokemon/1/' }),
      generatePokemonServiceData({ name: 'charmander', url: '/pokemon/4/' }),
      generatePokemonServiceData({ name: 'squirtle', url: '/pokemon/7/' }),
    ],
  });

  const pokemonListService = generatePokemonListService({
    next: '/pokemons/611',
    results: [
      generatePokemonServiceData({ name: 'mimikyu', url: '/pokemon/643/' }),
      generatePokemonServiceData({ name: 'koraidon', url: '/pokemon/1278/' }),
      generatePokemonServiceData({ name: 'rowlet', url: '/pokemon/610/' }),
    ],
  });

  const listOfPokemonsService = [
    generatePokemonService({
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Grass, url: '' },
        }),
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Poison, url: '' },
        }),
      ],
    }),
    generatePokemonService({
      name: 'mimikyu',
      id: 611,
      order: 611,
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Ghost, url: '' },
        }),
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Fairy, url: '' },
        }),
      ],
    }),
    generatePokemonService({
      name: 'charizard',
      id: 9,
      order: 9,
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Fire, url: '' },
        }),
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Flying, url: '' },
        }),
      ],
    }),
    generatePokemonService({
      name: 'blastoise',
      id: 6,
      order: 6,
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Water, url: '' },
        }),
      ],
    }),
    generatePokemonService({
      name: 'greninja',
      id: 645,
      order: 645,
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Water, url: '' },
        }),
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Dark, url: '' },
        }),
      ],
    }),
    generatePokemonService({
      name: 'decidueye',
      id: 708,
      order: 708,
      types: [
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Grass, url: '' },
        }),
        generatePokemonSpeciesTypesService({
          type: { name: PokemonType.Ghost, url: '' },
        }),
      ],
    }),
  ];

  describe('findAll', () => {
    const findAllParams = generateFindAllParams({ pageSize: 1010 });

    describe('when the client is called', () => {
      describe('and has more pokemon to fetch', () => {
        beforeEach(() => {
          pokemonRepositoryMocked.findAllPokemonSpecies.mockResolvedValueOnce(
            pokemonListService,
          );
          pokemonRepositoryMocked.findAllPokemonSpecies.mockResolvedValueOnce(
            pokemonServiceWithoutNextProperty,
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[0],
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[1],
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[2],
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[3],
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[4],
          );
          pokemonRepositoryMocked.findPokemonByName.mockResolvedValueOnce(
            listOfPokemonsService[5],
          );
        });

        it('then calls pokemon repository successfully', async () => {
          const pokemonClient = new PokemonClient(
            pokemonRepositoryMocked,
            pokemonStandardizerMocked,
          );

          await pokemonClient.findAll(findAllParams);

          expect(
            pokemonRepositoryMocked.findAllPokemonSpecies,
          ).toHaveBeenCalledWith({
            offset: '0',
            limit: '1010',
          });
        });

        it('then returns the pokemons', async () => {
          const expectedResult = generatePaginatedPokemonsResult({
            pokemons: [
              generatePokemon({
                name: 'bulbasaur',
                types: [PokemonType.Grass, PokemonType.Poison],
                spriteUrl:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
              }),
              generatePokemon({
                id: 611,
                pokedexEntry: 611,
                spriteUrl:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                name: 'mimikyu',
                types: [PokemonType.Ghost, PokemonType.Fairy],
              }),
              generatePokemon({
                id: 9,
                pokedexEntry: 9,
                spriteUrl:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                name: 'charizard',
                types: [PokemonType.Fire, PokemonType.Flying],
              }),
            ],
            pagination: generateFindAllPokemonParamsResult({
              pageSize: 1010,
              hasNext: true,
            }),
          });
          const pokemonClient = new PokemonClient(
            pokemonRepositoryMocked,
            pokemonStandardizerMocked,
          );

          expect(await pokemonClient.findAll(findAllParams)).toStrictEqual(
            expectedResult,
          );
        });
      });
    });
  });
});
