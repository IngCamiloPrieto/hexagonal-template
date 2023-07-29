import { Nullable } from './Nullable';

export class Result<T> {
  data: Nullable<T> = null;
  message: Array<string>;
  statuscode = 0;
  date: Date;
  count: number = 0;

  constructor() {
    this.message = new Array<string>();
    this.date = new Date();
  }

  setData(data: T): Result<T> {
    this.data = data;
    if (typeof this.data === 'object' && this.data !== null) {
      this.count = 1;
    } else if (Array.isArray(this.data)) {
      this.count = this.data.length;
    }
    return this;
  }

  addMessage(msg: string): Result<T> {
    this.message.push(msg);
    return this;
  }

  setStatusCode(code: number): Result<T> {
    this.statuscode = code;
    return this;
  }
}
