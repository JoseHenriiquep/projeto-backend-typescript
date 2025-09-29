import { Container } from "inversify";
import CarServiceInterface from "../../domain/interfaces/CarServiceInterface";
import CarService from "../../domain/services/CarService";
import CarController from "../controllers/CarController";
import CarRepositoryInterface from "../../domain/interfaces/CarRepositoryInterface";
import CarRepository from "../../infraestructure/database/CarRepository";
import StoreRepositoryInterface from "../../domain/interfaces/StoreRepositoryInterface";
import StoreRepository from "../../infraestructure/database/StoreRepository";
import StoreServiceInterface from "../../domain/interfaces/StoreServiceInterface";
import StoreService from "../../domain/services/StoreService";
import StoreController from "../controllers/StoreController";

const container = new Container();

container
  .bind<CarRepositoryInterface>('CarRepository')
  .to(CarRepository).inRequestScope();
container
  .bind<CarServiceInterface>('CarService')
  .to(CarService).inRequestScope();
container
  .bind<CarController>('CarController')
  .to(CarController).inRequestScope()

container
  .bind<StoreRepositoryInterface>('StoreRepository')
  .to(StoreRepository).inRequestScope();
container
  .bind<StoreServiceInterface>('StoreService')
  .to(StoreService).inRequestScope();
container
  .bind<StoreController>('StoreController')
  .to(StoreController).inRequestScope()


export default container;