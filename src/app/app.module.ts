import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatRadioModule} from '@angular/material/radio';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LecturesComponent } from './pages/lectures/lectures.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { WorkshopComponent } from './pages/workshop/workshop.component';

import {MatDialogModule} from '@angular/material/dialog';
import { TeamsComponent } from './pages/teams/teams.component';
import { SponsorsComponent } from './pages/sponsors/sponsors.component';
import { CompetitionComponent } from './pages/competition/competition.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LecturesComponent,
    WorkshopComponent,
    TeamsComponent,
    SponsorsComponent,
    CompetitionComponent
  ],
  imports: [

    BrowserAnimationsModule,

    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
