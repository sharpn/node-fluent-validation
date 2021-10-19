import {
  CommonValidation,
  DateValidator,
  NumberValidation,
  StringValidation,
} from './builder';
import { BooleanValidator } from './builder/boolean-validator';
import { IterableValidation } from './builder/iterable-validation';
import { ValidationResult } from './shared/validation-result';
import { Cascademode } from './validation/cascade-mode';
import { ValidationRule } from './validation/validation-rule';

type ExcludeTypes = 'withErrorCode' | 'withErrorMessage' | 'withSeverity';

export abstract class AbstractValdator<TModel> {
  private rules: ValidationRule<TModel, any>[] = [];
  private cascadeMode: Cascademode = 'continue';

  /**
   * @description Sets the error cascade mode
   * @param mode
   * @default 'continue'
   * */
  protected setCascadeMode(mode: Cascademode) {
    this.cascadeMode = mode;
  }

  protected RuleForObject<TInput extends object>(
    lambda: (input: TModel) => TInput | undefined,
  ) {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new CommonValidation(rule);
  }

  protected RuleForString(
    lambda: (input: TModel) => string | undefined,
  ): Omit<StringValidation<TModel>, ExcludeTypes> {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new StringValidation(rule);
  }

  protected RuleForNumber(
    lambda: (input: TModel) => number | undefined,
  ): Omit<NumberValidation<TModel>, ExcludeTypes> {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new NumberValidation(rule);
  }

  protected RuleForDate(
    lambda: (input: TModel) => Date | undefined,
  ): Omit<DateValidator<TModel>, ExcludeTypes> {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new DateValidator(rule);
  }

  protected RuleForBoolean(
    lambda: (input: TModel) => boolean | undefined,
  ): Omit<BooleanValidator<TModel>, ExcludeTypes> {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new BooleanValidator(rule);
  }

  protected RuleForEach(lambda: (input: TModel) => Iterable<any> | undefined) {
    const rule = this.registerRule(new ValidationRule(lambda));
    return new IterableValidation(rule);
  }

  public async validate(input: TModel): Promise<ValidationResult> {
    const result = new ValidationResult();

    for (const rule of this.rules) {
      const ruleResult = await rule.apply(input, this.cascadeMode);

      if (!ruleResult.isValid) {
        result.addFailures(ruleResult.failures);

        if (this.cascadeMode == 'stop') {
          break;
        }
      }
    }

    return result;
  }

  private registerRule<TProperty>(
    validationRule: ValidationRule<TModel, TProperty>,
  ): ValidationRule<TModel, TProperty> {
    this.rules.push(validationRule);
    return validationRule;
  }
}
