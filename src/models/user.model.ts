import mongoose, {Schema, Model, Document} from 'mongoose';
import {HashText} from "../utilities/helpers/hash-text.utility";
import {BaseModel, BaseMongooseDocModel, BaseMongooseSchema} from "./base-model/base.model";
import {IResetToken, ResetTokenSchema} from "./reset-token.model";

// An interface that describes the properties required to create a user
interface UserCreateAttrs {
    email: string,
    password: string
}

// An interface that describes properties a user model has
interface UserModel extends BaseModel<UserDocModel, UserCreateAttrs> {}

// An interface that describes the properties that user document has
export interface UserDocModel extends BaseMongooseDocModel, UserCreateAttrs {
    resetToken: IResetToken
}

const userSchema = new BaseMongooseSchema<UserDocModel>({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    resetToken: {
        type: ResetTokenSchema,
        default: null
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashedPassword = await HashText.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    done();
});

userSchema.statics.build = (attrs: UserCreateAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDocModel, UserModel>('User', userSchema);

export {User};
