import {body} from "express-validator";
import {User} from "../../models/user.model";
import {AllowedGrantTypes} from "../../models/consts/grant-types.model";


export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async email => {
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return Promise.reject();
            }
        })
        .withMessage('Email already exist'),

    body('password')
        .trim()
        .isLength({min: 6, max: 50})
        .withMessage('Password must be between 6 to 50 char long')
]

export const tokenValidator = [
    body('grant_type')
        .trim()
        .custom((grantType: string)=> !!AllowedGrantTypes.hasOwnProperty(grantType))
        .withMessage('Invalid grant_type'),

    body('email')
        .if(body('grant_type').equals(AllowedGrantTypes.password))
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .trim()
        .if(body('grant_type').equals(AllowedGrantTypes.password))
        .isLength({min: 6, max: 50})
        .withMessage('Password must be between 6 to 50 char long')
]

export const forgotPasswordValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async email => {
            const existingUser = await User.findOne({email});
            if (!existingUser) {
                return Promise.reject();
            }
        })
        .withMessage(`No user found with given email`)
]

export const resetPasswordValidator = [
    body('password')
        .trim()
        .isLength({min: 6, max: 50})
        .withMessage('Password must be between 6 to 50 char long')
]
