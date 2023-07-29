import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerId } from '../../../contexts/customer/domain/customerId';
import { CustomerName } from '../../../contexts/customer/domain/customerName';
import { CustomerEmail } from '../../../contexts/customer/domain/customerEmail';
import { CustomerUpdater } from '../../../contexts/customer/application/update/customerUpdater';

type CustomerPutRequest = Request & {
  body: {
    name: string;
    email: string;
  };
};
export class CustomerPutController implements Controller {
  constructor(private readonly customerUpdater: CustomerUpdater) {}

  async run(req: CustomerPutRequest, res: Response) {
    try {
      const id = new CustomerId(req.params.id);
      const name = new CustomerName(req.body.name);
      const email = new CustomerEmail(req.body.email);
      const customerUpdated = await this.customerUpdater.run({ id, name, email });
      let response;
      if (customerUpdated) response = customerUpdated.toPrimitives();
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
