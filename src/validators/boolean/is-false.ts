import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class IsFalseValidator<TModel>
  implements PropertyValidator<boolean, TModel>
{
  public errorMessage: string = 'Value is not false';
  public errorCode: string = 'IsFalseValidator';
  public severity: Severity = undefined;

  public async isValid(input: boolean | undefined): Promise<boolean> {
    if (typeof input === 'undefined') {
      return false;
    }

    return !input;
  }
}
