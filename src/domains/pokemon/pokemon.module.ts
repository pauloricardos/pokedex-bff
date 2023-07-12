import { Module } from '@nestjs/common';
import { PokemonController } from '@domains/pokemon/pokemon.controller';
import { PokemonService } from '@domains/pokemon/pokemon.service';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonTransformer } from '@clients/pokemon/transformers/pokemon.transformer';

@Module({
  imports: [CacheModule.register({})],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokemonClient,
    PokemonRepository,
    PokemonTransformer,
  ],
})
export class PokemonModule {}
