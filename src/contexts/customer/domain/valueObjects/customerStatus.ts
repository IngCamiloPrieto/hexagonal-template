import { StringValueObject } from '../../../shared/domain/valueObject/stringValueObject';
import { CustomerStatusInvalidEnumValue } from '../errors/customerStatusInvalidEnumValue';

export enum CustomerStates {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export class CustomerStatus extends StringValueObject {
  constructor(value: CustomerStates) {
    super(value);
    this.ensureThatTheValueCorrespondsToTheValuesOfEnum(value);
  }

  private ensureThatTheValueCorrespondsToTheValuesOfEnum(value: CustomerStates): void {
    if (!Object.values(CustomerStates).includes(value))
      throw new CustomerStatusInvalidEnumValue(`The Customer Status <${value}> is not valid status`);
  }
}
