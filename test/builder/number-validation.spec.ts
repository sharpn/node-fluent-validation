import * as sinon from 'sinon';
import { ValidationRule } from '../../src/validation/validation-rule';
import { NumberValidation } from '../../src/builder/number-validation';
import {
  GreaterThanEqualToValidator,
  GreaterThanValidator,
  LessThanEqualToValidator,
  LessThanValidator,
} from '../../src/validators/number';
import { expect } from 'chai';

describe('builder/number-validation', () => {
  let addValidationSpy: sinon.SinonSpy;
  let numberValidator: NumberValidation<any>;

  beforeEach(() => {
    const validationRule = new ValidationRule<any, any>((x) => x.test);
    numberValidator = new NumberValidation(validationRule);
    addValidationSpy = sinon.spy(validationRule, 'addValidator');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('greaterThan', () => {
    it('should set the validator against the rule', async () => {
      numberValidator.greaterThan(10);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        GreaterThanValidator,
      );
    });
  });

  describe('lessThan', () => {
    it('should set the validator against the rule', async () => {
      numberValidator.lessThan(10);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        LessThanValidator,
      );
    });
  });

  describe('greaterThenOrEqualTo', () => {
    it('should set the validator against the rule', async () => {
      numberValidator.greaterThanOrEqualTo(10);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        GreaterThanEqualToValidator,
      );
    });
  });

  describe('lessThenOrEqualTo', () => {
    it('should set the validator against the rule', async () => {
      numberValidator.lessThanOrEqualTo(10);

      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        LessThanEqualToValidator,
      );
    });
  });
});
