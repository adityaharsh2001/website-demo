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
        return workshopData.lectures.map(workshop => {
          // console.log(lecture);
          return {
            _id:workshop._id,
            title:workshop.title,
            description:workshop.description,
            imagePath:workshop.imagePath,
            price:workshop.price,
            date:workshop.date,
            time:workshop.time,
            regLink:workshop.regLink
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.workshops = transformedPosts;
      // console.log(this.lectures);
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
        time: string,
        regLink: string
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
    workshopData.append("date", workshop.date);
    workshopData.append("time", workshop.time);
    workshopData.append("regLink", workshop.regLink);


    this.http
      .post<{ message: string; lec: Workshop }>(
        "http://localhost:5000/api/workshops",
        workshopData
      )
      .subscribe(responseData => {
        // console.log(responseData);
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


  updateLecture(workshop, image: File | string) {
    let WorkshopData: Workshop | FormData;
    if (typeof image === "object") {
      WorkshopData = new FormData();
      WorkshopData.append("title", workshop.title);
      WorkshopData.append("description", workshop.description);
      WorkshopData.append("imagePath", workshop.image, workshop.name);
      WorkshopData.append("price", workshop.price);
      WorkshopData.append("date", workshop.date);
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
            date:workshop.date,
            time:workshop.time,
            regLink:workshop.regLink
      };
    }
    this.http
      .put("http://localhost:5000/api/workshops/" + workshop._id, WorkshopData)
      .subscribe(response => {
        console.log(response);
        }

      );
  }

}
