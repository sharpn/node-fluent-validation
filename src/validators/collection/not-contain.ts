import { Severity } from '../../../src';
import { PropertyValidator } from '../property-validator';

export class NotContainElementValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<TProperty>, TModel>
{
  public errorMessage: string = 'Input contains element';
  public errorCode: string = 'NotContainElementValidator';
  public severity: Severity = undefined;

  constructor(private seed: TProperty) {}

  async isValid(input: Iterable<TProperty> | undefined) {
    if (input) {
      for (let element of input) {
        if (element === this.seed) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}
