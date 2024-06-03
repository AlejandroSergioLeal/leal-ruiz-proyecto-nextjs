const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
async function createProductsTable(client) {
    try {
        const createProductsTable = await client.sql`
            CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                name VARCHAR(127) NOT NULL, 
                artist VARCHAR(127) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(4, 2) NOT NULL,
                state BOOLEAN NOT NULL,
                description VARCHAR(255) NOT NULL,
                genre VARCHAR(255) NOT NULL,
                format VARCHAR(127) NOT NULL,
                release_date DATE NOT NULL,
                sold INT NOT NULL
            );`

    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}

async function createProductImagesTable(client) {
    try {
        //Tabla de imagenes
        const createProductImagesTable = await client.sql`
        CREATE TABLE IF NOT EXISTS productImages (
            productImg_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            product_id UUID NOT NULL,
            assetId INT NOT NULL,
            url VARCHAR(255) NOT NULL
        );`
    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}

async function createGenreTable(client) {
    try {
        //Tabla de categorias
        const createGenreTable = await client.sql`
            CREATE TABLE IF NOT EXISTS genres (
                genre_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(127) NOT NULL
            );`
    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}

async function createSalesTable(client) {
    try {
        const createSalesTable = await client.sql`
        CREATE TABLE IF NOT EXISTS sales(
            sale_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            date DATE NOT NULL,
            t_ID_MP VARCHAR(255) NOT NULL,
            person_email VARCHAR(255) NOT NULL
        )
    `
    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}
async function createSalesDetailsTable(client) {
    try {
        const createSalesDetailsTable = await client.sql`
        CREATE TABLE IF NOT EXISTS sales_details(
            sale_details_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            price DECIMAL(4,2) NOT NULL,
            quantity INT NOT NULL, 
            subtotal DECIMAL(4,2) NOT NULL,
            sale_id UUID NOT NULL,
            product_id UUID NOT NULL
        );
    `
    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}

async function createUserTable(client) {
    try {
        const createUserTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(127) NOT NULL,
            lastname VARCHAR(127) NOT NULL,
            e_mail VARCHAR(127) NOT NULL,
            password VARCHAR(127) NOT NULL,
            admin BOOLEAN NOT NULL
        );`
    }
    catch (error) {
        console.error('Error creado tablas.', error);
        throw error;
    }
}

async function createUser(client,name,lname,email,pswd,adm){
    const hashpw = await bcrypt.hash(pswd, 10);
    const user = await client.sql`
    INSERT INTO users (id, name, lastname, e_mail, password,admin)
    VALUES (uuid_generate_v4(), ${name}, ${lname},${email}, ${hashpw},${adm})
    ON CONFLICT (id) DO NOTHING;`
  
}

async function main() {
    const client = await db.connect();
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    //await createProductsTable(client);
    //await createGenreTable(client);
    //await createUserTable(client);
    //await createUser(client,"Ale","Leal","iaw2024@correo.com","sasasasa",true);
    //await createSalesTable(client);
    //await createSalesDetailsTable(client);
    //await createProductImagesTable(client);
    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});