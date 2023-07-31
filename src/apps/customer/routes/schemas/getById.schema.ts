import { param } from 'express-validator';
export const getByIdSchema = [param('id').exists().isString().isUUID()];
