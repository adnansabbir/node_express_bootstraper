import {CustomError} from "./custom-error";

export class NotAuthorisedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorised');
        Object.setPrototypeOf(this, NotAuthorisedError.prototype);
    }


    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Not authorised'}];
    }
}
