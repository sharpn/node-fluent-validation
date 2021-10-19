import { AbstractValdator } from '../abstract-validator';
import { ValidationFailure } from '../shared';
import { ValidationRule } from '../validation/validation-rule';
import { CommonValidation } from './common-validation';
import { ValidationOptions } from './validation-options';

export class IterableValidation<
  TModel,
  TProperty extends Iterable<any>,
> extends CommonValidation<TModel, TProperty> {
  constructor(validationRule: ValidationRule<TModel, TProperty>) {
    super(validationRule);
  }

  public withValidator(
    validator: AbstractValdator<any>,
  ): this & ValidationOptions<TModel> {
    this.buildRuleWith({
      isValid: async (
        input: TProperty,
        model: TModel,
      ): Promise<boolean | ValidationFailure[]> => {
        for (const data of input) {
          const result = await validator.validate(data);

          if (!result.isValid) {
            return result.failures;
          }
        }

        return true;
      },
      errorMessage: 'An validation error occured in a child validator',
      errorCode: 'WithValidator',
      severity: undefined,
    });

    return this;
  }
}
