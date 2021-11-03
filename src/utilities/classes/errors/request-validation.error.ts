import {ValidationError} from "express-validator";
import {AbstractBaseError} from "./abstract-base.error";

export class RequestValidationError extends AbstractBaseError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors = () => {
        return this.errors.map(error => ({message: error.msg, field: error.param}));
    }
}
