import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Output() viewDetails = new EventEmitter<Pokemon>();
  @Output() removePokemon = new EventEmitter<Pokemon>();

  constructor(private pokemonService: PokemonService) {}

  // Get Pokemon stats
  getStats() {
    return this.pokemonService.calculateStats(this.pokemon);
  }

  // Get Pokemon type color
  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      Psychic: '#f8a5c2',
      Fighting: '#f0932b',
      Fairy: '#c44569',
      Normal: '#f6e58d',
      Grass: '#badc58',
      Metal: '#95afc0',
      Water: '#3dc1d3',
      Lightning: '#f9ca24',
      Darkness: '#574b90',
      Colorless: '#6b6b6b',
      Fire: '#eb4d4b',
    };
    return colors[type] || '#f6e58d';
  }

  // Handle image error
  onImageError(event: any): void {
    event.target.src = this.pokemon.imageUrlHiRes;
  }

  // Template helpers for star display
  createArray(count: number): number[] {
    return Array(Math.max(0, count)).fill(0);
  }

  // star
  getEmptyStarsCount(happiness: number): number {
    const maxStars = 10;
    return Math.max(0, maxStars - happiness);
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  max(a: number, b: number): number {
    return Math.max(a, b);
  }

  // Event handlers
  onViewDetails(): void {
    this.viewDetails.emit(this.pokemon);
  }

  onRemove(): void {
    this.removePokemon.emit(this.pokemon);
  }
}
