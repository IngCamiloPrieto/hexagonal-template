import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CustomerUpdater } from './CustomerUpdater';
import { Command } from '../../../Shared/domain/Command';
import { UpdateCustomerCommand } from '../../domain/UpdateCustomerCommand';
import { CustomerEmail } from '../../domain/customerEmail';
import { CustomerId } from '../../domain/customerId';
import { CustomerName } from '../../domain/customerName';
import { Customer } from '../../domain/customer';

export class UpdateCustomerCommandHandler implements CommandHandler<UpdateCustomerCommand> {
  constructor(private customerUpdater: CustomerUpdater) {}

  subscribedTo(): Command {
    return UpdateCustomerCommand;
  }

  async handle(command: UpdateCustomerCommand): Promise<Customer | null> {
    const id = new CustomerId(command.id);
    const name = new CustomerName(command.name);
    const email = new CustomerEmail(command.email);
    return await this.customerUpdater.run({ id, name, email });
  }
}
