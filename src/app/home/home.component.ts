import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTabComponent } from './filter-tab/filter-tab.component';
import { BeerListComponent } from './beer-list/beer-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BeerListComponent, FilterTabComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
