import { EventBus } from '../../contexts/shared/domain/eventBus';
import container from './dependency-injection';
import { DomainEventSubscribers } from '../../contexts/shared/infrastructure/eventBus/domainEventSubscribers';
import { Server } from './server';
import { RabbitMqConnection } from '../../contexts/shared/infrastructure/eventBus/rabbitMq/rabbitMqConnection';

export class CustomerBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5001';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    const rabbitMQConnection = container.get<RabbitMqConnection>('customer.shared.rabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('customer.shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>('customer.shared.rabbitMQConnection');
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
