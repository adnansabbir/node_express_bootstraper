import {SchemaDefinition} from 'mongoose';

export const BaseFields: SchemaDefinition = {
    rolesAllowedToRead: [String],
    idsAllowedToRead: [String]
}
