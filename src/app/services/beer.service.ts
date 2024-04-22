import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../environments/environment';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { Beer } from '../model/beer.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class BeerService {
    private http = inject(HttpClient);
    private router = inject(Router)

    $beerSubject: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([]);

    getBeers(): Observable<Beer[]> {
        return this.http
            .get<Beer[]>(`${API.url}/beers`)
            .pipe(
                catchError((err) => {
                    return throwError(() => console.error(err));
                }),
                tap((beers: Beer[]) => this.$beerSubject.next(beers)),
                map((response: Beer[]) => response.slice(0, 25))
            );
    }

    getBeer(beerId: string) {
        return this.http
            .get<Beer[]>(`${API.url}/beers/${beerId}`)
            .pipe(
                catchError((err) => {
                    return throwError(() => this.router.navigate(['']));
                })
            );
    }

    getFavorites(): number[] {
        const favoritesString = sessionStorage.getItem('favorites');
        return favoritesString ? JSON.parse(favoritesString) : [];
    }
}