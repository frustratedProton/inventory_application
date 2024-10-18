import * as db from '../db/queries.js';
import { param, body, validationResult } from 'express-validator';

export const validateCategory = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 1, max: 50 })
        .withMessage('Name must be between 1 and 50 characters.'),
    body('description').exists().withMessage('Description is required'),
    body('type')
        .exists()
        .withMessage('Type is required')
];

export const validateCategoryId = [
    param('id')
        .exists()
        .withMessage('ID is required')
        .isInt({ gt: 0 })
        .withMessage('ID must be a positive integer'),
];

export const getAllCategories = async (req, res) => {
    const categories = await db.getAllCategories();

    res.render('categories', { categories: categories });
};

export const getCategory = [
    validateCategoryId,
    async (req, res) => {
        const errors = validationResult(res);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const category = await db.getCategoryById(id);
            if (!category) {
                return res.status(404).send('Category not found');
            }

            const items = await db.getAllItems();
            const categoryItems = items.filter(
                (item) => (item.category_id = parseInt(id))
            );
            res.render('categoryDetail', { category, items: categoryItems });
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    },
];

export const createCategory = [
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('newCategory', {
                errors: errors.array(),
            });
        }

        const { name, description, type } = req.body;

        try {
            await db.createCategory(name, description, type);
            res.redirect(`/categories`);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).send('Error creating category');
        }
    },
];

export const renderCreateCategoryForm = (req, res) => {
    res.render('newCategory');
};

export const updateCategory = [
    validateCategoryId,
    validateCategory,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const { id } = req.params;
            const category = await db.getCategoryById(id);
            return res.status(400).render('updateCategory', {
                title: 'Update Category',
                errors: errors.array(),
                category,
            });
        }

        const { id } = req.params;
        const { name, description, type } = req.body;

        try {
            const updatedCategory = await db.updateCategory(
                name,
                description,
                type,
                id
            );

            if (!updatedCategory) {
                return res.status(404).send('Category not found');
            }
            res.redirect(`/categories/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating category');
        }
    },
];

export const renderUpdateCategoryForm = [
    validateCategoryId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        try {
            const category = await db.getCategoryById(id);

            if (!category) {
                return res.status(404).send('Category not found');
            }

            res.render('updateCategory', { category });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving category');
        }
    },
];

export const deleteCategory = [
    validateCategoryId,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;

        try {
            const deletedCategory = await db.deleteCategoryById(id);

            if (!deletedCategory) {
                return res.status(404).send('Category not found');
            }

            res.redirect('/categories');
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).send('Error deleting category');
        }
    },
];
