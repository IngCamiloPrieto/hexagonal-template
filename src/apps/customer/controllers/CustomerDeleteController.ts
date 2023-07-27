import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { DeleteCustomerCommand } from '../../../Contexts/customer/domain/DeleteCustomerCommand';
import { Controller } from './Controller';
import { DeleteCustomerCommandHandler } from '../../../Contexts/customer/application/Delete/DeleteCustomerCommandHandler';

type CustomerDeleteRequest = Request;
export class CustomerDeleteController implements Controller {
  constructor(private readonly deleteCustomerCommandHandler: DeleteCustomerCommandHandler) {}

  async run(req: CustomerDeleteRequest, res: Response) {
    try {
      const id = String(req.params.id);
      const deleteCustomerCommand = new DeleteCustomerCommand({ id });
      const customerDeleted = await this.deleteCustomerCommandHandler.handle(deleteCustomerCommand);
      let response;
      if (customerDeleted) response = customerDeleted.toPrimitives();
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
