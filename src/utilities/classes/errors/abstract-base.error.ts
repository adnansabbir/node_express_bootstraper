export abstract class AbstractBaseError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AbstractBaseError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[]
}
