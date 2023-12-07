import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { PokemonService } from '@domains/pokemon/use-cases/pokemon.service';
import type {
  FindAllPokemonsParams,
  Pokemons,
} from '@domains/pokemon/interfaces/pokemon';
import { FindAllParams } from './schemas/pokemon.schema';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Query() req: FindAllParams,
  ): Promise<Response<Pokemons, Record<string, any>>> {
    const { page, pageSize } = req;

    const params: FindAllPokemonsParams = {
      page,
      pageSize,
    };

    const pokemons = await this.pokemonService.findAll(params);

    return res.status(HttpStatus.OK).json(pokemons);
  }
}
