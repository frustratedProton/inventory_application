export const items = [
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
	// const categoryResponse = await fetch('http://localhost:3000/categories');
	// const categories = await categoryResponse.json();
	
	// res.render('items', { items, categories });
	res.render('items', { items: items }); 

	// console.log(categories);
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
	const { name, description, type } = req.body;
	console.log(`Creating item: ${name}, ${description}, ${type}... WIP`);
};

export const renderCreateItemForm = (req, res) => {
	res.render('newItem');
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
