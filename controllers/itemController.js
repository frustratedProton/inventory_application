import { name } from 'ejs';
import { categories } from './categoryController.js';

export let items = [
	{
		id: 1,
		category_id: 1,
		name: 'HG Gundam Exia',
		description: 'A detailed High Grade model of the Gundam Exia.',
		quantity: 5,
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
	{
		id: 2,
		category_id: 1,
		name: 'HG RX-78-2 Gundam',
		description: 'The iconic High Grade RX-78-2 Gundam model.',
		quantity: 10,
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
	{
		id: 3,
		category_id: 2,
		name: 'RG Zaku II',
		description: 'Real Grade Zaku II with detailed parts and articulation.',
		quantity: 8,
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
	{
		id: 4,
		category_id: 3,
		name: 'Gunpla Cutter',
		description: 'Precision cutter for Gunpla model kits.',
		quantity: 15,
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
];

export const getAllItems = async (req, res) => {
	res.render('items', { items: items });
	console.log('Fetching list of categories... WIP');
};

export const viewItem = (req, res) => {
	const { id } = req.params;
	const item = items.find((item) => item.id === parseInt(id));

	if (item) {
		res.render('item', { item });
	} else {
		res.status(404).send('Item not found');
	}

	console.log(`Fetching details of item ${id}... WIP`);
};

export const createItem = (req, res) => {
	// console.log(req.body);
	const { name, description, quantity, category_id } = req.body;

	if (!name || !description || !quantity || !category_id) {
		return res.status(400).send('Missing required fields');
	}

	const nextId =
		items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

	// Create the new item
	const newItem = {
		id: nextId,
		category_id: parseInt(category_id),
		name: name,
		description: description,
		quantity: quantity,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	items = [...items, newItem];
	console.log(
		`Creating item: ${name}, ${description}, ${quantity}. ${category_id}... WIP`
	);
	res.status(201).json(newItem);
};

export const renderCreateItemForm = (req, res) => {
	res.render('newItem', { categories });
	console.log('Rendering form to create new item... WIP');
};

export const updateItem = (req, res) => {
	const { id } = req.params;
	const { name, description, quantity, category_id } = req.body;

	console.log(
		`Updating item ${id} with ${name}, ${description}, ${quantity}, ${category_id}... WIP`
	);
};

export const renderUpdateItemForm = (req, res) => {
	const { id } = req.params;
	console.log(`Rendering form to update item ${id}... WIP`);
};

export const deleteItem = (req, res) => {
	const { id } = req.params;
	console.log(`Deleting item ${id}... WIP`);
};
