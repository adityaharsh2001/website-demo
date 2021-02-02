export interface Competition {
  _id: string,
  title: string,
  description: string
  imagePath: string,
  status: string,
  date:{
    year: string,
    month: string,
    day:string
  },
  regLink: string,
  time: string,
}
// time: string,
