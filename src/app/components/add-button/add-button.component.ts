import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarVotanteDialogComponent } from 'src/app/pages/votantes/registrar-votante-dialog/registrar-votante-dialog.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent {
  constructor(private dialog: MatDialog,
    ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarVotanteDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
}
