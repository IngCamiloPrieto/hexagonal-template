import { param } from 'express-validator';
export const deleteSchema = [param('id').exists().isString().isUUID()];
