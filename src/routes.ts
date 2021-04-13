import { Router } from 'express';
import { OlxFinderController } from './controllers/OlxFinderController';

const router = Router();

const olxFinderController = new OlxFinderController();

router.post('/sweeping', olxFinderController.NovaPesquisa);

export { router };
