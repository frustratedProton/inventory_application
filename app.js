import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import categoryRoutes from './routes/categoryRoutes.js';
import itemRoutes from './routes/itemRouter.js';
import indexRouter from './routes/indexRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


// Routes
app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// 404 Not Found
app.use((req, res) => {
	res.status(404).render('404');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
