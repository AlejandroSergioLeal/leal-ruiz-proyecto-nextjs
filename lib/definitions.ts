export type User = {
  id?: string,
  name: string,
  e_mail: string,
  password: string,
  admin: boolean
}

export type Product = {
  product_id : number
  name: string,
  artist: string
  image: string,
  price: number,
  state: boolean,
  description: string,
  genre: string,
  format: string,
}

export type Sale = {
  sale_id : number,
  date: Date,
  person_email: string,
  t_id_mp: number,
  completed: boolean
}

export interface Detail extends Sale{
  sale_id: number,
  quantity: number,
  product_name : string,
  subtotal : number,
  date : Date,
  person_email : string,
  completed: boolean,
  t_id_mp: number
}