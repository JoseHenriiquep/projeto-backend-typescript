import express, { Request, Response } from 'express';
import CarRoutes from './src/api/routes/CarRoute';
import StoreRoutes from './src/api/routes/StoreRoute'
import LogMiddleware from './src/api/middlewares/logMiddleware';
import AuthMiddleware from './src/api/middlewares/authMiddleware';
import MongooseConfig from './src/infraestructure/dbConfig/mongooseConfig'

const app = express();
const port = 3000;

app.use(express.json());
app.use(LogMiddleware.init());
app.use(AuthMiddleware.init())

MongooseConfig.connect();

app.use('/api', CarRoutes);
app.use('/api', StoreRoutes )

app.get('/', (req: Request, res: Response) => {
  res.json('Primeira rota');
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
}); 