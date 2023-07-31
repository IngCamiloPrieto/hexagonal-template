import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerInactivator } from '../../../contexts/customer/application/inactivate/customerInactivator';

export class CustomerInactivatePutController implements Controller {
  constructor(private readonly customerInactivator: CustomerInactivator) {}

  async run(req: Request, res: Response) {
    const response = await this.customerInactivator.run({ id: req.params.id });
    res.status(httpStatus.CREATED).send(response);
  }
}
