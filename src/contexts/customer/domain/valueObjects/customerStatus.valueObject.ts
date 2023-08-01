import { StringValueObject } from '../../../shared/domain/valueObject/string.valueObject';
import { CustomerStatusInvalidEnumValue } from '../errors/customerStatusInvalidEnumValue.error';

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
