import { Severity } from './validation-severity';

export class ValidationFailure {
  readonly target: any;
  readonly propertyName: string;
  readonly attemptedValue: string;
  readonly errorMessage: string;
  readonly errorCode: string;
  readonly severity: Severity;

  readonly childErrors?: ValidationFailure[];

  constructor(
    target: any,
    propertyName: string,
    attemptedValue: any,
    errorMessage: string,
    errorCode: string,
    severity: Severity,
    childErrors?: ValidationFailure[],
  ) {
    this.target = target;
    this.propertyName = propertyName;
    this.attemptedValue = attemptedValue;
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
    this.severity = severity;
    this.childErrors = childErrors;
  }
}
