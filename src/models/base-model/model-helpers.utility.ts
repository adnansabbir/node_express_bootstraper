import {SchemaOptions} from 'mongoose';

export const getBaseOption = (options?: SchemaOptions): SchemaOptions => {
    const toJsonFuncGiven = options?.toJSON || {};
    const transformFuncGiven = toJsonFuncGiven?.transform;

    return {
        ...options,
        toJSON: {
            ...toJsonFuncGiven,
            transform(doc: any, ret: any, opt: any) {
                ret.id = ret._id;
                delete ret._id;
                if (transformFuncGiven) {
                    transformFuncGiven(doc, ret, opt);
                }
            }
        },
        versionKey: false
    }
}
