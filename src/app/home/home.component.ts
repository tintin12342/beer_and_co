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
    this.beerService.getBeers().subscribe((beers: Beer[]) => this.beers = beers);
  }

  onFavoritesSelected(selected: boolean) {
    if (selected) {
      const favoriteBeers = this.beers.filter(beer => this.beerService.getFavorites().includes(beer.id));
      this.beerService.$beerSubject.next(favoriteBeers);
    } else {
      this.beerService.$beerSubject.next([...this.beers]);
    }
  }
}
