import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PokemonBasicDataModel } from '@models';
import { PokemonService } from '@services';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  loading: boolean = false;
  pokemons: PokemonBasicDataModel[] = [];
  next: number = 0;
  previous: number = 0;
  offset: number = 0;
  limit: number = 100;
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pokemonService.pokemonDataPagination.pipe(take(1)).subscribe(dataPagination => {
      if (Object.keys(dataPagination).length > 0) {
        this.next = dataPagination.next;
        this.limit = dataPagination.limit;
      }
      this.getData();

    })
  }

  getType(pokemon: PokemonBasicDataModel) {
    return pokemon.types.length > 0 ? pokemon.types[0].type.name : 0;
  }

  getData() {
    this.loading = true;
    this.pokemonService
      .getPokemonBasicData(this.next, this.limit)
      .then(cacheData => {
        this.pokemons = cacheData.data;
        this.limit = cacheData.limit;
        this.next = cacheData?.next;
      }).catch(err => err).finally(() => {
        this.loading = false;
      })
  }

  goToDetails(pokemon: PokemonBasicDataModel) {
    this.pokemonService.pokemonData.next(pokemon);
    this.pokemonService.pokemonDataPagination.next({ next: 0, limit: this.next });
    this.router.navigate(['/pokemon-detail']);
  }
}
