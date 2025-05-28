import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import {
  PokemonService,
  Pokemon,
  PokemonQuery,
} from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.scss'],
})
export class PokemonModalComponent implements OnChanges, OnInit {
  @Input() isOpen: boolean = false;
  @Input() selectedPokemonIds: string[] = []; 
  @Output() closeModal = new EventEmitter<void>();
  @Output() selectPokemon = new EventEmitter<Pokemon>();

  // Search properties
  searchName: string = '';
  searchType: string = '';

  // Data properties
  pokemons: Pokemon[] = [];
  loading: boolean = false;
  error: string = '';
  
  // เพิ่ม property สำหรับจำกัดการแสดง
  displayLimit: number = 3;

  pokemonTypes: string[] = [
    'Psychic',
    'Fighting',
    'Fairy',
    'Normal',
    'Grass',
    'Metal',
    'Water',
    'Lightning',
    'Darkness',
    'Colorless',
    'Fire',
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      // Reset display limit เมื่อเปิด modal ใหม่
      this.displayLimit = 3;
      this.loadPokemons();
    }
  }

  // กรอง Pokemon ที่เลือกแล้วออก 
  get filteredPokemons(): Pokemon[] {
    return this.pokemons.filter(pokemon => 
      !this.selectedPokemonIds.includes(pokemon.id)
    );
  }
  
  // ฟังก์ชันแสดงเพิ่มเติม
  showMore(): void {
    this.displayLimit += 3; // เพิ่มทีละ 3 รายการ
  }

  // Load Pokemon data
  loadPokemons(query: PokemonQuery = { limit: 50 }): void {
    this.loading = true;
    this.error = '';

    this.pokemonService.getPokemons(query).subscribe({
      next: (response) => {
        this.pokemons = response.cards;
        this.loading = false;
      },
      error: (error) => {
        this.error =
          'Unable to load Pokemon data. Please check if API server is running.';
        this.loading = false;
      },
    });
  }

  // Search Pokemon
  searchPokemons(): void {
    // Reset display limit เมื่อค้นหา
    this.displayLimit = 3;
    
    if (this.searchName.trim() || this.searchType) {
      const query: PokemonQuery = { limit: 100 };

      if (this.searchName.trim()) {
        query.name = this.searchName.trim();
      }

      if (this.searchType) {
        query.type = this.searchType;
      }

      this.loadPokemons(query);
    } else {
      this.loadPokemons({ limit: 50 });
    }
  }

  // Clear search
  clearSearch(): void {
    this.searchName = '';
    this.searchType = '';
    this.displayLimit = 3; // Reset display limit
    this.loadPokemons({ limit: 50 });
  }

  // Select Pokemon
  onSelectPokemon(pokemon: Pokemon): void {
    this.selectPokemon.emit(pokemon);
    this.onClose();
  }

  // Close modal
  onClose(): void {
    this.closeModal.emit();
  }

  // Handle overlay click
  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  // Handle form submit
  onSearchSubmit(event: Event): void {
    event.preventDefault();
    this.searchPokemons();
  }

  // Get Pokemon stats
  getStats(pokemon: Pokemon) {
    return this.pokemonService.calculateStats(pokemon);
  }

  // Get type color
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
  onImageError(event: any, pokemon: Pokemon): void {
    event.target.src = pokemon.imageUrlHiRes;
  }

  // TrackBy function
  trackByPokemonId(index: number, pokemon: Pokemon): string {
    return pokemon.id;
  }
}