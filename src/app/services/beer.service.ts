import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Beer } from '../model/beer.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class BeerService {
    private http = inject(HttpClient);
    private router = inject(Router);

    $beerSubject: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([]);

    getBeers(): Observable<Beer[]> {
        return this.http
            .get<Beer[]>(`${API.url}/beers`)
            .pipe(
                catchError((err) => {
                    return throwError(() => console.error(err));
                }),
                map((response: Beer[]) => {
                    const sortedArrayByName = response.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 25);
                    this.$beerSubject.next(sortedArrayByName);
                    return sortedArrayByName;
                })
            );
    }

    getBeer(beerId: string) {
        return this.http
            .get<Beer[]>(`${API.url}/beers/${beerId}`)
            .pipe(
                catchError(() => {
                    return throwError(() => this.router.navigate(['']));
                })
            );
    }

    getFavorites(): number[] {
        const favoritesString = sessionStorage.getItem('favorites');
        return favoritesString ? JSON.parse(favoritesString) : [];
    }
}