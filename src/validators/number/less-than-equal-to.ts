import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class LessThanEqualToValidator<TModel>
  implements PropertyValidator<number, TModel>
{
  public errorMessage: string;
  public errorCode: string = 'LessThanValidator';
  public severity: Severity = undefined;

  constructor(private threshold: number) {
    this.errorMessage = `Number is not less than or equal to ${threshold}`;
  }

  public async isValid(input: number | undefined): Promise<boolean> {
    if (typeof input !== 'undefined') {
      return input <= this.threshold;
    }
    return false;
  }
}
