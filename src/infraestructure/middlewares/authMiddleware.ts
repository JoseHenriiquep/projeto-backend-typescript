import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  private static auth(req: Request, res: Response, next: NextFunction){
    const authKey = req.headers['api-key'];
    if (!authKey) {
      return res.status(401).json('Acesso não autorizado!')
    }
    if (authKey === 'minhaChaveSecreta') {
      next();
      return;
    }
  }

  static init() {
    return this.auth;
  }
}
export default AuthMiddleware;