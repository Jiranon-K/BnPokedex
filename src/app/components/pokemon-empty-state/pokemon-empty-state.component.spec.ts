import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonEmptyStateComponent } from './pokemon-empty-state.component';

describe('PokemonEmptyStateComponent', () => {
  let component: PokemonEmptyStateComponent;
  let fixture: ComponentFixture<PokemonEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
