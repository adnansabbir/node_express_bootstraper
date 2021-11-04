import {body} from "express-validator";
import {EmailTemplate} from "../models/email-template.model";

export const createEmailTemplateValidator = [
    body('name')
    .custom(async name => {
        const emailTemplate = await EmailTemplate.findOne({name});
        if (emailTemplate) {
            return Promise.reject();
        }
    })
    .withMessage(`email template with same name exists`),
    body('content').exists(),
    body('subject')
        .isLength({min: 3, max: 50})
        .withMessage('subject must be of length 3 to 5'),
]
