import { Severity } from '../../../src';
import { PropertyValidator } from '../property-validator';
import { MaxElementsValidator } from './max-elements';
import { MinElementsValidator } from './min-elements';

export class MinMaxElementsValidator<TModel, TProperty>
  implements PropertyValidator<Iterable<any>, TModel>
{
  public errorMessage: string = 'Element count not within range';
  public errorCode: string = 'MinMaxElementsValidator';
  public severity: Severity = undefined;

  private minValidator: MinElementsValidator<TModel, TProperty>;
  private maxValidator: MaxElementsValidator<TModel, TProperty>;

  constructor(minElementCount: number, maxElementCount: number) {
    this.minValidator = new MinElementsValidator(minElementCount);
    this.maxValidator = new MaxElementsValidator(maxElementCount);
  }

  async isValid(input: Iterable<any> | undefined) {
    return this.minValidator.isValid(input) && this.maxValidator.isValid(input);
  }
}
