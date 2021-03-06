import {Request, Response} from 'express';
import {User} from "../../models/user.model";
import {getJwtToken} from "../../utilities/helpers/jwt.utility";
import {TokenGeneratorControllers} from "./token.controller";

export const registerController = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = User.build({email, password});
    try {
        await user.save();
        req.session.jwt = getJwtToken(user);
        res.status(201).json(user);
    } catch (e) {
        throw e;
    }
}

export const tokenController = async (req: Request, res: Response) => {
    const {grant_type} = req.body;
    await TokenGeneratorControllers[grant_type](req, res);
}

export const currentUserController = async (req: Request, res: Response) => {
    res.status(200).json({currentUser: req?.currentUser || null});
}

export const signOutController = async (req: Request, res: Response) => {
    req.session = null;
    res.status(200).json({});
}
