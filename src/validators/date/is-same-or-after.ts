import moment = require('moment');
import { Severity } from '../../shared';
import { PropertyValidator } from '../property-validator';

export class IsSameOrAfterValidator<TModel>
  implements PropertyValidator<Date, TModel>
{
  public errorMessage: string;
  public errorCode = 'IsAfterValidator';
  public severity: Severity = undefined;

  constructor(private date: Date) {}

  public async isValid(input: Date | undefined): Promise<boolean> {
    if (typeof input === 'undefined' || input === null) {
      return false;
    }

    const requiredDateMoment = moment(this.date);
    const inputMoment = moment(input);

    return inputMoment.isSameOrAfter(requiredDateMoment);
  }
}
