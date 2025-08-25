import { Router } from "express";
import DbAccess from "../database/DbAccess";
import CarController from "../controllers/CarController";
import CarService from "../services/CarService";

const routes = Router();

const dbAccess = new DbAccess();
const carService = new CarService(dbAccess);
const carController = new CarController(dbAccess, carService);

carController.routes();

routes.use('/cars', carController.router);

export default routes;