import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Interfaces
export interface Pokemon {
  id: string;
  name: string;
  nationalPokedexNumber?: number;
  imageUrl: string;
  imageUrlHiRes: string;
  supertype: string;
  subtype: string;
  hp: string;
  retreatCost?: string[];
  convertedRetreatCost?: number;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  type: string;
  ability?: Ability;
  text?: string[];
  evolvesFrom?: string;
}

export interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Resistance {
  type: string;
  value: string;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface PokemonResponse {
  cards: Pokemon[];
}

export interface PokemonQuery {
  limit?: number;
  name?: string;
  type?: string;
}

export interface PokemonStats {
  hp: number;
  strength: number;
  weakness: number;
  damage: number;
  happiness: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = '/api/cards';

  constructor(private http: HttpClient) {}

  // Fetch Pokemon from API
  getPokemons(query: PokemonQuery = {}): Observable<PokemonResponse> {
    const params = new URLSearchParams();

    if (query.limit) {
      params.append('limit', query.limit.toString());
    }
    if (query.name) {
      params.append('name', query.name);
    }
    if (query.type) {
      params.append('type', query.type);
    }

    const url = `${this.apiUrl}?${params.toString()}`;
    return this.http.get<PokemonResponse>(url);
  }
  // Calculate Pokemon stats
  calculateStats(pokemon: Pokemon): PokemonStats {
    const hp = this.calculateHpLevel(pokemon);
    const strength = this.calculateStrengthLevel(pokemon);
    const weakness = this.calculateWeaknessLevel(pokemon); // percentage สำหรับแสดงผล
    const damage = this.calculateTotalDamage(pokemon);

    //weakness count
    const weaknessCount = pokemon.weaknesses?.length || 0;
    const happiness = this.calculateHappinessLevel(hp, damage, weaknessCount);

    return { hp, strength, weakness, damage, happiness };
  }

  // HP level (max 100)
  private calculateHpLevel(pokemon: Pokemon): number {
    const hpValue = parseInt(pokemon.hp) || 0;
    return Math.min(hpValue, 100);
  }
  // Strength level (attacks * 50, max 100)
  private calculateStrengthLevel(pokemon: Pokemon): number {
    const attacksLength = pokemon.attacks?.length || 0;
    return Math.min(attacksLength * 50, 100);
  }

  // Weakness level (weaknesses * 100, max 100)
  private calculateWeaknessLevel(pokemon: Pokemon): number {
    const weaknessesLength = pokemon.weaknesses?.length || 0;
    return Math.min(weaknessesLength * 100, 100);
  }

  // Total damage from all attacks
  private calculateTotalDamage(pokemon: Pokemon): number {
    let totalDamage = 0;

    if (pokemon.attacks) {
      pokemon.attacks.forEach((attack) => {
        const damageStr = attack.damage || '';
        const damageValue = parseInt(damageStr.replace(/[^0-9]/g, '')) || 0;
        totalDamage += damageValue;
      });
    }

    return totalDamage;
  }
  // Happiness level calculation ((HP / 10) + (Damage / 10) + 10 - (Weakness Count)) / 5
  private calculateHappinessLevel(
    hp: number,
    damage: number,
    weaknessCount: number
  ): number {
    const happiness = Math.round(
      (hp / 10 + damage / 10 + 10 - weaknessCount) / 5
    );
    return Math.max(0, happiness);
  }
}
