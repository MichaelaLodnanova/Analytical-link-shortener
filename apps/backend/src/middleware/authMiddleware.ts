import { Request, Response, NextFunction } from 'express';
import { Role } from 'model';

/**
 * Authorization enforcement middleware which accepts a list of allowed roles
 * @param role list of allowed roles
 * @returns middleware function
 */
const auth =
  (...role: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (role.length > 0 && !role.includes(req.session.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };

export default auth;
