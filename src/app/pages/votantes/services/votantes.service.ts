import { Votantes } from '../../../core/models/votantes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  tap,
  catchError,
  EMPTY,
  Observable,
  map,
  delay,
  Subject,
  merge,
  scan,
  concatMap,
} from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const API_URL = 'api/v1/votantes';

@Injectable({
  providedIn: 'root',
})
export class VotantesService {
  private readonly BASE_URL = environment.APIURL;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  private votanteInsertedSubject = new Subject<Votantes>();
  votanteInsertedAction$ = this.votanteInsertedSubject.asObservable();

  votantes$ = this.http.get<Votantes[]>(`${this.BASE_URL}/${API_URL}`).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    catchError(() => EMPTY)
  );

  votantesWithAdd$ = merge(
    this.votantes$,
    this.votanteInsertedAction$.pipe(
      concatMap((newVot) => {
        return this.http
          .post<Votantes>(`${this.BASE_URL}/${API_URL}`, newVot)
          .pipe(
            tap((res) => {
              this.openSnackBar('Nuevo votante registrado', 'Navigate')
                .onAction()
                .subscribe(() => {
                  this.router.navigate(['/app/votantes', res.id]);
                });
            })
          );
      })
    )
  ).pipe(
    scan(
      (acc, value) => (value instanceof Array ? [...value] : [...acc, value]),
      [] as Votantes[]
    )
  );

  addVotante(votante: Votantes) {
    this.votanteInsertedSubject.next(votante);
  }

  // get single votante by id

  getVotante(id: string): Observable<Votantes> {
    return this.http.get<any>(`${this.BASE_URL}/${API_URL}/${id}`).pipe(
      delay(100),
      map((votante) => ({
        ...votante,
        gender: votante.gender.id,
        country: votante.country.id,
        identityStatus: votante.identityStatus.id,
      })),
      tap((data) => console.log(JSON.stringify(data)))
    );
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
