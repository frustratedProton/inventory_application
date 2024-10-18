import * as db from '../db/queries.js';
import { body, param, validationResult } from 'express-validator';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateId = [
    param('id')
        .exists()
        .withMessage('ID is required')
        .isInt({ gt: 0 })
        .withMessage('ID must be a positive integer'),
];

export const validateItem = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isAlpha()
        .withMessage(alphaErr)
        .isLength({ min: 1, max: 10 })
        .withMessage(lengthErr),
    body('description').exists().withMessage('Description is required'),
    body('quantity')
        .exists()
        .withMessage('Quantity is required')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be a positive integer'),
    body('category_id')
        .exists()
        .withMessage('Category ID is required')
        .isInt()
        .withMessage('Category ID must be an integer'),
];

export const getAllItems = async (req, res) => {
    const items = await db.getAllItems();
    res.render('items', { items });
};

export const viewItem = [
    validateId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const items = await db.getItemById(id);
        const item = items[0];
        if (item) {
            res.render('item', { item });
        } else {
            res.status(404).send('Item not found');
        }
    },
];

export const createItem = [
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const categories = await db.getAllCategories();
            return res.status(400).render('newItem', {
                errors: errors.array(),
                categories,
            });
        }

        const { name, description, quantity, category_id } = req.body;

        try {
            await db.createItem(name, description, quantity, category_id);
            return res.redirect('/items');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating item');
        }
    },
];

export const renderCreateItemForm = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render('newItem', { categories });
};

export const updateItem = [
    validateId,
    validateItem,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const { id } = req.params;
            const displayItem = await db.getItemById(id);
            const item = displayItem[0];
            return res.status(400).render('updateItem', {
                title: 'Update Item',
                errors: errors.array(),
                item,
            });
        }

        const { id } = req.params;
        const { name, description, quantity, category_id } = req.body;

        try {
            const updatedItem = await db.updateItemInDb(
                id,
                name,
                description,
                quantity,
                category_id
            );
            if (!updatedItem) {
                return res.status(404).send('Item not found');
            }
            return res.redirect(`/items/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating item');
        }
    },
];

export const renderUpdateItemForm = [
    validateId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    },
];

export const deleteItem = [
    validateId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const deletedItem = await db.deleteItemById(id);
            if (!deletedItem) {
                return res.status(404).send('Item not found');
            }
            return res.redirect('/items');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting item');
        }
    },
];
