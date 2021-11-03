import {NextFunction, Request, Response} from 'express';
import {NotAuthorisedError} from "../utilities/classes/errors/not-authorised.error";

export const authenticateRoute = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorisedError();
    }
    next();
}
