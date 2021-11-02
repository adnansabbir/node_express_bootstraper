import mongoose, {Schema, Model, SchemaDefinition, SchemaDefinitionType, SchemaOptions, Document} from 'mongoose';
import {BaseFields} from "./base-fields.const";
import {getBaseOption} from "./model-helpers.utility";

// Base interface for mongoose model
export interface BaseModel<DocType = any, AttrModel = any> extends mongoose.Model<DocType> {
    build(attrs: AttrModel): DocType;
}

// These Properties will be added to all tables
export interface BaseMongooseDocModel extends Document {
    rolesAllowedToRead: string[];
    idsAllowedToRead: string[];
}

// A base model to create all table from
export class BaseMongooseSchema<DocType = any, M = Model<DocType, any, any, any>, TInstanceMethods = {}> extends Schema {
    constructor(definition?: SchemaDefinition<SchemaDefinitionType<DocType>>, options?: SchemaOptions) {

        const BaseDefinition: SchemaDefinition<SchemaDefinitionType<DocType>> = {...definition, ...BaseFields};
        const BaseOptions: SchemaOptions = getBaseOption(options);
        super(BaseDefinition, BaseOptions);
    }
}

