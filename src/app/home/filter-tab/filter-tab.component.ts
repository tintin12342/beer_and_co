import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './filter-tab.component.html',
  styleUrls: ['./filter-tab.component.css']
})
export class FilterTabComponent {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500
  };
  filterByName: string = '';
  showFavorites: boolean = false;
}
