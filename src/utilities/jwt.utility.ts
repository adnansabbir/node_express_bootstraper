import jwt from "jsonwebtoken";
import {UserDocModel} from "../models/user.model";

export interface TokenPayload {
    id: string;
    email: string;
}

export const getJwtToken = (user: UserDocModel): string => {
    return jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SIGN_KEY, {expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME_SEC, 10)});
}

export const verifyJwt = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SIGN_KEY) as TokenPayload;
}
