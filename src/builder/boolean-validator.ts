import { IsFalseValidator } from '../validators/boolean/is-false';
import { IsTrueValidator } from '../validators/boolean/is-true';
import { ValidationRule } from '../validation/validation-rule';
import { CommonValidation } from './common-validation';
import { ValidationOptions } from './validation-options';

export class BooleanValidator<TModel> extends CommonValidation<
  TModel,
  boolean
> {
  constructor(validationRule: ValidationRule<TModel, boolean>) {
    super(validationRule);
  }

  public isTrue(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsTrueValidator());
    return this;
  }

  public isFalse(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsFalseValidator());
    return this;
  }
}
