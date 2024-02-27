import { CustomError } from './customer-error';

export class StartupError extends CustomError {
  constructor(message: string, options?: ErrorOptions) {
    super(`${message}`, options);
  }
}
