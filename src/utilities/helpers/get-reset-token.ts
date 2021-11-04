import {IResetToken} from "../../models/reset-token.model";
import { Guid } from "guid-typescript";
import {ServerConfig} from "../../services/config-generator";

export const getResetToken = (): IResetToken => {
    return {token: Guid.create().toString(), expiryDate: new Date(Date.now() + ServerConfig.Config.userPasswordResetExpirationTime)}
}
