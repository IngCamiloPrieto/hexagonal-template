import { DomainEvent } from '../../../domain/domainEvent';
import { DomainEventSubscriber } from '../../../domain/domainEventSubscriber';
import { DomainEventDeserializer } from '../domainEventDeserializer';
import { RabbitMqConnection } from './rabbitMqConnection';
import { RabbitMQConsumer } from './rabbitMQConsumer';

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMqConnection,
    private maxRetries: number
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries
    });
  }
}
