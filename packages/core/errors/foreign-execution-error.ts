import { CustomError } from './customer-error';

export class ForeignExecutionError extends CustomError {
  constructor(message: string, options?: ErrorOptions) {
    super(`${message}`, options);
  }
}
