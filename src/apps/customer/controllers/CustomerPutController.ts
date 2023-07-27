import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateCustomerCommand } from '../../../Contexts/customer/domain/UpdateCustomerCommand';
import { Controller } from './Controller';
import { UpdateCustomerCommandHandler } from '../../../Contexts/customer/application/Update/UpdateCustomerCommandHandler';

type CustomerPutRequest = Request & {
  body: {
    name: string;
    email: string;
  };
};
export class CustomerPutController implements Controller {
  constructor(private readonly updateCustomerCommandHandler: UpdateCustomerCommandHandler) {}

  async run(req: CustomerPutRequest, res: Response) {
    try {
      const id = String(req.params.id);
      const { name, email } = req.body;
      const updateCustomerCommand = new UpdateCustomerCommand({ id, name, email });
      const customerUpdated = await this.updateCustomerCommandHandler.handle(updateCustomerCommand);
      let response;
      if (customerUpdated) response = customerUpdated.toPrimitives();
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
