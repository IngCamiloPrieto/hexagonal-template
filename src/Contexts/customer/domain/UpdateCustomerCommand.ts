import { Command } from '../../Shared/domain/Command';

type Params = {
  id: string;
  name: string;
  email: string;
};

export class UpdateCustomerCommand extends Command {
  id: string;
  name: string;
  email: string;

  constructor({ id, name, email }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
