export interface Lecture {
  name: string,
  profession: string
  status: string,
  lectureTitle: string,
  date:{
    year: {type : String, requied: true},
    month: {type : String, requied: true},
    day: {type : String, requied: true}
  },
  regLink: string
  imagePath: string,
}

// time: string,
