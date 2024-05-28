import * as dao from "./productDAO";
import { Product } from "./definitions";
const default_list = require("@/scripts/defaultProducts");

export async function test() {
  console.log("----------------------------------------------------------------------")
  //Inserción
  console.log("inserto un nuevo producto.")
  let nuevo : Product= {
      product_id: 0,
      name: "The Queen Is Dead",
      artist: "The Smiths",
      image: "/queen_is_dead.jpg",
      price: 25.99,
      state: true,
      description: "Descripción del producto...",
      genre: "Rock",
      format: "LP",
      release_date: "1986-06-16",
      sold: 0
    }
  let resultado : Product = await dao.insertProduct(nuevo);

  console.log("Producto insertado: ")
  console.log(resultado)

  //Get por nombre
  console.log("busco por nombre:");
  let results: Product[] = await dao.getProductsByName("The Queen Is Dead");
  let result = results[0]
  console.log(result)

  //busco por id:
  console.log(`busco por id: ${result.product_id}`)
    let p = await dao.getProductById(result.product_id)
  console.log(p)

  //muestro todo
  console.log("muestro todos:")
  let ps: Product[] = await dao.getAllProducts();
  ps.map((p) => console.log(p.name));
  
  //elimino:
  if(true){
    console.log("elimino:")
    console.log(await dao.deleteProduct(result.product_id))
  }

  //muestro todo
  console.log("muestro todos:")
  let ps2: Product[] = await dao.getAllProducts();
  ps2.map((p) => console.log(p.name));


  //seedProducts();
}

async function seedProducts() {
  default_list.map(
    (prod: { name: string; 
            artist: string; 
            image: string; 
            price: number; 
            state: boolean; 
            description: string; 
            genre: string; 
            format: string; 
            release_date: string; }) => {
      let p: Product = {
        product_id: 0,
        name: prod.name,
        artist: prod.artist,
        image: prod.image,
        price: prod.price,
        state: true,
        description: prod.description,
        genre: prod.genre,
        format: prod.format,
        release_date: prod.release_date,
        sold: 0
      };dao.insertProduct(p)}
  )
}