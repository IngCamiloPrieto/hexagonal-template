import { DomainEvent } from '../../../domain/domainEvent';
import { EventBus } from '../../../domain/eventBus';
import { DomainEventSubscribers } from '../domainEventSubscribers';
import { PubSubConfigurer } from './pubSubConfigurer';

export class PubSubEventBus implements EventBus {
  constructor(private readonly pubSubConfigurer: PubSubConfigurer) {}

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    const publishes = events.map(event => {
      const dataBuffer = Buffer.from(JSON.stringify(event));
      return this.pubSubConfigurer.topic.publishMessage({ data: dataBuffer });
    });
    await Promise.all(publishes);
  }
}
