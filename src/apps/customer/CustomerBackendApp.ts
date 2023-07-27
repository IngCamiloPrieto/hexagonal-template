import { EventBus } from '../../Contexts/Shared/domain/EventBus';
import container from './dependency-injection';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import { Server } from './server';
import { RabbitMqConnection } from '../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';

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
    const rabbitMQConnection = container.get<RabbitMqConnection>('Customer.Shared.RabbitMQConnection');
    await rabbitMQConnection.close();
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Customer.Shared.domain.EventBus');
    const rabbitMQConnection = container.get<RabbitMqConnection>('Customer.Shared.RabbitMQConnection');
    await rabbitMQConnection.connect();

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
