import {Response} from "express";
import MailService from "@sendgrid/mail";

export class EmailSenderService {
    static SendMail = (to: string, from: string, subject: string, text?: string, html?: string): Promise<Response> => {
        return MailService.send({
            to,
            from,
            subject,
            text,
            html
        }).then(result => result[0] as unknown as Response);
    }

    static ConfigureEmailService = (): void => {
        MailService.setApiKey(process.env.SENDGRID_API_KEY);
    }
}
