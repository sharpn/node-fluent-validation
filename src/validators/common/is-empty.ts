import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class IsEmptyValidator<TModel>
  implements PropertyValidator<any, TModel>
{
  public errorMessage: string = 'Value must not be empty';
  public errorCode: string = 'IsEmptyValdator';
  public severity: Severity = undefined;

  public async isValid(input: any): Promise<boolean> {
    return input === '' || input === null || input === undefined;
  }
}
