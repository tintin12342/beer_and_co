import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'beer-details/:id', component: BeerDetailsComponent },
    { path: '**', redirectTo: '' }
];
