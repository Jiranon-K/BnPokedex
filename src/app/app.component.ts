import { Component } from '@angular/core';
import { Pokemon } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Modal states
  isModalOpen: boolean = false;
  isDetailModalOpen: boolean = false;
  
  // Pokemon data
  selectedPokemons: Pokemon[] = [];
  selectedPokemonForDetail: Pokemon | null = null;

  constructor() {
    this.loadSavedPokemons();
  }

  //ID ของ Pokemon ที่เลือกแล้ว
  getSelectedPokemonIds(): string[] {
    return this.selectedPokemons.map(pokemon => pokemon.id);
  }

  // Modal management methods
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openDetailModal(pokemon: Pokemon): void {
    this.selectedPokemonForDetail = pokemon;
    this.isDetailModalOpen = true;
  }

  closeDetailModal(): void {
    this.isDetailModalOpen = false;
    this.selectedPokemonForDetail = null;
  }

  // Pokemon management methods
  onPokemonSelected(pokemon: Pokemon): void {
    const exists = this.selectedPokemons.find(p => p.id === pokemon.id);
    
    if (!exists) {
      this.selectedPokemons.push(pokemon);
      this.savePokemons();
    }
  }

  removePokemon(pokemon: Pokemon): void {
    const index = this.selectedPokemons.findIndex(p => p.id === pokemon.id);
    if (index > -1) {
      this.selectedPokemons.splice(index, 1);
      this.savePokemons();
    }
  }

  // Data persistence methods
  private savePokemons(): void {
    try {
      localStorage.setItem('selectedPokemons', JSON.stringify(this.selectedPokemons));
    } catch (error) {
      console.error('Error saving pokemons:', error);
    }
  }

  private loadSavedPokemons(): void {
    try {
      const saved = localStorage.getItem('selectedPokemons');
      if (saved) {
        this.selectedPokemons = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading pokemons:', error);
      this.selectedPokemons = [];
    }
  }
}