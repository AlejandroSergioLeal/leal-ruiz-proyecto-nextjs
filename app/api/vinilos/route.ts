"server only"

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Product } from '@/lib/definitions';



export async function GET() {
    const products = await sql<Product[]>`SELECT name, artist, price FROM products`;

    const data = products.rows;
    return NextResponse.json(data);
}