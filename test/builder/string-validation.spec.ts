import { StringValidation } from '../../src/builder';
import * as sinon from 'sinon';
import { ValidationRule } from '../../src/validation/validation-rule';
import { expect } from 'chai';
import {
  ContainsValidator,
  IsEmailValidator,
} from '../../src/validators/string';

describe('builder/string-validation', () => {
  let stringValidator: StringValidation<any>;
  let addValidationSpy: sinon.SinonSpy;

  beforeEach(() => {
    const validationRule = new ValidationRule<any, any>((x) => x.test);
    stringValidator = new StringValidation(validationRule);
    addValidationSpy = sinon.spy(validationRule, 'addValidator');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('contains', () => {
    it('should set the validator against the rule', async () => {
      stringValidator.contains('');
      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        ContainsValidator,
      );
    });
  });

  describe('isEmail', () => {
    it('should set the validator against the rule', async () => {
      stringValidator.isEmail();
      expect(addValidationSpy.callCount).to.eq(1);
      expect(addValidationSpy.firstCall.args[0]).to.be.instanceOf(
        IsEmailValidator,
      );
    });
  });
});
