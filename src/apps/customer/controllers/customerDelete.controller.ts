import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerDeleter } from '../../../contexts/customer/application/delete/customerDeleter.useCase';

type CustomerDeleteRequest = Request;
export class CustomerDeleteController implements Controller {
  constructor(private readonly customerDeleter: CustomerDeleter) {}

  async run(req: CustomerDeleteRequest, res: Response) {
    const response = await this.customerDeleter.run({ id: req.params.id });
    res.status(httpStatus.OK).send(response);
  }
}
