import * as moment from 'moment';
import { Severity } from '../../shared/validation-severity';
import { PropertyValidator } from '../property-validator';

type Boundaries = '()' | '[)' | '(]' | '[]';

export class IsBetweenValidator<TModel>
  implements PropertyValidator<Date, TModel>
{
  public errorMessage: string;
  public errorCode: string = 'IsBetweenValidator';
  public severity: Severity = undefined;

  constructor(
    private lowerDate: Date,
    private upperDate: Date,
    private lowerBoundary: '(' | '[' = '(',
    private upperBoundary: ')' | ']' = ')',
  ) {
    this.errorMessage = `Date is not between ${lowerDate} and ${upperDate}`;
  }

  public async isValid(input: Date | undefined): Promise<boolean> {
    if (typeof input === 'undefined' || input === null) {
      return false;
    }

    const lowerMoment = moment(this.lowerDate);
    const upperMoment = moment(this.upperDate);
    const inputMoment = moment(input);
    const boundary = `${this.lowerBoundary}${this.upperBoundary}` as Boundaries;
    return inputMoment.isBetween(lowerMoment, upperMoment, undefined, boundary);
  }
}
