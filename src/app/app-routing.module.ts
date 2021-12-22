import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent, PokemonDetailComponent } from '@components';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'pokemon-detail', component: PokemonDetailComponent },
  { path: '**', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
