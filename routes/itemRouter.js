import { Router } from 'express';
import {
	getAllItems,
	viewItem,
	renderCreateItemForm,
	createItem,
	renderUpdateItemForm,
	updateItem,
	deleteItem,
} from '../controllers/itemController.js';

const router = Router();

// Render form to create a new item
router.get('/new', renderCreateItemForm);

// Create a new item
router.post('/', createItem);

// GET all items
router.get('/', getAllItems);

// Show a specific item
router.get('/:id', viewItem);

// Render form to edit an item
router.get('/:id/edit', renderUpdateItemForm);

// Update an item
router.put('/:id', updateItem);

// Delete an item
router.delete('/:id', deleteItem);

export default router;
