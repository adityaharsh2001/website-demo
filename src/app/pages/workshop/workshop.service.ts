import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Workshop } from "./workshop.model";

@Injectable({ providedIn: "root" })
export class WorkshopsService {
  private workshops: Workshop[] = [];
  private workshopsUpdated = new Subject<Workshop[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getWorkshops() {
    this.http
    .get<{ message: string; workshops: any }>("http://localhost:5000/api/workshops")
    .pipe(
      map(workshopData => {
        return workshopData.workshops.map(workshop => {
          // console.log(workshop);
          return {
            _id:workshop._id,
            title:workshop.title,
            description:workshop.description,
            imagePath:workshop.imagePath,
            price:workshop.price,
            date:workshop.date,
            status:workshop.status,
            regLink:workshop.regLink,
            time: workshop.time
          };
        });
      })
    )
    .subscribe(transformedWorkshops => {
      this.workshops = transformedWorkshops;
      // console.log(this.workshops);
      this.workshopsUpdated.next([...this.workshops]);
    });

  }

  getWorkshopUpdateListener() {
    return this.workshopsUpdated.asObservable();
  }

  findWorkshop(id: string) {
    return this.http.get<{
        _id: string,
        title: string,
        description: string,
        imagePath: string
        price: string,
        date:{
          year: string,
          month: string,
          day:string
        },
        status: string,
        regLink: string,
        time: string
    }>(
      "http://localhost:5000/api/workshops/" + id
    );
  }


  addWorkshop(workshop, image:File) {
    const workshopData = new FormData();
    workshopData.append("title", workshop.title);
    workshopData.append("description", workshop.description);
    workshopData.append("imagePath", workshop.image, workshop.name);
    workshopData.append("price", workshop.price);
    // workshopData.append("date", workshop.date);
    workshopData.append("year", workshop.date.year);
    workshopData.append("month", workshop.date.month);
    workshopData.append("day", workshop.date.day);
    workshopData.append("status", workshop.status);
    workshopData.append("regLink", workshop.regLink);
    workshopData.append("time", workshop.time);


    this.http
      .post(
        "http://localhost:5000/api/workshops",
        workshopData
      )
      .subscribe(temp => {

        // console.log(responseData)
        // console.log("dkfsa" );
        console.log(temp["b"]);

        this.workshops.push(temp["b"]);
        this.workshopsUpdated.next([...this.workshops]);

    });
  }

  deleteWorkshop(workshopId: string) {
    this.http
      .delete("http://localhost:5000/api/workshops/" + workshopId)
      .subscribe(() => {
        const updatedWorkshops = this.workshops.filter(workshop => workshop._id !== workshopId);
        this.workshops = updatedWorkshops;
        this.workshopsUpdated.next([...this.workshops]);
      });
  }


  updateWorkshop(workshop, image: File | string) {
    let WorkshopData: Workshop | FormData;
    if (typeof image === "object") {
      WorkshopData = new FormData();
      WorkshopData.append("title", workshop.title);
      WorkshopData.append("description", workshop.description);
      WorkshopData.append("imagePath", workshop.image, workshop.name);
      WorkshopData.append("price", workshop.price);
      // WorkshopData.append("date", workshop.date);
      WorkshopData.append("year", workshop.date.year);
    WorkshopData.append("month", workshop.date.month);
    WorkshopData.append("day", workshop.date.day);
      WorkshopData.append("time", workshop.time);
      WorkshopData.append("regLink", workshop.regLink);

    }
    else {
        WorkshopData = {
            _id:workshop._id,
            title:workshop.title,
            description:workshop.description,
            imagePath:workshop.imagePath,
            price:workshop.price,
            date:{
              day: workshop.date.day,
              year: workshop.date.year,
              month: workshop.date.month
            },
            regLink:workshop.regLink,
            status:workshop.status,
            time: workshop.time
          };
    }
    this.http
      .put("http://localhost:5000/api/workshops/" + workshop._id, WorkshopData)
      .subscribe(temp => {

        const updatedWorkshops = [...this.workshops];
        const oldPostIndex = updatedWorkshops.findIndex(p => p._id === workshop._id);
        // console.log(responseData)
        // console.log("dkfsa" );
        console.log(temp["b"]);
        console.log(oldPostIndex);
        console.log(updatedWorkshops[oldPostIndex]);
        updatedWorkshops[oldPostIndex] = temp["b"];
        this.workshops = updatedWorkshops;
        // this.lectures.push(temp["b"]);
        this.workshopsUpdated.next([...this.workshops]);
      }


      );
  }

}
