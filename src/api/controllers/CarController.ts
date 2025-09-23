import { Request, Response, Router } from "express";
import DbAccess from "../../infraestructure/database/DbAccess";
import { Car } from "../../entities/car";
import { CarDTO, updateCarDTO } from "../../domain/dtos/CarDTO";
import { body, param, validationResult } from "express-validator";
import CarService from "../../domain/services/CarService";

class CarController {
  private readonly dbAccess: DbAccess;  
  private readonly carService: CarService
  public router: Router = Router();

  constructor(dbAccess: DbAccess, carService: CarService){
    this.dbAccess = dbAccess;
    this.carService = carService;
  }

  public routes() {
    this.router.get('/', this.getCars.bind(this));
    this.router.get('/:id', [
      param('id').notEmpty().isNumeric().withMessage('O id deve ser um number')
    ], this.getCarById.bind(this));
    this.router.post('/',  [
      body('brand')
        .exists().withMessage('O campo brand é obigatorio!')
        .isString().withMessage('O campo brand deve ser uma string!'),
      body('model')
        .exists().withMessage('O campo model é obigatorio!')
        .isString().withMessage('O campo model deve ser uma string!'),
      body('year')
        .exists().withMessage('O campo year é obigatorio!')
        .custom((value) => {
          if (typeof value !== 'number') {
            throw new Error('O campo year deve ser um number!');
          }
          return true;
        }),
      body('plate')
        .exists().withMessage('O campo plate é obigatorio!')
        .isString().withMessage('O campo plate deve ser uma string!'),
      body('available')
        .exists().withMessage('O campo available é obigatorio!')
        .custom((value) => {
          if (typeof value !== 'boolean') {
            throw new Error('O campo ativo deve ser um boolean literal (true ou false)!');
          }
          return true;
        })
    ], this.addCar.bind(this));
    this.router.patch('/:id', [
      param('id').notEmpty().isNumeric().withMessage('O id deve ser um number')
    ], this.updateCar.bind(this));
    this.router.delete('/:id', [
      param('id').notEmpty().isNumeric().withMessage('O id deve ser um number')
    ], this.removeCar.bind(this));
  }

  public getCars(req: Request, res: Response) {
    try {
      const cars = this.carService.getAll();
      if (!cars || cars.length == 0) {
        return res.status(404).json({ msg: 'Ainda não existem carros disponíveis.' })
      }

      return res.status(200).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public getCarById(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const carDto = this.carService.getById(+id);

      if (!carDto) return res.status(404).json({ msg: 'Carro não encontrado' });

      return res.status(200).json(carDto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public addCar(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const carData: CarDTO = req.body;

      const car = new Car(
        carData.brand,
        carData.model,
        carData.year,
        carData.plate,
        carData.available
      )

      const cars = this.carService.add(car);

      return res.status(201).json(cars);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public updateCar(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;
      const car = this.carService.getById(+id); 

      if (!car) return res.status(404).json({ msg: 'Carro não encontrado' });

      const carData: updateCarDTO = req.body;
      
      const newCar = this.carService.update(+id, carData);

      return res.status(200).json(newCar);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }

  public removeCar(req: Request, res: Response){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id;

      const car = this.carService.getById(+id);

      if (!car) return res.status(404).json({ msg: 'Carro não encontrado' })

      this.carService.remove(+id);
      const cars = this.carService.getAll();
      return res.status(200).json(cars);
      
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Erro interno do servidor: ' + error })
    }
  }
}

export default CarController;