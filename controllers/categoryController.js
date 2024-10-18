import * as db from '../db/queries.js';

export const getAllCategories = async (req, res) => {
    const categories = await db.getAllCategories();

    res.render('categories', { categories: categories });
};

export const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await db.getCategoryById(id);
        if (!category) {
            return res.status(404).send('Category not found');
        }

        const items = await db.getAllItems();
        const categoryItems = items.filter(
            (item) => item.category_id === parseInt(id)
        );

        res.render('categoryDetail', { category, items: categoryItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const createCategory = async (req, res) => {
    const { name, description, type } = req.body;

    if (!name || !description || !type) {
        return res.status(400).send('Missing required fields');
    }

    try {
        await db.createCategory(name, description, type);

        res.redirect(`/categories`);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('Error creating category');
    }
};

export const renderCreateCategoryForm = (req, res) => {
    res.render('newCategory');
};

export const updateCategory = async (req, res) => {
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
        res.status(500).send('Error updating item');
    }
};

export const renderUpdateCategoryForm = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await db.getCategoryById(id);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('updateCategory', { category: category });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving category');
    }
};

export const deleteCategory = async (req, res) => {
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
};
