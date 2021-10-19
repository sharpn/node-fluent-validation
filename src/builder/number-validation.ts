import {
  GreaterThanValidator,
  LessThanEqualToValidator,
  LessThanValidator,
} from '../validators/number';
import { ValidationRule } from '../validation/validation-rule';
import { CommonValidation } from './common-validation';
import { ValidationOptions } from './validation-options';
import { GreaterThanEqualToValidator } from '../validators/number/greater-than-equal-to';

export class NumberValidation<TModel> extends CommonValidation<TModel, number> {
  constructor(validationRule: ValidationRule<TModel, number>) {
    super(validationRule);
  }

  public greaterThan(threshold: number): this & ValidationOptions<TModel> {
    this.buildRuleWith(new GreaterThanValidator(threshold));
    return this;
  }

  public lessThan(threshold: number): this & ValidationOptions<TModel> {
    this.buildRuleWith(new LessThanValidator(threshold));
    return this;
  }

  public greaterThanOrEqualTo(
    threshold: number,
  ): this & ValidationOptions<TModel> {
    this.buildRuleWith(new GreaterThanEqualToValidator(threshold));
    return this;
  }

  public lessThanOrEqualTo(
    threshold: number,
  ): this & ValidationOptions<TModel> {
    this.buildRuleWith(new LessThanEqualToValidator(threshold));
    return this;
  }
}
