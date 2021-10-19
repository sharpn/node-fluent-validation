import { ValidationFailure } from './validation-failure';

export class ValidationError extends Error {
  name = 'ValidationError';
  code: string;
  httpCode: number = 400;

  failure: ValidationFailure;

  constructor(failure: ValidationFailure) {
    super(failure.errorMessage);
    this.code = failure.errorCode;

    this.failure = failure;
  }
}
