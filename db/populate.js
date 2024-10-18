#!/usr/bin/env node

import pkg from 'pg';
const { Client } = pkg;

const args = process.argv.slice(2);

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) UNIQUE NOT NULL,
    description TEXT,                                
    type VARCHAR(50) NOT NULL,                      
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL
);

INSERT INTO categories (name, description, type) 
VALUES 
    ('High Grade', 'High-quality model kits', 'Grade'),
    ('Real Grade', 'Detailed models with small parts', 'Grade'),
    ('Gunpla Tools', 'Tools used for building Gunpla', 'Tool');

INSERT INTO items (category_id, name, description, quantity) 
VALUES 
    ((SELECT id FROM categories WHERE name = 'High Grade'), 'RG RX-78-2', 'Real Grade RX-78-2 Gundam model', 10),
    ((SELECT id FROM categories WHERE name = 'Gunpla Tools'), 'Sprue Cutter', 'Tool for cutting plastic sprues', 15),
    ((SELECT id FROM categories WHERE name = 'Real Grade'), 'RG Unicorn Gundam', 'Real Grade Unicorn Gundam model', 5);
`;

(async () => {
    console.log("Seeding...");
    const client = new Client({
        connectionString: args[0] || process.env.DB_URL,
    })

    try {
        await client.connect();
        await client.query(SQL);
        console.log("Database seeded successfully.");
    } catch (err) {
        console.error("Error executing query: ", err.stack);
    } finally {
        await client.end();
        console.log("Done");
    }
})();