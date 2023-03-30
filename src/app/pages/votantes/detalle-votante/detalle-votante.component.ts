import { ParametersService } from 'src/app/core/services/authentication/parameters-service/parameters.service';
import { first, tap } from 'rxjs';
import { VotantesService } from './../votantes.service';
import {  ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from './../../../shared/material/material.module';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-votante',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './detalle-votante.component.html',
  styleUrls: ['./detalle-votante.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleVotanteComponent implements OnInit {
  vtForm!: FormGroup;
  id!: string;
  panel = 0;
  isLoadingResults = true;


  listBoxesData$ = this.parametersService.listBoxParams$.pipe(
    tap(() => this.isLoadingResults = false)
  );

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private votantesService: VotantesService,
    private parametersService: ParametersService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.vtForm = this.fb.group({
      identidad: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [, Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      identityStatus: ['', Validators.required],
      responsable: ['', Validators.required],
    });
    this.loadVtInfo();
  }

  setPanel(index: number) {
    this.panel = index;
  }

  loadVtInfo() {
    this.votantesService
      .getVotante(this.id)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.vtForm.patchValue(data);

        },
        error: (e) => {},
      });
  }
}
