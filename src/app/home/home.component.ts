import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTabComponent } from './filter-tab/filter-tab.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerService } from '../services/beer.service';
import { Beer } from '../model/beer.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged, map, switchMap, tap, timer } from 'rxjs';
import { ChangeContext } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BeerListComponent, FilterTabComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  beerService = inject(BeerService);
  subscription: Subscription = new Subscription();
  filterByNameSubject = new Subject<string>();

  beers: Beer[] = [];
  filteredBeers: Beer[] = [];

  filterInputValue: string = '';
  favoriteSelected: boolean = false;

  ngOnInit(): void {
    this.getAllBeersFromApi();
  }

  getAllBeersFromApi() {
    this.beerService.getBeers().subscribe((beers: Beer[]) => this.beers = beers);

    this.subscription = this.filterByNameSubject.pipe(
      debounceTime(300),
      switchMap(() => this.beerService.getBeers())
    ).subscribe((beers: Beer[]) => {
      this.beers = beers.filter(beer =>
        (!this.favoriteSelected || this.beerService.getFavorites().includes(beer.id)) &&
        beer.name.toLowerCase().includes(this.filterInputValue.toLowerCase())
      );
      this.beerService.$beerSubject.next(this.beers);
    });

  }

  onFavoritesSelected(selected: boolean) {
    this.favoriteSelected = selected;
    if (selected) {
      const favoriteBeers = this.beers.filter(beer => this.beerService.getFavorites().includes(beer.id));
      this.beerService.$beerSubject.next(favoriteBeers);
    } else {
      this.beerService.$beerSubject.next(this.beers);
    }
  }

  onSortSelection(selection: string) {
    if (selection === 'name') {
      const sortByName = this.beers.sort((a, b) => a.name.localeCompare(b.name));
      this.beerService.$beerSubject.next(sortByName);
    } else if (selection === 'abv') {
      const sortByAbv = this.beers.sort((a, b) => b.abv - a.abv);
      this.beerService.$beerSubject.next(sortByAbv);
    }
  }

  onFilterByName(inputValue: string) {
    this.filterInputValue = inputValue;
    this.filterByNameSubject.next(inputValue);
  }

  onSliderChange(change: ChangeContext) {
    const highValue = change.highValue || 55;
    const filteredAbvRangeBeers = this.beers.filter(beer =>
      beer.abv >= change.value && beer.abv <= highValue
    );
    this.beerService.$beerSubject.next(filteredAbvRangeBeers)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
