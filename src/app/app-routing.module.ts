import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

import { from } from 'rxjs';
const routes: Routes = [
  {path: '', component: LoginComponent},
{ path: 'login', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
