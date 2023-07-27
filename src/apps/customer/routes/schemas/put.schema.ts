import { body, param } from 'express-validator';
export const putSchema = [
  param('id').exists().isString().isUUID(),
  body('name').optional().isString(),
  body('email').optional().isString().isEmail()
];
