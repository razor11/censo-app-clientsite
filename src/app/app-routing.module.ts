import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guards';
import { PageTitleStrategyService } from './core/services/page-title-strategy.service';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../app/router/dashboard-routing/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },

  { path: '**', redirectTo: 'app' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: PageTitleStrategyService }],
})
export class AppRoutingModule {}
