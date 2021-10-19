import { Severity } from '../../../src';
import { PropertyValidator } from '../property-validator';

export class ContainsElementValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<TProperty>, TModel>
{
  public errorMessage: string = 'Input does not contain element';
  public errorCode: string = 'ContainsElementValidator';
  public severity: Severity = undefined;

  constructor(private seed: TProperty) {}

  async isValid(input: Iterable<TProperty> | undefined) {
    if (input) {
      for (let element of input) {
        if (element === this.seed) {
          return true;
        }
      }
    }

    return false;
  }
}
