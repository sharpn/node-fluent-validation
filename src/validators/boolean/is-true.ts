import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class IsTrueValidator<TModel>
  implements PropertyValidator<boolean, TModel>
{
  public errorMessage: string = 'Value is not true';
  public errorCode: string = 'IsTrueValidator';
  public severity: Severity = undefined;

  public async isValid(input: boolean | undefined): Promise<boolean> {
    if (input) {
      return input;
    }

    return false;
  }
}
