import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerCreator } from '../../../contexts/customer/application/create/customerCreator';

type CustomerPostRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
  };
};
export class CustomerPostController implements Controller {
  constructor(private readonly customerCreator: CustomerCreator) {}

  async run(req: CustomerPostRequest, res: Response) {
    try {
      const {id, name, email} = req.body;
      const response = await this.customerCreator.run({ id, name, email });
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
