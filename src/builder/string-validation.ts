import { ContainsValidator } from '../validators/string';
import { IsEmailValidator } from '../validators/string/is-email';
import { ValidationRule } from '../validation/validation-rule';
import { CommonValidation } from './common-validation';
import { ValidationOptions } from './validation-options';

export class StringValidation<TModel> extends CommonValidation<TModel, string> {
  constructor(validationRule: ValidationRule<TModel, string>) {
    super(validationRule);
  }

  public contains(seed: string): this {
    //& ValidationOptions<TModel> {
    this.buildRuleWith(new ContainsValidator<TModel>(seed));
    return this;
  }

  public isEmail(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsEmailValidator<TModel>());
    return this;
  }
}
