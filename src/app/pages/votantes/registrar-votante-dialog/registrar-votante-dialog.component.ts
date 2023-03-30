import { first, tap } from 'rxjs';
import { VotantesService } from './../votantes.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MaterialModule } from './../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametersService } from 'src/app/core/services/authentication/parameters-service/parameters.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-votante-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-votante-dialog.component.html',
  styleUrls: ['./registrar-votante-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarVotanteDialogComponent implements OnInit {
  public title = 'Registrar Votante';
  votanteForm!: FormGroup;
  newVotanteID!: string;

  minDate!: Date;
  maxDate!: Date;
  startDate!: Date;
  isLoading = true;

  listBoxesData$ = this.parametersService.listBoxParams$.pipe(
    tap(() => (this.isLoading = false))
  );
  userName = this.authenticationService.getUserNameValue;

  constructor(
    public dialogRef: MatDialogRef<RegistrarVotanteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private votantesService: VotantesService,
    private authenticationService: AuthenticationService,
    private parametersService: ParametersService,
    private router: Router,
  ) {
    const currentYear = new Date().getFullYear();
    this.startDate = new Date(currentYear - 18, 0, 1);
    this.minDate = new Date(currentYear - 70, 0, 1);
    this.maxDate = new Date(currentYear + -16, 0, 0);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm() {
    this.votanteForm = this.fb.group({
      identidad: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [, Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      identityStatus: ['', Validators.required],
      responsable: [this.userName, Validators.required],
    });
  }

  onSubmit() {
    if (this.votanteForm.invalid) {
      return;
    }
    this.votantesService
      .createVotante(this.votanteForm.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
            this.newVotanteID = data.id;
            this.router.navigate(['app/votantes/detalle-votante', this.newVotanteID]);
        },
        error: (e) => {},
        complete: () => {
           this.dialogRef.close();

        }
      });
  }
}
