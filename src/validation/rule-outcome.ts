import { ValidationFailure } from '../shared/validation-failure';

export class RuleOutcome {
  private _failures: ValidationFailure[] = [];

  constructor(validationFailures?: ValidationFailure[]) {
    if (validationFailures) {
      this.addValidationFailures(validationFailures);
    }
  }

  get isValid() {
    return this._failures.length === 0;
  }

  get failures() {
    return this._failures;
  }

  private addValidationFailures(failures: ValidationFailure[]): void {
    this._failures = this._failures.concat(failures);
  }
}
