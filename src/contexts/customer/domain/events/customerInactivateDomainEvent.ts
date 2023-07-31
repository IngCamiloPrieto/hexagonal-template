import { DomainEvent } from '../../../shared/domain/domainEvent';

type CustomerInactivatedAttributes = { id: string; };

export class CustomerInactivateDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'customer.inactivated';
  readonly customer: CustomerInactivatedAttributes;

  constructor(data: {
    aggregateId: string;
    customer: CustomerInactivatedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CustomerInactivateDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.customer = data.customer;
  }

  toPrimitives() {
    return {
      customer: this.customer
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CustomerInactivatedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new CustomerInactivateDomainEvent({
      aggregateId,
      customer: attributes,
      eventId,
      occurredOn
    });
  }
}
