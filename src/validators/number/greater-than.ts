import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

export class GreaterThanValidator<TModel>
  implements PropertyValidator<number, TModel>
{
  public errorMessage: string;
  public errorCode: string = 'GreaterThanValidator';
  public severity: Severity = undefined;

  constructor(private threshold: number) {
    this.errorMessage = `Number is not greater than ${threshold}`;
  }

  public async isValid(input: number | undefined): Promise<boolean> {
    if (typeof input !== 'undefined') {
      return input > this.threshold;
    }
    return false;
  }
}
