import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../services/beer.service';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer.model';

@Component({
  selector: 'app-beer-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  beerService = inject(BeerService);

  $beerData: Observable<Beer[]> = new Observable<Beer[]>();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const beerId = params.get('id');
      if (beerId) {
        this.$beerData = this.beerService.getBeer(beerId);
      }
    });
  }
}
