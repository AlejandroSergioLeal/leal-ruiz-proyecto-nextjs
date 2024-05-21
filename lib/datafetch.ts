import { sql } from '@vercel/postgres';
const PRODUCTS_PER_PAGE = 5;


export async function fetchAllProducts(){
    try{
        const allProducts = await sql`
        SELECT * FROM products
    `
        return allProducts.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
      }
}

export async function fetchPages(){

}