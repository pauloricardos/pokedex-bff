import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { PokemonService } from '@domains/pokemon/pokemon.service';
import type { Pokemons } from '@domains/pokemon/types/pokemon.types';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Res() res: Response,
  ): Promise<Response<Pokemons, Record<string, any>>> {
    const pokemons = await this.pokemonService.findAll();

    return res.status(HttpStatus.OK).json(pokemons);
  }
}
