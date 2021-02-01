import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "../../shared/mime-type.validator";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { Dashboard } from "./dashboard.model";
import {DashboardService } from "./dashboard.service";
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import {  OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";



@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit ,OnDestroy{
  private dashboardsSub: Subscription;
  dashboards: Dashboard[] = [];
  private mode = "create";
  isLoading = true;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  dashboard: Dashboard;
  constructor(private modalService: NgbModal, public dashboardsService: DashboardService,private authService: AuthService) {}


    ngOnInit(){
      this.isLoading = true;
      this.dashboardsService.getCount().subscribe(Data => {
        // console.log(Data);
        this.dashboard = Data.number;
        console.log(this.dashboard);
        this.isLoading = false;

      }
        );

        this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });


      }


      ngOnDestroy() {
        
        this.authStatusSub.unsubscribe();
      }
}



