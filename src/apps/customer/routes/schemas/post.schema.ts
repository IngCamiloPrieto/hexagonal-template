import { body } from 'express-validator';
export const postSchema = [
  body('id').exists().isString().isUUID(),
  body('name').exists().isString(),
  body('email').exists().isString().isEmail()
];
