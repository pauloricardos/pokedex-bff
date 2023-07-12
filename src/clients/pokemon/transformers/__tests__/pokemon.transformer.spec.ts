import { PokemonTransformer } from '@clients/pokemon/transformers/pokemon.transformer';
import { PokemonType } from '@domains/enums/PokemonType.enum';
import {
  generatePokemon,
  generatePokemonService,
  generatePokemonSpeciesTypesService,
} from '@helpers/generators';

describe('PokemonTransformer', () => {
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

  const expectedResult = [
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
    generatePokemon({
      id: 6,
      pokedexEntry: 6,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      name: 'blastoise',
      types: [PokemonType.Water],
    }),
    generatePokemon({
      id: 645,
      pokedexEntry: 645,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      name: 'greninja',
      types: [PokemonType.Water, PokemonType.Dark],
    }),
    generatePokemon({
      id: 708,
      pokedexEntry: 708,
      spriteUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      name: 'decidueye',
      types: [PokemonType.Grass, PokemonType.Ghost],
    }),
  ];

  describe('transformPokemonData', () => {
    describe('when this method is called', () => {
      it('then transforms the pokemon service data into pokemon data to domain layer', () => {
        const pokemonTransformer = new PokemonTransformer();

        const transformedPokemonData = pokemonTransformer.transformPokemonData(
          listOfPokemonsService,
        );

        expect(transformedPokemonData).toStrictEqual(expectedResult);
      });
    });
  });
});
