import { Injectable } from '@angular/core';
import { RequestHandlerService } from '@services';
import { BehaviorSubjectPagination, PokemonBasicDataModel, PokemonDataPagination, PokemonDetailData } from '@models';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class PokemonService {
  pokemonData = new BehaviorSubject<PokemonBasicDataModel>({} as PokemonBasicDataModel);
  pokemonDataPagination = new BehaviorSubject<BehaviorSubjectPagination>({} as BehaviorSubjectPagination);
  constructor(private requestHandlerService: RequestHandlerService) { }

  async getPokemonBasicData(offset: number, limit: number): Promise<PokemonDataPagination> {
    return await this.requestHandlerService
      .doGet(`pokemon/data/basic/?&offset=${offset}&limit=${limit}`)
      .catch(err => {
        throw err
      }) as PokemonDataPagination;
  }

  async getPokemonDetailData(pokemonName: string): Promise<PokemonDetailData> {
    return await this.requestHandlerService
      .doGet(`pokemon/data/detail/${pokemonName}`)
      .catch(err => {
        throw err
      }) as PokemonDetailData;
  }
}
