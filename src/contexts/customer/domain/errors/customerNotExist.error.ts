export class CustomerNotExist extends Error {
  constructor() {
    super('The customer does not exists');
  }
}
