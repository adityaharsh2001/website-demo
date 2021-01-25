import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";


import {Dashboard} from "./dashboard.model";


@Injectable({ providedIn: "root" })
export class DashboardService {
  private dashboard: Dashboard;
  private dashboardUpdated = new Subject<Dashboard>();

  constructor(private http: HttpClient, private router: Router) {}

  getCount() {

    return this.http.get<{ message: string; number: any }>
    ("http://localhost:5000/api/dashboards/");


    }
    getCountUpdateListener() {
      return this.dashboardUpdated.asObservable();
    }


}
