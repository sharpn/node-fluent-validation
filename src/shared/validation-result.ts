import { ValidationFailure } from './validation-failure';

export class ValidationResult {
  private _failures: ValidationFailure[] = [];

  get isValid() {
    return this._failures.length === 0;
  }

  get failures() {
    return this._failures;
  }

  public async addFailures(failures: ValidationFailure[]): Promise<void> {
    if (failures) {
      this._failures = this._failures.concat(failures);
    }
  }
}
