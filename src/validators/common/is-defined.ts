import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class IsDefinedValidator<TModel>
  implements PropertyValidator<any, TModel>
{
  public errorMessage: string = 'Property is not defined';
  public errorCode: string = 'IsDefinedValidator';
  public severity: Severity = undefined;

  public async isValid(input: any): Promise<boolean> {
    return typeof input !== 'undefined';
  }
}
