import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	console.log('Rendering new.ejs for homepage...');
	res.render('index.ejs');
});

export default router;