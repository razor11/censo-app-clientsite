import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotantesComponent } from './votantes-list.component';
import { DetalleVotanteComponent } from './detalle-votante/detalle-votante.component';

const routes: Routes = [
  {
    path: '',
    component: VotantesComponent,
  },
  {
    path: ':id',
    title: 'Votantes:id',
    component: DetalleVotanteComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotantesRoutingModule {}
