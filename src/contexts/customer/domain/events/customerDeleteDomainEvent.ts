import { DomainEvent } from '../../../shared/domain/domainEvent';

type CustomerDeletedAttributes = { id: string };

export class CustomerDeleteDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'customer.deleted';
  readonly customer: CustomerDeletedAttributes;

  constructor(data: { aggregateId: string; customer: CustomerDeletedAttributes; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CustomerDeleteDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.customer = data.customer;
  }

  toPrimitives() {
    return {
      customer: this.customer
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CustomerDeletedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new CustomerDeleteDomainEvent({
      aggregateId,
      customer: attributes,
      eventId,
      occurredOn
    });
  }
}
