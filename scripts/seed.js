const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const productlist = require('./testdata.js');

async function seedProducts(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "products" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(4, 2) NOT NULL
  );
`;

        console.log(`Created "products" table`);

        // Insert data into the "products" table
        const insertedProducts = await Promise.all(
            productlist.map(
                (prod) => client.sql`
        INSERT INTO products(product_name,autor,image_url,description,price)
        VALUES (${prod.name}, ${prod.artist}, "[img_link]", ${prod.description},${prod.price})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedProducts.length} products (of ${productlist.length})`);

        return {
            createTable,
            insertedProds: insertedProducts,
        };
    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
}
async function dropProducts(client) {
    try {
        const dropTable = await client.sql`
    DROP TABLE IF EXISTS products;
`;

        console.log(`droped "products" table`);
    } catch (error) {

        console.error('Error droping products:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedProducts(client);
    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
