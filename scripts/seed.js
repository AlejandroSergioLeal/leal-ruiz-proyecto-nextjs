const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function createTables(client){
    try{
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        //Tabla de productos:
        const createProductsTable = await client.sql`
            CREATE TABLE IF NOT EXISTS products (
                product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL, 
                artist VARCHAR(127) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(4, 2) NOT NULL,
                state VARCHAR(10) NOT NULL,
                description VARCHAR(255) NOT NULL,
                genre INT NOT NULL,
                format ENUM('LP','EP','Single','BoxSet'),
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
            CREATE TABLE IF NOT EXISTS users (
                user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL,
                lastname VARCHAR(127) NOT NULL,
                e_mail VARCHAR(127) NOT NULL,
                admin BOOLEAN NOT NULL
            );`

        //Tabla de ventas (TO DO)
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