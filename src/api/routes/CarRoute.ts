import { Router } from "express";
import CarController from "../controllers/CarController";
import container from '../config/inversifyConfig'

const routes = Router();

const carController = container.get<CarController>('CarController');

routes.use('/cars', carController.router);

export default routes;