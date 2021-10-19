import { ValidationFailure } from '../shared';
import { Severity } from '../shared/validation-severity';

export interface PropertyValidator<TProperty, TModel> {
  errorMessage: string;
  errorCode: string;
  severity: Severity;

  isValid(
    input: TProperty | undefined,
    model: TModel,
  ): Promise<boolean | ValidationFailure[]>;
}
