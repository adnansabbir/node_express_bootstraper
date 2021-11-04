import {Request, Response} from "express";
import {EmailTemplate} from "../models/email-template.model";

export const createEmailTemplateController = async (req: Request, res: Response) => {
    const {name, content, subject} = req.body;
    const emailTemplate = EmailTemplate.build({name, content, subject});

    try {
        await emailTemplate.save();
        res.status(200).json({message: "success"});
    } catch (e) {
        throw e;
    }
}
