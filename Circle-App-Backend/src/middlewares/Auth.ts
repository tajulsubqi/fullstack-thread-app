import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default new class AuthenticationMiddlewares {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const Authorization = req.headers.authorization;

      if (!Authorization || !Authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorization' });
      }

      const token = Authorization.split(' ')[1];

      try {
        const logingSession = jwt.verify(token, 'secret');
        res.locals.logingSession = logingSession;
        next();
      } catch (error) {
        return res.status(500).json({ error: 'Unauthorization' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error while authentication' });
    }
  }
};
