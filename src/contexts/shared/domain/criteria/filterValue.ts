import { StringValueObject } from '../valueObject/string.valueObject';

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
