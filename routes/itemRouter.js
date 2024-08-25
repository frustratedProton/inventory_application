import { Router } from 'express';
// import itemController
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

// GET all items
router.get('/', getAllItems);

// Show a specific item
router.get('/:id', viewItem);

// Create a new item
router.post('/', createItem);

// Render form to create a new item
router.get('/new', renderCreateItemForm);

// Update an item
router.put('/:id', updateItem);

// Render form to edit an item
router.get('/:id/edit', renderUpdateItemForm);

// Delete an item
router.delete('/:id', deleteItem);

export default router;
