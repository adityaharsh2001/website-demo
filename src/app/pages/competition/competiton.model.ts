export interface Competition {
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
}
