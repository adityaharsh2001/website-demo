import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {Dashboard} from "./dashboard.model";

@Injectable({ providedIn: "root" })
export class DashboardService {
  private dashboard: Dashboard[] = [];
  private dashboardUpdated = new Subject<Dashboard[]>();

  getCount(id: string) {

    // return this.http.get<{}>(
    //   "http://localhost:5000/api/lectures/" + id
    // );
  }

}
