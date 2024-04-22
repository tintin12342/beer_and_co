import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-filter-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.css']
})
export class FilterTabComponent {
  @Output() favoritesSelected = new EventEmitter<boolean>();
  @Output() sortSelection = new EventEmitter<string>();
  @Output() filterByName = new EventEmitter<string>();

  beerService = inject(BeerService);

  lowValue: number = 4;
  highValue: number = 37;
  options: Options = {
    floor: 0,
    ceil: 55
  };
  showFavorites: boolean = false;

  onShowFavoritesSelected() {
    this.favoritesSelected.emit(this.showFavorites);
  }

  onSelectChange(target: EventTarget | null) {
    if (target) {
      this.sortSelection.emit((target as HTMLSelectElement).value);
    }
  }

  onFilterByName(target: EventTarget | null) {
    if (target) {
      this.filterByName.emit((target as HTMLInputElement).value);
    }
  }

  onSliderChange(event: Event) {
    console.log(event)
  }
}
