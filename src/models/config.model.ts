// An interface that describes the properties required to create a user
import {BaseModel, BaseMongooseDocModel, BaseMongooseSchema} from "./base-model/base.model";
import {IResetToken} from "./reset-token.model";
import mongoose, {Schema} from "mongoose";

export interface IConfig {
    jwtExpirationTimeInSec: number;
    userPasswordResetExpirationTime: number;
}

// An interface that describes the properties that user document has
export interface ConfigDocModel extends BaseMongooseDocModel, IConfig {
    resetToken: IResetToken
}

interface ConfigModel extends BaseModel<ConfigDocModel, IConfig> {
}

const schema = new BaseMongooseSchema<ConfigDocModel>({
    jwtExpirationTimeInSec: {
        type: Schema.Types.Number,
        required: true
    },
    userPasswordResetExpirationTime: {
        type: Schema.Types.Number,
        required: true
    }
}, {capped: {max: 1}})

schema.statics.build = (attrs: IConfig) => {
    return new ConfigCollection(attrs);
}

export const ConfigCollection = mongoose.model<ConfigDocModel, ConfigModel>('ServerConfig', schema);
