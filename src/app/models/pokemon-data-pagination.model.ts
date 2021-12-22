import { PokemonBasicDataModel } from '@models';

export interface PokemonDataPagination {
  count: number
  limit: number;
  next: number;
  previous: number;
  data: PokemonBasicDataModel[]
}

export interface BehaviorSubjectPagination {
  next: number;
  limit: number;
}
