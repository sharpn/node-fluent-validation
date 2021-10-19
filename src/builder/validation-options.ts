export interface ValidationOptions<TModel> {
  when(lambda: (input: TModel) => boolean): ValidationOptions<TModel>;
  whenDefined(): ValidationOptions<TModel>;
  whenPropertyDefined(
    lambda: (input: TModel) => boolean,
  ): ValidationOptions<TModel>;
}
