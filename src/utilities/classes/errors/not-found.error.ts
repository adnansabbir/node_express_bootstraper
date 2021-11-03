import {AbstractBaseError} from "./abstract-base.error";

export class NotFoundError extends AbstractBaseError {
    statusCode = 404;

    constructor() {
        super('Route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }


    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Not found'}];
    }
}
