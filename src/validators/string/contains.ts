import { PropertyValidator } from '../property-validator';
import validator from 'validator';
import { Severity } from '../../shared/validation-severity';

export class ContainsValidator<TModel>
  implements PropertyValidator<string, TModel>
{
  public errorMessage: string;
  public errorCode: string = 'ContainsValidator';
  public severity: Severity = undefined;

  constructor(private seed: string) {
    this.errorMessage = `Value does not contain the specified string: ${seed}`;
  }

  public async isValid(input: string | undefined): Promise<boolean> {
    if (input) {
      return validator.contains(input, this.seed);
    } else {
      return false;
    }
  }
}
