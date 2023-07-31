import { StringValueObject } from "../../../shared/domain/valueObject/stringValueObject";
import { CustomerNameLengthExceeded } from "../errors/customerNameLengthExceeded";

export class CustomerName extends StringValueObject {
    constructor(value: string) {
      super(value);
      this.ensureLengthIsLessThan30Characters(value);
    }
  
    private ensureLengthIsLessThan30Characters(value: string): void {
      if (value.length > 30) {
        throw new CustomerNameLengthExceeded(`The Customer Name <${value}> has more than 30 characters`);
      }
    }
  }