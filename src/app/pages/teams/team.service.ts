import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Team } from "./team.model";

@Injectable({ providedIn: "root" })
export class TeamsService {
  private teams: Team[] = [];
  private teamUpdated = new Subject<Team[]>();


  constructor(private http: HttpClient, private router: Router) {}

  getTeams() {
    this.http
    .get<{ message: string; teams: any }>("http://localhost:5000/api/teams")
    .pipe(
      map(teamData => {
        return teamData.teams.map(team => {
          // console.log(lecture);
          return {
            _id: team._id,
            name: team.name,
            designation: team.designation,
            imagePath: team.imagePath,
            linkedin: team.linkedin,
            mailId: team.mailId,
            contact: team.contact
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.teams = transformedPosts;
      // console.log(this.lectures);
      this.teamUpdated.next([...this.teams]);
    });

  }

  getTeamUpdateListener() {
    return this.teamUpdated.asObservable();
  }

  findTeam(id: string) {
    return this.http.get<{
        _id: string,
        name: string,
        designation: string
        imagePath: string,
        linkedin: string
        mailId: string,
        contact: string,
    }>(
      "http://localhost:5000/api/teams/" + id
    );
  }


  addTeam(team, image:File) {
    const teamData = new FormData();
    teamData.append("name", team.name);
    teamData.append("designation", team.designation);
    teamData.append("imagePath", team.image, team.name);
    teamData.append("linkedin", team.linkedin);
    teamData.append("mailId", team.mailId);
    teamData.append("contact", team.contact);


    this.http
      .post<{ message: string; lec: Team }>(
        "http://localhost:5000/api/teams",
        teamData
      )
      .subscribe(responseData => {
        // console.log(responseData);
    });
  }

  deleteTeam(teamId: string) {
    this.http
      .delete("http://localhost:5000/api/teams/" + teamId)
      .subscribe(() => {
        const updatedTeams = this.teams.filter(lecture => lecture._id !== teamId);
        this.teams = updatedTeams;
        this.teamUpdated.next([...this.teams]);
      });
  }


  updateTeam(team, image: File | string) {
    let TeamData: Team | FormData;
    if (typeof image === "object") {
        TeamData = new FormData();
        TeamData.append("name", team.name);
        TeamData.append("designation", team.designation);
        TeamData.append("imagePath", team.image, team.name);
        TeamData.append("linkedin", team.linkedin);
        TeamData.append("mailId", team.mailId);
        TeamData.append("contact", team.contact);
    }
    else {
      TeamData = {
        _id: team._id,
        name: team.name,
        designation: team.designation,
        imagePath: team.imagePath,
        linkedin: team.linkedin,
        mailId: team.mailId,
        contact: team.contact
      };
    }
    this.http
      .put("http://localhost:5000/api/teams/" + team._id, TeamData)
      .subscribe(response => {
        console.log(response);
        }

      );
  }

}
