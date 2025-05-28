import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent {
  @Output() openModal = new EventEmitter<void>();
  @Input() hasPokemons: boolean = false; 

  onBallClick() {
    this.openModal.emit();
  }
}