import { Command } from './command';

export interface CommandHandler<T extends Command, P = any> {
  subscribedTo(): Command;
  handle(command: T): Promise<P>;
}
