import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './controller';
import { CustomerGetById } from '../../../contexts/customer/application/getById/customerGetById.useCase';

type CustomerGetByIdRequest = Request;
export class CustomerGetByIdController implements Controller {
  constructor(private readonly customerGetById: CustomerGetById) {}

  async run(req: CustomerGetByIdRequest, res: Response) {
    const response = await this.customerGetById.run({ id: req.params.id });
    res.status(httpStatus.OK).send(response);
  }
}
