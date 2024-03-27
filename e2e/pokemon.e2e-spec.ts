import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PokemonModule } from '@domains/pokemon/pokemon.module';
import { generatePokemon } from '@helpers/generators';
import { Pokemon } from '@domains/pokemon/interfaces/pokemon';

jest.setTimeout(55000);

describe('PokemonController - (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PokemonModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemons (GET)', async () => {
    const mapExpectedResult = (
      pokemonsResponse: Array<Pokemon>,
    ): Array<Pokemon> =>
      pokemonsResponse.map((pokemon) =>
        generatePokemon({
          pokedexEntry: pokemon.pokedexEntry,
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          spriteUrl: pokemon.spriteUrl,
        }),
      );

    const response = await request(app.getHttpServer()).get('/pokemons');

    expect(response.body).toEqual(mapExpectedResult(response.body));
    expect(response.status).toBe(HttpStatus.OK);
  });
});
