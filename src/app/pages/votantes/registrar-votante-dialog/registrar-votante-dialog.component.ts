import { concatMap, tap } from 'rxjs';
import { VotantesService } from '../services/votantes.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametersService } from 'src/app/core/services/parameters-service/parameters.service';
import { ERROR_MESSAGES } from 'src/app/core/error-messages';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-registrar-votante-dialog',
  standalone: true,
  templateUrl: './registrar-votante-dialog.component.html',
  styleUrls: ['./registrar-votante-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class RegistrarVotanteDialogComponent implements OnInit {
  public title = 'Registrar Nuevo Votante';
  votanteForm!: FormGroup;
  newVotanteID!: string;
  barrios!: any[];
  filterBarrios!: any[];

  barrios$ = this.parametersService.listBoxParams$.subscribe((data) => {
    this.barrios = data.barrios;
  });

  filterNesecidades!: any[];

  minDate!: Date;
  maxDate!: Date;
  startDate!: Date;
  isLoading = true;

  listBoxesData$ = this.parametersService.listBoxParams$.pipe(
    tap(() => (this.isLoading = false))
  );

  userName = this.storageService.getUserInfo();

  constructor(
    public dialogRef: MatDialogRef<RegistrarVotanteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private votantesService: VotantesService,
    private storageService: StorageService,
    private parametersService: ParametersService
  ) {
    const currentYear = new Date().getFullYear();
    console.log(this.userName);
    this.startDate = new Date(currentYear - 18, 0, 1);
    this.minDate = new Date(currentYear - 70, 0, 1);
    this.maxDate = new Date(currentYear + -16, 0, 0);
  }

  ngOnInit(): void {
    this.buildForm();

    this.filterBarrios = [...this.barrios];

    this.county?.valueChanges.subscribe((value) => {
      this.filterBarrios = [
        ...this.barrios.filter((b) => b.country.id === value),
      ];
    });

    this.necesidades?.valueChanges
      .pipe(
        concatMap((id) => this.parametersService.getNecesidadP1Especifica(id))
      )
      .subscribe((data) => (this.filterNesecidades = data));
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  buildForm() {
    this.votanteForm = this.fb.group({
      identidad: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', Validators.required],
      gender: [, Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      country: ['', Validators.required],
      neighborhood: ['', Validators.required],
      necesidadesPrimaria: [''],
      necesidadesPrimariasEspecifica: ['', Validators.required],
      DescripcionProblematica: [''],
      identityStatus: ['', Validators.required],
      responsable: [this.userName, Validators.required],
    });
  }

  get f() {
    return this.votanteForm.controls;
  }

  get county() {
    return this.votanteForm.get('country');
  }

  get necesidades() {
    return this.votanteForm.get('necesidadesPrimaria');
  }

  getErrorMessages(formControl: AbstractControl): string | null {
    const errors = Object.entries(formControl.errors || {});

    if (!errors.length) {
      return null;
    }

    const [key, value] = errors[0];
    return ERROR_MESSAGES[key as keyof typeof ERROR_MESSAGES];
  }

  get genderValue() {
    return this.votanteForm.get('gender')!.value;
  }

  onSubmit() {
    if (this.votanteForm.invalid) {
      this.votanteForm.markAllAsTouched();
      throw new Error('Complete los campos requeridos');
    }
    this.votantesService.addVotante(this.votanteForm.value);
    this.dialogRef.close(this.votanteForm.value);
  }
}
