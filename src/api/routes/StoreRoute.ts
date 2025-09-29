import { Router } from "express";
import container from '../config/inversifyConfig'
import StoreController from "../controllers/StoreController";

const routes = Router();

const storeController = container.get<StoreController>('StoreController');

routes.use('/stores', storeController.router);

export default routes;