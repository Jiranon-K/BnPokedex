import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail-modal',
  templateUrl: './pokemon-detail-modal.component.html',
  styleUrls: ['./pokemon-detail-modal.component.scss'],
})
export class PokemonDetailModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() pokemon: Pokemon | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() removePokemon = new EventEmitter<Pokemon>();

  isAnimating: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.isAnimating = false;

        setTimeout(() => {
          this.isAnimating = true;
        }, 50);
      } else {
        this.isAnimating = false;
      }
    }
  }

  getStats() {
    return this.pokemon
      ? this.pokemonService.calculateStats(this.pokemon)
      : null;
  }

  // Get Pokemon type color
  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      Psychic: '#a855f7',
      Fighting: '#f97316',
      Fairy: '#ec4899',
      Normal: '#6b7280',
      Grass: '#22c55e',
      Metal: '#6b7280',
      Water: '#3b82f6',
      Lightning: '#eab308',
      Darkness: '#1f2937',
      Colorless: '#9ca3af',
      Fire: '#ef4444',
    };
    return colors[type] || '#6b7280';
  }

  onImageError(event: any): void {
    if (this.pokemon) {
      event.target.src =
        this.pokemon.imageUrlHiRes || 'assets/placeholder-pokemon.png';
    }
  }

  onClose(): void {
    this.isAnimating = false;
    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }

  onRemove(): void {
    if (
      this.pokemon &&
      confirm(`Remove ${this.pokemon.name} from your Pokédex?`)
    ) {
      this.removePokemon.emit(this.pokemon);
      this.onClose();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.onClose();
    }
  }

  createArray(count: number): number[] {
    return Array(Math.max(0, count)).fill(0);
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  max(a: number, b: number): number {
    return Math.max(a, b);
  }
}
