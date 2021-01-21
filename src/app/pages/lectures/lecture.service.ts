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

  // getPosts() {
  //   this.http
  //     .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
  //     .pipe(
  //       map(postData => {
  //         return postData.posts.map(post => {
  //           return {
  //             title: post.title,
  //             content: post.content,
  //             id: post._id,
  //             imagePath: post.imagePath
  //           };
  //         });
  //       })
  //     )
  //     .subscribe(transformedPosts => {
  //       this.posts = transformedPosts;
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }

  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }

  // getPost(id: string) {
  //   return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>(
  //     "http://localhost:3000/api/posts/" + id
  //   );
  // }

  addPost(lecture) {
    const lectureData = new FormData();
    lectureData.append("name", lecture.name);
    lectureData.append("profession", lecture.profession);
    lectureData.append("lectureTitle", lecture.lectureTitle);
    lectureData.append("date", lecture.date);
    lectureData.append("regLink", lecture.regLink);
    lectureData.append("status", (lecture.status).toString());
    lectureData.append("imagePath", lecture.imagePath, lecture.name);
    console.log(lecture);
    // console.log(lecture.name);
    // console.log(lectureData);

    this.http
      .post<{ message: string; lec: Lecture }>(
        "http://localhost:5000/api/lectures",
        lecture
      )
      .subscribe(responseData => {
        // const lect: Lecture = {
        //   name: responseData.lec.name,
        //   lectureTitle: responseData.lec.lectureTitle,
        //   date: responseData.lec.date,
        //   profession: responseData.lec.profession,
        //   regLink: responseData.lec.regLink,
        //   status: responseData.lec.status
        // };
        console.log(responseData);
    // this.lectures.push(lect);
    // this.lecturesUpdated.next([...this.lectures]);
    // this.router.navigate(["/"]);
    });
  }



  // updatePost(id: string, title: string, content: string, image: File | string) {
  //   let postData: Post | FormData;
  //   if (typeof image === "object") {
  //     postData = new FormData();
  //     postData.append("id", id);
  //     postData.append("title", title);
  //     postData.append("content", content);
  //     postData.append("image", image, title);
  //   } else {
  //     postData = {
  //       id: id,
  //       title: title,
  //       content: content,
  //       imagePath: image
  //     };
  //   }
  //   this.http
  //     .put("http://localhost:3000/api/posts/" + id, postData)
  //     .subscribe(response => {
  //       const updatedPosts = [...this.posts];
  //       const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
  //       const post: Post = {
  //         id: id,
  //         title: title,
  //         content: content,
  //         imagePath: ""
  //       };
  //       updatedPosts[oldPostIndex] = post;
  //       this.posts = updatedPosts;
  //       this.postsUpdated.next([...this.posts]);
  //       this.router.navigate(["/"]);
  //     });
  // }

  // deletePost(postId: string) {
  //   this.http
  //     .delete("http://localhost:3000/api/posts/" + postId)
  //     .subscribe(() => {
  //       const updatedPosts = this.posts.filter(post => post.id !== postId);
  //       this.posts = updatedPosts;
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }
}
