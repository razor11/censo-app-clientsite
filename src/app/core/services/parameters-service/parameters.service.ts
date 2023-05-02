import {
  tap,
  catchError,
  EMPTY,
  forkJoin,
  shareReplay,
  Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Param } from 'src/app/core/models/params';

const GENDERS_API = 'api/v1/genders';
const IDSTATUS_API = 'api/v1/identity-status';
const COUNTY_API = 'api/v1/countries';
const NEIGHBORHOODS_API = 'api/v1/neighborhoods';
const NECESIDADESP1_API = '/api/v1/necesidades-primarias';
const NECESIDADES_SPC_API =
  '/api/v1/necesidades-primarias-especificas/necesidadesPrimaria';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  private readonly BASE_URL = environment.APIURL;

  constructor(private http: HttpClient) {}

  genders$ = this.http.get<Param[]>(`${this.BASE_URL}/${GENDERS_API}`).pipe(
    tap(),

    catchError(() => EMPTY)
  );

  idStatus$ = this.http.get<Param[]>(`${this.BASE_URL}/${IDSTATUS_API}`).pipe(
    tap(),

    catchError(() => EMPTY)
  );

  countys$ = this.http.get<Param[]>(`${this.BASE_URL}/${COUNTY_API}`).pipe(
    tap(),

    catchError(() => EMPTY)
  );

  neighborhoods$ = this.http
    .get<any>(`${this.BASE_URL}/${NEIGHBORHOODS_API}`)
    .pipe(
      tap(),
      catchError(() => EMPTY)
    );

  necesidadesP1$ = this.http
    .get<Param[]>(`${this.BASE_URL}/${NECESIDADESP1_API}`)
    .pipe(
      tap(),
      catchError(() => EMPTY)
    );

  getNecesidadP1Especifica(id: number): Observable<any[]> {
    return this.http
      .get<Param[]>(`${this.BASE_URL}/${NECESIDADES_SPC_API}/${id}`)
      .pipe(
        tap(),
        catchError(() => EMPTY)
      );
  }

  listBoxParams$ = forkJoin({
    genders: this.genders$,
    county: this.countys$,
    idStatus: this.idStatus$,
    barrios: this.neighborhoods$,
    necesidadesP1: this.necesidadesP1$,
  }).pipe(
    tap((data) => console.log('Params: ', JSON.stringify(data.necesidadesP1))),
    shareReplay(1)
  );
}
