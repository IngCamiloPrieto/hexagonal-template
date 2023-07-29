import { Command } from '../../Shared/domain/Command';

type Params = {
  id: string;
};

export class DeleteCustomerCommand extends Command {
  id: string;

  constructor({ id }: Params) {
    super();
    this.id = id;
  }
}
