import * as dao from "@/lib/productDAO"
const default_list = require("./defaultProducts");

async function seedProducts(){
  const p = {
    product_id: 0,
    name: "Test Album",
    artist: "Artisto",
    description:"this is a description",
    format: "LP",
    genre: "Pop",
    image: "/default_disc.jpg",
    price: 10.50,
    state: true
}
  dao.insertProduct(p)
}

async function main() {
    //const client = await db.connect();
    await seedProducts()
    //await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
  