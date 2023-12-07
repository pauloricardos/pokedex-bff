import { AxiosResponse } from 'axios';

import { PokemonType } from '@domains/enums/PokemonType.enum';
import type {
  IPokemonListService,
  IPokemonService,
} from '@infra/pokemon/interfaces/pokemon.d';

export type PokemonServiceData = {
  name: string;
  url: string;
};

export type PokemonSpeciesService = {
  name: string;
  url: string;
};

export type PokemonOthersSpritesService = {
  home?: PokemonHomeSpriteService;
};

export type PokemonSpritesService = {
  front_default: string;
  other: PokemonOthersSpritesService;
};

export type PokemonHomeSpriteService = {
  front_default: string;
};

export type PokemonSpeciesTypesService = {
  slot: number;
  type: PokemonSpeciesTypeService;
};

export type PokemonSpeciesTypeService = {
  name: PokemonType;
  url: string;
};

export type PokemonTypesService = Array<PokemonSpeciesTypesService>;

export type PokemonListServiceResponse = Awaited<
  AxiosResponse<IPokemonListService>
>;

export type PokemonServiceResponse = Awaited<AxiosResponse<IPokemonService>>;
