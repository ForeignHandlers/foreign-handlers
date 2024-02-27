export class CustomError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(`${message}`, options);
  }
}
