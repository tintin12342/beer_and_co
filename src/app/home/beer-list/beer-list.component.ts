import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerService } from 'src/app/services/beer.service';
import { Observable } from 'rxjs';
import { Beer } from 'src/app/model/beer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent {
  beerService = inject(BeerService);

  $beerData: Observable<Beer[]> = this.beerService.$beerSubject;

  favorites: number[] = JSON.parse(sessionStorage.getItem('favorites') || '[]');
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollFunction();
  }

  toggleFavorite(index: number) {
    const position = this.favorites.indexOf(index);
    if (position === -1) {
      this.favorites.push(index);
    } else {
      this.favorites.splice(position, 1);
    }
    sessionStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(index: number): boolean {
    return this.favorites.includes(index);
  }

  scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
