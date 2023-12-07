import { Module } from '@nestjs/common';
import { PokemonController } from '@api/v1/pokemon.controller';
import { PokemonService } from '@domains/pokemon/use-cases/pokemon.service';
import { PokemonRepository } from '@infra/pokemon/pokemon.repository';
import { PokemonClient } from '@clients/pokemon/pokemon.client';
import { CacheModule } from '@nestjs/cache-manager';
import { PokemonStandardizer } from '@clients/pokemon/standardizers/pokemon.standardizer';

@Module({
  imports: [CacheModule.register({})],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    PokemonClient,
    PokemonRepository,
    PokemonStandardizer,
  ],
})
export class PokemonModule {}
