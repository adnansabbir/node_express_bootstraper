import {SchemaOptions} from 'mongoose';

export const getBaseOption = (options?: SchemaOptions): SchemaOptions => {
    const toJsonFuncGiven = options?.toJSON || {};
    const transformFuncGiven = toJsonFuncGiven?.transform;

    return {
        ...options,
        toJSON: {
            ...toJsonFuncGiven,
            transform(doc: any, ret: any, options: any) {
                if (transformFuncGiven) {
                    ret.id = ret._id;
                    delete ret._id;
                    transformFuncGiven(doc, ret, options);
                }
            }
        },
        versionKey: false
    }
}
