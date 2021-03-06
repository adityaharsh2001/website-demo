import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http";

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
// import { UserComponent }            from '../../pages/user/user.component';
// import { TableComponent }           from '../../pages/table/table.component';
// import { TypographyComponent }      from '../../pages/typography/typography.component';
// import { MapsComponent }            from '../../pages/maps/maps.component';
// import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
// import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from "../../pages/auth/auth-interceptor";
// import { IconsComponent } from 'src/app/pages/icons/icons';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    // UserComponent,
    // TableComponent,
    // UpgradeComponent,
    // TypographyComponent,
    // // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,

  ],
 

})

export class AdminLayoutModule {}
