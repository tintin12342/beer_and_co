import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Beer } from '../model/beer.model';

@Injectable({
    providedIn: 'root',
})
export class BeerService {
    private http = inject(HttpClient);

    getBeers(): Observable<Beer[]> {
        return this.http
            .get<Beer[]>(`${API.url}/beers`)
            .pipe(
                catchError((err) => {
                    return throwError(() => console.error(err));
                }),
                map((response: Beer[]) => response.slice(0, 20))
            );
    }
}