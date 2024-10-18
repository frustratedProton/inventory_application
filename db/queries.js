import pool from './pool.js';

export const getAllItems = async () => {
    const { rows } = await pool.query('SELECT * FROM items');
    console.log(rows);
    return rows;
};

export const getItemById = async (id) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [
        id,
    ]);
    return rows;
};

export const createItem = async (name, description, quantity, category_id) => {
    await pool.query(
        'INSERT INTO items (name, description, quantity, category_id) VALUES ($1, $2, $3, $4)',
        [name, description, quantity, category_id]
    );
};

export const updateItemInDb = async (
    id,
    name,
    description,
    quantity,
    category_id
) => {
    const result = await pool.query(
        'UPDATE items SET name = $1, description = $2, quantity = $3, category_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
        [name.trim(), description.trim(), quantity, category_id, id]
    );

    return result.rows[0];
};

export const deleteItemById = async (id) => {
    const result = await pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

export const getAllCategories = async () => {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
};

export const getCategoryById = async (id) => {
    const { rows } = await pool.query(
        'SELECT * FROM categories WHERE id = $1',
        [id]
    );
    return rows[0];
};

export const createCategory = async (name, description, type) => {
    await pool.query(
        'INSERT INTO categories (name, description, type) VALUES ($1, $2, $3)',
        [name, description, type]
    );
};

export const updateCategory = async (name, description, type, id) => {
    const result = await pool.query(
        'UPDATE categories SET name = $1, description = $2, type = $3 WHERE id = $4 RETURNING *',
        [name.trim(), description.trim(), type, id]
    );

    return result.rows[0];
};

export const deleteCategoryById = async (id) => {
    const result = await pool.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};