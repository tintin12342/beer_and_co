import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTabComponent } from './filter-tab/filter-tab.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerService } from '../services/beer.service';
import { Beer } from '../model/beer.model';

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

  ngOnInit(): void {
    this.getAllBeersFromApi();
  }

  getAllBeersFromApi() {
    this.beerService.getBeers().subscribe((beers: Beer[]) => this.beers = beers);
  }

  onFavoritesSelected(selected: boolean) {
    if (selected) {
      this.beers = this.beers.filter(beer => this.beerService.getFavorites().includes(beer.id));
      this.beerService.$beerSubject.next(this.beers);
    } else {
      this.getAllBeersFromApi();
      this.beerService.$beerSubject.next(this.beers);
    }
  }

  onSortSelection(selection: string) {
    if (selection === 'name') {
      const sortByName = this.beers.slice().sort((a, b) => a.name.localeCompare(b.name));
      this.beerService.$beerSubject.next(sortByName);
    } else if (selection === 'abv') {
      const sortByAbv = this.beers.slice().sort((a, b) => b.abv - a.abv);
      this.beerService.$beerSubject.next(sortByAbv);
    }
  }
}
