export type User = {
  id?: string,
  name: string,
  e_mail: string,
  password: string,
  admin: boolean
}

export type Product = {
  product_id: number,
  name: string,
  artist: string
  image: string,
  price: number,
  state: boolean,
  description: string,
  genre: string,
  format: string,
  release_date: string,
  sold: number
}

export function createProduct(n: string, ar: string, im: string, pr: number, st: boolean,
  desc: string, g: string, f: string, date: string, sld: number): Product {
  let p: Product = {
    product_id: 0,
    name: n,
    artist: ar,
    image: im,
    price: pr,
    state: st,
    description: desc,
    genre: g,
    format: f,
    release_date: date,
    sold: sld
  }
  return p;
}