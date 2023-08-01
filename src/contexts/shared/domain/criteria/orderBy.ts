import { StringValueObject } from '../valueObject/string.valueObject';

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
