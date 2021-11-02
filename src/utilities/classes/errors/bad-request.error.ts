import {AbstractBaseError} from "./abstract-base.error";

export class BadRequestError extends AbstractBaseError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }


    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message}];
    }
}
