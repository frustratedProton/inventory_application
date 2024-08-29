import { items } from './itemController.js';
export let categories = [
	{
		id: 1,
		name: 'High Grade',
		description:
			'High Grade models with intricate details and articulation.',
		type: 'Grade',
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
	{
		id: 2,
		name: 'Real Grade',
		description:
			'Real Grade models with highly detailed parts and realistic proportions.',
		type: 'Grade',
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
	{
		id: 3,
		name: 'Gunpla Tools',
		description:
			'Essential tools for building and customizing Gunpla models.',
		type: 'Tool',
		created_at: new Date('2024-08-27T12:00:00Z'),
		updated_at: new Date('2024-08-27T12:00:00Z'),
	},
];

export const getAllCategories = (req, res) => {
	console.log('Fetching list of categories... WIP');
	// res.json(categories);
	res.render('categories', { categories: categories });
};

export const getCategory = (req, res) => {
	const { id } = req.params;
	console.log(`Fetching category ${id} and its items... WIP`);

	const category = categories.find((cat) => cat.id === parseInt(id));

	if (!category) {
		return res.status(404).send('Category not found');
	}

	const categoryItems = items.filter(
		(item) => item.category_id === parseInt(id)
	);
	res.render('categoryDetail', { category, items: categoryItems });
};

export const createCategory = (req, res) => {
	const { name, description, type } = req.body;

	if (!name || !description || !type) {
		return res.status(400).send('Missing required fields');
	}

	const nextId =
		categories.length > 0
			? Math.max(...categories.map((cat) => cat.id)) + 1
			: 1;

	const newCategory = {
		id: nextId,
		name,
		description,
		type,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	categories = [...categories, newCategory];

	console.log(`Creating category: ${name}, ${description}, ${type}... WIP`);
	res.status(201).json(newCategory);
};

export const renderCreateCategoryForm = (req, res) => {
	res.render('newCategory');
	console.log('Rendering form to create category');
};

export const updateCategory = (req, res) => {
	const { id } = req.params;
	const { name, description, type } = req.body;

	console.log(
		`Updating category ${id} with ${name}, ${description}, ${type}... WIP`
	);
};

export const renderUpdateCategoryForm = (req, res) => {
	const { id } = req.params;

	console.log(`Rendering form to update category ${id}... WIP`);
};

export const deleteCategory = (req, res) => {
	const { id } = req.params;
	console.log(`Deleting category ${id}... WIP`);
};
