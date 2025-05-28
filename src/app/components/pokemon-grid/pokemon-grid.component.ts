import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss']
})
export class PokemonGridComponent {
  @Input() pokemons: Pokemon[] = [];
  @Output() viewDetails = new EventEmitter<Pokemon>();
  @Output() removePokemon = new EventEmitter<Pokemon>();

 
  trackByPokemonId(index: number, pokemon: Pokemon): string {
    return pokemon.id;
  }

  // Event handlers
  onViewDetails(pokemon: Pokemon): void {
    this.viewDetails.emit(pokemon);
  }

  onRemovePokemon(pokemon: Pokemon): void {
    this.removePokemon.emit(pokemon);
  }
}