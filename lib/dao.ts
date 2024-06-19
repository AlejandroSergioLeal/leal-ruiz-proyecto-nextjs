
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Product, User } from './definitions';
import { delay, systemDate } from './utils';

export async function insertProduct(p: Product): Promise<Product> {
  try {
    //
    console.log(p)
    const date = systemDate();
    const result = await sql<Product>
      `INSERT INTO products (name, artist, image, price, state, description, genre, format, release_date, sold)
     VALUES (${p.name},${p.artist},${p.image},${p.price},${p.state},
     ${p.description},${p.genre},${p.format},${date},0)
     RETURNING *`
     console.log(`insertado: ${p.name}`)
    return result.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}



export async function updateProduct(p: Product): Promise<boolean>{
  try {
    //
    let res = false;
    const result = await sql<Product>
      `UPDATE products
      SET name = ${p.name},
          artist = ${p.artist},
          image = ${p.image},
          price =  ${p.price},
          state = ${p.state},
          description =  ${p.description},
          genre =  ${p.genre},
          format =  ${p.format}
      WHERE product_id = ${p.product_id};`
     console.log(`actualizado`)
    res = true;
    return res;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update.');
  }
}

export async function getProductById(product_id: number): Promise<Product> {
  try {
    //
    const result = await sql<Product>`SELECT * FROM products WHERE product_id = ${product_id}`
    const res = result.rows[0];
    return res;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function getProductsByName(n: string): Promise<Product[]> {
  try {
    //
    const result = await sql<Product>`SELECT * FROM products WHERE name = ${n}`
    return result.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    //
    const result = await sql<Product>`SELECT * FROM products`
    return result.rows;
  }
  catch (error) {
    console.log('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function getMostRecentProducts(cant: number): Promise<Product[]> {
  try {
    //
    const result = await sql<Product>`SELECT * FROM products WHERE state = 'true' ORDER BY release_date DESC LIMIT ${cant}`
    return result.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

//retorna los productos con ventas mayor o iguales a amount
export async function getProductsByMinSales(amount : number){
  try {
    //
    const result = await sql<Product>`SELECT * FROM products WHERE sold > ${amount-1} AND
          state = 'true'`
    return result.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}


export async function deleteProduct(product_id: number) {
  try {
    //
    await sql`DELETE FROM products WHERE product_id = ${product_id}`;
    return true;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete.');
  }
}

export async function getUser(email: string) : Promise<User>{
  try {
    //
    const result = await sql<User>`SELECT * FROM users WHERE e_mail = ${email}`
    return result.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}


const itemsPerPage = 12; 
export async function fetchFilteredProducts (
  query: string,
  currentPage: number,
){
  try {
    //
   
    const offset = (currentPage - 1) * itemsPerPage;

    const result = await sql<Product>`
      SELECT * FROM products
      WHERE 
        name ILIKE ${`%${query}%`} OR
        artist ILIKE ${`%${query}%`} OR
        genre ILIKE ${`%${query}%`}
      LIMIT ${itemsPerPage} OFFSET ${offset};
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }

  }

  export async function fetchFilteredProductsForAdminTable (
    query: string,
    currentPage: number,
  ){
    try {
      //
     
      const offset = (currentPage - 1) * itemsPerPage;
  
      const result = await sql<Product>`
        SELECT product_id,artist,name,price,state FROM products
        WHERE 
          name ILIKE ${`%${query}%`} OR
          artist ILIKE ${`%${query}%`}
        ORDER BY name
        LIMIT ${itemsPerPage} OFFSET ${offset};
      `;
      return result.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products.');
    }
  
    }

  export async function fetchTotalPages(query: string) {
    //
    try {
      const count = await sql`SELECT COUNT(*)
      FROM products
      WHERE
      name ILIKE ${`%${query}%`} OR
      artist ILIKE ${`%${query}%`} OR
      genre ILIKE ${`%${query}%`};
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / itemsPerPage);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }


  export async function fetchFilteredActiveProducts (
    query: string,
    currentPage: number,
  ){
    try {
      noStore();
     
      const offset = (currentPage - 1) * itemsPerPage;
  
      const result = await sql<Product>`
        SELECT * FROM products
        WHERE 
          (name ILIKE ${`%${query}%`} OR
          artist ILIKE ${`%${query}%`} OR
          genre ILIKE ${`%${query}%`}) AND
          state = 'true'
        LIMIT ${itemsPerPage} OFFSET ${offset};
      `;
      return result.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products.');
    }
  
  }
  

  export async function fetchTotalActivePages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM products
      WHERE
        (name ILIKE ${`%${query}%`} OR
        artist ILIKE ${`%${query}%`} OR
        genre ILIKE ${`%${query}%`}) AND
        state = 'true';
      `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / itemsPerPage);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }
  