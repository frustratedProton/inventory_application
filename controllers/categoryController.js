export const getAllCategories = (req, res) => {
	console.log('Fetching list of categories... WIP');
};

export const getCategory = (req, res) => {
	const { id } = req.params;
	console.log(`Fetching category ${id} and its items... WIP`);
};

export const createCategory = (req, res) => {
	const { name, description, type } = req.body;
	console.log(`Creating category: ${name}, ${description}, ${type}... WIP`);
};

export const renderCreateCategoryForm = (req, res) => {
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
