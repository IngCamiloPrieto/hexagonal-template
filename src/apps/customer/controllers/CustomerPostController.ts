import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { CustomerId } from '../../../Contexts/customer/domain/customerId';
import { CustomerName } from '../../../Contexts/customer/domain/customerName';
import { CustomerEmail } from '../../../Contexts/customer/domain/customerEmail';
import { CustomerCreator } from '../../../Contexts/customer/application/Create/CustomerCreator';

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
      const id = new CustomerId(req.body.id);
      const name = new CustomerName(req.body.name);
      const email = new CustomerEmail(req.body.email);
      const response = await this.customerCreator.run({ id, name, email });
      res.status(httpStatus.CREATED).send(response.toPrimitives());
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
