import { ValidationCondition } from './validation-condition';

export class WhenCondition<TModel> implements ValidationCondition<TModel> {
  constructor(private expression: (input: TModel) => boolean) {}

  public async shouldValidate(input: TModel): Promise<boolean> {
    const value = this.expression(input);
    return value;
  }
}

export class WhenDefinedCondition<TModel>
  implements ValidationCondition<TModel>
{
  constructor(private expression: (input: TModel) => any) {}

  public async shouldValidate(input: TModel): Promise<boolean> {
    return typeof this.expression(input) !== 'undefined';
  }
}

export class WhenUndefinedCondition<TModel>
  implements ValidationCondition<TModel>
{
  constructor(private expression: (input: TModel) => any) {}

  public async shouldValidate(input: TModel): Promise<boolean> {
    return typeof this.expression(input) === 'undefined';
  }
}
