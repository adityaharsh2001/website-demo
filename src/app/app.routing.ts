import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './pages/auth/login/login.component';

import { AuthGuard } from "./pages/auth/auth.guard";

export const AppRoutes: Routes = [
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
     canActivate: [AuthGuard]
  },
   {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard]
  }

]

@NgModule({

  providers: [AuthGuard]
})
export class AppRoutingModule {}

