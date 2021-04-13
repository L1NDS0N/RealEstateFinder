import express from 'express';
import { OlxFinderController } from './controllers/OlxFinderController';
const app = express();
import { router } from './routes';

const olxFinder = new OlxFinderController();

app.use(express.json());

app.use(router);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
