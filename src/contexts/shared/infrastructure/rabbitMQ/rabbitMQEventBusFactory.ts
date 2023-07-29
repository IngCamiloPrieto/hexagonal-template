import { DomainEventFailoverPublisher } from '../../../shared/infrastructure/eventBus/domainEventFailoverPublisher/domainEventFailoverPublisher';
import { RabbitMqConnection } from '../../../shared/infrastructure/eventBus/rabbitMq/rabbitMqConnection';
import { RabbitMQEventBus } from '../../../shared/infrastructure/eventBus/rabbitMq/rabbitMqEventBus';
import { RabbitMQqueueFormatter } from '../../../shared/infrastructure/eventBus/rabbitMq/rabbitMQqueueFormatter';
import { RabbitMQConfig } from './rabbitMQConfigFactory';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries
    });
  }
}
