export const getAllItems = (req, res) => {
	console.log('Fetching list of categories... WIP');
};

export const viewItem = (req, res) => {
	const { id } = req.params;
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
