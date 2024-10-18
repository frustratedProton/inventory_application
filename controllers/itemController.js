import * as db from '../db/queries.js';

export const getAllItems = async (req, res) => {
    const items = await db.getAllItems();
    res.render('items', { items: items });
};

export const viewItem = async (req, res) => {
    const { id } = req.params;
    const items = await db.getItemById(id);
    const item = items[0];
    if (item) {
        res.render('item', { item: item });
    } else {
        res.status(404).send('Item not found');
    }

};

export const createItem = async (req, res) => {
    const { name, description, quantity, category_id } = req.body;

    if (!name || !description || !quantity || !category_id) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await db.createItem(name, description, quantity, category_id);
        res.redirect(`/items`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating item');
    }
};

export const renderCreateItemForm = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('newItem', { categories });
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, category_id } = req.body;

    if (!name || !description || !quantity || !category_id) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const updatedItem = await db.updateItemInDb(id, name, description, quantity, category_id);

        if (!updatedItem) {
            return res.status(404).send('Item not found');
        }

        res.redirect(`/items/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating item');
    }
};

export const renderUpdateItemForm = async (req, res) => {
    const { id } = req.params;
    try {
        const displayItem = await db.getItemById(id);
        const item = displayItem[0];
        if (!item) {
            return res.status(404).send('Item not found');
        }

        res.render('updateItem', { item });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving item');
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await db.deleteItemById(id);

        if (!deletedItem) {
            return res.status(404).send('Item not found');
        }

        res.redirect('/items');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item');
    }
};
