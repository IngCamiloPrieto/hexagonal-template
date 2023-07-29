import { Command } from './Command';

export interface CommandHandler<T extends Command, P = any> {
  subscribedTo(): Command;
  handle(command: T): Promise<P>;
}
