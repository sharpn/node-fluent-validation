import { IsBetweenValidator } from '../validators/date';
import { ValidationRule } from '../validation/validation-rule';
import { CommonValidation } from './common-validation';
import { ValidationOptions } from './validation-options';
import { IsSameOrAfterValidator } from '../validators/date/is-same-or-after';

export class DateValidator<TModel> extends CommonValidation<TModel, Date> {
  constructor(validationRule: ValidationRule<TModel, Date>) {
    super(validationRule);
  }

  public isBetween(
    date1: Date,
    date2: Date,
    lowerBoundary: '(' | '[' = '(',
    upperBoundary: ')' | ']' = ')',
  ): this & ValidationOptions<TModel> {
    this.buildRuleWith(
      new IsBetweenValidator(date1, date2, lowerBoundary, upperBoundary),
    );

    return this;
  }

  public isSameOrAfter(date: Date): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsSameOrAfterValidator(date));
    return this;
  }
}
