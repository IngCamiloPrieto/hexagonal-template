import { EventEmitter } from 'events';
import { DomainEvent } from '../../../domain/domainEvent';
import { EventBus } from '../../../domain/eventBus';
import { DomainEventSubscribers } from '../domainEventSubscribers';

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(event => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
