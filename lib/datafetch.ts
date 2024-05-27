import { sql } from '@vercel/postgres';
import { Product } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
const PRODUCTS_PER_PAGE = 5;


export async function fetchTest(): Promise<Product[]>{
    try{
        const allProducts = await sql<Product>`
        SELECT * FROM prodtest2
    `
        return allProducts.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch.');
      }
}


  
export async function fetchProductById(productId: string): Promise<Product> {
    noStore();
    try{

        const data = await sql<Product>`
            SELECT * FROM prodtest2
            WHERE pId = ${productId}   
            `
            console.log(data);
            return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch.');
    }
}

export async function fetchPages(){

}

