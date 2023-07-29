import { DomainEvent } from '../../../shared/domain/domainEvent';

type CustomerCreatedAttributes = { id: string; name: string; email: string };

export class CustomerCreateDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'customer.created';
  readonly customer: CustomerCreatedAttributes;

  constructor(data: { aggregateId: string; customer: CustomerCreatedAttributes; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CustomerCreateDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.customer = data.customer;
  }

  toPrimitives() {
    return {
      customer: this.customer
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CustomerCreatedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new CustomerCreateDomainEvent({
      aggregateId,
      customer: attributes,
      eventId,
      occurredOn
    });
  }
}
