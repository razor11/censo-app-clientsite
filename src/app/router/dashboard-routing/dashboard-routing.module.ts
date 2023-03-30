import { MainComponent } from './../../pages/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'app/votantes/lista', pathMatch: 'full' },
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'votantes',
        children: [
          {
            path: 'lista',
            loadComponent: () =>
              import('../../pages/votantes/votantes-list.component').then(
                (m) => m.VotantesComponent
              ),
          },
          {
            path: 'detalle-votante/:id',
            loadComponent: () =>
              import(
                '../../pages/votantes/detalle-votante/detalle-votante.component'
              ).then((m) => m.DetalleVotanteComponent),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
