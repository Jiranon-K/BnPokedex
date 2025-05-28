import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';

import { PokemonModalComponent } from './components/pokemon-modal/pokemon-modal.component';
import { PokemonDetailModalComponent } from './components/pokemon-detail-modal/pokemon-detail-modal.component';

import { PokemonHeaderComponent } from './components/pokemon-header/pokemon-header.component';
import { PokemonEmptyStateComponent } from './components/pokemon-empty-state/pokemon-empty-state.component';
import { PokemonGridComponent } from './components/pokemon-grid/pokemon-grid.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,

    BottomNavigationComponent,

    PokemonModalComponent,
    PokemonDetailModalComponent,

    PokemonHeaderComponent,
    PokemonEmptyStateComponent,
    PokemonGridComponent,
    PokemonCardComponent,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
