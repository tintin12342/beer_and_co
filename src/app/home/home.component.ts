import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTabComponent } from './filter-tab/filter-tab.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerService } from '../services/beer.service';
import { Beer } from '../model/beer.model';
import { ChangeContext } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BeerListComponent, FilterTabComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beerService = inject(BeerService);
  
  beers: Beer[] = [];

  filterInputValue: string = '';
  favoriteSelected: boolean = false;
  sliderChange: ChangeContext = { value: 0, highValue: 55, pointerType: 1 };
  sortBy: string = 'name';

  ngOnInit(): void {
    this.getAllBeersFromApi();
  }

  getAllBeersFromApi() {
    this.beerService.getBeers().subscribe((beers: Beer[]) => {
      this.beers = beers;
      this.beerService.$beerSubject.next(beers);
    });
  }

  onFilterByName(inputValue: string) {
    this.filterInputValue = inputValue;
    this.conditionsCheck();

    this.beers.filter(beer =>
      beer.name.toLowerCase().includes(this.filterInputValue.toLowerCase())
    );
  }

  onSliderChange(change: ChangeContext) {
    this.sliderChange = change;
    this.conditionsCheck();
  }

  onFavoritesSelected(selected: boolean) {
    this.favoriteSelected = selected;
    this.conditionsCheck();
  }

  onSortSelection(selection: string) {
    this.sortBy = selection;
    this.conditionsCheck();
  }

  conditionsCheck() {
    let filteredList: Beer[] = this.beers.slice();

    // favorite check
    if (this.favoriteSelected) {
      filteredList = filteredList.filter(beer => this.beerService.getFavorites().includes(beer.id));
    }

    // slider range check
    const highValue = this.sliderChange.highValue || 55;
    filteredList = filteredList.filter(beer => beer.abv >= this.sliderChange.value && beer.abv <= highValue);

    // search input check
    if (this.filterInputValue.trim() !== '') {
      const searchTerm = this.filterInputValue.toLowerCase();
      filteredList = filteredList.filter(beer => beer.name.toLowerCase().includes(searchTerm));
    }

    // sort check
    if (this.sortBy === 'name') {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'abv') {
      filteredList.sort((a, b) => b.abv - a.abv);
    }

    // save conditioned list
    this.beerService.$beerSubject.next(filteredList);
  }
}
