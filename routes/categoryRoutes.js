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

const router = Router();

// Render form to create a new category
router.get('/new', renderCreateCategoryForm);

// Create a new category
router.post('/', createCategory);

// GET all categories
router.get('/', getAllCategories);

// GET a specific category
router.get('/:id', getCategory);

// Render form to edit a category
router.get('/:id/edit', renderUpdateCategoryForm);

// Update a category
router.post('/:id', updateCategory);

// Delete a category
router.post('/:id/delete', deleteCategory);

export default router;
