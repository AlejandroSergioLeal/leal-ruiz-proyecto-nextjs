const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function createTables(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        //Tabla de productos:
       const createEnumType = `
            DO $$ BEGIN
                CREATE TYPE product_format AS ENUM ('LP', 'EP', 'Single', 'BoxSet');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
`;
        const createProductsTable = await client.sql`
            CREATE TABLE IF NOT EXISTS products (
                product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL, 
                artist VARCHAR(127) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(4, 2) NOT NULL,
                state BOOLEAN NOT NULL,
                description VARCHAR(255) NOT NULL,
                genre UUID NOT NULL,
                format product_format NOT NULL,
                release_data DATE NOT NULL,
                sold INT NOT NULL
            );`
        
        //Tabla de categorias
        const createGenreTable = await client.sql`
    |       CREATE TABLE IF NOT EXISTS genres (
                genre_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL
            );`
        
        //Tabla de usuarios
        const createUserTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users_vinylparadise (
                user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL,
                lastname VARCHAR(127) NOT NULL,
                e_mail VARCHAR(127) NOT NULL,
                admin BOOLEAN NOT NULL
            );`

        //Tabla de imagenes
        const createProductImagesTable = await client.sql`
    |       CREATE TABLE IF NOT EXISTS productImages (
                productImg_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                product_id UUID NOT NULL,
                assetId INT NOT NULL,
                url VARCHAR(255) NOT NULL
            );`
        
        //Tabla de ventas 
        const createSalesTable = await client.sql`
            CREATE TABLE IF NOT EXISTS sales(
                sale_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                date DATE NOT NULL,
                t_ID_MP VARCHAR(255) NOT NULL,
                person_email VARCHAR(255) NOT NULL
            )
        `
        //Tabla detalles ventas 
        const createSalesDetailsTable = await client.sql`
            CREATE TABLE IF NOT EXISTS sales_details(
                sale_details_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                price DECIMAL(4,2) NOT NULL,
                quantity INT NOT NULL, 
                subtotal DECIMAL(4,2) NOT NULL,
                sale_id UUID NOT NULL,
                product_id UUID NOT NULL
            )
        `

    }
    catch (error){
        console.error('Error creado tablas.',error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    //createTables(client);
    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});