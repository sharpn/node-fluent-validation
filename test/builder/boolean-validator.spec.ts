import { BooleanValidator } from '../../src/builder/boolean-validator';
import * as sinon from 'sinon';
import { ValidationRule } from '../../src/validation/validation-rule';
import { expect } from 'chai';
import { IsTrueValidator } from '../../src/validators/boolean/is-true';
import { IsFalseValidator } from '../../src/validators/boolean/is-false';

describe('builder/boolean-validator', () => {
  let booleanValidator: BooleanValidator<any>;
  let addValidatorSpy: sinon.SinonSpy;

  beforeEach(() => {
    const validationRule = new ValidationRule<any, any>((x) => x.test);
    booleanValidator = new BooleanValidator(validationRule);
    addValidatorSpy = sinon.spy(validationRule, 'addValidator');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('isTrue', () => {
    it('should set the validator against the rule', async () => {
      booleanValidator.isTrue();

      expect(addValidatorSpy.callCount).to.eq(1);
      expect(addValidatorSpy.firstCall.args[0]).to.be.instanceOf(
        IsTrueValidator,
      );
    });
  });

  describe('isFalse', () => {
    it('should set the validator against the rule', async () => {
      booleanValidator.isFalse();

      expect(addValidatorSpy.callCount).to.eq(1);
      expect(addValidatorSpy.firstCall.args[0]).to.be.instanceOf(
        IsFalseValidator,
      );
    });
  });
});
