import { Severity } from '../shared/validation-severity';
import { ValidationRule } from '../validation/validation-rule';
import {
  WhenCondition,
  WhenDefinedCondition,
  WhenUndefinedCondition,
} from '../validation/when';
import {
  IsDefinedValidator,
  IsEmptyValidator,
  IsNotEmptyValidator,
} from '../validators/common';
import { IsInValidator } from '../validators/common/is-in';
import { PropertyValidator } from '../validators/property-validator';
import { ValidationOptions } from './validation-options';

export class CommonValidation<TModel, TProperty> {
  constructor(protected validationRule: ValidationRule<TModel, TProperty>) {}

  protected buildRuleWith(validator: PropertyValidator<TProperty, TModel>) {
    this.validationRule.addValidator(validator);
  }

  withErrorMessage(message: string): this & ValidationOptions<TModel> {
    this.validationRule.addErrorMessage(message);
    return this;
  }

  withErrorCode(code: string): this & ValidationOptions<TModel> {
    this.validationRule.addErrorCode(code);
    return this;
  }

  withSeverity(severity: Severity): this & ValidationOptions<TModel> {
    this.validationRule.addSeverity(severity);
    return this;
  }

  must(
    lambda: (input: TProperty, model: TModel) => Promise<boolean>,
  ): this & ValidationOptions<TModel> {
    this.buildRuleWith({
      isValid: async (input: TProperty, model: TModel): Promise<boolean> => {
        return await lambda(input, model);
      },
      errorMessage: 'There was an error with the validation',
      errorCode: 'MustValidator',
      severity: undefined,
    });

    return this;
  }

  when(lambda: (input: TModel) => boolean): ValidationOptions<TModel> {
    this.validationRule.addCondition(new WhenCondition(lambda));
    return this;
  }

  whenDefined(): ValidationOptions<TModel> {
    this.validationRule.addCondition(
      new WhenDefinedCondition(this.validationRule.lambdaExpression),
    );
    return this;
  }

  whenPropertyDefined(
    lambda: (input: TModel) => any,
  ): ValidationOptions<TModel> {
    this.validationRule.addCondition(new WhenDefinedCondition(lambda));
    return this;
  }

  whenPropertyUndefined(
    lambda: (input: TModel) => any,
  ): ValidationOptions<TModel> {
    this.validationRule.addCondition(new WhenUndefinedCondition(lambda));
    return this;
  }

  isDefined(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsDefinedValidator<TModel>());
    return this;
  }

  isEmpty(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsEmptyValidator());
    return this;
  }

  isNotEmpty(): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsNotEmptyValidator());
    return this;
  }

  isIn(input: Iterable<TModel> | object): this & ValidationOptions<TModel> {
    this.buildRuleWith(new IsInValidator(input));
    return this;
  }
}
