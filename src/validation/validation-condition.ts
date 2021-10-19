export interface ValidationCondition<TModel> {
  shouldValidate(input: TModel): Promise<boolean>;
}
