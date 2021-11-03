import {AbstractBaseError} from "./abstract-base.error";

export class NotAuthorisedError extends AbstractBaseError {
    statusCode = 401;

    constructor() {
        super('Not authorised');
        Object.setPrototypeOf(this, NotAuthorisedError.prototype);
    }


    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Not authorised'}];
    }
}
