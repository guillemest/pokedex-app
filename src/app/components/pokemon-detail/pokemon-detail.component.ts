
import { Component, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PokemonBasicDataModel, PokemonDetailData } from '@models';
import { PokemonService, DestroySubscriptionService } from '@services';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon = {} as PokemonBasicDataModel;
  pokemonDetail = {} as PokemonDetailData;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private destroySubscriptionService: DestroySubscriptionService
  ) { }

  ngOnInit(): void {
    if (Object.keys(this.pokemonService.pokemonData.getValue()).length === 0) {
      this.router.navigate(['/'])
    }

    this.pokemonService.pokemonData
      .pipe(
        takeUntil(this.destroySubscriptionService),
        take(1)
      )
      .subscribe(async val => {
        if (val && Object.keys(val).length > 0) {
          this.pokemon = val;
          this.pokemonDetail = await this.getDetailData();
        }
      })
  }

  getType(pokemon: PokemonBasicDataModel): string | undefined {
    if (pokemon && pokemon.types) {
      return pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
    }
    return undefined;
  }

  async getDetailData() {
    return await this.pokemonService.getPokemonDetailData(this.pokemon.name);
  }


}
