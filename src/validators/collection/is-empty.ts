import { Severity } from '../../../src';
import { PropertyValidator } from '../../../src/validators/property-validator';
import { hasLength } from '../../shared/has-length';
import { hasSize } from '../../shared/has-size';

export class IsEmptyValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<any>, TModel>
{
  public errorMessage: string = 'The list is empty';
  public errorCode: string = 'IsEmptyValidator';
  public severity: Severity = undefined;

  async isValid(input: Iterable<any> | undefined) {
    if (hasLength(input)) {
      return input.length === 0;
    } else if (hasSize(input)) {
      return input.size === 0;
    } else {
      return false;
    }
  }
}
