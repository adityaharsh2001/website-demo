import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


import { LecturesComponent } from '../../pages/lectures/lectures.component';
import { WorkshopComponent } from '../../pages/workshop/workshop.component';
import { TeamsComponent } from '../../pages/teams/teams.component';
import { SponsorsComponent } from '../../pages/sponsors/sponsors.component';
import { CompetitionComponent } from '../../pages/competition/competition.component';
import { AuthGuard } from "../../pages/auth/auth.guard";
// import { LoginComponent } from '../../pages/auth/login/login.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'lectures',        component: LecturesComponent },
    { path: 'workshop',        component: WorkshopComponent },
    { path: 'teams',        component: TeamsComponent },
    { path: 'sponsors',        component: SponsorsComponent },
    { path: 'competition',        component: CompetitionComponent },
    // {path: 'login',                  component:LoginComponent}
];

