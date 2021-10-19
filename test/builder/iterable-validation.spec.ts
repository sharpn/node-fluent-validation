import { expect } from 'chai';
import * as sinon from 'sinon';
import { AbstractValdator } from '../../src/abstract-validator';
import { IterableValidation } from '../../src/builder/iterable-validation';
import { ValidationRule } from '../../src/validation/validation-rule';

class ChildValidator extends AbstractValdator<{ hello: string }> {
  constructor() {
    super();

    this.RuleForString((x) => x.hello).isDefined();
  }
}

describe('builder/iterable-validator', () => {
  let iterableValidator: IterableValidation<any, any>;
  let addValidatorSpy: sinon.SinonSpy;

  let validationRule: ValidationRule<any, any>;

  let childValidator: ChildValidator;
  let childValidatorValidateSpy: sinon.SinonSpy;

  beforeEach(() => {
    childValidator = new ChildValidator();
    childValidatorValidateSpy = sinon.spy(childValidator, 'validate');

    validationRule = new ValidationRule<any, any>((x) => x.test);
    iterableValidator = new IterableValidation(validationRule);

    addValidatorSpy = sinon.spy(validationRule, 'addValidator');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('withValidator', () => {
    it('should call add the validator', async () => {
      iterableValidator.withValidator(childValidator);
      expect(addValidatorSpy.callCount).to.eq(1);
    });

    it('should call the child validator', async () => {
      iterableValidator.withValidator(childValidator);
      await validationRule.apply({ test: [{ hello: 'hello' }] }, 'continue');
      expect(childValidatorValidateSpy.callCount).to.eq(1);
    });

    it('should return a list of failures if something is invalid', async () => {
      iterableValidator.withValidator(childValidator);
      const response = await validationRule.apply(
        { test: [{ hello: undefined }] },
        'continue',
      );

      expect(response.isValid).to.be.false;
    });
  });
});
