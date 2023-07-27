import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateCustomerCommand } from '../../../Contexts/customer/domain/CreateCustomerCommand';
import { Controller } from './Controller';
import { CreateCustomerCommandHandler } from '../../../Contexts/customer/application/Create/CreateCustomerCommandHandler';

type CustomerPostRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
  };
};
export class CustomerPostController implements Controller {
  constructor(private readonly createCustomerCommandHandler: CreateCustomerCommandHandler) {}

  async run(req: CustomerPostRequest, res: Response) {
    try {
      const { id, name, email } = req.body;
      const createCustomerCommand = new CreateCustomerCommand({ id, name, email });
      const response = await this.createCustomerCommandHandler.handle(createCustomerCommand);
      res.status(httpStatus.CREATED).send(response.toPrimitives());
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
