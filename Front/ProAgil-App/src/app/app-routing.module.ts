import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventoComponent } from './evento/evento.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { LoginComponent } from './user/login/login.component';
import { RegistraitionComponent } from './user/registraition/registraition.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistraitionComponent },
    ],
  },
  { path: 'eventos', component: EventoComponent, canActivate: [AuthGuard]},
  { path: 'palestrantes', component: PalestrantesComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'contatos', component: ContatosComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
