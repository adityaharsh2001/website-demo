export interface Lecture {
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
}
