import {Request, Response} from 'express';
import {User} from "../../models/user.model";
import {getJwtToken} from "../../utilities/helpers/jwt.utility";
import {TokenGeneratorControllers} from "./token.controller";
import {EmailSenderService} from "../../services/EmailSender.service";
import {EmailTemplate} from "../../models/email-template.model";
import {getResetToken} from "../../utilities/helpers/get-reset-token";
import {BadRequestError} from "../../utilities/classes/errors/bad-request.error";

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

export const forgotPasswordController = async (req: Request, res: Response) => {
    const {email} = req.body;

    const resetToken = getResetToken();
    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw new BadRequestError(`No user with email ${email} found`);
    }

    existingUser.resetToken = resetToken;
    await existingUser.save();

    res.status(200).json({message: 'Reset link sent to email'});

    const emailTemplate = await EmailTemplate.findOne({name: 'reset-password-template'});

    await EmailSenderService.SendMail(
        email,
        'test_node_bootstraper@yopmail.com',
        emailTemplate.subject,
        emailTemplate.subject,
        emailTemplate.template({
            host: req.headers.host,
            token_id: resetToken.token
        })
    );
}

export const resetPasswordController = async (req: Request, res: Response) => {
    const {password} = req.body;
    const {token} = req.params;
    const user = await User.findOne({
        'resetToken.token': token,
        'resetToken.expiryDate': {$gte: new Date()}
    });

    if (!user) {
        throw new BadRequestError('Invalid Token');
    }

    user.password = password;
    user.resetToken = null;
    await user.save();
    res.status(200).send({message: "Password changed successfully"});
}


export const currentUserController = async (req: Request, res: Response) => {
    res.status(200).json({currentUser: req?.currentUser || null});
}

export const signOutController = async (req: Request, res: Response) => {
    req.session = null;
    res.status(200).json({});
}
