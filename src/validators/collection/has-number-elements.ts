import { Severity } from '../../../src';
import { hasLength } from '../../shared/has-length';
import { hasSize } from '../../shared/has-size';
import { PropertyValidator } from '../property-validator';

export class HasNumberOfElementsValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<any>, TModel>
{
  public errorMessage: string = 'Element count does not equal input';
  public errorCode: string = 'HasNumberOfElementsValidator';
  public severity: Severity = undefined;

  constructor(private numberOfElements: number) {}

  async isValid(input: Iterable<any> | undefined) {
    if (hasLength(input)) {
      return input.length === this.numberOfElements;
    } else if (hasSize(input)) {
      return input.size === this.numberOfElements;
    } else {
      return false;
    }
  }
}
