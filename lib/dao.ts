const { db } = require('@vercel/postgres');
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Product, User } from './definitions';

export async function insertProduct(product: Omit<Product, 'product_id'>): Promise<Product> {
  try {
    noStore();
    const { name, artist, image, price, state, description, genre, format, release_date, sold } = product;
    const result = await sql<Product>
      `INSERT INTO products (name, artist, image, price, state, description, genre, format, release_date, sold)
     VALUES (${name},${artist},${image},${price},${state},
     ${description},${genre},${format},${release_date},${sold})
     RETURNING *`
     console.log(`insertado: ${name}`)
    return result.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}
//falla
export async function getProductById(product_id: number): Promise<Product> {
  try {
    noStore();
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
    noStore();
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
    noStore();
    const result = await sql<Product>`SELECT * FROM products`
    return result.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function getMostRecentProducts(cant: number): Promise<Product[]> {
  try {
    noStore();
    const result = await sql<Product>`SELECT * FROM products ORDER BY release_date DESC LIMIT ${cant}`
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
    noStore();
    const result = await sql<Product>`SELECT * FROM products WHERE sold > ${amount-1}`
    return result.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function updateProduct(product_id: number, updates: Product): Promise<Product> {
  try {
    throw new Error("update sin implementar")
    noStore();
    const { name, artist, image, price, state, description, genre, format, release_date, sold } = updates;
    const result = await db.query(
      `UPDATE products
       SET name = $1, artist = $2, image = $3, price = $4, state = $5, description = $6, genre = $7, format = $8, release_date = $9, sold = $10
       WHERE product_id = $11
       RETURNING *`,
      [name, artist, image, price, state, description, genre, format, release_date, sold, product_id]
    );
    return result.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function deleteProduct(product_id: number) {
  try {
    noStore();
    await sql`DELETE FROM products WHERE product_id = ${product_id}`;
    return { message: 'Product deleted successfully' };
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

export async function getUser(email: string) : Promise<User>{
  try {
    noStore();
    const result = await sql<User>`SELECT * FROM users WHERE e_mail = ${email}`
    return result.rows[0];
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch.');
  }
}

//funciones auxiliares 

export async function borrarDuplicados(){
  try {
    noStore();
    await sql`
      WITH duplicates AS (
        SELECT 
            product_id,
            ROW_NUMBER() OVER (PARTITION BY name ORDER BY product_id) AS row_num
        FROM 
            products
      )
      DELETE FROM products
      WHERE product_id IN (
          SELECT product_id
        FROM duplicates
        WHERE row_num > 1
      );`
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete.');
  }
}

const itemsPerPage = 12; 
export async function fetchFilteredProducts (
  query: string,
  currentPage: number,
){
  try {
    noStore();
   
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

  
  export async function fetchTotalPages(query: string) {
    noStore();
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