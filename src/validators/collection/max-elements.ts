import { Severity } from '../../../src';
import { hasLength } from '../../shared/has-length';
import { hasSize } from '../../shared/has-size';
import { PropertyValidator } from '../property-validator';

export class MaxElementsValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<any>, TModel>
{
  public errorMessage: string = 'Element count greater than max';
  public errorCode: string = 'MaxElementsValidator';
  public severity: Severity = undefined;

  constructor(private maxElementCount: number) {}

  async isValid(input: Iterable<any> | undefined) {
    if (hasLength(input)) {
      return input.length <= this.maxElementCount;
    } else if (hasSize(input)) {
      return input.size <= this.maxElementCount;
    }

    return false;
  }
}
