import { Severity } from '../../../src';
import { hasLength } from '../../shared/has-length';
import { hasSize } from '../../shared/has-size';
import { PropertyValidator } from '../property-validator';

export class MinElementsValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<any>, TModel>
{
  public errorMessage: string = 'Element count less than min';
  public errorCode: string = 'MinElementsValidator';
  public severity: Severity = undefined;

  constructor(private minElementCount: number) {}

  async isValid(input: Iterable<any> | undefined) {
    if (hasLength(input)) {
      return input.length >= this.minElementCount;
    } else if (hasSize(input)) {
      return input.size >= this.minElementCount;
    } else {
      return false;
    }
  }
}
