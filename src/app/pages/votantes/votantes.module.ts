import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotantesService } from './services/votantes.service';
import { VotantesComponent } from './votantes-list.component';
import { AddButtonComponent } from 'src/app/components/add-button/add-button.component';
import { DetalleVotanteComponent } from '../../pages/votantes/detalle-votante/detalle-votante.component';
import { CustomPipesModule } from 'src/app/shared/custom-pipes.module';
import { VotantesRoutingModule } from './votantes-routing.module';


@NgModule({
  declarations: [
    AddButtonComponent,
    VotantesComponent,
    DetalleVotanteComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    CustomPipesModule,
    FormsModule,
    ReactiveFormsModule,
    VotantesRoutingModule
  ],
  providers: [VotantesService],
})
export class VotantesModule {}
