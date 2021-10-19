import { PropertyValidator } from '../property-validator';

import { EmailValidator } from 'commons-validator-js';
import { Severity } from '../../shared/validation-severity';
const emailValidator = new EmailValidator();

export class IsEmailValidator<TModel>
  implements PropertyValidator<string, TModel>
{
  public errorMessage: string = 'The string is not a valid email';
  public errorCode: string = 'IsEmailValidator';
  public severity: Severity = undefined;

  public async isValid(input: string | undefined): Promise<boolean> {
    if (input) {
      return emailValidator.isValid(input);
    }

    return false;
  }
}
