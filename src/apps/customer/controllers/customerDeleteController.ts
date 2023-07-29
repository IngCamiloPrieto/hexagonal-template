import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerId } from '../../../contexts/customer/domain/customerId';
import { CustomerDeleter } from '../../../contexts/customer/application/delete/customerDeleter';

type CustomerDeleteRequest = Request;
export class CustomerDeleteController implements Controller {
  constructor(private readonly customerDeleter: CustomerDeleter) {}

  async run(req: CustomerDeleteRequest, res: Response) {
    try {
      const id = new CustomerId(req.params.id);
      const customerDeleted = await this.customerDeleter.run({ id });
      let response;
      if (customerDeleted) response = customerDeleted.toPrimitives();
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
