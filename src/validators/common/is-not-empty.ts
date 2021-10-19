import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';
import { IsEmptyValidator } from './is-empty';

export class IsNotEmptyValidator<TModel>
  implements PropertyValidator<any, TModel>
{
  public errorMessage: string = 'Value cannot be empty';
  public errorCode: string = 'IsNotEmptyValidator';
  public severity: Severity = undefined;

  private isEmptyValidator = new IsEmptyValidator();

  public async isValid(input: any): Promise<boolean> {
    return !(await this.isEmptyValidator.isValid(input));
  }
}
