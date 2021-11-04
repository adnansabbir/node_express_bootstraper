import mongoose, {Schema} from 'mongoose';
import {BaseModel, BaseMongooseDocModel, BaseMongooseSchema} from "./base-model/base.model";
import {getEmailTemplateWithVariables} from "../utilities/helpers/email-template-formatter.utility";

// An interface that describes the properties required to create a user
interface EmailTemplateAttrs {
    name: string,
    subject: string,
    content: string
}

// An interface that describes the properties that user document has
export interface EmailTemplateDocModel extends BaseMongooseDocModel {
    name: string;
    subject: string;
    content: string;
    template: (data?: { [key: string]: string }) => string;
}

// An interface that describes properties a user model has
interface EmailTemplateModel extends BaseModel<EmailTemplateDocModel, EmailTemplateAttrs> {
}

const emailTemplateSchema = new BaseMongooseSchema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    subject: {
        type: Schema.Types.String,
        required: true
    },
    content: {
        type: Schema.Types.String,
        required: true
    }
});

emailTemplateSchema.statics.build = (attrs: EmailTemplateAttrs) => {
    return new EmailTemplate(attrs);
}

emailTemplateSchema.methods.template = function (data?: { [key: string]: string }) {
    return getEmailTemplateWithVariables(this.content, data);
};

const EmailTemplate = mongoose.model<EmailTemplateDocModel, EmailTemplateModel>('EmailTemplate', emailTemplateSchema);

export {EmailTemplate};
