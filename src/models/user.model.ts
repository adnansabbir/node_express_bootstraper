import mongoose, {Schema, Model, Document} from 'mongoose';
import {HashText} from "../utilities/hash-text.utility";
import {BaseModel, BaseMongooseDocModel, BaseMongooseSchema} from "./base-model/base.model";

// An interface that describes the properties required to create a user
interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes properties a user model has
interface UserModel extends BaseModel<UserDocModel, UserAttrs> {
}

// An interface that describes the properties that user document has
export interface UserDocModel extends BaseMongooseDocModel {
    email: string,
    password: string
}

const userSchema = new BaseMongooseSchema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
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

const User = mongoose.model<UserDocModel, UserModel>('User', userSchema);

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

export {User};
