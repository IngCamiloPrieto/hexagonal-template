import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CustomerUpdatedAttributes = { id: string; name: string; email: string };

export class CustomerUpdateDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'customer.updated';
  readonly customer: CustomerUpdatedAttributes;

  constructor(data: { aggregateId: string; customer: CustomerUpdatedAttributes; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: CustomerUpdateDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.customer = data.customer;
  }

  toPrimitives() {
    return {
      customer: this.customer
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CustomerUpdatedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new CustomerUpdateDomainEvent({
      aggregateId,
      customer: attributes,
      eventId,
      occurredOn
    });
  }
}
