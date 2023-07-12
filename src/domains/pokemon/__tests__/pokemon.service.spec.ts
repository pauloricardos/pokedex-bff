import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '@domains/pokemon/pokemon.service';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { generatePokemon } from '@helpers/generators';
import { PokemonTransformer } from '@clients/pokemon/transformers/pokemon.transformer';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { CacheModule } from '@nestjs/cache-manager';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonClient: PokemonClient;

  const pokemons = [generatePokemon()];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      providers: [
        PokemonService,
        PokemonClient,
        PokemonTransformer,
        PokemonRepository,
      ],
    }).compile();

    pokemonService = moduleRef.get<PokemonService>(PokemonService);
    pokemonClient = moduleRef.get<PokemonClient>(PokemonClient);
  });

  describe('findAll', () => {
    describe('when is called', () => {
      it('then calls pokemon client', async () => {
        jest.spyOn(pokemonClient, 'findAll').mockResolvedValue(pokemons);

        await pokemonService.findAll();

        expect(pokemonClient.findAll).toHaveBeenCalled();
      });

      it('then returns pokemon data', async () => {
        jest.spyOn(pokemonClient, 'findAll').mockResolvedValue(pokemons);

        const result = await pokemonService.findAll();

        expect(result).toEqual(pokemons);
      });
    });
  });
});
