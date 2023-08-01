import { RabbitMQConfig } from '../../../contexts/shared/infrastructure/rabbitMQ/rabbitMQConfigFactory';
import { DomainEventSubscribers } from '../../../contexts/shared/infrastructure/eventBus/domainEventSubscribers';
import { RabbitMQConfigurer } from '../../../contexts/shared/infrastructure/eventBus/rabbitMq/rabbitMQConfigurer';
import { RabbitMqConnection } from '../../../contexts/shared/infrastructure/eventBus/rabbitMq/rabbitMqConnection';
import container from '../dependency-injection';

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('customer.shared.rabbitMQConnection');
    const { name: exchange } = container.get<RabbitMQConfig>('customer.shared.rabbitMQConfig').exchangeSettings;
    await connection.connect();

    const configurer = container.get<RabbitMQConfigurer>('customer.shared.rabbitMQConfigurer');
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange, subscribers });
    await connection.close();
  }
}
