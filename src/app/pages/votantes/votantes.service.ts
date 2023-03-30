import { Votantes } from './votantes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { tap, catchError, EMPTY, Observable, map } from 'rxjs';

const API_URL = 'api/v1/votantes';

@Injectable({
  providedIn: 'root',
})
export class VotantesService {
  private readonly BASE_URL = environment.APIURL;
  constructor(private http: HttpClient) {}

  votantes$ = this.http.get<Votantes[]>(`${this.BASE_URL}/${API_URL}`).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    catchError(() => EMPTY)
  );

  createVotante(params: Votantes): Observable<Votantes> {
    return this.http.post<Votantes>(`${this.BASE_URL}/${API_URL}`, params).pipe(
      tap((data) => console.log('Votante ID:', data.id)),
    );
  }

  getVotante(id: string): Observable<Votantes> {
    return this.http.get<any>(`${this.BASE_URL}/${API_URL}/${id}`).pipe(
      map((votante) => ({
        ...votante,
        gender: votante.gender.id,
        country: votante.country.id,
        identityStatus: votante.identityStatus.id,
      })),
      tap((data) => console.log(JSON.stringify(data)))
    );
  }
}
