import { Router } from 'express';
import {
	getAllCategories,
	getCategory,
    createCategory,
	renderCreateCategoryForm,
	updateCategory,
	renderUpdateCategoryForm,
	deleteCategory,
} from '../controllers/categoryController.js';
// import category controller

const router = Router();

// GET all categories
router.get('/', getAllCategories);

// GET a specific category
router.get('/:id', getCategory);

// creating new category
router.post('/', createCategory);

// render form to create new category
router.get('/new', renderCreateCategoryForm);

// Update a category
router.put('/:id', updateCategory);

// Render form to edit a category
router.get('/:id/edit', renderUpdateCategoryForm);

// Delete a category
router.delete('/:id', deleteCategory);

export default router;
