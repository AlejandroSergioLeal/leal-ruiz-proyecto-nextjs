import * as dao from "@/lib/productDAO"
const default_list = require("./defaultProducts");

async function seedProducts(){
    default_list.map(
        (prod) =>
        dao.insertProduct({name: prod.name, 
                        artist: prod.artist, 
                        image: prod.image,
                        price: prod.price, 
                        state: prod.state, 
                        description: prod.description, 
                        genre: prod.genre, 
                        format: prod.format, 
                        release_date: prod.release_date, 
                        sold: 0})
    )
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
  