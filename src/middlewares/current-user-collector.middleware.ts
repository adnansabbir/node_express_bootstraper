import {Request, Response, NextFunction} from "express";
import {TokenPayload, verifyJwt} from "../utilities/jwt.utility";

declare global {
    namespace Express {
        interface Request {
            currentUser?: TokenPayload
        }
    }
}

export const currentUserCollector = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) return next();
    try {
        req.currentUser = verifyJwt(req.session.jwt);
    } catch (e) {
    }
    next();
}
