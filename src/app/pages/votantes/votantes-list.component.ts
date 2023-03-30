import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegistrarVotanteDialogComponent } from './registrar-votante-dialog/registrar-votante-dialog.component';
import { MaterialModule } from './../../shared/material/material.module';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotantesService } from './votantes.service';
import { Votantes } from './votantes';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-votantes',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './votantes-list.component.html',
  styleUrls: ['./votantes-list.component.scss'],
})
export class VotantesComponent implements AfterViewInit {
  displayedColumns: string[] = ['Identidad', 'Nombre'];
  votantes: Votantes[] = [];
  dataSource = new MatTableDataSource<Votantes>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource: any;

  votantes$ = this.votantesService.votantes$.subscribe({
    next: (data) => {
      this.votantes = data;
    },
    error: (e) => console.log(e),
    complete: () => {
      this.dataSource.data = this.votantes;
    },
  });

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

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarVotanteDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
