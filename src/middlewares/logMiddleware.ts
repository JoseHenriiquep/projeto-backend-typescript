import { NextFunction, Request, Response } from "express";

class LogMiddleware {
  private static logger(req: Request, res: Response, next: NextFunction) {
    const timestamp: string = new Date().toISOString();
    console.info(`${timestamp}. Chamada ao método: ${req.method}, na URL: http://localhost:3000${req.url}`);
    next();
  }

  static init() {
    return this.logger;
  }
}
export default LogMiddleware;