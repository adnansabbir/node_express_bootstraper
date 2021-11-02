import {Request, Response, NextFunction} from "express";
import {AbstractBaseError} from "../utilities/classes/errors/abstract-base.error";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AbstractBaseError) {
        return res.status(err.statusCode).json({errors: err.serializeErrors()})
    }

    console.error(err.message);
    res.status(400).json({
        errors: [{message: 'Something went wrong'}]
    })
}
