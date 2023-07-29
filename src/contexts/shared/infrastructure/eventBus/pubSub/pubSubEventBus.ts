import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { PubSubConfigurer } from './PubSubConfigurer';

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
