import {IResetToken} from "../../models/reset-token.model";
import { Guid } from "guid-typescript";

export const getResetToken = (): IResetToken => {
    return {token: Guid.create().toString(), expiryDate: new Date(Date.now() + 3600000)}
}
