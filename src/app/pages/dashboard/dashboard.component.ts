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



@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  private dashboardsSub: Subscription;
  dashboards: Dashboard[] = [];
  private mode = "create";
  isLoading = true;

  dashboard: Dashboard;
  constructor(private modalService: NgbModal, public dashboardsService: DashboardService,) {}


    ngOnInit(){

      this.dashboardsService.getCount().subscribe(Data => {
        // console.log(Data);
        this.dashboard = Data.number;
        console.log(this.dashboard);
        this.isLoading = false;
        // this.dashboard = {

        //   LectureCount :  Data.number.LectureCount,
        //   WorkshopCount: Data.number.WorkshopCount,
        //   TeamCount: Data.number.TeamCount,
        //   SponsorCount: Data.number.SponsorCount,
        //   CompetitionsCount: Data.number.CompetitionsCount}
        //
      }
        );



      }


}

