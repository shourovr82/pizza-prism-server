import { NextFunction, Request, Response } from 'express';
import { infoLogger } from '../../shared/logger';

const routeInfoMessage = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      infoLogger.info(`{ ROUTE  : "${req.url}" ➡ METHOD : ${req.method} }`);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default routeInfoMessage;
