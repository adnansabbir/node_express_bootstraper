import {Schema} from 'mongoose';

// An interface that describes the properties required to create a user
export interface IResetToken {
    token: string,
    expiryDate: Date
}

export const ResetTokenSchema = new Schema<IResetToken>({
    token: {
        type: Schema.Types.String,
        required: true
    },
    expiryDate: {
        type: Schema.Types.Date,
        required: true
    }
}, {_id: false});
