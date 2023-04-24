import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { VotantesService } from './services/votantes.service';
import { Votantes } from '../../core/models/votantes';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, catchError, map } from 'rxjs';
@Component({
  selector: 'app-votantes',
  templateUrl: './votantes-list.component.html',
  styleUrls: ['./votantes-list.component.scss'],
})
export class VotantesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Identidad', 'Nombre'];
  votantes: Votantes[] = [];
  dataSource = new MatTableDataSource<Votantes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource: any;

  votantes$ = this.votantesService.votantesWithAdd$.pipe(
    map((votantes) => {
      this.votantes = votantes;
      this.dataSource.data = this.votantes;
    }),
    catchError((err) => {
      return EMPTY;
    })
  );
  constructor(
    private votantesService: VotantesService,
    public dialog: MatDialog
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
