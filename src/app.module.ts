import { Module } from '@nestjs/common';

import { HealthModule } from './domains/health/health.module';
import { PokemonModule } from './domains/pokemon/pokemon.module';

const imports = [HealthModule, PokemonModule];

@Module({ imports })
export class AppModule {}
