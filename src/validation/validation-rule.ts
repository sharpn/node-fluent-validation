import validator from 'validator';
import { ValidationError } from '../shared/validation-error';
import { ValidationFailure } from '../shared/validation-failure';
import { Severity } from '../shared/validation-severity';
import { PropertyValidator } from '../validators/property-validator';
import { Cascademode } from './cascade-mode';
import { RuleOutcome } from './rule-outcome';
import { ValidationCondition } from './validation-condition';

export class ValidationRule<TModel, TProperty> {
  private readonly validators: PropertyValidator<TProperty, TModel>[] = [];
  private readonly conditions: ValidationCondition<TModel>[] = [];

  public readonly propertyName: string;

  constructor(
    public lambdaExpression: (input: TModel) => TProperty | undefined,
  ) {
    let regexArray = lambdaExpression
      .toString()
      .match('\\s+\\w+\\.(\\w+(\\.\\w+)*)');

    this.propertyName =
      regexArray && regexArray.length > 1
        ? regexArray[1]
        : lambdaExpression.toString();
  }

  public addValidator(validator: PropertyValidator<TProperty, TModel>) {
    this.validators.push(validator);
  }

  public addCondition(condition: ValidationCondition<TModel>) {
    this.conditions.push(condition);
  }

  public addErrorMessage(message: string) {
    if (this.validators.length) {
      this.validators[this.validators.length - 1].errorMessage = message;
    }
  }

  public addErrorCode(code: string) {
    if (this.validators.length) {
      this.validators[this.validators.length - 1].errorCode = code;
    }
  }

  public addSeverity(severity: Severity) {
    if (this.validators.length) {
      this.validators[this.validators.length - 1].severity = severity;
    }
  }

  public async apply(input: TModel, cascadeMode: Cascademode) {
    const propertyValue = this.runLambda(input);

    const failures: ValidationFailure[] = [];

    const shouldValidate = await this.validationRequired(input);

    if (!shouldValidate) {
      return new RuleOutcome();
    }

    for (const validator of this.validators) {
      const valid = await validator.isValid(propertyValue, input);

      if (typeof valid === 'boolean' && valid === true) {
        continue;
      } else if (
        typeof valid !== 'boolean' &&
        !(valid as ValidationFailure[]).length
      ) {
        continue;
      }

      const severity = validator.severity || Severity.info;

      const childErrors =
        typeof valid === 'boolean' ? undefined : (valid as ValidationFailure[]);

      const error = new ValidationFailure(
        input,
        this.propertyName,
        propertyValue,
        validator.errorMessage,
        validator.errorCode,
        severity,
        childErrors,
      );

      if (cascadeMode === 'throwOnFirstError' && severity === Severity.error) {
        throw new ValidationError(error);
      }

      failures.push(error);

      if (cascadeMode == 'stop') {
        break;
      }
    }

    return new RuleOutcome(failures);
  }

  private async validationRequired(input: TModel): Promise<boolean> {
    if (this.conditions.length) {
      for (const condition of this.conditions) {
        const shouldValidate = await condition.shouldValidate(input);
        if (!shouldValidate) {
          return shouldValidate;
        }
      }
    }

    return true;
  }

  private runLambda(input: TModel) {
    return this.lambdaExpression(input);
  }
}
