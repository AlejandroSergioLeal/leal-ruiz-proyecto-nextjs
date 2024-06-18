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