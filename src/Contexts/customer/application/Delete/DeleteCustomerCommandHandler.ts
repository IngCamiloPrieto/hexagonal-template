import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerDeleter } from './CustomerDeleter';
import { Command } from '../../../Shared/domain/Command';
import { DeleteCustomerCommand } from '../../domain/DeleteCustomerCommand';
import { CustomerId } from '../../domain/customerId';
import { Customer } from '../../domain/customer';

export class DeleteCustomerCommandHandler implements CommandHandler<DeleteCustomerCommand> {
  constructor(private customerDeleter: CustomerDeleter) {}

  subscribedTo(): Command {
    return DeleteCustomerCommand;
  }

  async handle(command: DeleteCustomerCommand): Promise<Customer | null> {
    const id = new CustomerId(command.id);
    return await this.customerDeleter.run({ id });
  }
}
