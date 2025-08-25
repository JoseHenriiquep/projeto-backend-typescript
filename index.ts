import express, { Request, Response } from 'express';
import routes from './src/routes/CarRoute';
import LogMiddleware from './src/middlewares/logMiddleware';
import AuthMiddleware from './src/middlewares/authMiddleware';

const app = express();
const port = 3000;

app.use(express.json());
app.use(LogMiddleware.init());
app.use(AuthMiddleware.init())
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.json('Primeira rota');
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
}); 