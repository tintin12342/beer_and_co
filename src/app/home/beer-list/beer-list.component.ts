import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerService } from 'src/app/services/beer.service';
import { Observable } from 'rxjs';
import { Beer } from 'src/app/model/beer.model';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {
  beerService = inject(BeerService);
  $beerData: Observable<Beer[]> = this.beerService.getBeers();
  favorites: number[] = JSON.parse(sessionStorage.getItem('favorites') || '[]');
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollFunction();
  }
  
  ngOnInit(): void {
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
