import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Lecture } from "./lecture.model";

@Injectable({ providedIn: "root" })
export class LecturesService {
  private lectures: Lecture[] = [];
  private lecturesUpdated = new Subject<Lecture[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getLectures() {
    this.http
    .get<{ message: string; lectures: any }>("http://localhost:5000/api/lectures")
    .pipe(
      map(lectureData => {
        return lectureData.lectures.map(lecture => {
          // console.log(lecture);
          return {
            name: lecture.name,
            profession: lecture.profession,
            _id: lecture._id,
            imagePath: lecture.imagePath,
            status: lecture.status,
            date: lecture.date,
            regLink: lecture.regLink,
            lectureTitle: lecture.lectureTitle,
            time: lecture.time
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.lectures = transformedPosts;
      // console.log(this.lectures);
      this.lecturesUpdated.next([...this.lectures]);
    });

  }

  getLectureUpdateListener() {
    return this.lecturesUpdated.asObservable();
  }

  findLecture(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
       profession:string;
      date:{year:string; day:string; month:string;};
      status:string;
      imagePath:string;
      regLink:string;
      lectureTitle:string;
      time: string;
    }>(
      "http://localhost:5000/api/lectures/" + id
    );
  }


  addLecture(lecture, image:File) {
    const lectureData = new FormData();
    lectureData.append("name", lecture.name);
    lectureData.append("profession", lecture.profession);
    lectureData.append("lectureTitle", lecture.lectureTitle);
    lectureData.append("status", (lecture.status).toString());
    lectureData.append("regLink", lecture.regLink);
    lectureData.append("year", lecture.date.year);
    lectureData.append("month", lecture.date.month);
    lectureData.append("day", lecture.date.day);
    lectureData.append("imagePath", lecture.image, lecture.name);
    lectureData.append("time", lecture.time);

    this.http
      .post<{ message: string; lec: Lecture }>(
        "http://localhost:5000/api/lectures",
        lectureData
      )
      .subscribe(responseData => {
        // console.log(responseData);
    });
  }

  deleteLecture(lectureId: string) {
    this.http
      .delete("http://localhost:5000/api/lectures/" + lectureId)
      .subscribe(() => {
        const updatedLectures = this.lectures.filter(lecture => lecture._id !== lectureId);
        this.lectures = updatedLectures;
        this.lecturesUpdated.next([...this.lectures]);
      });
  }


  updateLecture(lecture, image: File | string) {
    let LectureData: Lecture | FormData;
    if (typeof image === "object") {
      LectureData = new FormData();
      LectureData.append("name", lecture.name);
    LectureData.append("profession", lecture.profession);
    LectureData.append("lectureTitle", lecture.lectureTitle);
    LectureData.append("year", lecture.date.year);
    LectureData.append("month", lecture.date.month);
    LectureData.append("day", lecture.date.day);
    LectureData.append("regLink", lecture.regLink);
    LectureData.append("status", (lecture.status).toString());
    LectureData.append("imagePath", lecture.image, lecture.name);
    LectureData.append("time", lecture.time);
    }
    else {
      LectureData = {
        _id: lecture._id,
        name: lecture.name,
        profession: lecture.profession,
        lectureTitle: lecture.lectureTitle,
        regLink: lecture.regLink,
        status: lecture.status,
        date:{
          day: lecture.date.day,
          year: lecture.date.year,
          month: lecture.date.month
        },
        imagePath: image,
        time: lecture.time
      };
    }
    this.http
      .put("http://localhost:5000/api/lectures/" + lecture._id, LectureData)
      .subscribe(response => {
        console.log(response);
        }

      );
  }

}
