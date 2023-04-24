import {
  tap,
  catchError,
  EMPTY,
  forkJoin,
  shareReplay,
  BehaviorSubject,
  Observable,
  map,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Param } from 'src/app/core/models/params';

const GENDERS_API = 'api/v1/genders';
const IDSTATUS_API = 'api/v1/identity-status';
const COUNTY_API = 'api/v1/countries';
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

  listBoxParams$ = forkJoin([
    this.genders$,
    this.countys$,
    this.idStatus$,
  ]).pipe(
    tap((data) => console.log('Params: ', JSON.stringify(data))),
    shareReplay(1)
  );
}
