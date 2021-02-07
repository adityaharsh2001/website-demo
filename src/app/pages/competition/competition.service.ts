import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Competition } from "./competition.model";

@Injectable({ providedIn: "root" })
export class CompetitionsService {
  private competitions: Competition[] = [];
  private competitionsUpdated = new Subject<Competition[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getCompetitions() {
    this.http
    .get<{ message: string; competitions: any }>("http://localhost:5000/api/competitions")
    .pipe(
      map(competitionData => {
        return competitionData.competitions.map(competition => {
          // console.log(lecture);
          return {
            _id: competition._id,
            title: competition.title,
            description: competition.description,
            imagePath: competition.imagePath,
            status: competition.status,
            date: competition.date,
            regLink: competition.regLink,
            time: competition.time
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.competitions = transformedPosts;
      // console.log(this.lectures);
      this.competitionsUpdated.next([...this.competitions]);
    });

  }

  getCompetitionUpdateListener() {
    return this.competitionsUpdated.asObservable();
  }

  findCompetition(id: string) {
    return this.http.get<{
        _id: string,
        title: string,
        description: string
        imagePath: string,
        status: boolean,
        date:{
          year: string,
          month: string,
          day:string
        },
        time: string,
        regLink: string
    }>(
      "http://localhost:5000/api/competitions/" + id
    );
  }


  addCompetition(competition, image:File) {
    const competitionData = new FormData();
    competitionData.append("title", competition.title);
    competitionData.append("description", competition.description);
    competitionData.append("imagePath", competition.image, competition.name);
    competitionData.append("status", competition.status);
    competitionData.append("date", competition.date);
    // competitionData.append("time", competition.time);
    competitionData.append("regLink", competition.regLink);
    competitionData.append("year", competition.date.year);
    competitionData.append("month", competition.date.month);
    competitionData.append("day", competition.date.day);
    competitionData.append("time", competition.time);

    // competitionData.append("imagePath", competition.image, competition.name);


// console.log(competition);

    this.http
      .post(
        "http://localhost:5000/api/competitions",
        competitionData
      )
      .subscribe(temp => {

        // console.log(responseData)
        // console.log("dkfsa" );
        console.log(temp["b"]);

        this.competitions.push(temp["b"]);
        this.competitionsUpdated.next([...this.competitions]);

    });
  }

  deleteCompetition(competitionId: string) {
    this.http
      .delete("http://localhost:5000/api/competitions/" + competitionId)
      .subscribe(() => {
        const updatedCompetitions = this.competitions.filter(competition => competition._id !== competitionId);
        this.competitions = updatedCompetitions;
        this.competitionsUpdated.next([...this.competitions]);
      });
  }


  updateCompetition(competition, image: File | string) {
    let CompetitionData: Competition | FormData;
    if (typeof image === "object") {
        CompetitionData = new FormData();
        CompetitionData.append("title", competition.title);
        CompetitionData.append("description", competition.description);
        CompetitionData.append("imagePath", competition.image, competition.name);
        CompetitionData.append("status", competition.status);
        // CompetitionData.append("date", competition.date);
        CompetitionData.append("year", competition.date.year);
        CompetitionData.append("month", competition.date.month);
        CompetitionData.append("day", competition.date.day);
        CompetitionData.append("time", competition.time);
        CompetitionData.append("regLink", competition.regLink);

    }
    else {
        CompetitionData = {
            _id: competition._id,
            title: competition.title,
            description: competition.description,
            imagePath: competition.imagePath,
            status: competition.status,
            // date: competition.date,
            date:{
              day: competition.date.day,
              year: competition.date.year,
              month: competition.date.month
            },
            regLink: competition.regLink,
            time: competition.time
          };
          // time: competition.time,
    }
    this.http
      .put("http://localhost:5000/api/competitions/" + competition._id, CompetitionData)
      .subscribe(temp => {
        const updatedCompetitions = [...this.competitions];
        const oldPostIndex = updatedCompetitions.findIndex(p => p._id === competition._id);
        // console.log(responseData)
        // console.log("dkfsa" );
        // console.log(temp["b"]);
        // console.log(oldPostIndex);
        // console.log(updatedLectures[oldPostIndex]);
        updatedCompetitions[oldPostIndex] = temp["b"];
        this.competitions = updatedCompetitions;
        // this.lectures.push(temp["b"]);
        this.competitionsUpdated.next([...this.competitions]);
        }
      );
  }

}
