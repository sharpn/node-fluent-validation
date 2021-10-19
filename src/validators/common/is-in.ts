import { Severity } from '../../shared';
import { isIterable } from '../../shared/is-iterable';
import { PropertyValidator } from '../property-validator';

export class IsInValidator<TModel> implements PropertyValidator<any, TModel> {
  public errorMessage: string = 'Object does not contain inputted value';
  public errorCode: string = 'IsInValidator';
  public severity: Severity = undefined;

  constructor(private obj: Iterable<TModel> | object) {}

  public async isValid(input: any): Promise<boolean> {
    if (await isIterable(this.obj)) {
      return this.isElementOfIterable(input);
    } else {
      return this.isValueOfObject(input);
    }
  }

  private isElementOfIterable(input: any) {
    for (let element of this.obj as Iterable<TModel>) {
      if (element === input) {
        return true;
      }
    }

    return false;
  }

  private isValueOfObject(input: any) {
    return Object.keys(this.obj).find((key) => this.obj[key] === input) != null;
  }
}
