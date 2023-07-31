import { param } from 'express-validator';
export const putInactivateSchema = [param('id').exists().isString().isUUID()];
