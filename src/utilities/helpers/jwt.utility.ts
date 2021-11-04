import jwt from "jsonwebtoken";
import {UserDocModel} from "../../models/user.model";
import {ServerConfig} from "../../services/config-generator";

export interface TokenPayload {
    id: string;
    email: string;
}

export const getJwtToken = (user: UserDocModel): string => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SIGN_KEY, {expiresIn: ServerConfig.Config.jwtExpirationTimeInSec});
}

export const verifyJwt = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SIGN_KEY) as TokenPayload;
}
