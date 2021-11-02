import {AllowedGrantTypes} from "../../models/consts/grant-types.model";
import {Request, Response, NextFunction} from "express";
import {User} from "../../models/user.model";
import {BadRequestError} from "../../errors/bad-request.error";
import {HashText} from "../../utilities/hash-text.utility";
import {getJwtToken} from "../../utilities/jwt.utility";

type TokenNameControllerMapModel = {
    [key in keyof typeof AllowedGrantTypes | string]: (req: Request, res: Response, next?: NextFunction) => void;
}

const token_password = async (req: Request, res: Response, next?: NextFunction) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) throw new BadRequestError('Invalid credentials');

    const passwordMatched = await HashText.compare(user.password, password);
    if (!passwordMatched) throw new BadRequestError('Invalid credentials');

    const jwt = getJwtToken(user);
    req.session.jwt = jwt;
    res.status(200).json({token: jwt});
}

const authenticate_site = async (req: Request, res: Response, next?: NextFunction) => {
    throw new BadRequestError('Authenticate site not implemented yet');
}

export const TokenGeneratorControllers: TokenNameControllerMapModel = {
    password: token_password,
    authenticate_site: authenticate_site
}
