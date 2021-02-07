import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Sponsor } from "./sponsor.model";

@Injectable({ providedIn: "root" })
export class SponsorsService {
  private sponsors: Sponsor[] = [];
  private sponsorsUpdated = new Subject<Sponsor[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getSponsors() {
    this.http
    .get<{ message: string; sponsors: any }>("http://localhost:5000/api/sponsors")
    .pipe(
      map(sponsorData => {
        return sponsorData.sponsors.map(sponsor => {
          // console.log(lecture);
          return {
            _id: sponsor._id,
            sponsorName: sponsor.sponsorName,
            imagePath: sponsor.imagePath,
            status: sponsor.status,
            sponsorTitle: sponsor.sponsorTitle,
            year: sponsor.year,
            link: sponsor.link
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.sponsors = transformedPosts;
      // console.log(this.lectures);
      this.sponsorsUpdated.next([...this.sponsors]);
    });

  }

  getSponsorUpdateListener() {
    return this.sponsorsUpdated.asObservable();
  }

  findSponsor(id: string) {
    return this.http.get<{
        _id: string,
        sponsorName: string,
        imagePath: string,
        status: boolean,
        sponsorTitle: string,
        year: string,
        link: string
    }>(
      "http://localhost:5000/api/sponsors/" + id
    );
  }


  addSponsor(sponsor, image:File) {
    const sponsorData = new FormData();
    sponsorData.append("sponsorName", sponsor.sponsorName);
    sponsorData.append("imagePath", sponsor.image, sponsor.name);
    sponsorData.append("status", sponsor.status);
    sponsorData.append("sponsorTitle", sponsor.sponsorTitle);
    sponsorData.append("year", sponsor.year);
    sponsorData.append("link", sponsor.link);

      // console.log(sponsor);

    this.http
      .post(
        "http://localhost:5000/api/sponsors",
        sponsorData
      )
      .subscribe(temp => {
        // console.log(responseData);
        console.log(temp["b"]);

        this.sponsors.push(temp["b"]);
        this.sponsorsUpdated.next([...this.sponsors]);

    });
  }

  deleteSponsor(sponsorId: string) {
    this.http
      .delete("http://localhost:5000/api/sponsors/" + sponsorId)
      .subscribe(() => {
        const updatedLectures = this.sponsors.filter(sponsor => sponsor._id !== sponsorId);
        this.sponsors = updatedLectures;
        this.sponsorsUpdated.next([...this.sponsors]);
      });
  }


  updateSponsor(sponsor, image: File | string) {
    let SponsorData: Sponsor | FormData;
    if (typeof image === "object") {
    SponsorData = new FormData();
    SponsorData.append("sponsorName", sponsor.sponsorName);
    SponsorData.append("imagePath", sponsor.image, sponsor.name);
    SponsorData.append("status", sponsor.status);
    SponsorData.append("sponsorTitle", sponsor.sponsorTitle);
    SponsorData.append("year", sponsor.year);
    SponsorData.append("link", sponsor.link);
    }
    else {
        SponsorData = {
            _id: sponsor._id,
            sponsorName: sponsor.sponsorName,
            imagePath: sponsor.imagePath,
            status: sponsor.status,
            sponsorTitle: sponsor.sponsorTitle,
            year: sponsor.year,
            link: sponsor.link
      };
    }
    this.http
      .put("http://localhost:5000/api/sponsors/" + sponsor._id, SponsorData)
      .subscribe(temp => {
        const updatedSponsor = [...this.sponsors];
        const oldPostIndex = updatedSponsor.findIndex(p => p._id === sponsor._id);
        // console.log(responseData)
        // console.log("dkfsa" );
        // console.log(temp["b"]);
        // console.log(oldPostIndex);
        // console.log(updatedLectures[oldPostIndex]);
        updatedSponsor[oldPostIndex] = temp["b"];
        this.sponsors = updatedSponsor;
        // this.lectures.push(temp["b"]);
        this.sponsorsUpdated.next([...this.sponsors]);
        }

      );
  }

}
